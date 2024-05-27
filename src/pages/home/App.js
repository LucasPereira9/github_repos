import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../../actions/themeActions'

const App = ({ theme, toggleTheme }) => {
  return (
    <div style={{ backgroundColor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white', flex: 1 }}>
    <h1>Tema atual: {theme}</h1>
    <button onClick={toggleTheme}>Alterar Tema</button>
  </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps, { toggleTheme })(App);