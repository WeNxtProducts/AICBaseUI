import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store, { persistor } from './globalStore/persistConfig/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './index.css';

//basename={import.meta.env.VITE_CORE}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#2c99d6',
                    },
                }}>
                <BrowserRouter basename={import.meta.env.WENXT_CORE}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>,
);
