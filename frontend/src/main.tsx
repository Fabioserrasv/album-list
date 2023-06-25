import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';

import 'dayjs/locale/pt-br';
import locale from 'antd/locale/pt_PT';

import { App } from './App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>;
  </React.StrictMode>,
)
