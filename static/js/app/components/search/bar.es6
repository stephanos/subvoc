import { debounce } from '../../util/debounce.es6';


const SearchBar = ({ onSearch }) => {
    const debouncedSearch = debounce((e) => onSearch(e.target.value), 500);

    return <div className="search">
        <div className="search-input" />
            <div className="search-wrapper">
            <input type="text"
                    className="searchbar"
                    name="q"
                    autoFocus
                    autoComplete="off"
                    onChange={(e) => {
                        e.persist();
                        debouncedSearch(e);
                    }}
                    placeholder="Search movie ..." />
        </div>
    </div>;
};


export { SearchBar };