import React from 'react';
import { connect } from 'react-redux';
import { toggleModalState, toggleTheme } from '../../actions';
import styles from './home.module.css'
import { AiOutlineGithub  } from 'react-icons/ai';

const App = (props) => {
  return (
    <body className={`${styles.light_container} ${props.theme === 'dark' ? styles.dark_container : ''}`}>
      <div className={styles.top_container}>
        <button onClick={props.toggleTheme}>Alterar Tema</button>
        <h1>GITHUB REPOS</h1>
        <AiOutlineGithub className={styles.icon} color={props.theme === 'dark' ? 'white' : 'black'} />
      </div>
    </body>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);