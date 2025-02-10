const mongoose = require("mongoose");
const fs = require("fs");
const Images = require("./models/Images");
const { GridFSBucket } = require("mongodb");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  console.log("Mongo connection open!");
  gfs = new GridFSBucket(conn.db, { bucketName: "fs" });
});

module.exports.uploadAndReplace = async function (imageFile, imageType) {
  try {
    // Upload new image
    const uploadStream = gfs.openUploadStream(imageFile.originalname); // Use `originalname` instead of `name`
    fs.createReadStream(imageFile.path).pipe(uploadStream);

    uploadStream.on("finish", async () => {
      console.log(`Image "${imageFile.originalname}" uploaded successfully.`);

      // Retrieve the newly uploaded file from GridFS
      const files = await gfs.find({ filename: imageFile.originalname }).toArray();
      if (!files || files.length === 0) {
        console.error("Error: Uploaded file not found in GridFS.");
        return;
      }
      const uploadedFile = files[0]; // Get the most recent upload

      console.log("Uploaded file ID:", uploadedFile._id);

      // Remove existing image record
      const imageToDelete = await Images.findOneAndDelete({ imageType });
      if (imageToDelete) {
        console.log("Deleting old image record:", imageToDelete);
        // Delete file from GridFS
        await gfs.delete(new mongoose.Types.ObjectId(imageToDelete.imageId));
        console.log("Deleted old image from GridFS");
      }

      // Save new image record
      const newImage = new Images({
        imageId: uploadedFile._id,
        imageName: uploadedFile.filename,
        imageType,
      });
      await newImage.save();
      console.log("Database updated with new image");
    });
  } catch (error) {
    console.error("Error in uploadAndReplace:", error);
  }
};

module.exports.download = async function (imageType, res) {
  try {
    // Find image record
    const imageRecord = await Images.findOne({ imageType });
    if (!imageRecord) {
      return res.status(404).json({ err: `Could not find ${imageType} image` });
    }

    // Stream image from GridFS
    const downloadStream = gfs.openDownloadStream(imageRecord.imageId);
    downloadStream.on("error", (err) => {
      console.error("Error downloading image:", err);
      res.status(500).send("Error downloading image");
    });
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error in download:", error);
    res.status(500).send("Server Error");
  }
};