import React, { useState, useEffect } from "react";
import "./Allbooks.css";

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books/allbooks");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="books-page">Loading books...</div>;
  }

  if (error) {
    return <div className="books-page">Error: {error}</div>;
  }

  return (
    <div className="books-page">
      <div className="books">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img
              src={book.imageUrl || "./assets/images/bookImage.jpg"}
              alt={book.bookName}
            ></img>
            <p className="bookcard-title">{book.bookName}</p>
            <p className="bookcard-author">By {book.author}</p>
            <div className="bookcard-category">
              {book.categories && book.categories.length > 0 ? (
                <div className="categories-list">
                  {book.categories.map((category, index) => (
                    <span key={category._id} className="category-tag">
                      {category.categoryName}
                      {index < book.categories.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Uncategorized</p>
              )}
            </div>
            <div className="bookcard-emptybox"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allbooks;