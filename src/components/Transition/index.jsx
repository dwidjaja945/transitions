import React from "react";

import styles from './Transition.module.css';

const FORWARDS = 'forwards'
const BACKWARDS = 'backwards';

const reducer = (state, action) => {
    switch (action.type) {
        case 'children':
            return { ...state, children: action.payload }
        case 'direction':
            return { ...state, direction: action.payload };
        case 'step':
            return { ...state, step: action.payload };
        case 'nextStep':
            return { ...state, nextStep: action.payload }
        default:
            throw new Error(`Invalud type: ${action.type}`);
    }
};

/**
 * 
 * @param {step} props.step This is the step that will be currently displayed and used as reference to the next step as to which direction it should transition to
 * @param {nextStep} props.nextStep This is the next step that will be displayed if moving forward.
 */

function Transition(props) {
    const initialState = {
        step: props.step,
        direction: FORWARDS,
        children: props.children,
        nextStep: null
    };
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const directionObj = {
            type: 'direction',
        };
        if (state.step > props.step) {
            directionObj.payload = BACKWARDS;
            dispatch(directionObj);
        } else {
            directionObj.payload = FORWARDS;
            dispatch(directionObj);
        }
        dispatch({ type: 'step', payload: props.step });
    }, [props.step]);


    function determineInOrOut(isNewStep) {
        if (isNewStep) {
            if (state.direction === FORWARDS) {
                return styles.entering
            }
            return styles.backwardEntering
        }
        if (state.direction === FORWARDS) {
            return styles.exiting
        }
        return styles.backwardExiting
    }

    return (
        <>
            <div className={`${determineInOrOut(false)} ${styles.currentStep} ${styles.component}`}>
                {state.children[props.step]}
            </div>
            <div className={`${determineInOrOut(true)} ${styles.component}`}>
                {props.children[state.nextStep]}
            </div>
        </>
    );
}

export default Transition;