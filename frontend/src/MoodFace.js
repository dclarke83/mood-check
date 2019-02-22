import React from 'react';
import {
    FaRegTired,
    FaRegAngry,
    FaRegFrown,
    FaRegMeh,
    FaRegSmile,
    FaRegSmileBeam,
    FaRegGrinSquint
} from 'react-icons/fa';

const MoodFace = (props) => {
    const style = {
        fontSize: '10em',
        color: '#cacaca'
    };
    const faces = [
        { key: 1, value: <FaRegTired style={style} /> },
        { key: 2, value: <FaRegAngry style={style} /> },
        { key: 3, value: <FaRegFrown style={style} /> },
        { key: 4, value: <FaRegMeh style={style} /> },
        { key: 5, value: <FaRegSmile style={style} /> },
        { key: 6, value: <FaRegSmileBeam style={style} /> },
        { key: 7, value: <FaRegGrinSquint style={style} /> }
    ];

    return (
        <div style={{ margin: '30px', display: 'flex', justifyContent: 'center' }}>
            { faces.find(face => face.key === props.mood).value }
        </div>
    );
}

export default MoodFace;