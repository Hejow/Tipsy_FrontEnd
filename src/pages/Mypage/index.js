import React from "react";
import { useNavigate } from "react-router-dom";
import './Mypage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Mypage = () => {
    const navigate = useNavigate()

    return (
        <div className="mypage-area">
            <div className="mypage-nav-area">
                <div className="mypage-gnb-area">
                    <h1 className="mypage-gnb pointer" onClick={()=>navigate('/mypage')}>마이 페이지</h1>
                </div>
                <div className="mypage-profile-area">
                    <div className="mypage-img-area">
                        <img className="mypage-img" src='img/default_user_img.png' alt="user_img" />
                        <span className="mypage-img-edit pointer">
                            <FontAwesomeIcon className="mypage-icon" icon={faPencil} />
                        </span>
                    </div>
                    <div className="mypage-user">
                        <p className="mypage-userid">test</p>
                        <p className="mypage-useremail">test_email@gmail.com</p>
                    </div>
                </div>
                <div className="mypage-divider-area">
                    <div className="mypage-divider"></div>
                </div>
                <ul className="mypage-left-menu">
                    <li className="pointer">정보 수정</li>
                    <li className="pointer">이런 메뉴</li>
                    <li className="pointer">저런 메뉴</li>
                </ul>
                <div className="mypage-divider-area">
                    <div className="mypage-divider"></div>
                </div>
                <ul className="mypage-left-menu">
                    <li className="pointer" onClick={() => navigate('/')}>공지사항</li>
                    <li className="pointer" onClick={() => navigate('/')}>FAQ</li>
                </ul>
            </div>
            <div className="mypage-info-area">
                <div className="mypage-info">
                    <div className="mypage-user-info">
                        dis is user info
                    </div>
                </div>
                <div className="mypage-untitle-menu">
                    <h2 className="mypage-servie-title">서비스 타이틀</h2>
                    <div className="mypage-untitle">
                        no service
                    </div>
                </div>
                <div className="mypage-untitle-menu">
                    <h2 className="mypage-servie-title">서비스 타이틀</h2>
                    <div className="mypage-untitle">
                        no service
                    </div>
                </div>
                <div className="mypage-withdraw-area">
                    <p className="mypage-user-withdraw pointer">회원 탈퇴</p>
                </div>
            </div>
        </div>
    )
};

export default Mypage;