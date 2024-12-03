import styles from "./Siswaform.module.css"
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useLocation } from "react-router-dom";

function Siswaform({users, setUsers}){
    const location = useLocation(); // Get the location object
    const user = location.state?.user; // Access the passed user data
    const [namaSiswa, setNamaSiswa] = useState("");
    const [foto, setFoto] = useState("");
    const [kelas, setKelas] = useState("");
    const [error, setError] = useState(null);
    const isEditing = Boolean(user); // Determine if we are editing

    useEffect(() => {
        if (user) {
            setNamaSiswa(user.nama_siswa);
            setFoto(user.foto);
            setKelas(user.kelas);
        }
    }, [user]);

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

        const userData = {
            nama_siswa: namaSiswa,
            foto: foto,
            kelas: kelas,
        };

        try {
            let response;

            if (isEditing) {
                response = await axios.put(`http://127.0.0.1:8000/api/siswa/${user.id_siswa}/`, userData);
            } else {
                // If adding a new user, send a POST request
                response = await axios.post('http://127.0.0.1:8000/api/siswa/', userData);
            }

            if (window.confirm(response.data.message + '\n\nWanna go to Home page?')){
                window.location.href = '/';
            } else {
                window.location.reload();
                // Update users state if needed
                if (user) {
                    // If editing, update the existing user in the state
                    setUsers(users.map(u => (u.id_siswa === user.id_siswa ? response.data.data : u)));
                } else {
                    // If adding a new user, add to the state
                    setUsers([...users, response.data.data]);
                }

                setNamaSiswa("");
                setFoto("");
                setKelas("");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "An error occurred"); // Use the message from the server if available
            } else if (err.request) {
                setError("No response from server. Please try again later.");
            }
            console.error('Error adding user:', err);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.Siswaform__image}>
                <img alt="sebuah gambar" src="https://unityassets4free.com/wp-content/uploads/al_opt_content/IMAGE/unityassets4free.com/wp-content/uploads/2024/09/rapid-template-rpg-768x512.webp.bv_resized_mobile.webp.bv.webp" />
            </div>

            <div className={styles.Siswaform__form}>
                <h1 className={styles.Siswaform__form__title}>{isEditing ? 'Update' : 'Add New'} Data Siswa</h1>

                <form onSubmit={handleSubmit}>
                    <label className={styles.Siswaform__form__label} htmlFor="nama_siswa">Nama Siswa</label>
                    <input className={styles.Siswaform__form__text} id="nama_siswa" type="text" value={namaSiswa} onChange={handleNamaSiswa} />

                    <label className={styles.Siswaform__form__label} htmlFor="kelas">Kelas</label>
                    <input className={styles.Siswaform__form__text} id="kelas" type="text" value={kelas} onChange={handleKelas} />

                    <label className={styles.Siswaform__form__label} htmlFor="foto">Foto URL</label>
                    <input className={styles.Siswaform__form__text} id="foto" type="text" value={foto} onChange={handleFoto} />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <input className={styles.Siswaform__form__submit} type="submit" value={isEditing ? 'Update' : 'Submit'} />
                </form>
                
            </div>
        </div>
    )
}

export default Siswaform;