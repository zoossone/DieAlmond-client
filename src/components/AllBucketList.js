import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components';

const AllList = styled.div`
    font-size: medium;
    margin: 25px;
    width: 500px;
    height: 75px;
    font-size: 1.3em;
    padding: 8px;
    border-radius: 15px;
    cursor: pointer;
    background: pink;
    color: white;
    border: 2.5px solid pink;

    :hover {
        color: pink;
        transform: scale(1.05);
        transition: all 0.8s ease-out;
        background: white;
    }
`;


const AllBucketList = ({ render, userInfo }) => {
    const [allList, setAllList] = useState([]);
    const [likes, setLikes] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:80/bucket/all', {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        })
            .then(res => {
                console.log(res)
                setAllList([...res.data.bucketList]);
            })
            .catch(e => e);
    }, [likes, render])

    const handleLike = (e) => {
        axios.patch('http://localhost:80/bucket/like', {
            bucketid: e.target.id
        }, {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true,
        })
            .then(res => {
                setLikes(!likes)
            })
            .catch(e => e);
    }

    return (
        <div>
            {allList.map((li) => {
                return (
                    <AllList key={li.id} id={li.id} onClick={handleLike}>
                        {li.content}
                        <br />
                        <br />
                        {li.like.map(el => el.id).includes(userInfo.nickname) ?
                            '❤️' :
                            '🤍'}

                        {li.like[1] ?
                            `${li.like[0].id}님 외 ${li.like.length - 1}명이 좋아합니다.` :
                            `${li.like[0] ?
                                `${li.like[0].id}님이 좋아합니다.` : '관심 좀 주십쇼'}`
                        }

                    </AllList>
                )
            })}
        </div>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}


export default connect(mapStateToProps)(AllBucketList);

