import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store, { persistor } from './globalStore/persistConfig/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
   <ConfigProvider
    theme={{
     token: {
      colorPrimary: '#2c99d6',
     },
    }}>
    <BrowserRouter basename={import.meta.env.VITE_CORE}>
     <App />
    </BrowserRouter>
   </ConfigProvider>
  </PersistGate>
 </Provider>,
);
