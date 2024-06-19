import './App.css';
import * as React from 'react';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import {v4 as uuidv4} from 'uuid';

const theme = createTheme({
  typography:{
    fontFamily:[
      "alexandria"
    ]
  }
});
const initialTodos = [

  {
    id: uuidv4(),
    title: "إنهاء المشروع",
    details: "إكمال العرض التقديمي الخاص بمشروع الشركة وتسليمه قبل الموعد النهائي.",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "زيارة الطبيب",
    details: "زيارة طبيب الأسنان للفحص الدوري وتنظيف الأسنان.",
    isCompleted: false
  },
];

function App() {
  const [todos,setTodos]=React.useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      
      <div className="App"  style={{

        backgroundColor:"#b0e0e6",
        direction:"rtl",
        minHeight:"100vh"
        }} 
        >
          <TodosContext.Provider value={{todos:todos,setTodos:setTodos}}>
              <ToDoList></ToDoList>
          </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
 