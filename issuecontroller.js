const db = require("../config/db");

exports.issueBook = async (req, res) => {

    const connection = await db.promise().getConnection();

    try {

        const {
            book_id,
            member_id,
            issue_date,
            due_date
        } = req.body;

        if (!book_id || !member_id || !issue_date || !due_date) {
            return res.status(400).json({
                success: false,
                message: "Book, member, issue date and due date are required"
            });
        }
        await connection.beginTranscation();

        const [books] = await connection.query(
            "SELECT * FROM books WHERE id = ? FOR UPDATE",
        
            [book_id]
        );

        if (books.length === 0) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        if (books[0].available_quantity <= 0){
            await connection.rollback();

            return res.status(400).json({
                success: flase,
                message: "Book is not available"
            });
        }
        const [members] = await connection.query(
            "SELECT * FROM members WHERE id = ?",
            [member_id]
        );

        if (members.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        const [result] = await connection.query(
            `INSERT INTO issues
            (book_id, member_id, issue_date, due_date, status)
            VALUES (?, ?, ?, ?, 'issued')`,
            [
                book_id,
                member_id,
                issue_date,
                due_date
            ]
        );

        await connection.query(
            `UPDATE books
             SET available_quantity = available_quantity - 1
             WHERE id = ?`,
            [book_id]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Book issued successfully",
            issueId: result.insertId
        });

    } catch (error) {

        await connection.rollback();

        res.status(500).json({
            success: false,
            message: error.message
        });

    } finally {
        connection.release();
    }
};

exports.getIssues = async (req, res) => {

    try {

        const [issues] = await db.promise().query(`
            SELECT
                i.id,
                i.issue_date,
                i.due_date,
                i.status,
                b.book_name,
                b.book_code,
                m.member_id,
                m.full_name
            FROM issues i
            JOIN books b ON i.book_id = b.id
            JOIN members m ON i.member_id = m.id
            ORDER BY i.id DESC
        `);

        res.json({
            success: true,
            issues
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};