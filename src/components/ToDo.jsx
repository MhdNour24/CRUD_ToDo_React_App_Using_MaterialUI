import React from 'react'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { ToastContext } from '../contexts/ToastContext';

import { TodosContext } from '../contexts/todosContext';
import { useContext } from 'react';



function ToDo({todoInfo,showDelete,showUpdate}) {
    const {todos,dispatch}=useContext(TodosContext);
    const {showHideToast} =useContext(ToastContext)

    function handleCheckClick() {
        dispatch({type:"checking",payload:{todoInfo}})
        todoInfo.isCompleted? showHideToast("تم الاضافة الى المهمات المنجزة بنجاح"):showHideToast("تم الغاء الاضافة الى المهمات المنجزة")
    }


  return (
    <>
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
                                <IconButton aria-label="delete"  sx={{color:"#b23c17",background:"white"}} onClick={()=>{
                                    showDelete(todoInfo)
                                }}>
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>
                                <IconButton sx={{color:"#1769aa",background:"white"}} onClick={()=>{
                                    showUpdate(todoInfo)
                                }}>
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


