import React, { useState } from 'react';
import axios from 'axios';

const AllBucketList = () => {

    const [allList, setAllList] = useState(["집에 가고싶다 - 나나", "파궁사 우승 기원합니다 - LAC팬", "귀엽고 귀여운 조카들 - 삼촌"]);
    const [likes, setLikes] = useState(false);

    axios.get('http://localhost:4000/bucket/all', {
        headers: {
            "Content-Type": "application/json",
            "Authentication": "@@@@@@token"
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res.bucketList);
            setAllList(res.bucketList);
        })
        .catch(e => e);

    const handleLike = (e) => {
        setLikes(!likes)
        axios.patch('http://localhost:4000/bucket/like', {
            headers: {
                "Content-Type": "application/json",
                "Authentication": "@@@@@@token"
            },
            withCredentials: true,
            id: e.target.id //어떻게 넣어줄것인가 아이디?
        })
            .then(res => {
                // setLikes(!likes)
            })
            .catch(e => e);
    }

    console.log(likes)

    return (
        <ul>
            {allList.map((li) => {
                return (
                    <li key={li.id}>
                        {li}
                        <button onClick={handleLike}>like</button>
                    </li>
                )
            })}

        </ul>
    );
};

export default AllBucketList;