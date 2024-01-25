const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js application',
    },
  },
  // Path to the API routes
  apis: ['./routes/authRoutes.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/books", apiLimiter);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
