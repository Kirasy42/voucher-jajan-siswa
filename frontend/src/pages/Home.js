// import Siswatable from "../component/Siswatable/Siswatable";
import Hero from "../component/Hero/Hero";
import Statusbox from "../component/Status/Statusbox/Statusbox";
import Statustable from "../component/Status/Statustable/Statustable";

function Home() {
    return(
        <div>
            <Hero />
            <Statusbox />
            <Statustable />
        </div>
    )
}

export default Home;