import Container from "../component/Container";
import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";

function Layout(props) {
    return(
        <div>
            <Navbar />
            <main>
                <Container>{props.children}</Container>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;