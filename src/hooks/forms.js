import {useState} from 'react';

export const useFormInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
        if (event.target.value.trim() === '') {
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
    };

    return { value: inputValue, onChange: inputChangeHandler, validity: isValid};
}