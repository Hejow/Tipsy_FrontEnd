import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";



const NavBar = (props) => {    
    const [isOpen, setIsOpen] = useState(false);

    const handleArrowClick = (i) => {
        if (isOpen === i){
            return setIsOpen(false)
        }

        setIsOpen(i)
        }

    const data = [
        {id:1 , titleKR: "와인", titleENG: "Wine", content:["메뉴1", "메뉴2", "메뉴3", "메뉴4"]},
        {id:2 , titleKR: "위스키", titleENG: "Whiskey", content:["메뉴1", "메뉴2", "메뉴3", "메뉴4"]},
        {id:3 , titleKR: "칵테일", titleENG: "Cocktail", content:["메뉴1", "메뉴2", "메뉴3", "메뉴4"]},
    ]

    return(
            <div className="accordion">
                {data.map((item, i) => (
                    <div className="item" key={item.id}>
                        <div className="item-box"  onClick={() => handleArrowClick(i)}>
                            <div className="title-kr">{item.titleKR}</div>
                            <span className="title-eng">{item.titleENG}</span>
                            <FontAwesomeIcon className="arrow-down" icon={faAngleDown}/>
                        </div>
                        <ul className={isOpen === i ? 'content show' : 'content'}>{item.content.map(content => (<li key={content}>{content}</li>
                    ))}</ul>
                    </div>
                ))}          
            </div>
    );
};

export default NavBar;