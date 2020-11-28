import { CREATE_TODO, CREATE_TASK, UPDATE_TASK, UPDATE_TODO, TOGGLE_TODOFORM, TOGGLE_TASKFORM, REMOVE_TODO, REMOVE_TASK, RECEIVED_TODO, RECEIVED_TASK } from './actions';
import { State } from './selectors';

export default function reducer(state:State = {
  todoForm: false,
  taskForm: false,
  taskFormState: {},
  todoFormState: {},
  todos: [],
  tasks: []
}, action: any) {
  switch(action.type) {
    case RECEIVED_TODO:
      return { ...state, todos: action.todos };
    case RECEIVED_TASK:
      return { ...state, tasks: action.tasks };
    case CREATE_TODO:
      return {
        ...state,
        todos: [ ...state.todos, {
          ...action.todo
        }]
      };
    case REMOVE_TODO:
      state.todos.splice(state.todos.map(t => t.id).indexOf(action.id), 1);
      return {
        ...state,
        tasks: [ ...state.tasks.filter(task => task.todo_id !== action.id)],
        todos: [ ...state.todos]
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [ ...state.tasks, {
          ...action.task
        }]
      };
    case REMOVE_TASK:
      state.tasks.splice(state.tasks.map(t => t.id).indexOf(action.id), 1);
      return {
        ...state,
        tasks: [ ...state.tasks]
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoFormState: {},
        todos: state.todos.map(todo=> todo.id === action.id ? { ...todo, ...action.update } : todo)
      };
    case UPDATE_TASK:
      return {
        ...state,
        taskFormState: {},
        tasks: state.tasks.map(task=> task.id === action.id ? { ...task, ...action.update } : task)
      };
    case TOGGLE_TODOFORM:
      return { ...state, todoFormState: action.todo, todoForm: !state.todoForm };
    case TOGGLE_TASKFORM:
      return { ...state, taskFormState: action.task, taskForm: !state.taskForm };
    default:
      return state;
  }
}