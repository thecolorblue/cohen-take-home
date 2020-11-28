const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3030

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [{id: 1, title: 'Cohen Interview Assignment'}];
let tasks = [];
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/todos', (req, res) => {
  return res.status(200).send(todos);
});

app.post('/todos', (req, res) => {
  todos.push({
    ...req.body,
    id: randomInt(1000,9999)
  });
  return res.status(200).send(todos);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);

  if (!todo) {
    return req.status(400);
  }

  Object.assign(todo, req.body);

  return res.status(200).send(todos);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id != req.params.id);

  return res.status(200).send(todos);
});

app.get('/tasks', (req, res) => {
  return res.status(200).send(tasks);
});

app.post('/tasks', (req, res) => {
  tasks.push({
    ...req.body,
    status: 'pending',
    id: randomInt(1000,9999)
  });

  return res.status(200).send(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(task => task.id == req.params.id);

  if (!task) {
    return res.status(400);
  }

  Object.assign(task, req.body);

  return res.status(200).send(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);

  return res.status(200).send(tasks);
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);