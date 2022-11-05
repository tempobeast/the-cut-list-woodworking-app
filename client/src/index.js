import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user'
import { ProjectsProvider } from './context/projects'
import { ProjectToUpdateProvider } from './context/projectToUpdate';
import { ErrorsProvider } from './context/errors';

ReactDOM.render(
  <BrowserRouter>
    <ErrorsProvider>
      <UserProvider>
        <ProjectsProvider>
          <ProjectToUpdateProvider>
            <App />
          </ProjectToUpdateProvider>
        </ProjectsProvider>
      </UserProvider>
    </ErrorsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
