import React, { useState } from 'react';
import MyBucketList from '../components/MyBucketList';

const MyBucketListPage = () => {
    const [desc, setDesc] = useState('')
    const [lists, setLists] = useState([])

    const addBucketBtn = () => {
        //axios 추가 예정
        setLists([...lists, desc])
        setDesc('')
        document.querySelector('input').value = ''
    }

    return (
        <div>
            <input onChange={(e) => setDesc(e.target.value)}/>
            <button onClick={addBucketBtn}>버킷추가버튼</button>
            <ul>{lists.map((list, i) => <MyBucketList key={i} description={list}/>)}</ul>
        </div>
    );
};

export default MyBucketListPage;