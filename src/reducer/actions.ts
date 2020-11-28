import { Task, Todo } from "./selectors";

export const SYNC_TODO = 'SYNC_TODO';
export const RECEIVED_TODO = 'RECEIVED_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODOFORM = 'TOGGLE_TODOFORM';
export const UPDATE_TODO ='UPDATE_TODO';
export const SYNC_TASK = 'SYNC_TASK';
export const RECEIVED_TASK = 'RECEIVED_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASKFORM = 'TOGGLE_TASKFORM';
export const UPDATE_TASK ='UPDATE_TASK';

export const removeUndefined = (obj: { [x: string]: any; }) => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
  return obj;
};

export const syncTodos = () => ({ type: SYNC_TODO });

export const receivedTodos = (todos: Todo[])=> ({ type: RECEIVED_TODO, todos });

export const createTodo = (todo: any)=> ({ type: CREATE_TODO, todo });

export const removeTodo = (id: number) => ({ type: REMOVE_TODO, id });

export const toggleTodoForm = (todo?: Todo) => ({ type: TOGGLE_TODOFORM, todo });

export const updateTodo = (id: number, title: string)=>({ type: UPDATE_TODO, id, update: { title } });

export const syncTasks = () => ({ type: SYNC_TASK });

export const receivedTasks = (tasks: Task[])=> ({ type: RECEIVED_TASK, tasks });

export const createTask = (task: any)=> ({ type: CREATE_TASK, task });

export const removeTask = (id: number) => ({ type: REMOVE_TASK, id });

export const toggleTaskForm = (task?: Partial<Task>)=>({ type: TOGGLE_TASKFORM, task });

export const updateTask = (
  id: number, status: string, description?:string,
  due?: moment.Moment, priority?: string) =>
  ({
    type: UPDATE_TASK,
    id,
    update: removeUndefined({
      status, description,
      due, priority
    })
  });