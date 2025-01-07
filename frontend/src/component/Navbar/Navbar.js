import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    return(
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div>
                    <h1 className={styles.navbar__brand}>Navbar</h1>
                </div>

                <ul className={styles.navbar__list}>
                    <li className={styles.navbar__item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/siswa/list">List Siswa</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/siswa/create">Add Siswa</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/transaction/create">Transaction</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/transaction/list">Transaction List</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;