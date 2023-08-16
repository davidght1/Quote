import React from "react";
import "../css/Favorites.css"

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((quote, index) => (
          <li key={index}>
            <div className="quote-text">{quote.author}</div>
            <div className="quote-authorSlug">- {quote.dateAdded}</div>
            <div className="quote-content">Source: {quote.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
