import React, {useState, useEffect} from "react";
import { AddTareaForm } from "./components/AddTareaForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Tarea } from "./components/Tarea";
import axios from 'axios';
import { useState } from "react";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [tareas, setTarea] = useState([]);

  const fetchTareas = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTareas(data);
    } catch (err) {
      console.log(err);

    }
  };
  useEffect(() => {
    fetchTareas();
  }, []) 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTareaForm  fetchTareas={fetchTareas} />
      {tareas.map((tarea) => <Tarea tarea={tarea} key={tarea.id} fetchTareas={fetchTareas} />)}
    </ThemeProvider>
  );
}
