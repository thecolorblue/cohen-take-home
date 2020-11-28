import { Breadcrumb, Card, Checkbox, DatePicker, List, Select, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { taskSelector, taskFormStateSelector, Task, taskEditSelector, allTaskSelector, todoSelector } from '../../reducer/selectors';
import { toggleTaskForm, createTask, updateTask, removeTask } from '../../reducer/actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Tasks() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let params = useParams<{ id: string }>();
  let id = parseInt(params.id);
  let tasks = useSelector(taskSelector(id));
  let todo = useSelector(todoSelector).find(todo => todo.id === id);
  let allTasks = useSelector(allTaskSelector);
  let taskFormState = useSelector(taskFormStateSelector);
  let editTask = useSelector(taskEditSelector);
  const dispatch = useDispatch();

  const TaskLI = ({ task: { id, description, due, priority, status }, onChange }: { task: Task, onChange: any }):JSX.Element => (
    <List.Item key={id} className={`status-${status} priority-${priority}`}>
      <div className="row">
        {priority === 'high' && <div className="pri-high-label">priority: high</div>}
        {priority === 'medium' && <div className="pri-medium-label">priority: medium</div>}
        {priority === 'low' && <div className="pri-low-label">priority: low</div>}
        <Button disabled={status === 'done'} icon={<EditOutlined />} onClick={()=>dispatch(toggleTaskForm({ id, description, due, priority, status }))}></Button>
        <div className="full-width margin-h-10">
          {description}<br/>
          {due.fromNow()}<br/>
          <Checkbox
            checked={status === 'done'}
            onChange={onChange}
          ></Checkbox>
        </div>
        <Button icon={<DeleteOutlined />} onClick={()=>dispatch(removeTask(id))}></Button>
      </div>
    </List.Item>
  );

  const toggleTaskStatus = (task: Task) => {
    dispatch(updateTask(task.id,
      task.status === 'pending' ? 'done': 'pending'
    ));

    if (taskFormState) {
      dispatch(toggleTaskForm());
    }
  }

  const complete = (task: Task) => {
    if (editTask && editTask.id !== undefined) {
      dispatch(updateTask(editTask.id, task.status, task.description, task.due, task.priority));
    } else {
      dispatch(createTask({
        ...task,
        todo_id: id
      }));
    }

    dispatch(toggleTaskForm());
  }

  const error = (errors: any) => {
    console.log(errors);
  }

  const uniqueDescription = (_: any, value: string) => {
    if (editTask && value === editTask.description) {
      return Promise.resolve();
    }
    if (allTasks.map(task => task.description).includes(value)) {
      return Promise.reject('description must be unique');
    } else {
      return Promise.resolve();
    }
  }

  return (
    <Space direction="vertical">
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={`/todos`}>Todos</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Tasks for todo <i>"{todo && todo.title}"</i></Breadcrumb.Item>
    </Breadcrumb>
    <List
      header={<div>Tasks: <i>"{todo && todo.title}"</i></div>}
      bordered
      locale={{ emptyText: 'No Tasks' }}
      dataSource={tasks}
      renderItem={(task: Task) => <TaskLI task={task} onChange={()=>toggleTaskStatus(task)}/>}
    />
    {taskFormState && <Card title="Task form" extra={
      <Tooltip title="close form">
        <Button type="link" shape="circle" onClick={()=>{dispatch(toggleTaskForm())}} icon={<CloseCircleOutlined />} />
      </Tooltip>}>
      <Form
        {...layout}
        name="task"
        initialValues={editTask}
        onFinish={complete}
        onFinishFailed={error}
      >
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'description is required' },
            { required: true, validator: uniqueDescription }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="due"
          rules={[{ required: true, message: 'due date is required' }]}
        >
         <DatePicker showTime onChange={()=>{}} onOk={()=>{}} />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: 'priority is required' }]}
        >
          <Select style={{ width: 120 }} allowClear>
            <Select.Option value="low">Low</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="high">High</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>}
    {!taskFormState && <Button className="full-width" type="primary" htmlType="submit" icon={<PlusOutlined />} onClick={()=>{dispatch(toggleTaskForm())}} />}
    </Space>
  );
}