import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';


const AllList = styled.div`
    font-size: medium;
    margin: 25px;
    max-width: 100%;
    justify-content: center;
    height: 75px;
    font-size: 1.3em;
    padding: 8px;
    border-radius: 15px;
    cursor: pointer;
    background: #BF78E4;
    color: white;

    :hover {
        color: #BF78E4;
        transform: scale(1.05);
        transition: all 0.8s ease-out;
        background: white;
    }

    @media only screen and (max-width: 600px) {
            width: 350px;
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
        <section>
            {allList.map((li) => {
                return (
                    <AllList key={li.id} id={li.id} onClick={handleLike}>
                        {li.content}
                        <br />
                        <br />
                        {li.like.map(el => el.id).includes(userInfo.nickname) ?
                            '??????' :
                            '????'}

                        {li.like[1] ?
                            `${li.like[0].id}??? ??? ${li.like.length - 1}?????? ???????????????.` :
                            `${li.like[0] ?
                                ` ${li.like[0].id}?????? ???????????????.` : ' ???????????? ?????? ?????????'}`
                        }

                    </AllList>
                )
            })}
        </section>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}


export default connect(mapStateToProps)(AllBucketList);

