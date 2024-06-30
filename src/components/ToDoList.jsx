import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

// text field
import TextField from '@mui/material/TextField';

// button
import Button from '@mui/material/Button';

// components
import ToDo from './ToDo';

// for dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// other libraries
import { useContext ,useMemo ,useEffect,useState} from 'react';
import { ToastContext } from '../contexts/ToastContext';
import {TodosContext} from '../contexts/todosContext';

export default function ToDoList() {   

    const {todos,dispatch}=useContext(TodosContext);
    const [displayedTodosType,setDisplayedTodosType]=useState("all");
    const [task,setTask]=useState({title:"",details:""});
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [todoInfo,setTodoInfo]=useState(null);
    const [updatedTodo,setUpdatedTodo] = useState({title:"",details:""})

    const {showHideToast} =useContext(ToastContext)
    
    useEffect(()=>{ 
        dispatch({type:"get"})
    },[])
    
    const completedTodos=useMemo(function () {
        return (todos.filter((todo)=>{
            return todo.isCompleted;
        }))
    },[todos])
    
    const notCompletedTodos=useMemo(function () {
        return (
            todos.filter((todo)=>{
                return !todo.isCompleted
            })
        )
    },[todos])

    let todosTobeRendered=displayedTodosType ==="all" ? todos:displayedTodosType==="non-completed"?notCompletedTodos:completedTodos;
    
    function changeDisplayedTodosType(event) {
        setDisplayedTodosType(event.target.value)
    }

    // handle delete 
    const handleClickOpenDeleteDialog = (todo) => {
        setTodoInfo(todo);
        setOpenDelete(true);
    };
  
    const handleCloseDeleteDialog = () => {
        setOpenDelete(false);
    };

    function handleDeleteButton() {
        dispatch({type:"deleting",payload:{todoInfo}})
        handleCloseDeleteDialog();
        showHideToast("تم الحذف بنجاح");
    }

    // handle update
    function handleUpdateButton() {
        dispatch({type:"updating",payload:{todoInfo,updatedTodo}})
        setUpdatedTodo({title:"",details:""})
        handleCloseUpdateDialog(); 
        showHideToast("تم التحديث بنجاح");
    }
    function handleAddButton() {
        dispatch({type:"adding",payload:{task}})
        setTask({title:"",details:""}); 
        showHideToast("تم اضافة مهمة جديدة بنجاح")
    }

    const handleClickOpenUpdateDialog = (todo) => {
        setTodoInfo(todo);
        setOpenUpdate(true);
      };
    
      const handleCloseUpdateDialog = () => {
        setOpenUpdate(false);
      };


    // rendering
    
    const todosList =todosTobeRendered.map((todo)=>{
        return <ToDo key={todo.id} todoInfo={todo} showDelete={handleClickOpenDeleteDialog} showUpdate={handleClickOpenUpdateDialog}/>
    })

  return (
    <>
        {/* start delete dialog */}
            <Dialog
                style={{direction:"rtl"}}
                open={openDelete}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"هل انت متاكد من رغبتك في حذف المهمة ؟"} 
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    لا يمكن التراجع عن الحذف في حال اختيار زر الحذف هل انت متاكد من حئف المهمة ؟
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  autoFocus onClick={handleCloseDeleteDialog}>
                        اغلاق
                    </Button>
                    <Button  onClick={handleDeleteButton}>حذف</Button>
                </DialogActions>
            </Dialog>
        {/* end delete dialog */}

        {/* start update dialog */}
            <Dialog
                style={{direction:"rtl"}}
                open={openUpdate}
                onClose={handleCloseUpdateDialog}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleCloseUpdateDialog();
                },
                }}
            >
                <DialogTitle>تعديل المهمة</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    value={updatedTodo.title}
                    onChange={(event)=>{
                        setUpdatedTodo({...updatedTodo,title:event.target.value})
                    }}
                    margin="dense"
                    id="title"
                    label="عنوان"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    value={updatedTodo.details}
                    onChange={(event)=>{
                        setUpdatedTodo({...updatedTodo,details:event.target.value})
                    }}
                    margin="dense"
                    id="details"
                    label="التفاصيل"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button  autoFocus onClick={handleCloseUpdateDialog}>
                        اغلاق
                    </Button>
                    <Button onClick={handleUpdateButton}>تحديث</Button>
                </DialogActions>
            </Dialog>  
        {/* end update dialog */}

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
                            handleAddButton()
                        }}>اضف مهمة</Button>
                    </Grid>
                </Grid>
                {/* end adding a new note */}

            </CardContent>
        </Card>
      </Container>
    </>
  );
}

// task