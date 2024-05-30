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

const App = (props) => {
  const [searchItem, setSearchItem] = React.useState("");
  const [repositories, setRepositories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [error, setError] = React.useState(false);
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

        if (repositories.length === 0) {
          setError(true)
        }
      } catch (error) {
        console.log('cafasdasd')
        setError(true)
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
          <div className={styles.repositories_content}>
              {RepositoriesOptions}
          </div>
      } 
      </div>
      <Modal setIsModalOpen={() => props.toggleModalState()} isModalOpen={props.isModalOpen}>
        <div className={styles.modal_container}>
          <header style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.modal_image_container}>
              <img
                src={selectedItem?.owner?.avatarUrl}
                alt={selectedItem?.owner?.login}
                className={styles.modal_image}
              />
              <h1>{selectedItem?.name}</h1>
            </div>
            <div className={styles.modal_description}>
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
            <button onClick={() => props.toggleModalState()}>Close</button>
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