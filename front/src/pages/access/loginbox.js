import React from 'react';
import AuthForm from './authform';

const LoginBox = ({ isLogin, switchAccess }) => {
  const apiUrl = 'http://10.100.230.146:8080/api/auth/login';

  return (
    <div
      className="loginBox"
      style={{
        opacity: isLogin ? '1' : '0',
        pointerEvents: isLogin ? 'auto' : 'none',
      }}
    >
      <div className="title">MUNDONGO</div>
      <AuthForm
        apiUrl={apiUrl}
        initialFormData={{ email: '', password: '' }}
        successRedirect="/discover"
        errorMessage="Invalid login :("
        isLogin={isLogin}
      />
      <div className="promptWrapper">
        <span className="prompt">Don't have an account yet?</span>
        <a
          className="prompt"
          onClick={switchAccess}
          style={{ color: 'var(--promptColor)', fontWeight: 'bold' }}
        >
          &nbsp;Sign up.
        </a>
      </div>
    </div>
  );
};

export default LoginBox;
