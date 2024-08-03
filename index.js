const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const app = express();
require("dotenv").config();
const server = http.createServer(app);

const port = 8080;
app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-verify"],
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
