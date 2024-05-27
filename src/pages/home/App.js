import React from 'react';
import { connect } from 'react-redux';
import { toggleModalState, toggleTheme } from '../../actions';

const App = (props) => {
  return (
    <div>
      <h1>Tema atual: {props.theme}</h1>
      <button onClick={props.toggleTheme}>Alterar Tema</button>
      <h2>Modal: {props.isModalOpen ? 'Aberto' : 'Fechado'}</h2>
      <button onClick={props.toggleModalState}>Toggle Modal</button>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);