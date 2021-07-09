import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MyBucketList = (props) => {
    const [propsId, setPropsId] = useState(props)
    const [isDone, setIsDone] = useState(props.isChecked)

    const Flex = styled.span`
        display:flex;
        justify-content: space-between;
        border: 1px solid black;
        margin-top:5px;
        // margin-right: 40px;
        width: 100%;
        align-items: center;

    `;

    const LineToText = styled.div`
        display:flex;
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

    if(propsId.id === 0) {
        return null
    }

    return (
        <Flex>
            {/* checked로 설정하면 안에 뭔값이 들어가든 체크가 유지된다. 눌렀을때 */}
            {/* <input type="checkbox" checked={isDone} onChange={toggleCheckBox} /> */}
            <LineToText>
            <input type="checkbox" checked={isDone} onChange={toggleCheckBox} />
                {props.description}</LineToText>
            {/* <span>아이디 : {props.id}</span> */}
            <button onClick={DeleteBucketList}>리스트 삭제</button>
        </Flex>
    );
};

export default MyBucketList;