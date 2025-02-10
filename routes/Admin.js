const express = require("express");
const router = express.Router();
const Admin = require("../models/Admins"); // Admin model
const Content = require("../models/Content"); // Content model
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");
const fileStream = require("../fileStream"); // Initialize stream for upload and download

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Render the Admin sign-in page
router.get("/", (req, res) => {
  res.render("Admin", { title: "Sign in" });
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login", { title: "Sign in" });
});

// Render the registration page
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    const result = await Content.find({});
    let content = "Place holder";

    if (result.length > 0 && result[0]?.content) {
      content = JSON.parse(result[0].content);
    }

    res.render("dashboard", {
      title: "Admin dashboard",
      admin: `${req.user.firstName} ${req.user.lastName}`,
      content,
    });
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).send("Server Error");
  }
});

// Register POST
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let errors = [];

  // Check required fields
  if (!firstName || !lastName || !email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      title: "Register",
      errors,
      firstName,
      lastName,
      email,
      password,
    });
  } else {
    try {
      const existingUser = await Admin.findOne({ email });

      if (existingUser) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          title: "Register",
          errors,
          firstName,
          lastName,
          email,
          password,
        });
      } else {
        const newAdmin = new Admin({
          firstName,
          lastName,
          email,
          password,
        });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(password, salt);

        await newAdmin.save();
        req.flash("success_msg", "You are now registered and can log in");
        res.redirect("/Admin/login");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).send("Server Error");
    }
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/Admin/dashboard",
    failureRedirect: "/Admin/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/Admin/login");
});

// Update dashboard content
router.post("/dashboard", async (req, res) => {
  const { content } = req.body;

  try {
    await Content.updateOne({}, { $set: { content } });
    console.log("Content was successfully updated");
    res.json({ success: true });
  } catch (err) {
    console.error("Error updating content:", err);
    res.status(500).send("Server Error");
  }
});

const handleImageUpload = (imageField, imageName) => {
  return async (req, res) => {
    try {
      const image = req.file;
      console.log("Image uploaded:", image);

      if (!image) {
        req.flash("error_msg", "No file uploaded");
        return res.redirect("/Admin/dashboard");
      }

      // Await the full upload and replacement process
      await fileStream.uploadAndReplace(image, imageName);

      req.flash("success_msg", `${imageName} uploaded successfully`);
      res.status(200).json({ success: true, redirect: "/Admin/dashboard" });
    } catch (err) {
      console.error(`Error uploading ${imageName}:`, err);
      req.flash("error_msg", `Error uploading ${imageName}`);
      res.redirect("/Admin/dashboard");
    }
  };
};
// Image upload routes
router.post(
  "/coverImageUpload",
  ensureAuthenticated,
  upload.single("jumboImg"),
  handleImageUpload("jumboImg", "Cover")
);

router.post(
  "/client1ImageUpload",
  ensureAuthenticated,
  upload.single("client1Img"),
  handleImageUpload("client1Img", "Client1")
);

router.post(
  "/client2ImageUpload",
  ensureAuthenticated,
  upload.single("client2Img"),
  handleImageUpload("client2Img", "Client2")
);

router.post(
  "/client3ImageUpload",
  ensureAuthenticated,
  upload.single("client3Img"),
  handleImageUpload("client3Img", "Client3")
);

router.post(
  "/client4ImageUpload",
  ensureAuthenticated,
  upload.single("client4Img"),
  handleImageUpload("client4Img", "Client4")
);

router.post(
  "/client5ImageUpload",
  ensureAuthenticated,
  upload.single("client5Img"),
  handleImageUpload("client5Img", "Client5")
);

router.post(
  "/client6ImageUpload",
  ensureAuthenticated,
  upload.single("client6Img"),
  handleImageUpload("client6Img", "Client6")
);

// Image retrieval routes
router.get("/images/cover", (req, res) => {
  console.log("Downloading cover image...");
  fileStream.download("Cover", res);
});

router.get("/images/client1", (req, res) => {
  console.log("Downloading client 1 image...");
  fileStream.download("Client1", res);
});

router.get("/images/client2", (req, res) => {
  console.log("Downloading client 2 image...");
  fileStream.download("Client2", res);
});

router.get("/images/client3", (req, res) => {
  console.log("Downloading client 3 image...");
  fileStream.download("Client3", res);
});

router.get("/images/client4", (req, res) => {
  console.log("Downloading client 4 image...");
  fileStream.download("Client4", res);
});

router.get("/images/client5", (req, res) => {
  console.log("Downloading client 5 image...");
  fileStream.download("Client5", res);
});

router.get("/images/client6", (req, res) => {
  console.log("Downloading client 6 image...");
  fileStream.download("Client6", res);
});


module.exports = router;