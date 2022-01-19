import React, { useState, useEffect } from 'react';
import './style.scss';
import SearchIcon from '../../assets/icons/searching@2x.png';
import { t } from 'i18next';

const SearchBar = (props) => {

    const debounceInterval = 300;
    const [query, setQuery] = useState('');
    const [ timer, setTimer] = useState();

    //debounce logic
    useEffect(() => {
        if (timer) {
          clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            props.onChangeOfSearchInput(query, props.type);
            props.setSuggItemIndex(-1)
        }, debounceInterval));
      }, [query]);
    
    const handleOnChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form>
            <div className='searchInput-container'>
                <input
                    className={props.type === 'searchBarTopPanel' ?
                        'search-input-standard' : 'search-input-for-dropDown'}
                    type="text"
                    id="header-search"
                    placeholder={t('search')}
                    value={query}
                    onChange={handleOnChange}
                    onKeyDown={(e) => props.handleSearcherInputKeyDown(e, props.type)}
                    autoComplete="off"
                />
                <img src={SearchIcon} alt='searchIcon' id={props.type === 'searchBarTopPanel' 
                    ? 'input_img' : 'input_img_for_drp'} />
            </div>
        </form>
    )
}
// const SearchBar = (props) => {

//     const debounceInterval = 300;
//     const [query, setQuery] = useState('');
//     const [ timer, setTimer] = useState();

//     //debounce logic
//     useEffect(() => {
//         if (timer) {
//           clearTimeout(timer);
//         }
//         setTimer(setTimeout(() => {
//             props.onChangeOfSearchInput(query, props.type);
//             props.setShowSuggestions(true);
//         }, debounceInterval));
//       }, [query]);
    
//     const handleOnChange = (e) => {
//         setQuery(e.target.value);
//     };

//     const handleFocusSearcherInput = () => {
//         props.setShowSuggestions(true);
//     }

//       // handel the key down event of the search input
//     const handleSearcherInputKeyDown = (event) => {

//         if (props.showSuggestions) {
//           // use keyboard to select the suggesions
//           props.handleSelectSuggestions(event, props.type);
//         } else {
//           // just show the suggestions list
//             props.setShowSuggestions(true);
//         }
//       }
    


//     return (
//         <form>
//             <div className='searchInput-container'>
//                 <input
//                     className={props.type === 'searchBarTopPanel' ?
//                         'search-input-standard' : 'search-input-for-dropDown'}
//                     type="text"
//                     id="header-search"
//                     placeholder={t('search')}
//                     value={query}
//                     onChange={handleOnChange}
//                     onFocus={e => handleFocusSearcherInput(e)}
//                     onKeyDown={(e) => handleSearcherInputKeyDown(e)}
//                 />
//                 <img src={SearchIcon} alt='searchIcon' id={props.type === 'searchBarTopPanel' 
//                     ? 'input_img' : 'input_img_for_drp'} />
//             </div>
//         </form>
//     )
// }

export default SearchBar;