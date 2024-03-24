import kv from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { bookId, status, borrower } = req.body;

    try {
      let books = await kv.get("books");

      const index = books.findIndex((book) => book.id === parseInt(bookId));
      if (index !== -1) {
        books[index].status = status;
        books[index].borrower = borrower;

        kv.set("books", books);

        res.status(200).json({ success: true, message: "書籍狀態已更新" });
      } else {
        res.status(404).json({ success: false, message: "找不到指定的書籍" });
      }
    } catch (error) {
      console.error("更新書籍狀態失敗", error);
      res.status(500).json({ success: false, message: "更新書籍狀態失敗" });
    }
  } else {
    res.status(405).json({ success: false, message: "僅支援 POST 請求" });
  }
}
