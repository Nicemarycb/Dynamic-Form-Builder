// src/components/FormBuilder/ThemeToggle.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toggleTheme } from '../../store/themeSlice'; // Fixed import path

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  
  const isDark = theme === 'dark';

  return (
    <div className="d-flex align-items-center">
      <Form.Check
        type="switch"
        id="theme-toggle"
        label={isDark ? 'Dark Mode' : ' Light Mode'}
        checked={isDark}
        onChange={() => dispatch(toggleTheme())}
        className="me-2"
      />
    </div>
  );
}