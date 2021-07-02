import React, { useState } from 'react';
import styled from 'styled-components';

const MyBucketList = (props) => {
    const [desc, setDesc] = useState('')

    const Flex = styled.div`
        display:flex;
        justify-content: space-between;
        border: 1px solid black;
        margin-top:5px;
    `;

    return (
        <Flex>
            <span>게시물 이름 : {props.description}</span>
            <span>작성자 : </span>
            <button>리스트 삭제</button>
        </Flex>
    );
};

export default MyBucketList;