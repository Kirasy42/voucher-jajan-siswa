import styles from "./Statusform.module.css"
import { useState } from "react";
import axios from "axios"; // Import Axios

function Statusform({users, setUsers}){
    const [namaSiswa, setNamaSiswa] = useState("");
    const [foto, setFoto] = useState("");
    const [kelas, setKelas] = useState("");
    const [error, setError] = useState(null);

    function handleNamaSiswa(e) {
        setNamaSiswa(e.target.value);
    }

    function handleFoto(e) {
        setFoto(e.target.value);
    }

    function handleKelas(e) {
        setKelas(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (namaSiswa === "" || kelas === "") {
            setError("Nama Siswa and Kelas cannot be empty!");
            return;
        }

        // Prepare data to send
        const userData = {
            nama_siswa: namaSiswa,
            foto: foto,
            kelas: kelas,
        };

        try {
            // Make POST request to the Laravel API
            const response = await axios.post('http://127.0.0.1:8000/api/siswa/', userData); // Replace with your actual API URL

            alert(response.data.message);

            // Update users state if needed
            setUsers([...users, response.data.data]); // Assuming response.data.data contains the new user

            // Reset form fields
            setNamaSiswa("");
            setFoto("");
            setKelas("");

            window.location.reload();

        } catch (err) {
            console.error('Error adding user:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : "An error occurred");
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.Statusform__image}>
                <img alt="sebuah gambar" src="https://unityassets4free.com/wp-content/uploads/al_opt_content/IMAGE/unityassets4free.com/wp-content/uploads/2024/09/rapid-template-rpg-768x512.webp.bv_resized_mobile.webp.bv.webp" />
            </div>

            <div className={styles.Statusform__form}>
                <h1 className={styles.Statusform__form__title}>Add New Siswa</h1>

                <form onSubmit={handleSubmit}>
                    <label className={styles.Statusform__form__label} htmlFor="nama_siswa">Nama Siswa</label>
                    <input className={styles.Statusform__form__text} id="nama_siswa" type="text" value={namaSiswa} onChange={handleNamaSiswa} />

                    <label className={styles.Statusform__form__label} htmlFor="foto">Foto URL</label>
                    <input className={styles.Statusform__form__text} id="foto" type="text" value={foto} onChange={handleFoto} />

                    <label className={styles.Statusform__form__label} htmlFor="kelas">Kelas</label>
                    <input className={styles.Statusform__form__text} id="kelas" type="text" value={kelas} onChange={handleKelas} />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <input className={styles.Statusform__form__submit} type="submit" value="Submit" />
                </form>
                
            </div>
        </div>
    )
}

export default Statusform;