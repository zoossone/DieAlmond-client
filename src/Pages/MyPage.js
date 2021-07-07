import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import Calendar from '../components/SettingModal/Calendar'
import SleepSlider from '../components/SettingModal/SleepSlider';
import SmokingSlider from '../components/SettingModal/SmokingSlider'
import AlcoholSlider from '../components/SettingModal/AlcoholSlider'
import {connect} from 'react-redux';
import { actionCreators } from '../store';
import {useHistory} from 'react-router-dom';

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

const MyPage = ({userInfo, addUserInfo}) => {

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
        console.log(JSON.stringify(birth))
        e.preventDefault();
        if(nickName === '' || gender === '' || birth === [] || sleep === 0){
            return alert("모든 항목을 빠짐없이 기입해주세요 :)")
        } else {
            let date = JSON.stringify(birth);
            date = date.slice(1, 11).split('-')
            date = date.map(e => parseInt(e))
            const [year, month, day] = date;

            addUserInfo({
                nickName: nickName,
                gender: gender,
                birth: date,
                year: year,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
            })

            alert('변경 완료')

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
            // .then(res => {
            //     alert('변경을 완료했습니다 :)')
            // })
            // .catch(e => e)
        }
        history.push('/main')
    }

    const onClick = () => {
        history.push('/main')
    }

    return (
        <>
            <div>
                <button onClick={onClick}>뒤로가기</button>
            </div>
            <header>
                <h2>오래 살고싶으면 정보를 수정해버리세요</h2>
            </header>
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
        </>
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (info) => dispatch(actionCreators.addInfo(info))}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);