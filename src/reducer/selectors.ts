import * as moment from 'moment';


export interface Task {
  id: number;
  todo_id: number;
  description: string;
  due: moment.Moment;
  priority: string;
  status: string;
}

export interface Todo {
  id: number;
  title: string;
  tasks?: Task[];
  progress?: number;
}

export interface State {
  todoForm: boolean;
  taskForm: boolean;
  todoFormState: Partial<Todo>;
  taskFormState: Partial<Task>;
  tasks: Task[];
  todos: Todo[];
}

export const taskSelector = (id: number) => (state: State):Task[] => state.tasks.filter(task => task.todo_id === id);
export const allTaskSelector = (state: State):Task[] => state.tasks;

export const taskFormStateSelector = (state: State):boolean => state.taskForm;

export const taskEditSelector = (state: State): any => state.taskFormState;

export const todoSelector = (state: State):Todo[] => {
  return state.todos
    .map(todo => {
      const tasks = taskSelector(todo.id)(state);

      return {
        ...todo,
        tasks,
        progress: (tasks.filter(task => task.status === 'done').length / tasks.length) * 100
      };
    });
};

export const todoFormStateSelector = (state: State):boolean => state.todoForm;

export const todoEditSelector = (state: State): any => state.todoFormState;
