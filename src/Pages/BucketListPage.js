import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AllBucketList from '../components/AllBucketList';
import MyBucketListPage from './MyBucketListPage';


const BucketListPage = () => {
    const history = useHistory()
    const [chagePage, setChangePage] = useState(true)

    const toggleBtn = () => {
        setChangePage(!chagePage)
    }
    
    return (
        <div>
            <nav>
                <button onClick={() => history.push('/main')}>뒤로</button>
                <button onClick={toggleBtn}>
                    {chagePage === false ? 'My BucketList' : 'Others BucketList'}
                </button>
            </nav>
            {chagePage === true ? <MyBucketListPage /> : <AllBucketList />}
        </div>
    );
};

export default BucketListPage;