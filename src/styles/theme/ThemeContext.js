import { createContext, useContext } from 'react';

const ColorModeContext = createContext({});

export const ColorModeProvider = ColorModeContext.Provider;
export const useColorMode = () => useContext(ColorModeContext);
