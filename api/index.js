
import express from 'express';
import  { fetchTareas, crearTareas, modificarTareas, eliminarTareas } from'./tarea';
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());

if(process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/tarea', async (req, res) => {
    try{
      const tareas = await fetchTareas();  
      res.send(tareas.Items);
    } catch(err) {
        res.status(400).send("Error leyendo tareas: $(err)");
    }
});

app.post('/tarea', async (req, res) => {
    try{
        const tarea = req.body;  
        const respuesta = await crearTareas(tarea);
        res.send(respuesta);
      } catch(err) {
          res.status(400).send("Error creando tareas: $(err)");
      }
});

app.put('/tarea', async (req, res) => {
    try{
        const tarea = req.body;  
        const respuesta = await modificarTareas(tarea);
        res.send(respuesta);
      } catch(err) {
          res.status(400).send("Error modificando tareas: $(err)");
      }
});

app.delete('/tarea/:id', async (req, res) => {
    try{
        const {id} = req.params;  
        const respuesta = await eliminarTareas(id);
        res.send(respuesta);
      } catch(err) {
          res.status(400).send("Error eliminando tareas: $(err)");
      }
});

if(process.env.DEVELOPMENT) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      });
}


export const handler = serverless(app);