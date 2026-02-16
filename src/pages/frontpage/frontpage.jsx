import MemoryGame from "../../components/memoryGame/memoryGame";
import styles from "./frontpage.module.css";

function Frontpage() {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Mette Rasmussen | Interactive Portfolio</h1>
        <MemoryGame />
        </div>
    )
}
export default Frontpage;
