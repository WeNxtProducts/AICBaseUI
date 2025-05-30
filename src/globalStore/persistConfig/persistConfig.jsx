import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';
import { encrypt, decrypt } from '../cryptoUtils/cryptoUtil';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        {
            in: state => encrypt(state),
            out: state => decrypt(state),
        },
    ],
    whitelist: ['menuSelected', 'tokenAndMenuList', 'id', 'UWId',
        'Receipt', 'Endo', 'SurrId', 'rules', 'reInsurance',
        'quote', 'grpQuote', 'quoteProdPlanCode'],//custPol
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configurePersistor = store => persistStore(store);
