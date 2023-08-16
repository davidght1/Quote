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
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  // get data of every single quote
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
  // like button add to favorites
  const handleLike = () => {
    if (quote && !favorites.some((fav) => fav._id === quote._id)) {
      setFavorites([...favorites, quote]);
    }
  };
  // the button that fetch new quote every time you click on him
  const handleNewQuote = () => {
    fetchData();
  };

  return (
    <Router>
      <div>
        {/* display quote */}
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
              <div className="favorites-count">
                Number of Favorites: {favorites.length}
              </div>
            </div>
          )}
        </div>

         {/* button that show you or hide the favorites */}
         <div className="link-button-container">
         <Link
          to="/favorites"
          onClick={() => setShowFavorites(!showFavorites)}
          className={`link-button ${showFavorites ? "link-button-active" : ""}`}
        >
          {showFavorites ? "Hide Favorites" : "Show Favorites"}
        </Link>
        </div>

        {/* if  'showFavorites' true its will show you the list of favorites --> (page favorites) */}
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
