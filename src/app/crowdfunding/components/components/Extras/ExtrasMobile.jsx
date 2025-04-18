import React, { useEffect } from 'react';
import styles from './style/Extras.module.css';

const Extras = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
        <div id="rewards" className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <img src="/imgs/Crowdfunding/Community/progressBlack.svg" alt="Work In Progress Icon" />
                </div>
            </div>
        </div>
    );
}

export default Extras;
