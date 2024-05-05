const express = require("express");
const authRoutes = require("./routes/auth");
const moviesRoutes = require("./routes/movies");
const screeningsRoutes = require("./routes/screenings");
const reviewsRoutes = require("./routes/reviews");

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/screenings", screeningsRoutes);
app.use("/api/reviews", reviewsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
