// other libraries
import {v4 as uuidv4} from 'uuid';
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
function TodosReducer(currenttodos,action) {
    switch(action.type){
        case "adding":
            {
                let newTask ={id:uuidv4(),title:action.payload.task.title,details:action.payload.task.details,isCompleted:false}
                const upTodos=[newTask,...currenttodos];
                return upTodos;
            }
        case "deleting": {
                const newTodos=currenttodos.filter((todo)=>{
                    return todo.id !==action.payload.todoInfo.id;
                })
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
            return newtodos
        }
        case "get": 
            return initialTodos;
        case "checking":{
            const updatedTodos=currenttodos.map((todo)=>{
                if(todo.id===action.payload.todoInfo.id) {
                    const updatedTodo={...todo,isCompleted:!todo.isCompleted}
                    return updatedTodo; 
                }
                return todo;
            })
            return updatedTodos
        }
        default:{
            throw Error("unknown action type " + action.type)
        }
            
    }
}

export default TodosReducer
