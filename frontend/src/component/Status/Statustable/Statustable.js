import styles from "./Statustable.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Statustable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://smiling-robin-smashing.ngrok-free.app/api/siswa/');
                setUsers(response.data.data);
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

    return (
        <div className={styles.container}>
            <h1 className={styles.Statustable__title}>Students Statistic Table</h1>
            <h2 className={styles.Statustable__desc}>Here you can get Students statistic table</h2>
            <table className={styles.Statustable__table}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID Number</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, index) => (
                        <tr key={data.id_siswa}>
                            <td>{index + 1}</td>
                            <td>{data.id_siswa}</td>
                            <td>{data.nama_siswa}</td>
                            <td>{data.kelas}</td>
                            <td><img src={data.foto} alt={data.nama_siswa} style={{ width: '100px', height: 'auto' }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Statustable;