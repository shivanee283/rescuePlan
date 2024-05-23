// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "test",
// });

// app.get("/", (req, res) => {
//   res.json("hello");
// });

// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });

// app.post("/books", (req, res) => {
//   const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = " DELETE FROM books WHERE id = ? ";

//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values,bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.listen(8800, () => {
//   console.log("Connected to backend.");
// });


import express from "express";
import mysql from "mysql2/promise"; // Import mysql2 package
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool to the MySQL database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydatabase" // Replace with your actual database name
});

// Check the connection to the MySQL database
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
  connection.release();
});

// Define routes
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM books");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  const { title, desc, price, cover } = req.body;
  try {
    await db.query("INSERT INTO books(title, `desc`, price, cover) VALUES (?, ?, ?, ?)", [title, desc, price, cover]);
    res.json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = ?", [bookId]);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, desc, price, cover } = req.body;
  try {
    await db.query("UPDATE books SET title = ?, `desc` = ?, price = ?, cover = ? WHERE id = ?", [title, desc, price, cover, bookId]);
    res.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
