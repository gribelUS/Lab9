import express from "express"
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "28102003",
    database: "Lab9"
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.json("This is the backend!")
});

app.get("/Books", (req,res) => {
    const q = "SELECT * FROM Books"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/Books", (req,res) => {
    const q = "INSERT INTO Books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc,req.body.price ,req.body.cover];

    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/Books/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM Books WHERE id = ?";

    db.query(q,[bookId], (err,data) => {
        if(err) return res.json(err);
        return res.json("Books has been deleted successfully.");
    })
});

app.put("/Books/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "UPDATE Books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values=[req.body.title, req.body.desc,req.body.price ,req.body.cover]

    db.query(q,[...values,bookId], (err,data) => {
        if(err) return res.json(err);
        return res.json("Books has been updated successfully.");
    })
});

app.listen(8800, () => {
    console.log("Connected to backend.")
});