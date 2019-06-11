import React from "react";

import styles from './Modal.module.css';
import Transition from "../Transition";
import Page1 from '../Page1';
import Page2 from '../Page2';
import Page3 from '../Page3';

function Modal(props) {
    const [step, changeStep] = React.useState(0);
    function renderTransitionSteps() {
        return [<Page1 />, <Page2 />, <Page3 />];
    };

    if (props.show) {
        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <span>Header</span>
                        <button onClick={props.toggleModal}>x</button>
                    </div>
                    <div className={styles.modalContent}>
                        <Transition step={step}>
                            {renderTransitionSteps()}
                        </Transition>
                    </div>
                    <div className={styles.footer}>
                        <button type="button" onClick={() => changeStep(step - 1)}>Previous Step</button>
                        <button type="button" onClick={() => changeStep(step + 1)}>Next Step</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

Modal.defaultProps = {
    toggleModal: () => { },
};

export default Modal;