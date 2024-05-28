import React from 'react';
import { connect } from 'react-redux';
import { toggleModalState, toggleTheme } from '../../actions';
import styles from './home.module.css'
import Header from '../../components/header'

const App = (props) => {
  return (
    <body className={`${styles.light_container} ${props.theme === 'dark' ? styles.dark_container : ''}`}>
      <Header />
      <div className={styles.top_container}>
        <h1>GitExplorer</h1>
      </div>
    </body>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);