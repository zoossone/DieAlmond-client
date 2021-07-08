import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import Calendar from '../components/SettingModal/Calendar'
import SleepSlider from '../components/SettingModal/SleepSlider';
import SmokingSlider from '../components/SettingModal/SmokingSlider'
import AlcoholSlider from '../components/SettingModal/AlcoholSlider'
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Route, Router } from 'react-router';
import MainPage from './MainPage';
import axios from 'axios';
import { Component } from 'react';
import { useHistory } from 'react-router-dom';

// const Modalcontainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: #00000080;
//     z-index: 10000;
// `
// const Modal = styled.span`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     position: fixed;
//     width: 350px;
//     height: 500px;
//     background: white;
//     z-index: 10000;
//     border-radius: 5px;
// `

const MyPage = ({ userInfo, addUserInfo }) => {

    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState([]);
    const [sleep, setSleep] = useState(0);
    const [smoking, setSmoking] = useState(0);
    const [alcohol, setAlcohol] = useState(0);
    const history = useHistory();


    const onChange = (e) => {
        setNickName(e.target.value);
    }

    const onChangeSex = (e) => {
        setGender(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(birth))
        if (nickName === '' || gender === '' || birth.length === 0 || sleep === 0) {
            return alert("모든 항목을 빠짐없이 기입해주세요 :)")
        } else {
            let date = JSON.stringify(birth);
            date = date.slice(1, 11).split('-')
            date = date.map(e => parseInt(e))
            const [year, month, day] = date;

            // 2. 만 나이 계산
            let today = new Date();
            let birthDate = new Date(year, month, day);

            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            addUserInfo({
                nickName: nickName,
                gender: gender,
                age: age,
                year: year,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
            })

            alert('입력하신 값에 따른 기대여명을 보여드립니다!')

            if(userInfo.google) {
                axios.post('http://localhost:80/setting',{
                    nickName: nickName,
                gender: gender,
                birth: date,
                year: year,
                age: age,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
                }, {
                headers: {
                    'sns':'google',
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true,
            })
                .then(res => {
                    alert('변경을 완료했습니다 :)')
                    console.log(res)
                    addUserInfo({restLife: parseInt(res.data.life)})
                })
                .catch(e => e)   
            } else {
                axios.post('http://localhost:80/setting', {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                nickName: nickName,
                gender: gender,
                birth: date,
                year: year,
                age: age,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
            })
                .then(res => {
                    alert('변경을 완료했습니다 :)')
                    console.log(res)
                    addUserInfo({restLife: parseInt(res.data.life)})
                })
                .catch(e => e)   
            }
        }
        history.push('/main')
    }

    const onClick = () => {
        history.push('/main')
    }

    const withdrawal = () => {
        axios.delete('http://localhost:80/withdrawal', {
            headers: {
                "sns":"google",
            "Content-Type": "application/json",
            "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true,
        }).then(res => {
            alert('좋은 일만 가득하길 빌게요!')
            history.push('/')
        })
            .catch(e => alert(e))
    }

    return (
        <>
            <header>
                <h2>오래 살고싶으면 정보를 수정해버리세요</h2>
            </header>
            <form onSubmit={onSubmit}>
                {/* input text */}
                <div>닉네임 입력</div>
                <input type='text' placeholder='닉네임 입력' onChange={onChange} value={nickName}></input>
                {/* <Input /> */}
                <hr />
                {console.log(nickName)}

                {/* radio : gender */}
                <div>성별 선택</div>
                <input type='radio' id='male' name='gender' value='male' checked={gender === 'male'} onChange={onChangeSex} />
                <label>남성</label>
                <input type='radio' id='female' name='gender' value='female' checked={gender === 'female'} onChange={onChangeSex} />
                <label>여성</label>
                <hr />
                {console.log(gender)}

                {/* DatePicker : Birth Day */}
                <div>생년월일 입력</div>
                {/* <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            dateFormat = "yyyy.MM.dd"
                            
                        /> */}
                <Calendar setBirth={setBirth} birth={birth} />
                {console.log(birth)}
                <hr />
                {/* Parameter : Sleep, Alchol, Smoking */}
                <SleepSlider setSleep={setSleep} />
                {console.log(sleep)}
                <SmokingSlider setSmoking={setSmoking} />
                {console.log(smoking)}
                <AlcoholSlider setAlcohol={setAlcohol} />
                {console.log(alcohol)}
                <hr />
                <button>완료</button>
                {typeof (userInfo.nickName) === 'string' ?
                    <div>
                        <button onClick={onClick}>메인으로 가기</button>
                        <button onClick={withdrawal}>회원탈퇴</button>
                    </div>
                    : null}
            </form>
        </>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (info) => dispatch(actionCreators.addInfo(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);