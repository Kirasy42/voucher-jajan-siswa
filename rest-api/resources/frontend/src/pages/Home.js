// import { useState } from "react";
import Statustable from "../component/Statustable/Statustable";
// import Hero from "../component/Hero/Hero";
// import Movies from "../component/Movies/Movies";
// import AddMovie from "../component/AddMovie/AddMovie";
// import data from "../util/constants/data"

function Home() {
    // const [movies, setMovies] = useState(data)

    return(
        <div>
            <Statustable />
            {/* <Hero />
            <Movies movies={movies} setMovies={setMovies} />
            <AddMovie movies={movies} setMovies={setMovies} /> */}
        </div>
    )
}

export default Home;