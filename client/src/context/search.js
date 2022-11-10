import React, { useState } from 'react'

const SearchContext = React.createContext();

function SearchProvider ({ children }) {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value = {{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}
export { SearchContext, SearchProvider }