const db = require("../config/db");

exports.getDashboard = async (req, res) => {

    try {

        const [[books]] = await db.promise().query(
            "SELECT COUNT(*) AS total FROM books"
        );

        const [[members]] = await db.promise().query(
            "SELECT COUNT(*) AS total FROM members"
        );

        const [[issued]] = await db.promise().query(
            "SELECT COUNT(*) AS total FROM issues WHERE status = 'issued'"
        );

        const [[returned]] = await db.promise().query(
            "SELECT COUNT(*) AS total FROM issues WHERE status = 'returned'"
        );

        const [[fine]] = await db.promise().query(
            "SELECT COALESCE(SUM(fine), 0) AS total FROM returns"
        );

        res.json({
            success: true,
            dashboard: {
                totalBooks: books.total,
                totalMembers: members.total,
                issuedBooks: issued.total,
                returnedBooks: returned.total,
                totalFine: fine.total
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};