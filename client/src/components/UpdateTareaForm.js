import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export const UpdateTareaForm = ({
    isDialogOpen, setIsDialogOpen, tarea}) => {
        const {id , completada } = tarea;
        const {tareaNombre, setTareaNombre} = useState("");
  return (
    <Dialog open={isDialogOpen}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <div className='dialog'>
            <TextField 
                size="small" 
                label="Tarea" 
                variant="outlined" 
                onChange={(e) => setTareaNombre(e.tarea.value)}
            />
            <Button 
                variant='contained' 
                onClick={() => {setIsDialogOpen(false);
                }}>
                <CheckIcon />
            </Button>
        </div>

    </Dialog>
  )
}
