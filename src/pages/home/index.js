import React from 'react';
import { connect } from 'react-redux';
import { toggleModalState, toggleTheme } from '../../actions';
import styles from './home.module.css'
import Header from '../../components/header'
import Input from '../../components/input'

const App = (props) => {

  const [searchItem, setSearchItem] = React.useState("");
  
  const handleChange = (event) => {
    setSearchItem(event.target.value);
};


  return (
    <div className={`${styles.light_container} ${props.theme === 'dark' ? styles.dark_container : ''}`}>
      <Header />
      <div className={styles.top_container}>
        <h1 className={`${styles.title} ${props.theme === 'dark' ? styles.title_dark : ''}`}>GitExplorer</h1>
        <Input 
          value={searchItem}
          placeholder="Procurar Repositório..."
          onChange={handleChange}
          submit={() => console.log('deuuu', searchItem)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);