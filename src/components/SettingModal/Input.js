import React, { useState } from 'react';

const Input = () => {

    const [text, setText] = useState();

    const onChange = (e) => {
        setText(e.target.value);
    };

    return (
        <input type='text' placeholder='닉네임 입력' onChange={onChange} value={text}></input>
    );
};

export default Input;