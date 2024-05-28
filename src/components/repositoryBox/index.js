import styles from './repositoryBox.module.css'
import { connect } from 'react-redux';

export const RepositoryBox = (props) => {
    const { title, user, description, submit } = props;
    const darkTheme = props.theme === 'dark'


    return (
        <div className={`${styles.container} ${darkTheme ? styles.dark_container : ''}`} onClick={submit}>
            <img
                src="https://avatars.githubusercontent.com/u/69631?v=4"
                alt="Descrição da Imagem"
                style={{ width: '80px', height: '80px', borderRadius: '10px' }}
             />
             <h2 style={{color: darkTheme ? 'white' : ''}} className={styles.user}>{user}</h2>
            <h1 style={{color: darkTheme ? '#B8C48D' : ''}} className={styles.title}>{title}</h1>
            <h3 style={{color: darkTheme ? 'white' : ''}} className={styles.description}>{description}</h3>
        </div>
    )
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
  });
  
  export default connect(mapStateToProps)(RepositoryBox);