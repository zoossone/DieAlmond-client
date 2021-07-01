import React, { useState } from 'react';

const Input = () => {

    const [nickname, setNickname] = useState();

    const onChange = (e) => {
        setNickname(e.target.value);
    };

    return (
        <>
        <input type='text' placeholder='닉네임 입력' onChange={onChange} value={nickname}></input>
        </>
    );
};

export default Input;