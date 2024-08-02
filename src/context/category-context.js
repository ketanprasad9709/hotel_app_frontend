import { createContext, useContext, useState } from "react";

const initialValue = "National Parks";

const categoryContext = createContext(initialValue);

const CategoryProvider = ({children}) => {

    const [state, setState] = useState(initialValue);

    return (
        <categoryContext.Provider value={{state, setState}}>
            {children}
        </categoryContext.Provider>
    )
}

const useCategory = () =>  useContext(categoryContext);

export { useCategory, CategoryProvider};