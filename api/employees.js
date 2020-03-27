const express = require('express');
const api = express.Router();
const db = require('diskdb');

// diskdb connection
db.connect('./data', ['employees']);

api.get("/", (req, res) => {
   res.json(db.employees.find());
});

api.get("/:id", (req, res) => {
   const employeeId = Number(req.params.id);
   const employee = db.employees.findOne({ id: employeeId });
   if (employee) {
      res.json(employee);
   } else {
      res.json({ message: `employee ${employeeId} doesn't exist` })
   }
});

api.post("/", (req, res) => {
   const employee = req.body;
   console.log('Adding new employee: ', employee);

   db.employees.save(employee);

   res.json(db.employees.find());
});

api.put("/:id", (req, res) => {
   const employeeId = Number(req.params.id);
   const employee = req.body;
   console.log("Editing item: ", employeeId, " to be ", employee);

   db.employees.update({ id: employeeId }, employee);

   res.json(db.employees.find());
});

api.delete("/:id", (req, res) => {
   const employeeId = Number(req.params.id);
   console.log("Delete item with id: ", employeeId);

   db.employees.remove({ id: employeeId });

   res.json(db.employees.find());
});

module.exports = api;