import styles from "./Transactionform.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Transactionform({users, setUsers}){
    const location = useLocation();
    const user = location.state?.user;
    const [idSiswa, setIdSiswa] = useState("");
    const [idVoucher, setIdVoucher] = useState("");
    const [namaSiswa, setNamaSiswa] = useState("");
    const [sisaSaldo, setSisaSaldo] = useState("");
    const [totalBiaya, setTotalBiaya] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setError(null);
            setIdSiswa(user.id_siswa);
            setNamaSiswa(user.nama_siswa);
            fetchBalance(user.id_siswa);
        }
    }, [user]);

    const fetchBalance = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/balance/${id}`);
            setNamaSiswa(response.data.nama_siswa);
            setSisaSaldo(response.data.saldo);
            setIdVoucher(response.data.id_voucher);
            setError("");
        } catch (err) {
            setNamaSiswa(err.response?.data.nama_siswa);
            setSisaSaldo("");
            setError(err.response?.data.message);
        }
    };

    const handleIdSiswaChange = async (e) => {
        const id = e.target.value;
        setIdSiswa(id);

        if (id) {
            await fetchBalance(id);
        } else {
            setSisaSaldo("");
            setNamaSiswa("");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (totalBiaya === "") {
            setError("Total Biaya cannot be empty!");
            return;
        }

        const transactionData = {
            id_voucher: idVoucher,
            jumlah_pengurangan: totalBiaya
        };

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/transactions`, transactionData);


            if (window.confirm(response.data.message + '\n\nWanna go to Home page?')){
                window.location.href = '/';
            } else {
                window.location.reload();
                setUsers([...users, response.data.data]); // Add new transaction to users
                setIdSiswa("");
                setNamaSiswa("");
                setTotalBiaya("");
                setSisaSaldo("");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "An error occurred"); // Use the message from the server if available
            } else if (err.request) {
                setError("No response from server. Please try again later.");
            }
            console.error('Error adding transaction:', err);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.Transactionform__image}>
                <img alt="sebuah gambar" src="https://unityassets4free.com/wp-content/uploads/al_opt_content/IMAGE/unityassets4free.com/wp-content/uploads/2024/09/rapid-template-rpg-768x512.webp.bv_resized_mobile.webp.bv.webp" />
            </div>

            <div className={styles.Transactionform__form}>
                <h1 className={styles.Transactionform__form__title}>Add New Transactions</h1>

                <form onSubmit={handleSubmit}>
                <label className={styles.Transactionform__form__label}>ID Siswa:</label>
                    <input 
                        type="text" // or "number" if IDs are strictly numeric
                        value={idSiswa} 
                        onBlur={handleIdSiswaChange} // Use onBlur instead of onFocusOut
                        onChange={(e) => setIdSiswa(e.target.value)} // Keep onChange to allow typing
                        className={styles.Transactionform__form__input}
                        required
                    />

                    <label className={styles.Transactionform__form__label} >Nama Siswa</label> {/* Setelah ID siswa di isi, Nama siswa akan muncul sesuai dengan IDnya */}
                    <input type="text" value={namaSiswa} readOnly className={styles.Transactionform__form__input} />

                    <label className={styles.Transactionform__form__label} >Sisa Saldo</label> {/* Setelah ID siswa di isi, Sisa Saldo dari Voucher hari tersebut juga akan muncul sesuai dengan IDnya. Jika Siswa tersebut belum punya Voucher untuk hari tersebut, beri tahu */}
                    <input type="text" value={sisaSaldo} readOnly className={styles.Transactionform__form__input} />

                    <label className={styles.Transactionform__form__label} >Total Biaya Transaksi</label>
                    <input type="number" value={totalBiaya} onChange={(e) => setTotalBiaya(e.target.value)} className={styles.Transactionform__form__input} required />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <input className={styles.Transactionform__form__submit} type="submit" value={'Submit'} />
                </form>
                
            </div>
        </div>
    )
}

export default Transactionform;