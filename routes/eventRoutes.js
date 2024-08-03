const express = require("express");
const {
  createEvent,
  updateEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.get("/", getEvents);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
