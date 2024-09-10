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

    const { todos, dispatch } = useContext(TodosContext);
    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const [task, setTask] = useState({ title: "", details: "" });
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [todoInfo, setTodoInfo] = useState(null);
    const [updatedTodo, setUpdatedTodo] = useState({ title: "", details: "" });

    const { showHideToast } = useContext(ToastContext);

    useEffect(() => { 
        dispatch({ type: "get" });
    }, []);

    const completedTodos = useMemo(() => todos.filter(todo => todo.isCompleted), [todos]);
    const notCompletedTodos = useMemo(() => todos.filter(todo => !todo.isCompleted), [todos]);

    const todosToBeRendered = displayedTodosType === "all" ? todos : displayedTodosType === "non-completed" ? notCompletedTodos : completedTodos;

    function changeDisplayedTodosType(event) {
        setDisplayedTodosType(event.target.value);
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
        dispatch({ type: "deleting", payload: { todoInfo } });
        handleCloseDeleteDialog();
        showHideToast("Successfully deleted");
    }

    // handle update
    function handleUpdateButton() {
        dispatch({ type: "updating", payload: { todoInfo, updatedTodo } });
        setUpdatedTodo({ title: "", details: "" });
        handleCloseUpdateDialog(); 
        showHideToast("Successfully updated");
    }

    function handleAddButton() {
        dispatch({ type: "adding", payload: { task } });
        setTask({ title: "", details: "" }); 
        showHideToast("New task added successfully");
    }

    const handleClickOpenUpdateDialog = (todo) => {
        setTodoInfo(todo);
        setOpenUpdate(true);
    };
    
    const handleCloseUpdateDialog = () => {
        setOpenUpdate(false);
    };

    const todosList = todosToBeRendered.map((todo) => {
        return <ToDo key={todo.id} todoInfo={todo} showDelete={handleClickOpenDeleteDialog} showUpdate={handleClickOpenUpdateDialog} />;
    });

    return (
        <>
            {/* Delete Dialog */}
            <Dialog
                open={openDelete}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this task?"} 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once deleted, this action cannot be undone. Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Close</Button>
                    <Button onClick={handleDeleteButton}>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Update Dialog */}
            <Dialog
                open={openUpdate}
                onClose={handleCloseUpdateDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleCloseUpdateDialog();
                    },
                }}
            >
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={updatedTodo.title}
                        onChange={(event) => setUpdatedTodo({ ...updatedTodo, title: event.target.value })}
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={updatedTodo.details}
                        onChange={(event) => setUpdatedTodo({ ...updatedTodo, details: event.target.value })}
                        margin="dense"
                        label="Details"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdateDialog}>Close</Button>
                    <Button onClick={handleUpdateButton}>Update</Button>
                </DialogActions>
            </Dialog>  

            {/* Main Todo List */}
            <Container maxWidth="md">
                <Card sx={{ minWidth: 275, maxWidth: 700, margin: "0 auto" }}>
                    <CardContent>
                        <Typography variant='h2' color="text.primary" gutterBottom>Your Tasks</Typography>
                        <Divider />

                        {/* Filter buttons */}
                        <ToggleButtonGroup
                            value={displayedTodosType}
                            exclusive
                            onChange={changeDisplayedTodosType}
                            aria-label="text alignment"
                            color="primary"
                            sx={{ marginTop: "30px" }}
                        >
                            <ToggleButton value="non-completed">Not Completed</ToggleButton>
                            <ToggleButton value="completed">Completed</ToggleButton>
                            <ToggleButton value="all">All</ToggleButton>
                        </ToggleButtonGroup>

                        {/* Tasks List */}
                        <div style={{ maxHeight: "45vh", overflow: "scroll" }}>
                            {todosList}
                        </div>

                        {/* Add a new task */}
                        <Grid container spacing={2} sx={{ maxWidth: "100%", marginTop: 2 }}>
                            <Grid xs={8}>
                                <TextField
                                    value={task.title}
                                    onChange={(event) => setTask({ ...task, title: event.target.value })}
                                    label="Title"
                                    placeholder="Add a task title:"
                                    sx={{ width: "100%" }}
                                />
                                <TextField
                                    value={task.details}
                                    onChange={(event) => setTask({ ...task, details: event.target.value })}
                                    label="Details"
                                    placeholder="Add task details:"
                                    sx={{ width: "100%", marginTop: 1 }}
                                />
                            </Grid>
                            <Grid xs={4} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    disabled={task.title.length === 0 && task.details.length === 0}
                                    onClick={handleAddButton}
                                >
                                    Add Task
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
