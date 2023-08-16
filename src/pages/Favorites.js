import React, { useState } from "react";
import "../css/Favorites.css";

const Favorites = ({ favorites }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFavorites = favorites.filter((quote) =>
    quote.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
// handle the search value by author
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {/* search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by author"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {/* display all favorite quotes and filltered if have*/}
        {filteredFavorites.map((quote, index) => (
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
