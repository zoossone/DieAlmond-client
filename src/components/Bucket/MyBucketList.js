import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MyBucketList = (props) => {
    const [propsId, setPropsId] = useState(props)
    const [isDone, setIsDone] = useState(props.isChecked)

    const Flex = styled.span`
        display:flex;
        align-items: center;
        height: 40px;
        width: 200px;
        margin: 7px;
        border: 1px solid black;
        justify-content: space-between;

    `;

    const LineToText = styled.div`
        display:flex;
        height:30px;
        margin: 5px;
        align-items: center;
        justify-content: space-between;
        text-decoration: ${isDone === true ? 'line-through' : 'none'}
    `;

    const DeleteBucketList = () => {
        if (window.confirm("인생은 짧습니다.")) {
        axios.delete(`http://localhost:80/bucket`,{
            
                headers: {
                    "sns":"google",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${props.userInfo.google}`
                },
                withCredentials: true,
                
        data: {id: props.id}
        }).then(res => {
            setPropsId({id:0})
            props.renderDelete()
        })
        .catch(e => alert("fucking..."))
    }}

    const toggleCheckBox = () => {
        axios.patch(`http://localhost:80/bucket/check`, {
            id: props.id,
            isChecked: !isDone
            // 백으로 보내줄때 id값도 보내주기?? 아이디랑 ischecked
        },{
            headers: {
                "sns":"google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${props.userInfo.google}`
            },
            withCredentials: true,
        }).then(res => {
            setIsDone(!isDone)
            
        })
    }

    return (
        <Flex>
            <LineToText>
            <input type="checkbox" checked={isDone} onChange={toggleCheckBox} />
                {props.description}</LineToText>
            <button onClick={DeleteBucketList}>리스트 삭제</button>
        </Flex>
    );
};

export default MyBucketList;