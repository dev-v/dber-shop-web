import dva from 'dva';
import {message} from 'antd';
import './index.css';
import {setApp} from './nav/Component';
import createBrowserHistory from 'history/createBrowserHistory';

const app = dva({
  history: createBrowserHistory(),
  onError(e) {
    message.error(e.message);
    console.log(e);
  },
});

setApp(app);

app.model(require('./models/login'));

app.router(require('./router'));

app.start('#root');
