import React from 'react';
import { ChildrenProps } from '../types/interfaces';
import '../styles/layout.scss';
import { useHistory, useLocation } from 'react-router-dom';
import Header from './commons/Header';

const Layout = ({ children }: ChildrenProps) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="content">
      <div className="content__wrap-info">
        <div className="content__bg">
          <div className="content__logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
              alt="logo-marvel"
              onClick={() => {
                history.push('/');
              }}
            />
          </div>
        </div>
        {location.pathname  === '/' ? <></> : <Header />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
