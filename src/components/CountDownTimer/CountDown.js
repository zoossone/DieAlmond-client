// [React Hooks] 
// useState : Manage State)
// useEffect : component needs to do something after render
import React, {useState, useEffect} from 'react'
import { useRouteMatch } from 'react-router';

const CountDown = ({userInfo}) => {
    // 1. Redux에서 데이터 객체 가져오기
    // Dummy Data
    // let userInfo = { year : 1990, month: 2, day: 17, gender : 'male', sleep : 8, smoking : 10, alcohol : 2}
    let { year, month, day, gender, sleep, smoking, alcohol  } = userInfo

    // 2. 만 나이 계산
    let today = new Date();
    let birthDate = new Date(year, month, day);

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    } 
    
    // 3. 만 나이, 성별 보내면서 기대 여명 요청 : API 생성 필요?
    // axios
    //     .post('http://localhost:4000/setting', {
    //         gender: gender,
    //         age: age
    //     }, {withCredentials: true
    //     })
    //     .then((res) => {
    //          setRestLife(res.life)
    //          스토어에 보내주기
    //     })
    //     .catch((err) => console.log(err))

    // 4. 받아온 기대 여명에서 파라미터(술, 담배, 수면 파라미터에 따라 수명 감소)

    let restLife = 50.5;

    // 4-1. 흡연 : 0 / 1~10 / 11~20 / 21~ 

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

    // 상세한 데이터 
    // rest life = 50
    // 02 2021 16:21:52
    const now = new Date();
    let dead = {
        days:  Math.round(restLife * 365) - 1, 
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(), 
        seconds: 59 - now.getSeconds(), 
        milliseconds: 99
    }

    const { days, hours, minutes, seconds, milliseconds} = dead

    const [[ds, hrs, mins, secs, mss], setTime] = useState([days, hours, minutes, seconds, milliseconds]);

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