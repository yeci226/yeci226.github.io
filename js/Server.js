const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 使用 bodyParser 中间件解析请求体
app.use(bodyParser.json());

// 模拟的用户和书籍数据
let users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

let books = [
  { id: 1, title: "Book 1", status: true },
  { id: 2, title: "Book 2", status: false },
];

// 登录端点
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// 借书端点
app.post("/api/borrow", (req, res) => {
  const { userId, bookId } = req.body;
  const user = users.find((user) => user.id === userId);
  const book = books.find((book) => book.id === bookId);
  if (user && book && book.status) {
    book.status = false;
    book.borrowedBy = user.username;
    res.json({ book });
  } else {
    res
      .status(400)
      .json({ message: "Invalid user or book, or book is not available" });
  }
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
