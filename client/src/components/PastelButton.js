import React from 'react';
import styles from './pastelButton.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function PastelButton({ message, destination }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination); // Navigate to the destination specified by the prop
    };

    return (
        <div>
            <button className={styles.pastelButton} onClick={handleClick}>
                <span>
                    <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
                </span>
                <p className={styles.pastelButtonText}>{message}</p>
            </button>
        </div>
    );
}
