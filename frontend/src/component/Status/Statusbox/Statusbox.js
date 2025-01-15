import styles from "./Statusbox.module.css"
import { Statusdata } from "../Statusdata";

function Statusbox() {
    const totalSiswa = Statusdata.length;
    const totalTransactions = Statusdata.reduce((acc, current) => acc + current.transactions, 0);
    const totalVouchers = Statusdata.reduce((acc, current) => acc + current.vouchers, 0);

    return(
        <div className={styles.container}>
            <h1 className={styles.StatBox__title}>Global Players Data</h1>
            <h3 className={styles.StatBox__desc}>Current Global Players Data</h3>

            <div className={styles.StatBox__status}>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total Siswa</h3>
                    <div className={styles.number}>{totalSiswa}</div>
                </div>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total Transactions</h3>
                    <div className={styles.number}>{totalTransactions}</div>
                </div>
                <div className={styles.StatBox__box}>
                    <h3 className={styles.StatBox__box__title}>Total Playing Hours</h3>
                    <div className={styles.number}>{totalVouchers}</div>
                </div>
            </div>
        </div>
    )
}

export default Statusbox;