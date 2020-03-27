const express = require('express');
const api = express.Router();
const db = require('diskdb');

// diskdb connection
db.connect('./data', ['reviews']);

api.get("/", (req, res) => {
   const recipient = req.query.recipient;
   const reviews = recipient ? db.reviews.find({ recipient: Number(recipient) }) : db.reviews.find();

   res.json(reviews);
});

api.get("/:id", (req, res) => {
   const reviewId = Number(req.params.id);
   const review = db.reviews.findOne({ id: reviewId });
   if (review) {
      res.json(review);
   } else {
      res.json({ message: `review ${reviewId} doesn't exist` })
   }
});

api.post("/", (req, res) => {
   const review = req.body;
   console.log('Adding new review: ', review);

   db.reviews.save(review);

   res.json(db.reviews.find());
});

api.put("/:id", (req, res) => {
   const reviewId = Number(req.params.id);
   const review = req.body;
   console.log("Editing review: ", reviewId, " to be ", review);

   db.reviews.update({ id: reviewId }, review);

   res.json(db.reviews.find());
});

api.delete("/:id", (req, res) => {
   const reviewId = Number(req.params.id);
   console.log("Delete review with id: ", reviewId);

   db.reviews.remove({ id: reviewId });

   res.json(db.reviews.find());
});

module.exports = api;