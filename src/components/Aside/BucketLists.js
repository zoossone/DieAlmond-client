import React,{useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const ShowRandom = styled.div`
    max-width: 15rem;
    line-height: 1.8rem;
    padding: 2px;
    background-color: pink;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 10px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const BucketAdd = styled.button`
    margin-right: 20px;
    border-radius: 4px;
    background-color: white;
    border: outset 4px pink;
    color: pink;
    cursor: pointer;
    width: 15rem;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    
    &:hover {
        border: inset 4px white;
        color: white;
        background-color: pink;
    }
`

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
                    <div></div>
                    :
                    <div>
                        {showRandomList(userInfo.list.filter(e => e.isChecked === false).map(e => <ShowRandom key={e.id}>{e.bucketName}</ShowRandom>))}
                    </div>
                }
            <BucketAdd onClick={onClick}>버킷리스트 추가</BucketAdd>
        </div>
    );
};

export default BucketLists;