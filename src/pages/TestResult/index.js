import React from "react";
import "./TestResult.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


const TestResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const Alcohols = {
        soju: {
            img:'img/Tipsy_test_result_soju.jpg',
            name: '소주',
            color: '#51cf66',
            ment: '대한민국의 대표적인 술!',
            comments: ['우리나라에서 가장 저렴한 술 중 하나로 대중적으로 가장 사랑받는 술입니다.', '소주는 전통적으로 쌀을 증류해 만든 증류식 소주와 첨가물을 추가해서 만든 희석식 소주가 있습니다.']
        },
        beer: {
            img:'img/Tipsy_test_result_beer.jpg',
            name: '맥주',
            color: '#fcc419',
            ment: '세계적으로 가장 대중화된 술!',
            comments: ['맥주는 보리를 가공한 맥아를 발효시키고 이를 주재료로 향신료인 홉을 첨가하여 맛을 낸 술입니다.', '맥주는 알코올 성분이 적은 편이나 이산화 탄소와 홉의 쓴맛 성분을 함유하고 있어 소화를 촉진하고 이뇨작용을 돕는 효능이 있습니다.']
        },
        wine: {
            img:'img/Tipsy_test_result_wine.jpg',
            name: '와인',
            color: '#b21848',
            ment: '술중에서 과일주라고 하면 제일 먼저 떠오르는 술!',
            comments: ['와인은 포도를 으깨서 나온 즙을 발효시킨 술을 말합니다.', '특별한 날이나 분위기 좋은 곳에서 마시기 좋은 술이기도 합니다.']
        },
        wiskey: {
            img:'img/Tipsy_test_result_whiskey.jpg',
            name: '위스키',
            color: '#495057',
            ment: '대표적인 증류주로서 양주의 대명사!',
            comments: ['위스키는 보리를 발효시켜 만든 보리술을 증류하여 몇 년간 숙성시킨 술입니다.', '전체적으로 기본적인 가격대가 비싸며 칼로리가 낮아 다이어트 중에 먹기 좋습니다.']
        },
        cocktail: {
            img:'img/Tipsy_test_result_cocktail.jpg',
            name: '칵테일',
            color: '#66d9e8',
            ment: '술과 여러 종류의 음료, 첨가물 등을 섞어 만든 혼합주!',
            comments: ['사람의 기호와 취향에 맞추어 독특한 맛과 빛깔을 낼 수 있는 술입니다.', '칵테일을 자주 마시는데 가격이 조금 부담스럽다면 재료들을 구매해서 집에서 만들어 마셔 보세요. ']
        }
    }

    return (
        <div className="testresult-area">
            <div className="testresult-contents">
                <h2 className="testresult-main-ment">나의 알코올 취향은?</h2>
                <div className="testresult-mytype"
                    style={{color:Alcohols[state].color}}    >
                    {Alcohols[state].name}
                </div>
                <div className="testresult-img-area">
                    <div className="testresult-img"><img className="testresult-img-box" src={Alcohols[state].img} alt=""></img></div>
                </div>
                <div className="testresult-ment">{Alcohols[state].ment}</div>
                <div className="testresult-comment-area">
                        {Alcohols[state].comments.map(comment => (
                            <p className="testresult-comment" key={comment.toString()}>{comment}</p>
                        ))}
                </div>
                <div className="testresult-btn-area">
                    <button className="testresult-btn pointer" onClick={() => navigate('/testguide')}>다시하기</button>
                    <button className="testresult-btn pointer" onClick={() => navigate('/')}>돌아가기</button>
                </div>
            </div>
        </div>
    )
}

export default TestResult;