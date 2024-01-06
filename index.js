const express = require("express");
const bodyParser = require("body-parser");
const apiLimiter = require("./middleware/rateLimit");
const db = require("./config/db");
const logger = require("./middleware/logger"); //
const { PORT } = require("./config/envVariables");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const errorMiddleware = require("./controllers/errorController");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/books", apiLimiter);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
