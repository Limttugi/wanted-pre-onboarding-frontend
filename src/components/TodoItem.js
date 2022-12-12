import {
  faPenToSquare,
  faSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

import '../styles/TodoItem.scss';
import isLoggedin from '../utils/isLoggedin';

const TodoItem = ({ todos }) => {
  const { id, todo, isCompleted, userId } = todos;
  const [todoContent, setTodoContent] = useState(todo);
  const [modifyFlag, setModifyFlag] = useState(false);
  // content 수정 이벤트
  const onChangeContent = useCallback(e => {
    setTodoContent(e.target.value);
  }, []);
  // updateTodo - 투 두 내용 수정
  const onUpdateTodo_Content = () => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        { todo: todoContent, isCompleted: isCompleted },
        { headers: { Authorization: `Bearer ${isLoggedin()}` } },
      )
      .then(res => {
        setModifyFlag(true);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };
  // updateTodo - 투 두 완료 Flag 수정
  const onUpdateTodo_Complete = () => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        { todo: todo, isCompleted: !isCompleted },
        { headers: { Authorization: `Bearer ${isLoggedin()}` } },
      )
      .then(res => {
        console.log(res);
        window.location.reload();
        alert('업데이트 완료');
      })
      .catch(err => console.error(err));
  };
  // deleteTodo
  const onDeleteTodo = () => {
    axios
      .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: { Authorization: `Bearer ${isLoggedin()}` },
      })
      .then(res => {
        console.log(res);
        window.location.reload();
        alert('삭제 완료');
      })
      .catch(err => console.error(err));
  };

  return (
    <li className='todoList'>
      {isCompleted ? (
        <FontAwesomeIcon
          className='todoFlag'
          icon={faSquareCheck}
          onClick={onUpdateTodo_Complete}
        />
      ) : (
        <FontAwesomeIcon
          className='todoFlag'
          icon={faSquare}
          onClick={onUpdateTodo_Complete}
        />
      )}
      {modifyFlag ? (
        <>
          <input
            type='text'
            className='todoContent modi'
            value={todoContent}
            onChange={onChangeContent}
          />
          <button onClick={onUpdateTodo_Content}>수정</button>
          <button
            onClick={() => {
              setModifyFlag(false);
              setTodoContent(todo);
            }}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <input type='text' className='todoContent' value={todo} disabled />
          <button className='visibleBtn' onClick={onUpdateTodo_Content}>
            수정
          </button>
          <button
            className='visibleBtn'
            onClick={() => {
              setModifyFlag(false);
              setTodoContent(todo);
            }}
          >
            취소
          </button>
        </>
      )}

      <div>
        <FontAwesomeIcon
          className='todoModify'
          icon={faPenToSquare}
          onClick={() => setModifyFlag(true)}
        />
        <FontAwesomeIcon
          className='todoDelete'
          icon={faTrashCan}
          onClick={onDeleteTodo}
        />
      </div>
    </li>
  );
};

export default TodoItem;
