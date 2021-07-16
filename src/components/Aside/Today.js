import React, {useEffect} from 'react';
import styled from 'styled-components';

const Now = styled.div `
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`

const Today = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <Now>
            🗓 {dateString}
        </Now>
    );
};

export default Today;