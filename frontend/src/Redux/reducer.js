import * as types from "./actionType"

const initialState = {

    isPlayModeSelected: false,
    playMode: "",
    totalGame: 0,
    xWon: 0,
    oWon: 0,
    draw: 0,

}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.SELECT_PLAY_MODE:
            return {
                ...state,
                playMode: payload,
                isPlayModeSelected: true
            };
        case types.O_WON:
            return {
                ...state,
                oWon: state.oWon + 1,
                totalGame: state.totalGame + 1,
            };
        case types.X_WON:
            return {
                ...state,
                xWon: state.xWon + 1,
                totalGame: state.totalGame + 1,
            };
        case types.DRAW:
            return {
                ...state,
                totalGame: state.totalGame + 1,
                draw:state.draw+1
            };
        default:
            return state;
    }

}
