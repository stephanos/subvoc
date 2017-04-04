import $ from 'jquery';
import Slider from 'react-slick';

import { Attribution } from './attribution.es6';


const SearchResultItem = ({ item, onSelect }) =>
    <div className="search-result-item" onClick={() => onSelect(item.id)}>
        <a className="header">
            { item.poster_url
                ? <img className="poster" src={item.poster_url} />
                : <img className="poster empty" src="/static/img/placeholder.png" /> }
        </a>

        <div className="footer">
            { item.title }
        </div>
    </div>;


const SearchResults = ({ items, onSelect }) => {
    const slickSettings = {
        'infinite': false,
        'slidesToShow': 4,
        'slidesToScroll': 4,
        'responsive': [{
            'breakpoint': 1024,
            'settings': {
                'slidesToShow': 4,
                'slidesToScroll': 4,
            }
        }, {
            'breakpoint': 600,
            'settings': {
                'slidesToShow': 3,
                'slidesToScroll': 3
            }
        }, {
            'breakpoint': 480,
            'settings': {
                'slidesToShow': 2,
                'slidesToScroll': 2
            }
        }]
    };

    return <div>
        <div className="search-result-wrapper">
            <div className="search-result">
                { items.length === 0 
                    ? <div className="empty"> No movie was found. </div>
                    : <Slider {...slickSettings}>
                        { $.map(items, item => <div key={item.id}> 
                            <SearchResultItem item={item} onSelect={onSelect} /> 
                        </div> )}
                    </Slider>
                }
            </div>
        </div>
        { items.length !== 0 ? <Attribution /> : <span/> }
    </div>;
}


export { SearchResults }