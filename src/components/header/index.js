import React from "react";
import { connect } from 'react-redux';
import { toggleTheme } from '../../actions';
import { AiOutlineGithub  } from 'react-icons/ai';
import styles from './header.module.css'
import ThemeSwitcher from '../switcher'

const Header = (props) => {
    return (
        <div className={styles.container}>
            <AiOutlineGithub className={styles.icon} color={props.theme === 'dark' ? 'white' : 'black'} />
           <ThemeSwitcher />
        </div>
    )
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
  });
  
  export default connect(mapStateToProps, { toggleTheme })(Header);