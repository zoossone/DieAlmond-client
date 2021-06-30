// [React Hooks] 
// useState : Manage State)
// useEffect : component needs to do something after render
import React, {useState, useEffect} from 'react'
// CountDown Component
// parameter : deadLine
// deadLine data type : obj 
// { hours : hours value,  minutes : minutes value,  seconds : seconds value }
// need more : days & miliSeconds

const CountDown = ({deadLine}) => {
    // variable assignment
    // const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 99 } = deadLine;
    // set State

    // 초기 데이터 필요
    const [[ds, hrs, mins, secs, mss], setTime] = useState([0, 0, 1, 1, 99]);

    // change State
    const tick = () => {
        // Time Over
         if (ds === 0 && hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            alert('끝')
        }
        else if ( hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            setTime([ds - 1, 23, 59, 59, 99]);
        }
        else if (mins === 0 && secs === 0 && mss === 0) {
            setTime([ds, hrs - 1, 59, 59, 99]);
        } else if (secs === 0 && mss === 0) {
            setTime([ds, hrs, mins - 1, 59, 99]);
        } else if (mss === 0) {
            setTime([ds, hrs, mins, secs - 1, 99]);
        } else {
            setTime([ds, hrs, mins, secs, mss - 1]);
        }
    };
   
    useEffect(() => {
        const timer = setInterval(() => tick(), 10);
        return () => clearInterval(timer);
    });
    
    // padStart : 스트링.padStart(스트링의 길이, 채울 스트링)
    return (
        <div>
            <h1>
                { 
                  `${ds.toString()}일`
                }
            </h1>
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
        </div>
    );
}

export default CountDown;