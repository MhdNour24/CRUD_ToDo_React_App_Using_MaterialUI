import React from 'react'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

import { TodosContext } from '../contexts/todosContext';
import { useContext } from 'react';

// for dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ToDo({todoInfo}) {
    const {todos,setTodos} =useContext(TodosContext);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [updatedTodo,setUpdatedTodo] = React.useState({title:"",details:""})

    function handleCheckClick() {
        const updatedTodos=todos.map((todo)=>{
            if(todo.id===todoInfo.id) {
                todo.isCompleted=!todo.isCompleted;
            }
            return todo;
        })
        setTodos(updatedTodos);
        localStorage.setItem("todos",JSON.stringify(updatedTodos));
    }

    const handleClickOpenDeleteDialog = () => {
        setOpenDelete(true);
    };
  
    const handleCloseDeleteDialog = () => {
        setOpenDelete(false);
    };

    function handleDeleteButton() {
        const newTodos=todos.filter((todo)=>{
            if (todo.id !==todoInfo.id){
                return todo;
            }
        })
        
        setTodos(newTodos);
        localStorage.setItem("todos",JSON.stringify(newTodos));
        // handleCloseDeleteDialog();
    }
    function handleUpdateButton() {
        const newtodos=todos.map((todo)=>{
            if(todo.id===todoInfo.id){ 
                if(updatedTodo.title.length>0){
                    todo.title=updatedTodo.title;
                }
                if(updatedTodo.details.length>0){
                    todo.details=updatedTodo.details;
                }
                setUpdatedTodo({title:"",details:""})
            }
            return todo;
        }) 
        setTodos(newtodos);
        localStorage.setItem("todos",JSON.stringify(newtodos));
        handleCloseUpdateDialog(); 
    }
    const handleClickOpenUpdateDialog = () => {
        setOpenUpdate(true);
      };
    
      const handleCloseUpdateDialog = () => {
        setOpenUpdate(false);
      };
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

        <Card sx=
        {{
            transition:"all 0.3s ease",
             minWidth: 275 ,
             background:"#088da5",
             color:"white",
             marginTop:5,
             "&:hover":{
                backgroundColor: "#81d8d0", // تغيير لون الخلفية عند التمرير
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // إضافة ظل للبطاقة
                paddingTop:1,
                paddingBottom:1
             }
             }}>  
            <CardContent>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={2}>
                        <Grid xs={9} >
                            <Typography  sx={{textAlign:"right",textDecoration:todoInfo.isCompleted?"line-through":"none"}} variant='h5' >{todoInfo.title}</Typography>
                            <br />
                            <Typography  sx={{textAlign:"right"}} variant='h6' >{todoInfo.details}</Typography>
                        </Grid>
                        <Grid xs={3} >
                            {/* start action buttons */}
                            <Stack direction="row" sx={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                                <IconButton  sx={{
                                    background:todoInfo.isCompleted ? "#8bc34a" :"white",
                                    color:! todoInfo.isCompleted ? "#8bc34a" :"white",}}
                                    onClick={()=>{
                                        handleCheckClick();
                                    }}>
                                    <CheckCircleRoundedIcon />
                                </IconButton>
                                <IconButton aria-label="delete"  sx={{color:"#b23c17",background:"white"}} onClick={handleClickOpenDeleteDialog}>
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>
                                <IconButton sx={{color:"#1769aa",background:"white"}} onClick={handleClickOpenUpdateDialog}>
                                    <ModeEditOutlineRoundedIcon />
                                </IconButton> 
                            </Stack>
                            {/* end action buttons */}
                        </Grid>
                    </Grid>
                </Box>                
                {/* <Divider/> */}
            </CardContent>

        </Card>
    </>
  )
}

export default ToDo


