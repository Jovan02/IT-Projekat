const express = require("express");
const authRoutes = require("./routes/auth");
const moviesRoutes = require("./routes/movies");
const screeningsRoutes = require("./routes/screenings");
const reviewsRoutes = require("./routes/reviews");
const ticketsRoutes = require("./routes/tickets");
const usersRoutes = require("./routes/users");
const genresRoutes = require("./routes/genres");
const imagesRoutes = require("./routes/images");
const hallsRoutes = require("./routes/halls");

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use("/public/images", express.static(__dirname + "/public/images/"));

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/screenings", screeningsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/halls", hallsRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
