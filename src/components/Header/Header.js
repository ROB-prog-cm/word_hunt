import React from 'react';
import './Header.css'
import {createTheme, MenuItem, TextField, ThemeProvider} from "@material-ui/core";
import categories from "../../data/category";

const Header = ({category, setCategory, word, setWord, LightMode}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightMode ? '#000' : '#fff'
      },
      type: LightMode ? 'light' : 'dark',
    },
  });
  const handleChange = (language) => {
    setCategory(language)
    setWord('')
  }
  return (
    <div className='header'>
      <span className='title'> {word ? word : 'Word Hunt'}</span>
      <div className='inputs'>
        <ThemeProvider theme={darkTheme}>
          <TextField
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className='search'
            label="Search a Word"/>
          <TextField
            select
            label="Language"
            className='select'
            value={category}
            onChange={(e) => handleChange(e.target.value)}>
            {categories.map((option) => (
              <MenuItem
                value={option.label}
                key={option.label}
              >
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;