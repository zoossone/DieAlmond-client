import React, {useEffect} from 'react';

const today = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <div>
            🗓 {dateString}
        </div>
    );
};

export default today;