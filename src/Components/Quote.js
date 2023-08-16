import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Favorites from "../pages/Favorites";
import "../css/Quote.css";

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      const data = response.data;
      console.log(data);
      setQuote(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = () => {
    if (quote) {
      setFavorites([...favorites, quote]);
    }
  };

  const handleNewQuote = () => {
    fetchData();
  };

  return (
    <Router>
      <div>
      <Link
          to="/favorites"
          onClick={() => setShowFavorites(!showFavorites)}
          className={`link-button ${showFavorites ? "link-button-active" : ""}`}
        >
          {showFavorites ? "Hide Favorites" : "Go to Favorites"}
        </Link>
        <div className="quote-container">
          {quote && (
            <div>
              <div className="quote-text">{quote.author}</div>
              <div className="quote-authorSlug">- {quote.dateAdded}</div>
              <div className="quote-content">Source: {quote.content}</div>
              <button className="like-button" onClick={handleLike}>
                Like
              </button>
              <button className="new-quote" onClick={handleNewQuote}>
                New Quote
              </button>
            </div>
          )}
        </div>
       
        {/* show favorites list */}
        {showFavorites && (
          <Routes>
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default Quote;
