import React,{useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';

const BucketLists = ({userInfo}) => {
    // Dummy Data
    // axios get 요청 (완료되지 않은 버킷리스트만 요청)
    const history = useHistory();
    // const [myLists, setMyLists] = useState(['세계 여행',  '경제적 자유', '제주도 게스트 하우스', '테슬라X', '사이버 트럭', '스타트업', '농부', '바다 낚시', '바다 수영', '프리다이빙', '제주도에서 한달 동안 서핑']);

    // // let lists = userInfo.list
    // // lists = lists.filter(e => e.isChecked === false).map(e => <li key={e.id}>{e.bucketName}</li>)
    // // ['세계 여행',  '경제적 자유', '제주도 게스트 하우스', '테슬라X', '사이버 트럭', '스타트업', '농부', '바다 낚시', '바다 수영', '프리다이빙', '제주도에서 한달 동안 서핑']

    // const random = () => {
    //     let randomLists = [];
    //     let num = 0;

    //     const sameGoal = (index) => {
    //         return randomLists.find(randomList => randomList === myLists[index]);
    //     } 

    //     while(num < 5) {
    //         let index = Math.floor(Math.random() * myLists.length);
    //         // 중복 제거
    //         if(!sameGoal(index)) {
    //             randomLists.push(myLists[index]);
    //             num++;
    //         }
    //     }
    //     return randomLists;
    // }

    // // map : 랜덤 배열
    // const randomBucketLists = random().map((goal, index) => <li key={index}>{goal}</li>);
    

    const onClick = () => {
        if(userInfo.email){
            history.push('/bucket')
        } else if (window.confirm('로그인하실래요?')){
            history.push('/')
        }
    }

    return (
        <div>
            {userInfo.list === undefined || userInfo.list.length === 0 ? 
            <button onClick={onClick}>버킷리스트 가기</button>
            :
            <ul>
                {userInfo.list.filter(e => e.isChecked === false).map(e => <li key={e.id}>{e.bucketName}</li>)}
            </ul>}
            
        </div>
    );
};

export default BucketLists;