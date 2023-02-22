import styles from "../styles/Confirmation.module.css"

const Confirmation = (props) => {
    return (
        <div className={styles.container}>
            <h2>{props.system}</h2>
            <p>{props.success ? "Success" : "Failure"}</p>
            <p>{props.message}</p>
        </div>
    )
}

export default Confirmation