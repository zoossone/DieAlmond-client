import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MyBucketList = (props) => {
    const [propsId, setPropsId] = useState(props)
    const [isDone, setIsDone] = useState(props.isChecked)

    const Flex = styled.span`
        display:flex;
        align-items: center;
        background-color: #31326f;
        height: 40px;
        width: 300px;
        margin: 7px;
        justify-content: space-between;
        border-radius: 4px;

        @media only screen and (max-width: 473px) {
            transform: translateY(15px);
            margin-top: -23px;            
            border: 1px solid white;
            transition: all 0.5s ease-in;

            :hover {
                transform: translateY(0px)
            }
        }
    `;

    const LineToText = styled.div`
        display:flex;
        height:30px;
        margin: 5px;
        color: white;
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
            <button onClick={DeleteBucketList}>Del</button>
        </Flex>
    );
};

export default MyBucketList;