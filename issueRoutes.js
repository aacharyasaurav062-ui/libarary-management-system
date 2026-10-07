const express = require("express");
const router = express.Router();

const {
    issueBook,
    getIssues
} = require("../controllers/issueController");

router.post("/", issueBook);
router.get("/", getIssues);
module.exports = router;