import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../../actions';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './switcher.module.css';

const ThemeSwitcher = (props) => {
  return (
    <div className={`${styles.switcher} ${props.theme === 'light' ? styles.light : styles.dark}`} onClick={props.toggleTheme}>
      <div className={styles.ball}>
        {props.theme === 'light' ? <FaSun className={styles.icon} /> : <FaMoon className={styles.icon} />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, { toggleTheme })(ThemeSwitcher);