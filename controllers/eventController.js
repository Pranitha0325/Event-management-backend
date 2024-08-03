const Event = require("../models/eventModel");
const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !date || !location) {
    return res
      .status(400)
      .json({ error: "Title, date, and location are required" });
  }

  try {
    const weather = async (location, date) => {
      const apiKey = process.env.WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&date=${date}`
      );
      return response.data.forecast.forecastday[0].day.condition.text;
    };
    const event = new Event({ title, description, date, location });
    console.log(event, "eventcreated");
    console.log(weather, "weather condition");
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location },
      { new: true }
    );

    const response = await Event.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    const response = await Event.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createEvent, updateEvent, getEvents, deleteEvent };
