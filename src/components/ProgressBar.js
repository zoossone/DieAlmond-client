import React, {useState} from 'react';
import { Progress } from 'semantic-ui-react'

const ProgressBar = ({userInfo}) => {
    //props로 수명을 받아서 스테이트로 표시해줌
    
    let { age, sleep, smoking, alcohol, restLife  } = userInfo

    const percentOfLife = (age, restLife) => {
        const total = age + restLife;
        return age/total*100
    }

    if (smoking > 21) {
        restLife = restLife - 10;
    } else if (10 < smoking && smoking < 21) {
        restLife = restLife - 5;
    } else if (0 < smoking && smoking < 11) {
        restLife = restLife - 2.5;
    }

    // 4-2. 술 : 1번 당 3년 단축
    if (alcohol === 7) {
        restLife = restLife - 20
    } else {
        restLife = restLife - (alcohol * 3)
    }

    // 4-3. 수면 : 12~10 / 9~7 / 6~4
    if (sleep > 9) {
        restLife = restLife - 5
    } else if (sleep < 7) {
        restLife = restLife - 5
    }

    const per = percentOfLife(age, restLife);
    
    return (
        <Progress percent={Math.round(per)} active progress color='black'/>
    );
};

export default ProgressBar;