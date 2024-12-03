import styles from "./Movies.module.css";

function Movie() {
    return(
        <div className={styles.movie}>
            <img src="https://picsum.photos/300/400" alt="sebuah foto" className={styles.movie__image} />

            <h3 className={styles.movie__title}>Movie Title</h3>
            <p className={styles.movie__date}>Date Title</p>
        </div>
    );
}

export default Movie;
