import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import isLoggedin from '../utils/isLoggedin';
import TodoItem from '../components/TodoItem';

import '../styles/TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [listContent, setListContent] = useState('');
  // 투두 리스트 추가할 내용
  const onListContent = useCallback(e => {
    setListContent(e.target.value);
  }, []);
  // createTodo
  const onCreateTodo = e => {
    e.preventDefault();
    axios
      .post(
        'https://pre-onboarding-selection-task.shop/todos',
        {
          todo: listContent,
        },
        { headers: { Authorization: `Bearer ${isLoggedin()}` } },
      )
      .then(res => {
        console.log(res);
        getTodos();
        setListContent('');
        alert(listContent + ' 이[가] 추가되었습니다.');
      })
      .catch(err => console.error(err));
  };
  // getTodos
  const getTodos = () => {
    axios
      .get('https://pre-onboarding-selection-task.shop/todos', {
        headers: { Authorization: `Bearer ${isLoggedin()}` },
      })
      .then(res => {
        console.log(res);
        setTodos(res.data);
      })
      .catch(err => console.error(err));
  };
  // 페이지 처음 렌더링 시 getTodos
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main id='todo_layout'>
      <h4 id='layoutTitle'>투두 리스트</h4>
      <ul>
        {todos.map(todo => {
          return <TodoItem key={todo.id} todos={todo} />;
        })}
      </ul>
      <form onSubmit={onCreateTodo}>
        <h4 id='formTitle'>투두 리스트 추가</h4>
        <input
          type='text'
          placeholder='무엇을 할건가요?'
          value={listContent}
          onChange={onListContent}
        />
        <button type='submit'>추가</button>
      </form>
    </main>
  );
};

export default TodoList;
