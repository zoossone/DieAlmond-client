import React, {useState} from 'react';
import styled from 'styled-components';
import EasterEgg from '../EasterEgg/EasterEgg'

const Almond = ({userInfo}) => {

    const handleEasterEgg = () => {
        setStart(!start)
    }
   
    // Dummy Data. 라이프 퍼센티지 데이터 필요
    let {age, restLife} = userInfo

    const percentOfLife = (age, restLife) => {
        const total = age + restLife;
        return age/total*100
    }

    const per = percentOfLife(age, restLife);

    const Img = styled.img`
        display: flex;
        flex-direction: column;
        position: fixed;
        max-width: 50px;
        height : auto;
        margin : 0px;
        padding: 0px;
        position: relative;
        /* 변수로 지정 필요 수명 퍼센티지 - 3 */
        left: ${per - 3}%;
        cursor: pointer;
    `;

    // Dummy Data
    // const userInfo = {
    //     sleep : 8,
    //     smoking : 0,
    //     alcohol: 0
    // }

    // 흡연 x 음주 x 수면
    if(userInfo.smoking > 0 && userInfo.alcohol > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_smoking_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 흡연 x 음주 
    if(userInfo.smoking > 0 && userInfo.alcohol > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_alcohol_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 흡연 x 수면
    if(userInfo.smoking > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 음주 x 수면
    if(userInfo.alcohol > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }


    // 흡연
    if(userInfo.smoking > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 음주
    if(userInfo.alcohol > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 수면
    if(userInfo.sleep > 9 || userInfo.sleep < 7) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 정상
    return (
        <div>
            <Img onClick={handleEasterEgg} src={require("../../img/almond.gif").default}/>
            {start === false ? null : <EasterEgg />}
        </div>
    );
};

export default Almond;