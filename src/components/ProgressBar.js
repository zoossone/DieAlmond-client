import React, {useState} from 'react';
import { Progress } from 'semantic-ui-react'

const ProgressBar = ({userInfo}) => {
    //props로 수명을 받아서 스테이트로 표시해줌

    let {age, restLife} = userInfo

    const percentOfLife = (age, restLife) => {
        const total = age + restLife;
        return age/total*100
    }

    const per = percentOfLife(age, restLife);
    
    return (
        <Progress percent={per} active progress color='black'/>
    );
};

export default ProgressBar;