import "./App.css";
import * as React from "react";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {v4 as uuidv4} from 'uuid';
import { ToastPorvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/todosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["alexandria"],
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastPorvider>
          <div
            className="App"
            style={{
              backgroundColor: "#b0e0e6",
              direction: "ltr",
              minHeight: "100vh",
            }}
          >
            <ToDoList></ToDoList>
          </div>
        </ToastPorvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
