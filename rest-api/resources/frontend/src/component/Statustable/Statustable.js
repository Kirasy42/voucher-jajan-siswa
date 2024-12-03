import styles from "./Statustable.module.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// function Statustable({users}) {
function Statustable() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/siswa/');
                console.log(response.data); // Log the data

                const siswaData = response.data.data;

                // Check if the expected fields exist
                if (Array.isArray(siswaData) && siswaData.length > 0) {
                    setData(siswaData);
                } else {
                    throw new Error('No data available');
                }
            } catch (err) {
                console.error('Error fetching data:', err.message);
                setError(err);
            }
        };
    
        fetchData();
    }, []);

    if (error) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data) || data.length === 0) return <div>No data available</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.Statustable__title}>Siswa Data Table</h1>
            <h2 className={styles.Statustable__desc}>Here you can get Table of Data Siswa</h2>
            <table className={styles.Statustable__table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Siswa</th>
                        <th>Foto</th>
                        <th>Kelas</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id_siswa}>
                            <td>{item.id_siswa}</td>
                            <td>{item.nama_siswa}</td>
                            <td>
                                <a href={item.foto} target="_blank" rel="noopener noreferrer">
                                    <img src={item.foto} alt={item.nama_siswa} style={{ width: '100px', height: '100px' }} />
                                </a>
                            </td>
                            <td>{item.kelas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Statustable;