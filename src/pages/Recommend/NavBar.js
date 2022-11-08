import React,{useState} from "react";

const NavBar = ({setAlcohol}) => {    
    const [isOpen, setIsOpen] = useState(false);

    const handleArrowClick = (i) => {
        if (isOpen === i) return setIsOpen(false)
        setIsOpen(i)
    }

    const data = [
        {id:1 , titleKR: "와인", titleENG: "wine"},
        {id:2 , titleKR: "위스키", titleENG: "whiskey"},
        {id:3 , titleKR: "칵테일", titleENG: "cocktail"},
    ]

    return(
            <div className="accordion">
                {data.map((item, i) => (
                    <div className="item" key={item.id}>
                        <div className="item-box"  onClick={() => {
                            setAlcohol(item.titleENG);
                            handleArrowClick(i);
                        }}>
                            <div className="title-kr">{item.titleKR}</div>
                            <span className="title-eng">{item.titleENG}</span>
                        </div>
                    </div>
                ))}          
            </div>
    );
};

export default NavBar;