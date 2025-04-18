import React from 'react';
import styles from './style/Community.module.css';

const Community = () => {
    return (
        <div id="rewards" className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <img src="/imgs/Csrowdfunding/Community/progressBlack.svg" alt="Work In Progress Icon" />
                </div>
                <div className={styles.textWrapper}>
                    <h2>Work In Progress</h2>
                </div>
            </div>
        </div>
    );
}

export default Community;
