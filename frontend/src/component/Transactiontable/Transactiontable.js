import styles from "./Transactiontable.module.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactiontable() {
    const [transaction, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
                const transactionData = response.data.data;

                if (Array.isArray(transactionData) && transactionData.length > 0) {
                    setTransactions(transactionData);
                } else {
                    throw new Error('No Transaction data available');
                }
            } catch (err) {
                console.error('Error fetching Transaction:', err.message);
                setError(err);
            }
        };
    
        fetchTransactions();
    }, []);

    if (error) return (
        <div className={styles.container}>
            <h1 className={styles.Transactiontable__title}>Transaction Data Table</h1>
            <h2 className={styles.Transactiontable__desc}>Here you can get Table of Data Transaction</h2>
            <div>Error: {error.message}</div>;
        </div>
    );
    if (!Array.isArray(transaction) || transaction.length === 0) return (
    <div className={styles.container}>
            <h1 className={styles.Transactiontable__title}>Transaction Data Table</h1>
            <h2 className={styles.Transactiontable__desc}>Here you can get Table of Data Transaction</h2>
            <div>No Transaction data available</div>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.Transactiontable__title}>Transaction Data Table</h1>
            <h2 className={styles.Transactiontable__desc}>Here you can get Table of Data transaction</h2>
            <table className={styles.Transactiontable__table}>
                <thead>
                    <tr>
                        <th>ID Transaksi</th>
                        <th>Biaya / Saldo</th>
                        <th>Nama Siswa (ID Voucher)</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map(transaction => (
                        <tr key={transaction.id_transaksi}>
                            <td>{transaction.id_transaksi}</td>
                            <td>Rp. {transaction.jumlah_pengurangan} / Rp. {transaction.sisa_saldo}</td>
                            <td>{transaction.nama_siswa} ({transaction.id_voucher})</td>
                            <td>{transaction.tanggal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactiontable;