import Home from "./pages/Home"
import './App.css';
import { Route, Routes } from "react-router-dom";
import CreateSiswa from "./pages/siswa/Create";
import Transaction from "./pages/siswa/Transaction";
import ListSiswa from "./pages/siswa/ListSiswa";
import ListTransaction from "./pages/siswa/ListTransaction";
import Layout from "./Layout";


function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siswa/list" element={<ListSiswa />} />
          <Route path="/siswa/create" element={<CreateSiswa />} />
          <Route path="/transaction/create" element={<Transaction />} />
          <Route path="/transaction/list" element={<ListTransaction />} />
        </Routes>
      </Layout>
      {/* <Home /> */}
    </div>
  );
}

export default App;
