import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


// components
import { Alert, Button, IconButton, TextField } from "@mui/material";



// icons
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function App() {
  // variables / states
  const [status , setStatus] = useState('')
  const [task , setTask] = useState('');
  const [listarr , setListarr] = useState([])
  const [isdelete , setIsdelete] = useState(false)
  const [deleteindx , setDeleteindx] = useState(null)
  const [isedit , setIsedit] = useState(false)
  const [editindx , setEditindx] = useState(null)



  // input onchange func
  const handleInputCNG = (e)=>{
    setTask(e.target.value);
  }

  // add task to array
  const handleAdd = ()=>{
    if(task){
      setListarr([...listarr , task])
      setStatus('added')
      setTask('');
      setTimeout(() => {
        setStatus('')
      }, 1500);
    }
    else{
      setStatus('empty')
      setTimeout(() => {
        setStatus('')
      }, 2000);
    }
    
  }


  // delete a task func
  const handleAsk = (indx)=>{
    setIsdelete(true)
    setDeleteindx(indx)
  }
  const handleDelete = ()=>{
    listarr.splice(deleteindx , 1)
    setListarr([...listarr]);
    setIsdelete(false)
    setStatus('deleted')
    setTimeout(() => {
      setStatus('')
    }, 1200);
  }


  // edit set func
  const handleSetEdit = (indx)=>{
    setTask(listarr[indx])
    setIsedit(true)
    setEditindx(indx)
  }

  // edit func
  const handleEdit = ()=>{
    const editedarr = [...listarr]
    editedarr[editindx] = task;
    setListarr(editedarr)
    setIsedit(false)
    setTask('')
    setEditindx(null)
    setStatus('edited')
    setTimeout(() => {
      setStatus('')
    }, 1200);
  }

  return (
    <div className="main">

      {/* delete modal */}
      {isdelete && 
      <div className="modal">
        <h3>Are you sure to delete?</h3>
        <div className="btnbox">
          <Button variant="outlined" onClick={()=>setIsdelete(false)}>no , cancel</Button>
          <Button variant="contained" onClick={handleDelete}>yes , delete</Button>
        </div>
      </div>
      }
      <div className="taskmanagebar">
        <TextField
          id="filled-basic"
          label="Write"
          variant="filled"
          sx={{
            label: { color: "white" },
            ".css-voecp4-MuiInputBase-input-MuiFilledInput-input": { color: "white", paddingRight: '100px' },
            ".css-1pht7va-MuiInputBase-root-MuiFilledInput-root": {background: 'rgba(0, 0, 0, .35)'},
            width: '700px',
            height: '100%',
          }}
          onChange={handleInputCNG}
          value={task}
        />
        {isedit && <Button onClick={handleEdit} sx={{height: '100%' , position: 'absolute' , top:0 , right:0}} variant="contained" startIcon={<CheckCircleIcon />}>  done</Button>}
        {!isedit && <Button onClick={handleAdd} sx={{height: '100%' , position: 'absolute' , top:0 , right:0}} variant="contained" startIcon={<AddBoxIcon />}>  add</Button>}
        
      </div>
      {status == 'added' && <Alert className="alert" severity="success">Task added successfull.</Alert>}
      {status == 'empty' && <Alert className="alert" severity="error">Please write any note.</Alert>}
      {status == 'deleted' && <Alert className="alert" severity="info">Task deleted.</Alert>}
      {status == 'edited' && <Alert className="alert" severity="info">Task edited successfull.</Alert>}
      

      <ul>
      {listarr.map((item , indx)=>(
        <li key={indx}>{indx}. <div className="txtitem">{item} </div> <div className="iconbx"><IconButton onClick={()=>handleSetEdit(indx)} aria-label="edit"> <EditNoteIcon  sx={{color: 'white' , fontSize: '33px'}}/> </IconButton> <IconButton onClick={()=>handleAsk(indx)} aria-label="delete"> <DeleteIcon  sx={{color: 'white'}}/> </IconButton></div></li>
      ))}
      </ul>
    </div>
  );
}

export default App;
