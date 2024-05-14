const express = require("express");
const authRoutes = require("./routes/auth");
const moviesRoutes = require("./routes/movies");
const screeningsRoutes = require("./routes/screenings");
const reviewsRoutes = require("./routes/reviews");
const ticketsRoutes = require("./routes/tickets");
const usersRoutes = require("./routes/users");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/screenings", screeningsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/users", usersRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
