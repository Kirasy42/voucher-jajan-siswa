import styles from "./Statustable.module.css"

function Statustable({users}) {
    return (
        <div className={styles.container}>
            <h1 className={styles.Statustable__title}>Player Statistic Table</h1>
            <h2 className={styles.Statustable__desc}>Here you can get Player statistic table</h2>
            <table className={styles.Statustable__table}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Account</th>
                        <th>Warn</th>
                        <th>Premium Coin</th>
                        <th>Playtime</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {Statusdata.map((data) => ( */}
                    {users.map((data) => (
                        <tr key={data.no}>
                            <td>{data.no}</td>
                            <td>{data.user}</td>
                            <td>{data.warn}</td>
                            <td>${data.coin}</td>
                            <td>{data.playhour} Hours</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Statustable;