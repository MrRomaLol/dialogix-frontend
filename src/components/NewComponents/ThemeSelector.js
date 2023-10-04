import React from 'react';

import {themes} from "../../theme";
import {useDispatch} from "react-redux";
import {changeTheme} from "../../store/themeSlice";

const ThemeSelector = () => {
    const dispatch = useDispatch();
    const handleThemeChange = (themeName) => {
        dispatch(changeTheme({themeName}))
    }

    return (
        <div>
            <select onChange={e => handleThemeChange(e.target.value)}>
                {Object.keys(themes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                        {themeName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeSelector;