

import React, { useState, useEffect } from 'react';
import retreatsData from '../data/retreats.json';
import '../styles/ButtonSection.css';
import '../styles//RetreatList.css';

function ButtonSection() {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setRetreats(retreatsData);
    setFilteredRetreats(retreatsData);
  }, []);

  useEffect(() => {
    filterRetreats();
  }, [filterType, filterDate, searchTitle, retreats]);

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

  const filterRetreats = () => {
    let filtered = [...retreats];

    // Filter by type
    if (filterType) {
      filtered = filtered.filter((retreat) =>
        retreat.tag.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    // Filter by date
    if (filterDate) {
      const [startYear, endYear] = filterDate.split('-').map(Number);
      filtered = filtered.filter((retreat) => {
        const retreatYear = new Date(retreat.date * 1000).getFullYear();
        return retreatYear >= startYear && retreatYear <= endYear;
      });
    }

    // Filter by title search
    if (searchTitle) {
      filtered = filtered.filter((retreat) =>
        retreat.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredRetreats(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRetreats.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredRetreats.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstItem > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="retreats-wrapper">
      <div className="button-section">
        <div className="button-group-left">
          <select onChange={handleTypeChange} className="filter-dropdown">
            <option value="">Filter by Type</option>
            <option value="yoga">Yoga</option>
            <option value="meditation">Meditation</option>
            <option value="detox">Detox</option>
          </select>
          <select onChange={handleDateChange} className="filter-dropdown">
            <option value="">Filter by Date</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>
        <div className="button-group-right">
          <input
            type="text"
            placeholder="Search Retreats by Title"
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <div className="retreats-container">
        {currentItems.map((retreat) => (
          <div key={retreat.id} className="retreat-item">
            <img src={retreat.image} alt={retreat.title} className="retreat-image" />
            <h2 className="retreat-title">{retreat.title}</h2>
            <p className="retreat-description">{retreat.description}</p>
            <p className="retreat-location">Location: {retreat.location}</p>
            <p className="retreat-price">Price: ${retreat.price}</p>
            <p className="retreat-date">Date: {new Date(retreat.date * 1000).toLocaleDateString()}</p>
            <p className="retreat-duration">Duration: {retreat.duration} days</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={indexOfFirstItem === 0}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= filteredRetreats.length}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ButtonSection;
