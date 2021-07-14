// [React Hooks] 
// useState : Manage State)
// useEffect : component needs to do something after render
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const ReverseTimer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// const WiseBiggerSmaller = keyframes`
// from {
//     width: 20px;
//     height: 20px;
// }
// to {
//     width: 200px;
//     height: 200px;
// }
// `;

// const Wiseman = styled.div`
//        margin: 30px auto;
//        width: 20px;
//        height: 20px;
//        background-color: orange;
//        animation-name: ${WiseBiggerSmaller};
//        animation-duration: 1.5s;
//        animation-timing-function: linear;
//        animation-delay: 2s;
//        animation-iteration-count: 2;
//        animation-direction: alternate;
//        animation-fill-mode: none;
//        animation-play-state: running;
// `;

const Wisemans = styled.div`
    font-size: 50px;
`;

const CountDown = ({ userInfo }) => {
    let { sleep, smoking, alcohol, restLife } = userInfo

    if (smoking > 21) {
        restLife = restLife - 10;
    } else if (10 < smoking && smoking < 21) {
        restLife = restLife - 5;
    } else if (0 < smoking && smoking < 11) {
        restLife = restLife - 2.5;
    }

    // 4-2. 술 : 1번 당 3년 단축
    if (alcohol === 7) {
        restLife = restLife - 20
    } else {
        restLife = restLife - (alcohol * 3)
    }

    // 4-3. 수면 : 12~10 / 9~7 / 6~4
    if (sleep > 9) {
        restLife = restLife - 5
    } else if (sleep < 7) {
        restLife = restLife - 5
    }
    // console.log(restLife);
    // 상세한 데이터 
    // rest life = 50
    // 02 2021 16:21:52

    const now = new Date();
    let dead = {
        days: Math.round(restLife * 365) - 1,
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds(),
        milliseconds: 99
    }

    const { days, hours, minutes, seconds, milliseconds } = dead

    const [[day, hrs, mins, secs, mss], setTime] = useState([days, hours, minutes, seconds, milliseconds]);
    // console.log(days, hours, minutes, seconds, milliseconds)
    // console.log(day, hrs, mins, secs, mss)
    // change State
    const tick = () => {
        // Time Over
        if (days === 0 && hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            alert('끝')
        }
        else if (hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            setTime([days - 1, 23, 59, 59, 99]);
        }
        else if (mins === 0 && secs === 0 && mss === 0) {
            setTime([days, hrs - 1, 59, 59, 99]);
        } else if (secs === 0 && mss === 0) {
            setTime([days, hrs, mins - 1, 59, 99]);
        } else if (mss === 0) {
            setTime([days, hrs, mins, secs - 1, 99]);
        } else {
            setTime([days, hrs, mins, secs, mss - 1]);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => tick(), 10);
        return () => clearInterval(timer);
    });

    // console.log(day, hrs, mins, secs, mss);
    // padaytart : 스트링.padaytart(스트링의 길이, 채울 스트링)
    return (
        <ReverseTimer>
            <Wisemans>
                {
                    `${day.toString()}일..`
                }
            </Wisemans>
            <h1>
                {
                    `
                    ${hrs.toString().padStart(2, '0')} :
                    ${mins.toString().padStart(2, '0')} :
                    ${secs.toString().padStart(2, '0')} :
                    ${mss.toString().padStart(2, '0')} 
                    `
                }
            </h1>
        </ReverseTimer>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         userInfo : state
//     }
// }

export default CountDown;