const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));
app.use("/api/notify", require("./routes/notificationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
