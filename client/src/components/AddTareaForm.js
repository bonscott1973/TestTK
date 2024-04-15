import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { fetchTareas } from '../../../api/tarea';

export const AddTareaForm = ({fetchTareas}) => {
    const [nuevaTarea, setNuevaTarea] = useState("")

    const addNuevaTarea = async () => {
        try {
            await axios.post(API_URL, {
                name: nuevaTarea,
                completada: false,

            });
            await fetchTareas();
            setNuevaTarea("")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
            Mi Lista de Tareas
        </Typography>
        <div className='addTareaForm'>
            <TextField 
                size="small" 
                label="Tarea" 
                variant="outlined" 
                value={nuevaTarea} 
                onChange={(e) => setNuevaTarea(e.target.value)}
            />
            <Button 
                disabled={!nuevaTarea.length} 
                variant="outlined" 
                onClick={addNuevaTarea}
            >
                <AddIcon />
            </Button>
        </div>
    </div>
  )
}
