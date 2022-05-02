const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  //   res.send("gigs yay!");
  Gig.findAll()
    .then((gigs) => {
      const context = {
        userGigs: gigs.map((gig) => {
          return {
            title: gig.title,
            budget: gig.budget,
            technologies: gig.technologies,
            description: gig.description,
            contact_email: gig.contact_email,
          };
        }),
      };
      res.render("gigs", { gigs: context.userGigs });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  const data = ({ title, technologies, budget, description, contact_email } =
    req.body);
  let errors = [];

  //validate fields
  if (!title) {
    errors.push({ text: "please add title." });
  }
  if (!technologies) {
    errors.push({ text: "please add technologies." });
  }
  if (!description) {
    errors.push({ text: "please add desc." });
  }
  if (!contact_email) {
    errors.push({ text: "please add email." });
  }
  if (!budget) {
    budget = "unknown";
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      description,
      contact_email,
      budget,
    });
  } else {
    budget = `$${budget}`;
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((gig) => {
        res.redirect("/gigs");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// search for gigs

router.get("/search", (req, res) => {
  const { term } = req.query;
  console.log(term);

  Gig.findAll({
    where: { technologies: { [Op.like]: "%" + term + "%" } },
  })
    .then((gigs) => {
      const context = {
        userGigs: gigs.map((gig) => {
          return {
            title: gig.title,
            budget: gig.budget,
            technologies: gig.technologies,
            description: gig.description,
            contact_email: gig.contact_email,
          };
        }),
      };
      res.render("gigs", { gigs: context.userGigs });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
