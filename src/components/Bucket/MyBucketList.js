import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MyBucketList = (props) => {
    const [propsId, setPropsId] = useState(props)
    const [isDone, setIsDone] = useState(props.isChecked)

    const Flex = styled.div`
        display:flex;
        justify-content: space-between;
        border: 1px solid black;
        margin-top:5px;
    `;

    const LineToText = styled.div`
        text-decoration: ${isDone === true ? 'line-through' : 'none'}
    `;

    const DeleteBucketList = () => {
        if (window.confirm("인생은 짧습니다.")) {
        axios.delete(`http://localhost:3001/add/${props.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            // data:{
            //     id: props.id
            // }
        }).then(res => {
            setPropsId({id:0})
        })
        .catch(e => alert("fucking..."))
    }}

    const toggleCheckBox = () => {
        axios.patch(`http://localhost:3001/add/${props.id}`, {
            isChecked: !isDone
            // 백으로 보내줄때 id값도 보내주기?? 아이디랑 ischecked
        },{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }).then(res => {
            setIsDone(!isDone)
        })
    }

    if(propsId.id === 0) {
        return null
    }

    return (
        <Flex>
            {/* checked로 설정하면 안에 뭔값이 들어가든 체크가 유지된다. 눌렀을때 */}
            <input type="checkbox" checked={isDone} onChange={toggleCheckBox} />
            <LineToText>게시물 이름 : {props.description}</LineToText>
            <span>아이디 : {props.id}</span>
            <button onClick={DeleteBucketList}>리스트 삭제</button>
        </Flex>
    );
};

export default MyBucketList;