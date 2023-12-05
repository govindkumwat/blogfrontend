import React from 'react'

const Search = ({setSearchInput}) => {
  return (
    <div className="search-container">
    <input type="text" 
    className="search-input"
    placeholder="Search"  
    onChange={(e) => setSearchInput(e.target.value)}/>
  </div>
  )
}

export default Search
