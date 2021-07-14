import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyBucketList from '../components/Bucket/MyBucketList';
import { connect } from 'react-redux';
import AllBucketList from '../components/AllBucketList';
import styled from 'styled-components';
import Footer from '../components/Footer'
import { dispatch } from 'd3-dispatch';
import { actionCreators } from '../store';
import font from '../font.css'

const Text = styled.div`
    margin-top: 10px;
    font-size: 2.5rem;
    font-family: 'CookieRun-Regular';
    color: pink;
`

const MyPage = styled.span`
        display:flex;
        justify-content: space-between;
        width: 100%;
        background-color: white;
        font-family: 'CookieRun-Regular';

        @media only screen and (max-width: 480px) {
            flex-direction: column;
        }
    `;

const AllBucket = styled.div`
        display:flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        align-items: center;
        font-family: 'CookieRun-Regular';
`;

const BucketList = styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0px;
        font-family: 'CookieRun-Regular';
`;

const Inputform = styled.div`
        display: flex;
        justify-content: center;
        font-family: 'CookieRun-Regular';
`;

const Input = styled.input`
        width: 500px;
        height: 50px;
        margin: 10px;
        border-radius: 4px;
        border: 2px solid pink;
        font-size: 2rem;
        font-family: 'CookieRun-Regular';
        color: pink;
        :focus {
            outline: none;
        }
`;

const AddButton = styled.button`
        width: 100px;
        height: 50px;
        margin: 10px;
        font-size: 1.3rem;
        cursor: pointer;
        border-radius: 4px;
        background-color: pink;
        border: 2px solid pink;
        transition: all 0.5s ease;
        font-family: 'CookieRun-Regular';
        color: white;
        
        :hover {
            transform: scale(1.2);
            color:pink;
            background-color: white;
        }
`;

const BucketUl = styled.ul`
        padding:10px;
`;

const Loader = styled.div`
position: absolute;
left: 50%;
top: 50%;
z-index: 1;
width: 120px;
height: 120px;
margin: -76px 0 0 -76px;
border: 16px solid #f3f3f3;
border-radius: 50%;
border-top: 16px solid #35A88E;
-webkit-animation: spin 2s linear infinite;
animation: spin 2s linear infinite;

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Div = styled.div`
position: absolute;
left: 50%;
top: 50%;
z-index: 1;
width: 120px;
height: 120px;
margin: 80px 0 0 -76px;
font-weight: bold;
`

const MyBucketListPage = ({ userInfo, addInfo }) => {
    const [desc, setDesc] = useState('')
    const [objlist, setObjList] = useState([{}])
    const [isChecked, setIsChecked] = useState(false)
    const [render, setRender] = useState(true)
    const [allBucket, setAllbucket] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    if (typeof (userInfo.nickname) !== 'string') {
        addInfo(JSON.parse(localStorage.getItem("info")))
    }
    console.log(userInfo)
    useEffect(() => {
        axios.get("http://localhost:80/bucket", {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        }).then(res => {
            console.log('resresres', res)
            console.log(objlist)
            const newObjlist = []
            res.data.user.bucketlist.map(el => {
                newObjlist.push(el)
            })
            setObjList(newObjlist)
        })
    }, [render])

    useEffect(() => {
        axios.get("http://localhost:80/bucket", {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        }).then(res => {
            console.log('resresres', res)
            console.log(objlist)
            const newObjlist = []
            res.data.user.bucketlist.map(el => {
                newObjlist.push(el)
            })

            setObjList(newObjlist)
            setIsLoading(false)
        })
    }, [])

    const addBucketListBtn = () => {
        if (desc.length === 0) {
            return alert("버킷리스트 작성해주세요")
        } else {
            axios.patch("http://localhost:80/bucket/add", {
                id: Date.now(),
                nickName: userInfo.nickname,
                bucketName: desc,
                isChecked: isChecked
            }, {
                headers: {
                    "sns": "google",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true
            }).then(res => {
                const bb = [...objlist]
                console.log(res.data)
                bb.push(res.data)
                setObjList(bb)
                setDesc('')
                setRender(!render)
                setAllbucket(!allBucket)
                document.querySelector('input').value = ''
            })
        }
    }

    const renderDelete = () => {
        setRender(!render)
    }

    return (
        <>
            {isLoading ? <div><Loader /><Div>잠시만 기다려주세요.</Div></div> : <>
                <Inputform>
                    <Input type='text' onChange={(e) => setDesc(e.target.value)} />
                    <AddButton onClick={addBucketListBtn}>Add BucketList</AddButton>
                </Inputform>
                <MyPage>

                    <BucketList>
                        <BucketUl>
                            <h1>My Bucket List</h1>
                            {objlist.filter(el => el.id !== undefined)
                                .map((list, i) => <MyBucketList key={i} description={list.bucketName}
                                    id={list.id} isChecked={list.isChecked} userInfo={userInfo} renderDelete={renderDelete} />)}
                        </BucketUl>
                    </BucketList>

                    <AllBucket>
                        <h1><i class="fas fa-hands-helping"></i> Other's Bucket List</h1>
                        <AllBucketList render={render} />
                    </AllBucket>
                </MyPage>
            <Footer />
            </>}
        </>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addInfo: (info) => { dispatch(actionCreators.addInfo(info)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBucketListPage);