import dva from 'dva';
import {message} from 'antd';
import './index.css';
import menu from './nav/menu';
import {set} from './nav/Component';
import createBrowserHistory from 'history/createBrowserHistory';

const app = dva({
  history: createBrowserHistory(),
  onError(e) {
    message.error(e.message);
    console.log(e);
  },
});

set(app, menu);

app.router(require('./router'));

app.start('#root');

// setTimeout(() => {
document.getElementById('preloader').remove();
// }, 2400);

