import React from 'react';
import axios from 'axios';

const BucketLists = () => {
    // Dummy Data
    // axios get 요청 (완료되지 않은 버킷리스트만 요청)
    
    axios
        .get('http://localhost:4000/bucket/cheked', {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
        })
        .then(res => {
            const myLists = res.data;
        })
    
    // Dummy Data
    const myLists = ['세계 여행',  '경제적 자유', '제주도 게스트 하우스', '테슬라X', '사이버 트럭', '스타트업', '농부', '바다 낚시', '바다 수영', '프리다이빙', '제주도에서 한달 동안 서핑']

    const random = () => {
        let randomLists = [];
        let num = 0;

        const sameGoal = (index) => {
            return randomLists.find(randomList => randomList === myLists[index]);
        } 

        while(num < 5) {
            let index = Math.floor(Math.random() * myLists.length);
            // 중복 제거
            if(!sameGoal(index)) {
                randomLists.push(myLists[index]);
                num++;
            }
        }
        return randomLists;
    }

    // map : 랜덤 배열
    const randomBucketLists = random().map((goal, index) => <li key={index}>{goal}</li>);

    return (
        <div>
            <ul>
                {randomBucketLists}
            </ul>
        </div>
    );
};

export default BucketLists;