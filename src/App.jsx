import React from 'react';

import styles from './App.module.css';
import Modal from './components/Modal';

function App(props) {
    const [show, toggleShow] = React.useState(false);

    const toggleModal = () => {
        toggleShow(!show);
    }
    return (
        <div id="app" className={styles.app}>
            <Modal show={show} toggleModal={toggleModal} />
            <button type="button" onClick={toggleModal}>
                {show ? 'Hide' : 'Show'} Modal
            </button>
        </div>
    );
}

export default App;
