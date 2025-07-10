var express = require("express");
var router = express.Router();
const tools = require("../public/javascripts/tools");
// import { escapeHTMLtag } from '../public/javascripts/tools.js';
// const Content = require("../models/Content"); // REMOVED

router.get("/", async (req, res, next) => {
  try {
    // REMOVED: Database query
    // const result = await Content.find({});
    // if (!result || result.length === 0) {
    //   console.log("No content found on index get");
    //   return res.render("index", {
    //     title: "EGC-Togo",
    //     content: "Place holder",
    //   });
    // }
    // let content;
    // if (result[0] == null) {
    //   console.log("Content is null");
    //   content = "Place holder";
    // } else {
    //   content = JSON.parse(result[0].content);
    // }
    // console.log("Content found on index get: ", content);

    // Static content placeholder
    const content = {
      big_title: "EGC s.a",
      subt_title: "Des professionnels à votre service",
      nos_valeurs_title: "Nos Valeurs",
      nos_valeurs_subt_title: "Nous nous engageons à fournir des services de qualité supérieure.",
      valeur_1_title: "Ponctualité",
      valeur_1: "Nous respectons les délais convenus avec nos clients.",
      valeur_2_title: "Fiabilité",
      valeur_2: "Nos services sont fiables et de haute qualité.",
      valeur_3_title: "Professionnalisme",
      valeur_3: "Notre équipe est composée de professionnels expérimentés.",
      clients_title: "Nos Réalisations",
      clients_1_title: "Bâtiment AGF",
      clients_1: "Construction du bâtiment AGF",
      clients_2_title: "Bâtiment BLITTA",
      clients_2: "Construction du bâtiment BLITTA",
      clients_3_title: "Boulevard Malfakassa",
      clients_3: "Bitumage et éclairage public du Boulevard Malfakassa prolongé à Lomé",
      clients_4_title: "Projet 4",
      clients_4: "Description du projet 4",
      clients_5_title: "Projet 5",
      clients_5: "Description du projet 5",
      clients_6_title: "Projet 6",
      clients_6: "Description du projet 6",
      contactez_nous: "Contactez-nous",
      business_location: "Lomé, Togo",
      business_hours: "Lun - Ven: 8h - 17h",
      phone_number: "+228 XX XX XX XX",
      footer_business_name: "EGC s.a",
      footer_business_recap: "Entreprise de construction et de génie civil au Togo.",
      business_services_title: "Services",
      service_1: "Construction",
      service_2: "Génie Civil",
      service_3: "Rénovation",
      service_4: "Consultation",
      liens_utils_title: "Liens Utiles",
      lien_1: "Accueil",
      lien_2: "Services",
      lien_3: "Projets",
      lien_4: "Contact",
      contact_title: "Contact",
      location: "Lomé, Togo",
      email: "contact@egc-togo.com",
      fax_number: "+228 XX XX XX XX"
    };

    res.render("index", {
      title: "EGC-Togo",
      content,
    });
  } catch (err) {
    console.error("Error rendering page:", err);
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
