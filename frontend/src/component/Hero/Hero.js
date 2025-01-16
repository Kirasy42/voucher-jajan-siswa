import styles from "./Hero.module.css"

function Hero() {
    return(
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.hero__left}>
                    <h2 className={styles.hero__title}>Jajan Siswa System Administration</h2>
                    <h5 className={styles.hero__genre}>Kantin Nurul Fikri Amanah</h5>

                    <p className={styles.hero__description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra tellus. 
                        Fusce porttitor tristique lectus eu auctor. Suspendisse eu viverra ligula. 
                        Cras hendrerit neque sit amet leo pharetra sagittis. Ut placerat placerat nisi sit amet suscipit. 
                        Pellentesque eleifend erat massa, non faucibus sem eleifend eget. 
                        Nunc semper nibh est, id tempus nulla ullamcorper sed. 
                        Cras pretium cursus odio, in ultricies nulla efficitur sit amet. Fusce tristique tempor tortor vel dignissim.
                    </p>
                </div>

                <div  className={styles.hero__right}>
                    <img className={styles.hero__image} src="https://picsum.photos/id/42/200" alt="foto"/>
                </div>
            </section>
        </div>
    )
}

export default Hero;