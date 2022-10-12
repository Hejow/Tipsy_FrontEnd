import React from "react";
import './Footer.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const Menus = [
        {id: 1, title: "고객센터", contents: ["gmlwh124@naver.com"]},
        {id: 2, title: "문의", contents : ["공지사항", "FAQ", "1:1문의"]},
        {id: 3, title: "혜택", contents : ["멤버쉽", "온라인 판매"]},
        {id: 4, title: "우리의 가치관", contents: ["Find Your Type", "Try Something NEW"]}
    ];

    const tags = [
        '주소 : 경기도 김포한강 1로 9, 905동 1001호',
        '사업자등록번호 : 777-22-44444',
        '상호 : 취향저격이쥬?',
        '사업자정보확인',
        '대표 : 문희조',
        '고객 문의 이메일 : gmlwh124@naver.com',
        '고객 센터 : 010-4038-0540',
        '통신판매업신고번호 : 제2022-경기화성-0540호',
        '개인정보취급방침 및 이용약관',
        '개인정보관리책임자: 문희조'
    ];

    return (
        <div className="footer-area">
            <div className="footer-content-area">
                <div className="footer-main-area">
                    <div className="footer-logo-area">
                        <img className="footer-logo pointer"
                            src="img/Tipsy_Logo.png"
                            alt="Logo"
                            />
                    </div>
                    <div className="footer-help-area">
                        {Menus.map(menu => (
                            <div key={menu.id} className="footer-help-box">
                                <div key={menu.title} className="footer-help-title">{menu.title}</div>
                                <ul>
                                    {menu.contents.map(content=> (
                                        <li key={content} className="footer-help-content pointer">{content}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-icon-box">
                    <span className="pointer"><FontAwesomeIcon icon={faInstagram} /></span> 
                    <span className="pointer"><FontAwesomeIcon icon={faFacebookF} /></span> 
                    <span className="pointer"><FontAwesomeIcon icon={faPencil} /></span> 
                </div>
                <div className="footer-goal">Try Something New!!</div>
                <div className="footer-txt">주식회사 희조컴퍼니</div>
                <div className="footer-tag-area">
                    <div className="footer-tags">
                        {tags.map(tag => (
                            <p key={tag.toString()}>{tag}</p>
                        ))}
                    </div>
                </div>
                <div className="footer-txt">CopyRight 2022. 희조컴퍼니 Co. all rights reserved.</div>
            </div>
        </div>
    )
};

export default Footer;