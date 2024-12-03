import { useState } from "react";
import styles from "./AddMovie.module.css";
import { nanoid } from 'nanoid'

function AddMovie(props) {
    const {movies, setMovies} = props;

    // Define State Data Form
    const [formData, setFormData] = useState({
        title: "",
        date: "",
    });
    
    // Define State Data Error
    const [ errorData, setErrorData ] = useState({
        titleError: false,
        dateError: false,
    })

    // Deconstruct
    const {title, date} = formData;
    const {titleError, dateError} = errorData;

    function handleChange(e) {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });

        // Reset errro State when user start typing
        handleError(id, false);
    }

    function handleError(id, hasError) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            [`${id}Error`]: hasError
        }));
    }

    function validate() {
        let isValid = true;

        if (title === ""){
            handleError("title", true)
            isValid = false;
        }
        else if (date === ""){
            handleError("date", true)
            isValid = false;
        }
        else{
            handleError("date", false)
            handleError("title", false)
        }

        return isValid;
    }

    function addMovie() {
        const movie = {
            id: nanoid(), title: title,
            year: date, type: "Movie",
            poster: "https://picsum.photos/300/400",
        };

        console.log(movie);
        setMovies([...movies, movie]);
        handleError(false, false)
    }

    function handleSubmit(e) {
        e.preventDefault(e);

        validate() && addMovie();
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label>Title : </label>
                <input className={styles.input__form}
                    type="text"
                    id="title" 
                    value={title}
                    onChange={handleChange}
                />
                { titleError && <p>Title cannot empty!</p> }

                <label>Date : </label>
                <input className={styles.input__form}
                    type="text" 
                    id="date" 
                    value={date}
                    onChange={handleChange}
                />
                { dateError && <p>Date cannot empty!</p> }

                <button className={styles.button__form}>Add Movie New</button>
            </form>
        </div>
    )
}

export default AddMovie;