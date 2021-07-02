import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar'
import SleepSlider from './SleepSlider';
import SmokingSlider from './SmokingSlider'
import AlcoholSlider from './AlcoholSlider'

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

const SettingModal =  () => {

    const [nickName, setNickName] = useState('');
    const [sex, setSex] = useState('');
    const [birth, setBirth] = useState('');
    const [sleep, setSleep] = useState('');
    const [smoking, setSmoking] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [info, setInfo] = useState({
        nickName: '',
        sex: '',
        birth: [],
        sleep: 0,
        smoking: 0,
        alcohol: 0,
        list: []
    });

    const onChange = (e) => {
        setNickName(e.target.value);
    }

    const onChangeSex = (e) => {
        setSex(e.target.value);
    }

    const onSubmit = () => {
        
    }

    return (
        <div>
            <Modalcontainer>
                <Modal>
                    <form onSubmit={onSubmit}>
                        {/* input text */}
                        <div>닉네임 입력</div>
                        <input type='text' placeholder='닉네임 입력' onChange={onChange} value={nickName}></input>
                        {/* <Input /> */}
                        <hr/>
                        {console.log(nickName)}

                        {/* radio : gender */}
                        <div>성별 선택</div>
                        <input type='radio' id='male' name='sex' value='male' checked={sex === 'male'} onChange={onChangeSex}/>
                        <label>남성</label>
                        <input type='radio' id='female' name='sex' value='female' checked={sex === 'female'} onChange={onChangeSex}/>
                        <label>여성</label>
                        <hr/>
                        {console.log(sex)}

                        {/* DatePicker : Birth Day */}
                        <div>생년월일 입력</div>
                        {/* <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            dateFormat = "yyyy.MM.dd"
                            
                        /> */}
                        <Calendar setBirth={setBirth} birth={birth}/>
                        {console.log(birth)}
                        <hr/>
                        {/* Parameter : Sleep, Alchol, Smoking */}
                        <SleepSlider setSleep={setSleep}/>
                        {console.log(sleep)}
                        <SmokingSlider setSmoking={setSmoking}/>
                        {console.log(smoking)}
                        <AlcoholSlider setAlcohol={setAlcohol}/>
                        {console.log(alcohol)}
                        <hr/>
                        <button type="submit">완료</button>
                    </form>
                </Modal>
            </Modalcontainer>
        </div>
    );
}

export default SettingModal;