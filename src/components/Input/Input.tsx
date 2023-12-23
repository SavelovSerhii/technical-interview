import React, { useState } from 'react';
import './Input.css';

type Props = {
    text: string,
    setText: (newData: string, key: string) => void,
    type: string,
    title: string,
    min: number,
    max: number
};

export const Input: React.FC<Props> = (props) => {
    const { text, setText, type, title, min, max } = props;

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <div className='Input'>
                <label htmlFor={`input${type}`}>
                    {title}
                    <input
                        className={`Input__input ${errorMessage.length ? 'Input__input--error' : ''}`}
                        type='text'
                        placeholder={title}
                        id={`input${type}`}
                        value={text}
                        onChange={(event) => {
                            if (event.target.value.match(/[a-zA-Z]/g)?.length !== event.target.value.length && event.target.value.length) {
                                setErrorMessage(`Please, use only letters of English alphabet`);
                            } else if (event.target.value.length > max) {
                                setErrorMessage(`Maximum length is ${max}`);
                            } else {
                                setErrorMessage('');
                                setText(event.target.value, type);
                            }
                        }}
                        onBlur={(event) => {
                            if (event.target.value.length < min) {
                                setErrorMessage(`Minimum length is ${min}`);
                            } else {
                                setErrorMessage('');
                            }
                        }}
                    />
                    <span className='error'>
                        {errorMessage}
                    </span>
                </label>
            </div>
        </>
    );
};