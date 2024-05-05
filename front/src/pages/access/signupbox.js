import React from 'react';
import AuthForm from './authform';

const SignUpBox = ({ isLogin, switchAccess }) => {
  const apiUrl = 'http://10.100.230.146:8080/api/auth/signup';

  return (
    <div
      className="signUpBox"
      style={{
        opacity: isLogin ? '0' : '1',
        pointerEvents: isLogin ? 'none' : 'auto',
      }}
    >
      <div className="title">MUNDONGO</div>
      <AuthForm
        apiUrl={apiUrl}
        initialFormData={{ displayName: '', email: '', password: '' }}
        successRedirect="/discover"
        errorMessage="Invalid signup :("
        isLogin={isLogin}
      />
      <div className="promptWrapper">
        <span className="prompt">Already have an account?</span>
        <a
          className="prompt"
          onClick={switchAccess}
          style={{ color: 'var(--promptColor)', fontWeight: 'bold' }}
        >
          &nbsp;Log in.
        </a>
      </div>
    </div>
  );
};

export default SignUpBox;
