import axios from 'axios';
import moment from 'moment';
import { receivedTasks, receivedTodos, removeTask, removeTodo, removeUndefined, updateTask, updateTodo } from './actions';
import { Task, Todo } from './selectors';

const PORT = 3030;
const DOMAIN = `http://localhost:${PORT}`;

export function getTodos() {
  return (dispatch: (arg0: any) => any) => {
    return axios.get<Todo[]>(`${DOMAIN}/todos`)
    .then(response => response.data)
    .then((todos)=> dispatch(receivedTodos(todos)));
  }
}

export function asyncCreateTodo(todo: Todo) {
  return (dispatch: (arg0: { type: string; todos: Todo[]; }) => any) => axios.post<Todo[]>(`${DOMAIN}/todos`, todo)
    .then(response => response.data)
    .then((todos)=> dispatch(receivedTodos(todos)));
}

export function asyncUpdateTodo(id: number, title: string) {
  return (dispatch: (arg0: any) => any) => axios.put(`${DOMAIN}/todos/${id}`, { title })
    .then(()=> dispatch(updateTodo(id, title)));
}

export function asyncRemoveTodo(id: number) {
  return (dispatch: (arg0: any) => any) => axios.delete(`${DOMAIN}/todos/${id}`)
    .then(()=> dispatch(removeTodo(id)));
}

export function getTasks() {
  return (dispatch: (arg0: any) => any) => {
    return axios.get<Task[]>(`${DOMAIN}/tasks`)
      .then(response => response.data)
      .then((tasks)=> dispatch(receivedTasks(tasks.map(task => ({ ...task, due: moment(task.due) })))));
  }
}

export function asyncCreateTask(task: Task) {
  return (dispatch: (arg0: { type: string; tasks: Task[]; }) => any) => axios.post<Task[]>(`${DOMAIN}/tasks`, task)
  .then(response => response.data)
  .then((tasks)=> dispatch(receivedTasks(tasks.map(task => ({ ...task, due: moment(task.due) })))));
}

export function asyncUpdateTask(id: number, status: string, description?:string,
  due?: moment.Moment, priority?: string) {
  return (dispatch: (arg0: any) => any) => axios.put(`${DOMAIN}/tasks/${id}`, removeUndefined({ status, description, due, priority }))
    .then(() => dispatch(updateTask(id, status, description, due, priority)));
}

export function asyncRemoveTask(id: number) {
  return (dispatch: (arg0: { type: string; id: number; }) => any) => axios.delete(`${DOMAIN}/tasks/${id}`)
    .then(() => dispatch(removeTask(id)));
}
