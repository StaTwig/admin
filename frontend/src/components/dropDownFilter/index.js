import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar';
import "./style.scss";
import useOnclickOutside from "react-cool-onclickoutside";

const DropDownFilter = (props) => {

    let ref = useOnclickOutside(() => {
        switch (props.type) {
            case 'orgType':
                setShowDropDownForType(false);
                break;
            case 'country':
                setShowDropDownForCountry(false);
                break;
            case 'region':
                setShowDropDownForRegion(false);
                break;
            case 'status':
                setShowDropDownForStatus(false);
                break;
            case 'createdOn':
                setShowDropDownForCreatedOn(false);
                break;
            case 'role':
                setShowDropDownForRole(false);
                break;
            case 'accountStatus':
                setShowDropDownForAccountStatus(false);

            default:
                console.log("default values")
        }

    })


    const { setShowDropDownForType,
        setShowDropDownForCountry,
        setShowDropDownForRegion,
        setShowDropDownForStatus,
        setShowDropDownForCreatedOn,
        setShowDropDownForAccountStatus,
        setShowDropDownForRole
    } = props
    const [suggItemIndex, setSuggItemIndex] = useState(-1);


    useEffect(() => {
        if (suggItemIndex < 0) return;
        console.log(suggItemIndex);
        for (let index = 0; index < props.data.length; index++) {
            document.getElementsByClassName(`sugg-item${index}`)[0].classList.remove('selected')
        }
        document.getElementsByClassName(`sugg-item${suggItemIndex}`)[0].classList.add('selected');
        console.log(document.getElementsByClassName(`sugg-item${suggItemIndex}`)[0].innerHTML)
    }, [suggItemIndex])

    const handleSearcherInputKeyDown = (e, type) => {
        // 40 => down, 38 => up
        if (e.keyCode === 40 && suggItemIndex < props.data.length - 1) {
            setSuggItemIndex(prevValue => prevValue + 1);
        } else if (e.keyCode === 38 && suggItemIndex > 0) {
            setSuggItemIndex(prevValue => prevValue - 1);
        } else if (e.keyCode === 13) {
            const value = document.getElementsByClassName(`sugg-item${suggItemIndex}`)[0].innerText
            console.log("Enter value ", value);
            // props.onChangeOfSearchInput(value, type);
            // props.onClickOfDropDownItem(suggItemIndex - 1, type, value);
        }
    }


    return (
        <div ref={ref} className={`card rounded bg-white border-white role-card-container`} style={{ left: "unset", height: "auto", minHeight: "5rem", maxHeight: "15rem" }}>
            <SearchBar
                onChangeOfSearchInput={props.onChangeOfSearchInput}
                type={props.type}
                handleSearcherInputKeyDown={handleSearcherInputKeyDown}
                setSuggItemIndex={setSuggItemIndex}
            />
            <ul>
                {props?.data?.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`sugg-item${index}`}
                            onClick={() => props.onClickOfDropDownItem(index, props.type, item.value)}
                        // onKeyPress={(e) => e.key === 'Enter' && props.onClickOfDropDownItem(index, props.type, item.value)}
                        >
                            {item.value}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


// const DropDownFilter = (props) => {
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     useEffect(() => {
//         document.addEventListener('mousedown', handleMouseDown);

//         return () => {
//             document.removeEventListener('mousedown', handleMouseDown);
//         }
//     }, [])

//     const handleMouseDown = (event) => {
//         let x = event.clientX; // event.offsetX
//         let y = event.clientY; // event.offsetY
//         // did not click on the search input or the suggestion list
//         if (showSuggestions && !checkXYInElement(x, y, 'searcher-suggs') && !checkXYInElement(x, y, 'role-card-container')) {
//             showSuggestions(false);
//         }
//     }

//     const checkXYInElement = (x, y, className) => {
//         let elem = document.getElementsByClassName(className);
//         if (elem.length == 0) {
//             return false;
//         }

//         let rect = { x: elem.offset().left, y: elem.offset().top, w: elem.outerWidth(), h: elem.outerHeight() };

//         if (x < rect.x || y < rect.y || x > (rect.x + rect.w) || y > (rect.y + rect.h)) {
//             return false;
//         }

//         return true;
//     }



//     let ref = useOnclickOutside(() => {
//         switch (props.type) {
//             case 'orgType':
//                 setShowDropDownForType(false);
//                 break;
//             case 'country':
//                 setShowDropDownForCountry(false);
//                 break;
//             case 'region':
//                 setShowDropDownForRegion(false);
//                 break;
//             case 'status':
//                 setShowDropDownForStatus(false);
//                 break;
//             case 'createdOn':
//                 setShowDropDownForCreatedOn(false);
//                 break;
//             case 'role':
//                 setShowDropDownForRole(false);
//                 break;
//             case 'accountStatus':
//                 setShowDropDownForAccountStatus(false);

//             default:
//                 console.log("default values")
//         }

//     })


//     const { setShowDropDownForType,
//         setShowDropDownForCountry,
//         setShowDropDownForRegion,
//         setShowDropDownForStatus,
//         setShowDropDownForCreatedOn,
//         setShowDropDownForAccountStatus,
//         setShowDropDownForRole
//     } = props


//     const handleSelectSuggestions = (event, type) => {
//         console.log("key down")
//         let li = document.getElementsByClassName('searcher-suggs-word selected');
//         console.log(li)
//         const list = document.getElementsByClassName('searcher-suggs-word');
//         // 40 => down, 38 => up
//         if (event.keyCode == 40 || event.keyCode == 38) {
//             event.preventDefault();
//             if (li.length == 0) {
//                 const element = document.getElementsByClassName('searcher-suggs-word')[0];
//                 element.classList.toggle('selected');
//             } else if (event.keyCode == 40) {
//                 for (const item of list) {
//                     item.classList.remove('selected');
//                 }
//                 li.nextElementSibling.classList.add('selected');
//             } else {
//                 for (const item of list) {
//                     item.classList.remove('selected');
//                 }
//                 list.previousElementSibling.classList.add('selected');
//             }
//         } else {
//             // 13 => enter
//             if (event.keyCode == 13) {
//                 event.preventDefault();

//                 if (li.length > 0) {
//                     const suggestValue = li.next();
//                     setShowSuggestions(false);
//                     onChangeOfSearchInput(suggestValue, type)
//                 } else {
//                     setShowSuggestions(false);
//                 }
//             }
//         }
//     }

//     // handle user click on the list of the suggestions
//     const handleClickSuggetionsKeywords = (event) => {
//         setShowSuggestions(false);
//         props.onClickOfDropDownItem(index, props.type, item.value)
//     }

//     // hover event on the suggestions list
//     const handleHoverSearcherSuggestions = (event) => {
//         document.getElementsByClassName('searcher-suggs-word selected')[0].classList.remove('selected');
//         document.getElementsByClassName('searcher-suggs-word:hover')[0].classList.add('selected');
//     }


//     const suggList = () => {
//         if (showSuggestions) {
//             return props.data?.map((item, index) => {
//                 return (<li key={index} className={"searcher-suggs-word"} onClick={(e) => handleClickSuggetionsKeywords(e, index, props.type, item.value)} onMouseOver={e => handleHoverSearcherSuggestions(e)}>{item.value}</li>);
//             })
//         } else {
//             return null
//         }
//     }

//     return (
//         <div ref={ref} className={`card rounded bg-white border-white role-card-container`} style={{ left: "unset", height: "auto", minHeight: "5rem", maxHeight: "15rem" }}>
//             <SearchBar
//                 onChangeOfSearchInput={props.onChangeOfSearchInput}
//                 type={props.type}
//                 setShowSuggestions={setShowSuggestions}
//                 showSuggestions={showSuggestions}
//                 handleSelectSuggestions={handleSelectSuggestions}
//             />
//             <ul className={'searcher-suggs'}>
//                 {/* {props?.data?.map((item, index) => {
//                     return (
//                         <li
//                             className={"searcher-suggs-word"}
//                             key={item.key}
//                             onClick={() => props.onClickOfDropDownItem(index, props.type, item.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && props.onClickOfDropDownItem(index, props.type, item.value)}
//                         >
//                             {item.value}
//                         </li>
//                     )
//                 })} */}
//                 {suggList()}
//             </ul>
//         </div>
//     )
// }


export default DropDownFilter;