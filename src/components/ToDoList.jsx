import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// icons
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

// grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

// text field
import TextField from '@mui/material/TextField';

// button
import Button from '@mui/material/Button';

// components
import ToDo from './ToDo';


// other libraries
import {v4 as uuidv4} from 'uuid';
import { TodosContext } from '../contexts/todosContext';
import { useContext } from 'react';

export default function ToDoList() {   

    const {todos,setTodos} =useContext(TodosContext);
    const [displayedTodosType,setDisplayedTodosType]=React.useState("all");
    const [task,setTask]=React.useState({title:"",details:""});

    React.useEffect(()=>{
        const storageTodos=JSON.parse(localStorage.getItem('todos')) ?? [];
        setTodos(storageTodos);
    },[])

    const completedTodos=todos.filter((todo)=>{
        return todo.isCompleted;
    })
    const notCompletedTodos=todos.filter((todo)=>{
        return !todo.isCompleted
    })

    let todosTobeRendered=displayedTodosType ==="all" ? todos:displayedTodosType==="non-completed"?notCompletedTodos:completedTodos;
    
    const todosList =todosTobeRendered.map((todo)=>{
        return <ToDo key={todo.id} todoInfo={todo} />
    })

    function changeDisplayedTodosType(event) {
        setDisplayedTodosType(event.target.value)
    }
  return (
      <Container maxWidth="md" >
        <Card sx={{ minWidth: 275 ,maxWidth:700,margin:"0 auto"}}>
            <CardContent >
                <Box component="section" >
                    <Typography variant='h2' color="text.primary" sx={{}} gutterBottom>مهامي</Typography>
                    <Divider/>
                </Box>
                {/* start filter buttons */}
                <ToggleButtonGroup
                    style={{direction:"ltr",marginTop:"30px"}}
                    value={displayedTodosType}
                    exclusive
                    onChange={changeDisplayedTodosType}
                    aria-label="text alignment"
                    color="primary"
                    >
                    <ToggleButton value="non-completed" >
                        غير منجز    
                    </ToggleButton>
                    <ToggleButton value="completed" >
                        منجز
                    </ToggleButton>
                    <ToggleButton value="all">
                        الكل
                    </ToggleButton>
                </ToggleButtonGroup>
                {/* end filter buttons */}

                {/* start all todos */}
                <div style={{maxHeight:"45vh",overflow:"scroll"}}>
                    {todosList}
                </div>
                {/* end all todos */}

                {/* start adding a new note */}
                <Grid container spacing={2} sx={{maxWidth:"100%",margin:"0 auto",marginTop:2}}>
                    <Grid xs={8} sx={{background:"white"}}>
                        <TextField
                            id="outlined-textarea"
                            value={task.title}
                            onChange={(event)=>{setTask({...task,title:event.target.value})}}
                            label="عنوان"
                            placeholder="اضف عنوان للمهمة:"
                            sx={{width:"100%"}}
                        />
                        <TextField
                            id="outlined-textarea"
                            value={task.details}
                            onChange={(event)=>{setTask({...task,details:event.target.value})}}
                            label="تفاصيل"
                            placeholder="اضف تفاصيل المهمة:"
                            // multiline
                            sx={{width:"100%",marginTop:1}}
                        />
                    </Grid>
                    <Grid xs={4} sx={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                        <Button variant="contained" disabled={task.title.length===0 && task.details.length===0} onClick={()=>{
                            let newTask ={id:uuidv4(),title:task.title,details:task.details,isCompleted:false}
                            const upTodos=[newTask,...todos];
                            setTodos(upTodos);
                            localStorage.setItem("todos",JSON.stringify(upTodos));
                            setTask({title:"",details:""}); 
                        }}>اضف مهمة</Button>
                    </Grid>
                </Grid>
                {/* end adding a new note */}

            </CardContent>
        </Card>
      </Container>
  );
}