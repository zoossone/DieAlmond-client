import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyBucketListPage from './MyBucketListPage';


const BucketListPage = () => {
    const history = useHistory()
    
    return (
        <div>
            <nav>
                <button onClick={() => history.push('/main')}>뒤로</button>
            </nav>
            <MyBucketListPage />
        </div>
    );
};

export default BucketListPage;