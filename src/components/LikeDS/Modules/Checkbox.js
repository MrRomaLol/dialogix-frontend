import React, {useState} from 'react';

const Checkbox = ({onChange}) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        const newChecked = !checked
        setChecked(newChecked);

        onChange?.(newChecked);
    }

    return (

        <input type="checkbox" className={"checkbox-style"} checked={checked} onChange={handleChange}/>

    );
};

export default Checkbox;