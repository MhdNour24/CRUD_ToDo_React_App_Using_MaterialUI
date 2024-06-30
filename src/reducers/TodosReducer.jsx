// other libraries
import {v4 as uuidv4} from 'uuid';

function TodosReducer(currenttodos,action) {
    switch(action.type){
        case "adding":
            {
                let newTask ={id:uuidv4(),title:action.payload.task.title,details:action.payload.task.details,isCompleted:false}
                const upTodos=[newTask,...currenttodos];
                localStorage.setItem("todos",JSON.stringify(upTodos));
                return upTodos;
            }
        case "deleting": {
                const newTodos=currenttodos.filter((todo)=>{
                    return todo.id !==action.payload.todoInfo.id;
                })
                
                localStorage.setItem("todos",JSON.stringify(newTodos));
                return newTodos;
        }
        case "updating": {
            const newtodos=currenttodos.map((todo)=>{
                if(todo.id===action.payload.todoInfo.id){ 
                    if(action.payload.updatedTodo.title.length>0){
                        todo.title=action.payload.updatedTodo.title;
                    }
                    if(action.payload.updatedTodo.details.length>0){
                        todo.details=action.payload.updatedTodo.details;
                    }
                }
                return todo;
            }) 
            localStorage.setItem("todos",JSON.stringify(newtodos)); 
            return newtodos
        }
        case "get": 
            const storageTodos=JSON.parse(localStorage.getItem('todos')) ?? [];
            return storageTodos;
        case "checking":{
            const updatedTodos=currenttodos.map((todo)=>{
                if(todo.id===action.payload.todoInfo.id) {
                    const updatedTodo={...todo,isCompleted:!todo.isCompleted}
                    return updatedTodo; 
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(updatedTodos));
            return updatedTodos
        }
        default:{
            throw Error("unknown action type " + action.type)
        }
            
    }
}

export default TodosReducer