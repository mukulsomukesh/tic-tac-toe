import * as types from "./actionType"

const initialState = {

    isPlayModeSelected:false,
    playMode: ""

}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.SELECT_PLAY_MODE:
            return {
                ...state,
                playMode:payload,
                isPlayModeSelected:true
            };
        default:
            return state;    }

}
