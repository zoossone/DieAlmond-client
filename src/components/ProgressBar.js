import React, {useState} from 'react';
import { Progress } from 'semantic-ui-react'

const ProgressBar = () => {
    //props로 수명을 받아서 스테이트로 표시해줌

    const [ percent, setPercent ] = useState(50);
    
    return (
        <Progress percent={percent} active progress color='orange'/>
    );
};

export default ProgressBar;