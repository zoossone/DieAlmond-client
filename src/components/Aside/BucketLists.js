import React,{useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const ShowRandom = styled.div`
    line-height: 1.8rem;
`;

const BucketLists = ({userInfo}) => {
    const history = useHistory();

    const showRandomList = (arr) => {
        let result = []
        let index = 0
        let copyArr = arr
        for(let i=0; i<6; i++) {
            index = Math.floor(Math.random()*copyArr.length)
            result.push(copyArr[index])
            copyArr.splice(index, index+1)
        }
        return result;
    }

    const onClick = () => {
        if(userInfo.email){
            history.push('/bucket')
        } else if (window.confirm('로그인하실래요?')){
            history.push('/')
        }
    }

    return (
        <div>
            <br/>
            {userInfo.list === undefined || userInfo.list.length === 0 ? 
            <button onClick={onClick}>버킷리스트 가기</button>
            :
            <div>
                {showRandomList(userInfo.list.filter(e => e.isChecked === false).map(e => <ShowRandom key={e.id}>{e.bucketName}</ShowRandom>))}
            </div>}
        </div>
    );
};

export default BucketLists;