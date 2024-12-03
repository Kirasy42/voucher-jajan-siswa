import Home from "./pages/Home"
import './App.css';
import { Route, Routes } from "react-router-dom";
import CreateSiswa from "./pages/siswa/Create";
import Popular from "./pages/siswa/Popular";
import NowPlaying from "./pages/siswa/NowPlaying";
import TopRated from "./pages/siswa/TopRated";
import Layout from "./Layout";


function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siswa/create" element={<CreateSiswa />} />
          <Route path="/movie/popular" element={<Popular />} />
          <Route path="/movie/now" element={<NowPlaying />} />
          <Route path="/movie/top" element={<TopRated />} />
        </Routes>
      </Layout>
      {/* <Home /> */}
    </div>
  );
}

export default App;
