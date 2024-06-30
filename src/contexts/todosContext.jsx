import { createContext ,useReducer} from "react";
import TodosReducer from '../reducers/TodosReducer';


export const TodosContext=createContext([]);

const TodosProvider=({children})=>{
    const [todos,dispatch] =useReducer(TodosReducer,[])
    return (
        <TodosContext.Provider value={{todos:todos,dispatch:dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}

export default TodosProvider;
