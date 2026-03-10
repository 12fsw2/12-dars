const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const carRouter = require("./router/car.routes");
const categoryRouter = require("./router/category.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes");
const profileRouter = require("./router/profile.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Router
app.use(carRouter);
app.use(categoryRouter);
app.use(authRouter);
app.use(profileRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
});