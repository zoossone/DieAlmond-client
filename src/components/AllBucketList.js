import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AllList = styled.li`
    font-size: medium;
`;

const AllBucketList = ({render,userInfo}) => {

    const [allList, setAllList] = useState([]);
    const [likes, setLikes] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:80/bucket/all', {
        headers: {
            "sns":"google",
            "Content-Type": "application/json",
            "authorization": `Bearer ${userInfo.google}`
        },
        withCredentials: true
    })
        .then(res => {
            setAllList([...res.data.bucketList]);
        })
        .catch(e => e);
    }, [likes, render])

    const handleLike = (e) => {
        axios.patch('http://localhost:80/bucket/like',{
            bucketid: e.target.id
        }, {
            headers: {
                "sns":"google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true,
        })
            .then(res => {
                console.log(res)
                setLikes(!likes)
            })
            .catch(e => e);
    }

    return (
        <ul>
            {allList.map((li) => {
                return (
                    <AllList key={li.id} id={li.id} onClick={handleLike}>
                        {li.content} 
                        {li.like.length} 
                                             
                    </AllList>
                )
            })}

        </ul>
    );
};

function mapStateToProps(state) {
    return {userInfo : state}
}


export default connect(mapStateToProps)(AllBucketList);

