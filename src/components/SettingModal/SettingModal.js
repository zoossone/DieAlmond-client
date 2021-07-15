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
import axios from 'axios';
import font from '../../font.css'

const Modalcontainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000080;
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
    border-radius: 5px;
`

const Label = styled.div`
    color: pink;
`

const SettingModal =  ({userInfo, addUserInfo}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState([]);
    const [sleep, setSleep] = useState(0);
    const [smoking, setSmoking] = useState(0);
    const [alcohol, setAlcohol] = useState(0);

    const onChange = (e) => {
        setNickName(e.target.value);
    }

    const onChangeSex = (e) => {
        setGender(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(birth))
        if(nickName === '' || gender === '' || birth.length === 0 || sleep === 0){
            alert("모든 항목을 빠짐없이 기입해주세요 :)")
            return ;
        } else {
            let date = JSON.stringify(birth);
            date = date.slice(1, 11).split('-')
            date = date.map(e => parseInt(e))
            const [year, month, day] = date;

            addUserInfo({
                nickName: nickName,
                gender: gender,
                // birth: date,
                year: year,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
            })

            // axios.patch('http://localhost:4000/mypage', {
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authentication": "@@@@@@token"
            //     },
            //     withCredentials: true,
            //     nickName: nickName,
            //     gender: gender,
            //     birth: date,
            //     year: year,
            //     month: month,
            //     day: day,
            //     sleep: parseInt(sleep),
            //     smoking: parseInt(smoking),
            //     alcohol: parseInt(alcohol)
            // })
            // .catch(e => e)
        }

    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            {isOpen === false ?
            <Modalcontainer onClick={toggleModal}>
                <Modal onClick={(e) => e.stopPropagation()}>
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