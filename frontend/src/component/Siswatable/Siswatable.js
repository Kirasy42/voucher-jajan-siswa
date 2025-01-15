import styles from "./Siswatable.module.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Siswatable() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://smiling-robin-smashing.ngrok-free.app/api/siswa/`, {
                    headers: {'ngrok-skip-browser-warning': 'true'}
                });
                const siswaData = response.data.data;

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

    const handleDelete = async (item) => {
        try {
            if (window.confirm('Are you sure to Delete This data?\n\nID : ' + item.id_siswa + '\nNama Siswa : ' + item.nama_siswa + "\nKelas : " + item.kelas)){
                const response = await axios.delete(`https://smiling-robin-smashing.ngrok-free.app/api/siswa/${item.id_siswa}/`);
                setData(data.filter(item => item.id_siswa !== item));
                alert(response.data.message);
                window.location.reload();
            } 
        } catch (error) {
            console.error("Error deleting user:", error);
            if (error.response) {
                alert(error.response.data.message || "An error occurred while deleting the user.");
            } else {
                alert("No response from server. Please try again later.");
            }
        }
    };

    const handleEdit = (item) => {
        navigate('/siswa/create', { state: { user: item } });
    };

    const handleCreateVoucher = async (item) => {
        try {
            const response = await axios.post(`https://smiling-robin-smashing.ngrok-free.app/api/vouchers/make/${item.id_siswa}`);
            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error("Error creating Voucher: ", error);
            if (error.response) {
                alert(error.response.data.message || "An error occured while creating the Voucher!")
            } else {
                alert("No response from server! Please wait a while time.")
            }
        }
    };

    if (error) return (
        <div className={styles.container}>
            <h1 className={styles.Siswatable__title}>Siswa Data Table</h1>
            <h2 className={styles.Siswatable__desc}>Here you can get Table of Data Siswa</h2>
            <div>Error: {error.message}</div>;
        </div>
    );
    if (!Array.isArray(data) || data.length === 0) return (
    <div className={styles.container}>
            <h1 className={styles.Siswatable__title}>Siswa Data Table</h1>
            <h2 className={styles.Siswatable__desc}>Here you can get Table of Data Siswa</h2>
            <div>LOADING...</div>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.Siswatable__title}>Siswa Data Table</h1>
            <h2 className={styles.Siswatable__desc}>Here you can get Table of Data Siswa</h2>
            <table className={styles.Siswatable__table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Siswa</th>
                        <th>Foto</th>
                        <th>Kelas</th>
                        <th>Action</th>
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
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item)}>Delete</button>
                                <button onClick={() => handleCreateVoucher(item)}>Create Voucher</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Siswatable;