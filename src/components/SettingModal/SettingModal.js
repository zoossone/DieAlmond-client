import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar'
import SleepSlider from './SleepSlider';
import SmokingSlider from './SmokingSlider'
import AlcoholSlider from './AlcoholSlider'
import {connect} from 'react-redux';
import { actionCreators } from '../../store';
import { Route, Router } from 'react-router';
import MainPage from '../../Pages/MainPage';

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

const SettingModal =  ({userInfo, addUserInfo}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [sleep, setSleep] = useState('');
    const [smoking, setSmoking] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [info, setInfo] = useState({
        nickName: '',
        gender: '',
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
        setGender(e.target.value);
    }

    const onSubmit = () => {
        console.log(JSON.stringify(birth))
        if(nickName === '' || gender === '' || birth === [] || sleep === 0){
            return alert("모든 항목을 빠짐없이 기입해주세요 :)")
        } else {
            let date = JSON.stringify(birth);
            date = date.slice(1, 11).split('-')
            date = date.map(e => parseInt(e))
            const [year, month, day] = date;
            setIsOpen(!isOpen);
    
            addUserInfo({
                nickName: nickName,
                gender: gender,
                birth: date,
                year: year,
                month: month,
                day: day,
                sleep: sleep,
                smoking: smoking,
                alcohol: alcohol,
                list: []
            })
        }
    }

    return (
        <div>
            {console.log(userInfo)}
            {isOpen === false ?
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
                        <input type='radio' id='male' name='gender' value='male' checked={gender === 'male'} onChange={onChangeSex}/>
                        <label>남성</label>
                        <input type='radio' id='female' name='gender' value='female' checked={gender === 'female'} onChange={onChangeSex}/>
                        <label>여성</label>
                        <hr/>
                        {console.log(gender)}

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
                        <button>완료</button>
                    </form>
                </Modal>
            </Modalcontainer>
            : null
}
        </div>
    );
}

function mapStateToProps(state) {
    return {userInfo: state}
}

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (info) => dispatch(actionCreators.addInfo(info))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingModal);