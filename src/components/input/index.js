import React from "react";
import styles from './input.module.css'
import { AiOutlineSearch  } from 'react-icons/ai';
import { connect } from 'react-redux';

export const Input = (props) => {
    const { value, placeholder, onChange, submit } = props;
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
        setIsFocused(true);
      };
      const handleBlur = () => {
        setIsFocused(false);
      };
    

    return (
        <div className={`${styles.container} ${isFocused ? styles.focused : ''}`}>
            <input
                className={styles.input}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div style={{backgroundColor: props.theme === 'dark' ? 'rgb(133, 179, 61)' : ''}} onClick={submit} className={styles.icon_container}>
               <AiOutlineSearch className={styles.icon} /> 
            </div>
            
        </div>
    );
};
const mapStateToProps = state => ({
    theme: state.theme.theme,
  });
  
  export default connect(mapStateToProps)(Input);