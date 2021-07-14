import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
import font from '../font.css'

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

const Container = styled.div`
    padding: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    vertical-align: middle;
    font-family: 'CookieRun-Regular';
`

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    color: pink;
    font-family: 'CookieRun-Regular';
`;

const Input = styled.input`
margin: 1rem
`

const Div = styled.div`
    font-weight: bold;
    color: pink;
`

const Button = styled.button`
    margin: 30px;
    text-align:center;
    background:pink;
    color:white;
    border:none;
    position:relative;
    height:40px;
    width: 110px;
    font-size:1.3rem;
    padding:0 1rem;
    cursor:pointer;
    transition:300ms ease all;
    outline:none;
    border-radius: 30px;
    margin: 0.5rem;
    font-family: 'CookieRun-Regular';

    :hover{
        background: white;
        color: pink;
        border: solid 2px pink;
}
`

const Form = styled.form`
    border: 3px solid pink;
    padding: 3rem;
    border-radius: 60px;
`



const MyPage = ({ userInfo, addUserInfo }) => {

    const [nickname, setNickName] = useState('');
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

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(birth))
        if (nickname === '' || gender === '' || birth.length === 0 || sleep === 0) {
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
                nickname: nickname,
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

            if (userInfo.google) {
                axios.post('http://localhost:80/setting', {
                    nickName: nickname,
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
                        'sns': 'google',
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${userInfo.google}`
                    },
                    withCredentials: true
                })
                    .then((res) => {
                        addUserInfo({ restLife: parseInt(res.data.life) })
                        alert('변경을 완료했습니다 :)')
                        // console.log(res)
                        // console.log(userInfo)
                        localStorage.setItem("info", JSON.stringify({
                            'nickname': nickname,
                            'gender': gender,
                            'birth': date,
                            'year': year,
                            'age': age,
                            'month': month,
                            'day': day,
                            'sleep': parseInt(sleep),
                            'smoking': parseInt(smoking),
                            'alcohol': parseInt(alcohol),
                            'restLife': parseInt(res.data.life)
                        }))
                    })
                    .then((res) => {
                        history.push('/main')
                    })
                    .catch(e => e)
            } else {
                axios.post('http://localhost:80/setting', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    nickname: nickname,
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
                    .then((res) => {
                        addUserInfo({ restLife: parseInt(res.data.life) })
                        alert('변경을 완료했습니다 :)')
                        // console.log(res)
                        localStorage.setItem("info", JSON.stringify({
                            'nickname': nickname,
                            'gender': gender,
                            'birth': date,
                            'year': year,
                            'age': age,
                            'month': month,
                            'day': day,
                            'sleep': parseInt(sleep),
                            'smoking': parseInt(smoking),
                            'alcohol': parseInt(alcohol),
                            'restLife': parseInt(res.data.life)
                        }))
                    })
                    .then((res) => {
                        history.push('/main')
                    })
                    .catch(e => e)
            }
        }

    }

    const onClick = () => {
        history.push('/main')
    }

    const withdrawal = () => {
        if(window.confirm("정말 탈퇴 하시겠어요?")) {
            axios.delete('http://localhost:80/withdrawal', {
                headers: {
                    "sns": "google",
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
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
            <Title>정보를 입력해서 기대 수명을 확인해보세요 🙌</Title>
                {/* input text */}
                <Div>닉네임 입력</Div>
                <Input type='text' placeholder='닉네임 입력' onChange={onChange} value={nickname}></Input>
                {/* <Input /> */}
                <hr />
                {console.log(userInfo)}
                {console.log(nickname)}

                {/* radio : gender */}
                <Div>성별 선택</Div>
                <Input type='radio' id='male' name='gender' value='male' checked={gender === 'male'} onChange={onChangeSex} />
                <label>남성</label>
                <Input type='radio' id='female' name='gender' value='female' checked={gender === 'female'} onChange={onChangeSex} />
                <label>여성</label>
                <hr />
                {console.log(gender)}

                {/* DatePicker : Birth Day */}
                <Div>생년월일 입력</Div>
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
                <Button>완료</Button>
                {typeof (userInfo.nickname) === 'string' ?
                    <div>
                        <Button onClick={onClick}>메인 화면</Button>
                        {typeof (userInfo.google) === 'string' ? <Button onClick={withdrawal}>회원탈퇴</Button> : null}
                    </div>
                    : null}
            </Form>
        </Container>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (info) => dispatch(actionCreators.addInfo(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);