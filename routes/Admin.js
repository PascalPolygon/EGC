const express = require("express");
const router = express.Router();
// const Admin = require("../models/Admins"); // REMOVED - Admin model
// const Content = require("../models/Content"); // REMOVED - Content model
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");
// const fileStream = require("../fileStream"); // REMOVED - Initialize stream for upload and download

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
    // REMOVED: Database query
    // const result = await Content.find({});
    // let content = "Place holder";
    // if (result.length > 0 && result[0]?.content) {
    //   content = JSON.parse(result[0].content);
    // }

    // Static content placeholder
    const content = {
      big_title: "EGC s.a",
      subt_title: "Des professionnels à votre service",
      nos_valeurs_title: "Nos Valeurs",
      // Add other content properties as needed
    };

    res.render("dashboard", {
      title: "Admin dashboard",
      admin: req.user ? `${req.user.firstName} ${req.user.lastName}` : "Admin",
      content,
    });
  } catch (err) {
    console.error("Error rendering dashboard:", err);
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
      // REMOVED: Database registration functionality
      req.flash("error_msg", "Registration is currently disabled");
      res.redirect("/Admin");
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).send("Server Error");
    }
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  // REMOVED: Database authentication
  req.flash("error_msg", "Authentication is currently disabled");
  res.redirect("/Admin");
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/Admin");
  });
});

// Update dashboard content
router.post("/dashboard", async (req, res) => {
  const { content } = req.body;

  try {
    // REMOVED: Database update functionality
    req.flash("error_msg", "Content updates are currently disabled");
    res.redirect("/Admin/dashboard");
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

      // REMOVED: File upload functionality
      req.flash("error_msg", "Image uploads are currently disabled");
      res.redirect("/Admin/dashboard");

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
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client1", (req, res) => {
  console.log("Downloading client 1 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client2", (req, res) => {
  console.log("Downloading client 2 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client3", (req, res) => {
  console.log("Downloading client 3 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client4", (req, res) => {
  console.log("Downloading client 4 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client5", (req, res) => {
  console.log("Downloading client 5 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});

router.get("/images/client6", (req, res) => {
  console.log("Downloading client 6 image...");
  // REMOVED: File download functionality
  req.flash("error_msg", "Image downloads are currently disabled");
  res.redirect("/Admin/dashboard");
});


module.exports = router;