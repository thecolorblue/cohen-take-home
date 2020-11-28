import { Breadcrumb, Button, Card, Form, Input, List, Progress, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Todo, todoEditSelector, todoFormStateSelector, todoSelector } from '../../reducer/selectors';
import { createTodo, removeTodo, toggleTodoForm, updateTodo } from "../../reducer/actions";

export default function Todos() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let todos = useSelector(todoSelector);
  let todoFormState = useSelector(todoFormStateSelector);
  let editTodo = useSelector(todoEditSelector);
  const dispatch = useDispatch();

  const complete = (todo: Todo) => {
    if (editTodo && editTodo.id !== undefined) {
      dispatch(updateTodo(editTodo.id, todo.title));
    } else {
      dispatch(createTodo({
        ...todo
      }));  
    }

    dispatch(toggleTodoForm());
  }

  const error = (...args: any[]) => {
    console.log('error: ', args);
  }

  const uniqueTitle = (_: any, value: string) => {
    if (todos.map(todo => todo.title).includes(value)) {
      return Promise.reject('title must be unique');
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
      </Breadcrumb>
      <List
        header={<div>Todos: <small>(total: {todos.length})</small></div>}
        bordered
        locale={{ emptyText: 'No Todos' }}
        dataSource={todos}
        renderItem={({ id, title, progress, tasks }) => (
          <List.Item className={`status-${progress === 100 ? 'done': 'pending'}`}>
            <div className="row">
              <Button icon={<EditOutlined />} onClick={()=>dispatch(toggleTodoForm({ id, title, progress }))}></Button>
              <Link to={`/todo/${id}`} className="full-width margin-h-10">
        <span>{ title }</span> {tasks && <small>{tasks.filter(t=>t.status === 'done').length} completed</small>} / {tasks && <small>{tasks.length} task{tasks.length !== 1 ? 's': ''}</small>}
                {!!progress && <Progress percent={Math.round(progress)} />}
                {!progress && <Progress percent={0} />}
              </Link>
              <Button icon={<DeleteOutlined />} onClick={()=>dispatch(removeTodo(id))}></Button>
            </div>
          </List.Item>
        )}
      />
      {todoFormState && <Card title="Task form" extra={
        <Tooltip title="close form">
          <Button type="link" shape="circle" onClick={()=>{dispatch(toggleTodoForm())}} icon={<CloseCircleOutlined />} />
        </Tooltip>}>
        <Form
          name="basic"
          initialValues={editTodo}
          onFinish={complete}
          onFinishFailed={error}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'title is required' },
              { required: true, validator: uniqueTitle }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>}
      {!todoFormState && <Button className="full-width" type="primary" htmlType="submit" icon={<PlusOutlined />} onClick={()=>{dispatch(toggleTodoForm())}} />}
    </Space>
  );
}