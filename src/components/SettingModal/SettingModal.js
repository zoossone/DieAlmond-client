import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar'
import SleepSlider from './SleepSlider';
import SmokingSlider from './SmokingSlider'
import AlcoholSlider from './AlcoholSlider'

import Input from './Input';

const SettingModal =  () => {
    const Modalcontainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #00000080;
        z-index: 10000;
    `

    const Modal = styled.span`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        width: 350px;
        height: 500px;
        background: white;
        z-index: 10000;
        border-radius: 5px;
    `

    const [info, setInfo] = useState({
        nickname: '',
        gender: '',
        sleep: 0,
        smoke: 0,
        alcohol: 0,
        list: []
    });

    const {nickname, gender, sleep, smoke, alcohol} = info;

    const onSubmit = (e) => {
        e.preventdefault();
        setInfo({
            nickname: nickname
        })
    };

    // const onChange = (e) => {
    //     const {name, value} = e.target;

    //     setInfo({...info, [name]: value});
    // };

    return (
        <div>
            <Modalcontainer>
                <Modal>
                    <form onSubmit={onSubmit}>
                        {/* input text */}
                        <div>닉네임 입력</div>
                        {/* <input type='text' name='nickname' placeholder='닉네임 입력' onChange={onChange} value={nickname}
                        setInfo={setInfo}></input> */}
                        <Input name='nickname' value={nickname}/>
                        <hr/>

                        {/* radio : gender */}
                        <div>성별 선택</div>
                        <input type='radio' id='male' name='gender' />
                        <label for="male" value='male'>남성</label>
                        <input type='radio' id='female' name='gender' />
                        <label for="female" value='female'>여성</label>
                        <hr/>

                        {/* DatePicker : Birth Day */}
                        <div>생년월일 입력</div>
                        {/* <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            dateFormat = "yyyy.MM.dd"
                            
                        /> */}
                        <Calendar />
                        
                        <hr/>
                        {/* Parameter : Sleep, Alchol, Smoking */}
                        <SleepSlider />
                        <SmokingSlider />
                        <AlcoholSlider />
                        <hr/>
                        <button type="submit">완료</button>
                    </form>
                </Modal>
            </Modalcontainer>
        </div>
    );
}

export default SettingModal;