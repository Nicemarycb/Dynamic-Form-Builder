
import React from 'react';
import { useSelector } from 'react-redux';

export default function DarkModeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.mode);
  
  return (
    <div className={`app-wrapper ${theme}-mode`}>
      {children}
    </div>
  );
}