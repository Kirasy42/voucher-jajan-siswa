import styles from "./Statusbox.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Statusbox() {
    const [totalSiswa, setTotalSiswa] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalVouchers, setTotalVouchers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [siswaResponse, voucherResponse, transaksiResponse] = await Promise.all([
                    axios.get('https://smiling-robin-smashing.ngrok-free.app/api/siswa/'), // Ganti dengan URL API Siswa Anda
                    axios.get('https://smiling-robin-smashing.ngrok-free.app/api/vouchers/'), // Ganti dengan URL API Voucher Anda
                    axios.get('https://smiling-robin-smashing.ngrok-free.app/api/transactions/') // Ganti dengan URL API Transaksi Anda
                ]);

                // Menghitung total siswa
                setTotalSiswa(siswaResponse.data.data.length);

                // Menghitung total transaksi
                setTotalTransactions(transaksiResponse.data.data.length);

                // Menghitung total voucher
                setTotalVouchers(voucherResponse.data.data.length);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.StatBox__title}>Global Data</h1>
            <h3 className={styles.StatBox__desc}>Current Global Data</h3>

            <div className={styles.StatBox__status}>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total Student Account</h3>
                    <div className={styles.number}>{totalSiswa}</div>
                </div>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total Transactions</h3>
                    <div className={styles.number}>{totalTransactions}</div>
                </div>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total All Vouchers</h3>
                    <div className={styles.number}>{totalVouchers}</div>
                </div>
            </div>
        </div>
    )
}

export default Statusbox;