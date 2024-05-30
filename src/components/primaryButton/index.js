import styles from './primaryButton.module.css'


export const PrimaryButton = (props) => {
    const { title, submit } = props;

    return (
        <div onClick={submit} className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}