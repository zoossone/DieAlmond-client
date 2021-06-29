import React from 'react';
import Store from 'react-redux';
import connect from 'react-redux';

const Aside1 = (props) => {

    console.log(props);
    
    return (
        <div>
            <div>오늘 날짜 시간: {date}</div>
            <div>오늘 사망자: {people}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(Aside1);