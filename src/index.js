import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { GeneralStore as generalStore } from './stores/GeneralStore';
import { UserStore as userStore } from './stores/UserStore';

const GeneralStore = new generalStore()
const UserStore = new userStore()


const stores = {
  GeneralStore,
  UserStore
}

ReactDOM.render(
    <Provider {...stores}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
