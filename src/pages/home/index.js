import React from 'react'
import { connect } from 'react-redux'
import { toggleModalState, toggleTheme } from '../../actions'
import styles from './home.module.css'
import Header from '../../components/header'
import Input from '../../components/input'
import {fetchGitHubRepositories} from '../../api/api.js'
import RepositoryBox from '../../components/repositoryBox'
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from '../../components/modal/index.js'
import { PrimaryButton } from '../../components/primaryButton/index.js'


const App = (props) => {

  const ERROR_TYPES = {
    NONE: 'none',
    BAD_CREDENTIALS: 'badCredentials',
    NO_DESCRIPTION: 'noDescription',
    NOT_FOUND: 'notFound'
  };
  
  const [searchItem, setSearchItem] = React.useState("");
  const [repositories, setRepositories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [error, setError] = React.useState(ERROR_TYPES.NONE);
  const isDarkTheme = props.theme === 'dark'

  const not_found_error_image = `/images/${props.theme === 'dark' ? 'github_white.png' : 'github_black.png'}`;
  const bad_credencials_image = `/images/${props.theme === 'dark' ? 'github_credencials_white.png' : 'github_credencials_black.png'}`;
  const no_description_image = '/images/github_no_description.png';

      const handleChange = (event) => {
        setSearchItem(event.target.value);
    };

    const getRepositories = async () => {
      setIsLoading(true)
      setError(false)
      setSearchItem('')
      try {
        const response = await fetchGitHubRepositories(searchItem);
        if (response === 'Bad credentials') {
          setIsLoading(false)
          setError(ERROR_TYPES.BAD_CREDENTIALS);
          return
        }
        if (response?.length === 0) {
          setIsLoading(false)
          setRepositories([])
          setError(ERROR_TYPES.NOT_FOUND);
          return
        }
        setError(ERROR_TYPES.NONE);
        setRepositories(response)
        setIsLoading(false)
        return
      } catch (error) {
        setError(ERROR_TYPES.NOT_FOUND);
        setIsLoading(false)
      }
    };
    
    const handleModalOpen = (item) => {
      setSelectedItem(item);
     props.toggleModalState()
    };

    const RepositoriesOptions = repositories.map((item, index) => (
      <div key={index}> 
      <RepositoryBox submit={() => handleModalOpen(item)} image={item.owner.avatarUrl} title={item.name} description={item.description} user={item.owner.login} />
      </div>
    ));


  React.useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark_mode');
    } else {
      document.documentElement.classList.remove('dark_mode');
    }
  }, [isDarkTheme, props.theme, repositories, error]);

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
          <div className={styles.repositories_content}>
            {error === ERROR_TYPES.NOT_FOUND && 
            <img
                src={process.env.PUBLIC_URL + not_found_error_image}
                alt={not_found_error_image}
                className={styles.error_mascot}
              />}
              {error === ERROR_TYPES.BAD_CREDENTIALS && 
            <img
                src={process.env.PUBLIC_URL + bad_credencials_image}
                alt={bad_credencials_image}
                className={styles.error_mascot}
              />}
              {RepositoriesOptions}
          </div>
      } 
      </div>
        <Modal setIsModalOpen={() => props.toggleModalState()} isModalOpen={props.isModalOpen}>
          <div className={styles.modal_container}>
            <header className={styles.modal_header}>
              <div className={styles.modal_image_container}>
                <img
                  src={selectedItem?.owner?.avatarUrl}
                  alt={selectedItem?.owner?.login}
                  className={styles.modal_image}
                />
                <h1 className={styles.modal_repo_name}>{selectedItem?.name}</h1>
              </div>
              <div className={styles.modal_description}>
                {selectedItem?.description === null &&
                <img
                    src={process.env.PUBLIC_URL + no_description_image}
                    alt={no_description_image}
                    className={styles.description_mascot}
                  />}
                <h1 className={styles.description}>{selectedItem?.description}</h1>
              </div>
            </header>
            <article>
              <section>
                <h1 className={styles.modal_item_title}>Commits</h1>
                <h2>{selectedItem?.defaultBranchRef?.target.history.totalCount}</h2>
              </section>
              <section>
                <h1 className={styles.modal_item_title}>Open Issues</h1>
                <h2>{selectedItem?.issues.totalCount}</h2>
              </section>
              <section>
                <h1 className={styles.modal_item_title}>Open Pull Requests</h1>
                <h2>{selectedItem?.pullRequests.totalCount}</h2>
              </section>
            </article>
            <footer>
              <PrimaryButton submit={() => props.toggleModalState()} title={'Fechar'} />
            </footer>
          </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);