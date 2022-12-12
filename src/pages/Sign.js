import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Sign.scss';

const Sign = () => {
  const navigate = useNavigate();
  // 회원가입 State
  const [email_SignUp, setEmail_SignUp] = useState('');
  const [password_SignUp, setPassword_SignUp] = useState('');
  // 회원가입 유효성 검사
  const [isEmail_SignUp, setIsEmail_SignUp] = useState(false);
  const [isPassword_SignUp, setIsPassword_SignUp] = useState(false);
  const [emailErr_SignUp, setEmailErr_SignUp] = useState('');
  const [passwordErr_SignUp, setPasswordErr_SignUp] = useState('');

  // 로그인 State
  const [email_SignIn, setEmail_SignIn] = useState('');
  const [password_SignIn, setPassword_SignIn] = useState('');
  // 로그인 유효성 검사
  const [isEmail_SignIn, setIsEmail_SignIn] = useState(false);
  const [isPassword_SignIn, setIsPassword_SignIn] = useState(false);
  const [emailErr_SignIn, setEmailErr_SignIn] = useState('');
  const [passwordErr_SignIn, setPasswordErr_SignIn] = useState('');

  // 이메일 입력 이벤트 - 회원가입
  const onChangeEmail_SignUp = useCallback(e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const emailCurrent = e.target.value;
    setEmail_SignUp(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailErr_SignUp('이메일 형식이 틀렸습니다');
      setIsEmail_SignUp(false);
    } else {
      setEmailErr_SignUp('');
      setIsEmail_SignUp(true);
    }
  }, []);
  // 비밀번호 입력 이벤트 - 회원가입
  const onChangePassword_SignUp = useCallback(e => {
    const passwordCurrent = e.target.value;
    setPassword_SignUp(passwordCurrent);

    if (passwordCurrent.length <= 7) {
      setPasswordErr_SignUp('비밀번호 형식이 틀렸습니다');
      setIsPassword_SignUp(false);
    } else {
      setPasswordErr_SignUp('');
      setIsPassword_SignUp(true);
    }
  }, []);
  // 회원가입 요청 이벤트
  const onSignUp = e => {
    e.preventDefault();
    axios
      .post('https://pre-onboarding-selection-task.shop/auth/signup', {
        email: email_SignUp,
        password: password_SignUp,
      })
      .then(res => {
        console.log('회원가입 성공');
        console.log(res);
        alert('회원가입 완료');
        setEmail_SignUp('');
        setPassword_SignUp('');
        setIsEmail_SignUp(false);
        setIsPassword_SignUp(false);
      })
      .catch(err => {
        console.error(err);
        alert('회원가입 실패');
      });
  };

  // 이메일 입력 이벤트 - 로그인
  const onChangeEmail_SignIn = useCallback(e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const emailCurrent = e.target.value;
    setEmail_SignIn(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailErr_SignIn('이메일 형식이 틀렸습니다');
      setIsEmail_SignIn(false);
    } else {
      setEmailErr_SignIn('');
      setIsEmail_SignIn(true);
    }
  }, []);
  // 비밀번호 입력 이벤트 - 로그인
  const onChangePassword_SignIn = useCallback(e => {
    const passwordCurrent = e.target.value;
    setPassword_SignIn(passwordCurrent);

    if (passwordCurrent.length <= 7) {
      setPasswordErr_SignIn('비밀번호 형식이 틀렸습니다');
      setIsPassword_SignIn(false);
    } else {
      setPasswordErr_SignIn('');
      setIsPassword_SignIn(true);
    }
  }, []);
  // 로그인 요청 이벤트
  const onSignIn = e => {
    e.preventDefault();
    axios
      .post('https://pre-onboarding-selection-task.shop/auth/signin', {
        email: email_SignIn,
        password: password_SignIn,
      })
      .then(res => {
        localStorage.setItem('LOGIN_JWT', res.data.access_token);
        navigate('/todo');
      })
      .catch(err => {
        console.error(err);
        alert('로그인 실패');
      });
  };

  return (
    <main id='sign_layout'>
      <form onSubmit={onSignUp}>
        <h1 className='formTitle'>회원가입</h1>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          placeholder='이메일을 입력하세요'
          value={email_SignUp}
          onChange={onChangeEmail_SignUp}
        />
        {emailErr_SignUp === '' ? (
          <p className='errMsg'></p>
        ) : (
          <p className='errMsg'>{emailErr_SignUp}</p>
        )}
        <label htmlFor='pw'>비밀번호</label>
        <input
          type='password'
          placeholder='비밀번호를 입력하세요'
          value={password_SignUp}
          onChange={onChangePassword_SignUp}
        />
        {passwordErr_SignUp === '' ? (
          <p className='errMsg'></p>
        ) : (
          <p className='errMsg'>{passwordErr_SignUp}</p>
        )}
        {isEmail_SignUp && isPassword_SignUp ? (
          <button type='submit'>회원가입</button>
        ) : (
          <button type='submit' disabled>
            회원가입
          </button>
        )}
      </form>
      <form onSubmit={onSignIn}>
        <h1 className='formTitle'>로그인</h1>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          value={email_SignIn}
          placeholder='이메일을 입력하세요'
          onChange={onChangeEmail_SignIn}
        />
        {emailErr_SignIn === '' ? (
          <p className='errMsg'></p>
        ) : (
          <p className='errMsg'>{emailErr_SignIn}</p>
        )}
        <label htmlFor='pw'>비밀번호</label>
        <input
          type='password'
          value={password_SignIn}
          placeholder='비밀번호를 입력하세요'
          onChange={onChangePassword_SignIn}
        />
        {passwordErr_SignIn.length === 0 ? (
          <p className='errMsg'></p>
        ) : (
          <p className='errMsg'>{passwordErr_SignIn}</p>
        )}
        {isEmail_SignIn && isPassword_SignIn ? (
          <button type='submit'>로그인</button>
        ) : (
          <button type='submit' disabled>
            로그인
          </button>
        )}
      </form>
    </main>
  );
};

export default Sign;
