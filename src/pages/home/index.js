import React from 'react'
import { connect } from 'react-redux'
import { toggleModalState, toggleTheme } from '../../actions'
import styles from './home.module.css'
import Header from '../../components/header'
import Input from '../../components/input'
import {fetchGitHubRepositories} from '../../api/api.js'
import RepositoryBox from '../../components/repositoryBox'
import ClipLoader from 'react-spinners/ClipLoader';

const App = (props) => {
  const [searchItem, setSearchItem] = React.useState("");
  const [repositories, setRepositories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const isDarkTheme = props.theme === 'dark'

      const handleChange = (event) => {
        setSearchItem(event.target.value);
    };

    const getRepositories = async () => {
      setIsLoading(true)
      setError(false)
      setSearchItem('')
      try {
        const response = await fetchGitHubRepositories(searchItem);
        setRepositories(response)
        setIsLoading(false)
        console.log('resss', response)
        
        if (repositories.length === 0) {
          setError(true)
        }
      } catch (error) {
        setError(true)
        setIsLoading(false)
      }
    };

    const RepositoriesOptions = repositories.map((item, index) => (
      <div key={index}> 
      <RepositoryBox image={item.owner.avatarUrl} title={item.name} description={item.description} user={item.owner.login} />
      </div>
    ));


  React.useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark_mode');
    } else {
      document.documentElement.classList.remove('dark_mode');
    }
  }, [isDarkTheme, props.theme, repositories]);

  return (
    <div className={`${styles.light_container} ${isDarkTheme ? styles.dark_container : ''}`}>
      <Header />
      <div className={styles.top_container}>
        <h1 className={`${styles.title} ${isDarkTheme ? styles.title_dark : ''}`}>GitExplorer</h1>
        <Input
          value={searchItem}
          placeholder="Procurar Repositório..."
          onChange={handleChange}
          submit={() => getRepositories()}
        />
      </div>
      <div className={styles.content}>
        {isLoading ?
        <ClipLoader color={isDarkTheme ? '#fff' : '#000'} loading={isLoading} size={50} />
          :
            error ? <h1>error</h1> 
          : 
          <div className={styles.repositories_content}>
              {RepositoriesOptions}
          </div>
      }
          
      </div>
      
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);