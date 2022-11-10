import React, { useContext } from "react";
import { SearchContext } from "../context/search";
import '../App.css';

function SearchFilter() {

    const { setSearch } = useContext(SearchContext) 

    function handleChange(e) {
        setSearch(e.target.value)
      }

    return (
            <form >
                <input type="text" placeholder="search" className="projects-header" onChange={handleChange} />
            </form>
    )
}

export default SearchFilter