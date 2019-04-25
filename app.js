import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  'allowedHeaders': ['Content-Type'],
  'origin': '*',
  'preflightContinue': true
}));

app.get('/api/v1/todos', (req, res) => {
  console.log(`GET ${req.route.path}`);
  res.status(200).send(JSON.stringify(db))
});

app.post('/api/v1/todos', (req, res) => {
  console.log(`POST ${req.route.path}`);
  console.log(req.body)
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
 const todo = {
   id: db.length + 1,
   title: req.body.title,
   description: req.body.description,
   completed: false
 }
 db.push(todo);
 return res.status(201).send(JSON.stringify(db))
});

app.delete('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);
      return res.status(201).send(JSON.stringify(db))
    }
  });
  return res.status(404)
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
