import React, {useState} from 'react';
import { Progress } from 'semantic-ui-react'

const ProgressBar = () => {

    const [ percent, setPercent ] = useState(50);
    
    return (
        <Progress percent={percent} active progress color='orange'/>
    );
};

export default ProgressBar;