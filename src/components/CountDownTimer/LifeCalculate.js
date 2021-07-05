import React, {useState} from 'react';
import axios from 'axios';
import CountDown from './CountDown';

const LifeCalculate = () => {
    // 계산 식 필요
    // - 데이터 어떻게 받아올건지
    // - 파라미터로 계산 식
    // now Date()
     
    // 1. Redux에서 데이터 객체 가져오기
    // Dummy Data
    let userInfo = { year : 1999, month: 2, day: 17, gender : 'male', sleep : 8, smoking : 10, alcohol : 2}
    let { year, month, day, gender, sleep, smoking, alcohol  } = userInfo

    // 2. 만 나이 계산
    let today = new Date();
    let birthDate = new Date(year, month, day);

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    
    // 3. 만 나이, 성별 보내면서 기대 여명 요청 : API 생성 필요?
    // axios
    //     .post('http://localhost:4000/main', {
    //         gender: gender,
    //         age: age
    //     }, {withCredentials: true
    //     })
    //     .then((res) => {
            
    //     })
    //     .catch((err) => console.log(err))

    // 4. 받아온 기대 여명에서 파라미터(술, 담배, 수면 파라미터에 따라 수명 감소)
    let restLife = 49.8; // Dummy Data

    // 4-1. 흡연 : 0 / 1~10 / 11~20 / 21~ 
    if (smoking > 21) {
        restLife - 10;
    } else if (10 < smoking && smoking < 21) {
        restLife - 5;
    } else if (0 < smoking && smoking < 11) {
        restLife - 2.5;
    } 

    // 4-2. 술 : 1번 당 3년 단축
    if (alcohol === 7) {
        restLife - 20
    } else {
        restLife - (alcohol * 3)
    }

    // 4-3. 수면 : 12~10 / 9~7 / 6~4
    if (sleep > 9) {
        restLife - 5
    } else if (sleep < 7) {
        restLife -5
    }

    const deadLine = Math.round(restLife * 365)

    // {days: 18433, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}

    return (
        <div>
           <CountDown deadLine = {deadLine} />
        </div>
    );
};

export default LifeCalculate;