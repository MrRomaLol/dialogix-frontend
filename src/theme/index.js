import {createTheming} from "@callstack/react-theme-provider";

export const themes = {
    dark: {
        ...require('./darkThemeColors.json')
    },
    white: {
        ...require('./whiteThemeColors.json')
    }

}

export const {ThemeProvider, withTheme, useTheme} = createTheming(themes.white);