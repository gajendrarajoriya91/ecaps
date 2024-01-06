const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateJWT = require('../middleware/authentication');


router.post("/create/", authenticateJWT, bookController.createBook);
router.get("/read/", bookController.getBooks);
router.put("/update/:id", authenticateJWT, bookController.updateBook);
router.delete("/delete/:id", authenticateJWT, bookController.deleteBook);

module.exports = router;
