import React from 'react';
import { connect } from 'react-redux';
import { toggleModalState, toggleTheme } from '../../actions';
import styles from './home.module.css'
import Header from '../../components/header'
import Input from '../../components/input'
import RepositoryBox from '../../components/repositoryBox';

const App = (props) => {

  const [searchItem, setSearchItem] = React.useState("");
  
  const handleChange = (event) => {
    setSearchItem(event.target.value);
};


  React.useEffect(() => {
    if (props.theme === 'dark') {
      document.documentElement.classList.add('dark_mode');
    } else {
      document.documentElement.classList.remove('dark_mode');
    }
  }, [props.theme]);

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

      <div className={styles.repositories_content}>
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifna loiansidnsa asndisandksa dsaindisandkas dsanisandkas wi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbak nsadinasd sanidsaid sadisndinsad sdnaisndsa dsaindiasd sadisnadss ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
        <RepositoryBox title={'titulo generico'} user={'LucasAlmeida09'} description={'BLA lbaks ii oeo lorem ipsum adl eifnawi'} submit={() => console.log('open modal')} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
  isModalOpen: state.modal.isModalOpen
});

export default connect(mapStateToProps, { toggleTheme, toggleModalState })(App);