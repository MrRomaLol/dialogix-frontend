import React, {useState} from 'react';
import "../../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const InputTextBox = ({name, type, id, onTextChange}) => {
    const [input, setInput] = useState('');

    const handleInput = (event) => {
        const text = event.target.value;
        setInput(text);
        onTextChange?.(text);
    }

    return (
        <div style={{height:"60px"}}>
            <input type={type} className={'input-text-login-signUp mt-3 input-text' + (input ? ' enabled' : '')}
                   style={{textIndent:"15px", borderRadius:"0px", fontSize:"20px"}}
                   onChange={handleInput}
                   id={id}
                   value={input}
            />
            <label className={"input-label"}>{name}</label>
        </div>
    );
};

export default InputTextBox;