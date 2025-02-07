var express = require("express");
var router = express.Router();
const tools = require("../public/javascripts/tools");
// import { escapeHTMLtag } from '../public/javascripts/tools.js';
const Content = require("../models/Content");

router.get("/", async (req, res, next) => {
  try {
    const result = await Content.find({});

    if (!result || result.length === 0) {
      console.log("No content found on index get");
      return res.render("index", {
        title: "EGC-Togo",
        content: "Place holder",
      });
    }

    let content;
    if (result[0] == null) {
      console.log("Content is null");
      content = "Place holder";
    } else {
      content = JSON.parse(result[0].content);
    }

    console.log("Content found on index get: ", content);

    res.render("index", {
      title: "EGC-Togo",
      content,
    });
  } catch (err) {
    console.error("Error retrieving content:", err);
    next(err);
  }
});

router.get("/book", (req, res, next) => {
  console.log("Inside book route");
  res.render("book", {
    title: "Rendez-vous",
  });
});


module.exports = router;
