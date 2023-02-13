import React, {useReducer , useContext , createContext} from "react";

export const stateContext=createContext();

export const StateProvider=({reducer , InitialState , children})=>(
    <stateContext.Provider value={useReducer(reducer , InitialState)}>
        {children}
    </stateContext.Provider>
)

export const useStateValue =() => useContext(stateContext)