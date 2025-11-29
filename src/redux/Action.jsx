// actions.js
export const INCREMENT = 'Increment';
export const DECREMENT = 'Decrement';

export const increment = () => {
    return { type: INCREMENT };
};

export const decrement = () => {
    return { type: DECREMENT };
};
