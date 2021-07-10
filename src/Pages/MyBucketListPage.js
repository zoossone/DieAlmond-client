import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyBucketList from '../components/Bucket/MyBucketList';
import { connect } from 'react-redux';
import AllBucketList from '../components/AllBucketList';
import styled from 'styled-components';

const MyPage = styled.span`
        display:flex;
        justify-content: space-between;
        margin-top:10px;
        width: 100%;
        border: 1px solid black;
    `;

const AllBucket = styled.div`
        display:flex;
        flex-direction: column;
        justify-content: center;
        margin-top:5px;
        width: 50%;
        align-items: center;
        margin: auto;
`;

const BucketList = styled.div`
        display: flex;
        justify-content: center;
        align-items: center
        width: 50%;
        margin: auto;
        padding: 0px;
`;

const AddButton = styled.button`
        position: relative;
        font-size: medium;
        cursor: pointer;
        background-color: white;
        border: 1px solid black;
        transition: all 0.5s ;
        
        :hover {
            background-color: lightblue;
        }
`;

const BucketUl = styled.ul`
        padding:0px;
`;

const MyBucketListPage = ({userInfo}) => {
    const [desc, setDesc] = useState('')
    const [objlist, setObjList] = useState([{}])
    const [isChecked, setIsChecked] = useState(false)
    const [render, setRender] = useState(true)
    const [allBucket, setAllbucket] = useState(true)

    useEffect(() => {
        if(objlist[0] !== undefined) {
         axios.get("http://localhost:80/bucket", {
            headers: {
                "sns":"google",
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
        })}
    }, [render])

    useEffect(() => {
        if(objlist[0] !== undefined) {
         axios.get("http://localhost:80/bucket", {
            headers: {
                "sns":"google",
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
        })}
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
        <input onChange={(e) => setDesc(e.target.value)} />
        <AddButton onClick={addBucketListBtn}>버킷추가버튼</AddButton>
        <MyPage>

            <BucketList>
            <BucketUl>{objlist.filter(el => el.id !== 'undefined')
            .map((list, i) => <MyBucketList key={i} description={list.bucketName} 
            id={list.id} isChecked={list.isChecked} userInfo={userInfo} renderDelete={renderDelete}/>)}
            </BucketUl>
            </BucketList>

            <AllBucket>
            <h1><i class="fas fa-hands-helping"></i> Other's Bucket List</h1>
                <AllBucketList render={render}/>
            </AllBucket>
        </MyPage>
        </>
    );
};

function mapStateToProps(state) {
    return {userInfo : state}
}

export default connect(mapStateToProps)(MyBucketListPage);