const express= require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    getBook,
    upadateBook,
    deleteBook,
} =require("../comtrollrs/bookController");

router.post("/",addBook);
router.get("/",getBooks);
router.get("/:id",getBook);
router.put("/:id",upadateBook);
router.delete("/:id",deleteBook);
module.exports = router;