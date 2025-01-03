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
                        <Link to="/siswa/create">Add Siswa</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/movie/popular">Popular</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/movie/now">Now Playing</Link>
                    </li>
                    <li className={styles.navbar__item}>
                        <Link to="/movie/top">Top Rated</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;