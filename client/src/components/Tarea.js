import React, { useState } from 'react';
import { Button, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTareaForm } from './UpdateTareaForm';
import classnames from "classnames";
import axios from "axios";
import { API_URL } from '../utils';

export const Tarea = ({tarea, fetchTareas}) => {
  const {id, nombre, completada} = tarea;
  const [isComplete, setIsCompleted] = useState(completada)
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const handleUpdateTareaCompletion = async () => {
    try {
      await axios.put(API_URL, {id, nombre, completada: !isComplete,})
      setIsCompleted((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteTarea = async () => {
    try {
      await axios.delete(`${API_URL}/${tarea.id}`);
      await fetchTareas();
    } catch (error) {
      console.log(error)    
    }
  }

  return (
    <div className="tarea">
      <div className={classnames("flex", {
        done: isComplete
      })}>
      <Checkbox checked={isComplete} onChange={handleUpdateTareaCompletion} />
      <Typography variant='h4'> {nombre} </Typography>
      </div>
      <div className="tareaButtons">
      <Button variant='contained' onClick={() => setisDialogOpen(true)}>
        <EditIcon/>
      </Button>
      <Button color="error" variant='contained' onClick={handleDeleteTarea}>
        <DeleteIcon />
      </Button>
      </div>
      <UpdateTareaForm 
      fetchTareas = {fetchTareas}
        isDialogOpen={isDialogOpen} 
        setisDialogOpen={setisDialogOpen} 
        tarea={tarea}
      />
    </div>
  
  );
};
