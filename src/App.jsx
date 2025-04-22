import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Sidebar from './pages/sidebar/Sidebar';
import Header from './pages/header/Header';
import './App.scss';
import { useSelector } from 'react-redux';
import NewSidebar from './components/newSidebar/NewSidebar';

const App = () => {
    //npx prettier --write .
    const ignorePaths = [`/`, `/login`, `/newlogin`, `/resetpassword`, `/quote`,
        `/quoteProducts`, `/groupLifeQuote`, `/quoteSelect`, `/customerLogin`];
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(true);
    const token = useSelector(state => state?.tokenAndMenuList?.token);
    const [sampleVar, setSampleVar] = useState(10)
    const Rules = useSelector(state => state?.rules);

    // useEffect(() => {
    //     if (Rules?.rulesJSON !== null)
    //         console.log("Rulessss  : ", Rules?.rulesJSON)
    // }, [Rules])

    useEffect(() => {
        const checkPaths = ignorePaths.includes(location.pathname);
        setCurrentPath(checkPaths);


        // function getSessionStorageSize() {
        //     let total = 0;
        //     for (let key in sessionStorage) {
        //         if (sessionStorage.hasOwnProperty(key)) {
        //             total += (sessionStorage[key].length * 2); // Each character is 2 bytes in UTF-16
        //         }
        //     }
        //     return total; // Size in bytes
        // }

        // const sizeInBytes = getSessionStorageSize();
        // const sizeInKB = sizeInBytes / 1024;
        // const sizeInMB = sizeInKB / 1024;

        // console.log(`SessionStorage size: ${sizeInBytes} bytes, ${sizeInKB.toFixed(2)} KB, ${sizeInMB.toFixed(2)} MB`);
    }, [location.pathname]);

    const refreshToken = async () => {
        console.log("Call refresh token")
    }

    const startTokenRefreshInterval = () => {
        clearInterval(window.tokenRefreshInterval);
        window.tokenRefreshInterval = setInterval(() => {
            refreshToken();
        }, 5000);
    };

    // useEffect(() => {
    //     if (sampleVar) {
    //         console.log("sampleVar : ", sampleVar)
    //         startTokenRefreshInterval();
    //     }

    //     return () => {
    //         clearInterval(window.tokenRefreshInterval);
    //     };
    // }, [sampleVar]);

    const getRandomNumber = (min, max) => {
        if (min > max) {
            throw new Error('Min should be less than or equal to Max');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <div className='App'>
            {/* {!currentPath && <Sidebar />} */}
            <NewSidebar />
            {!currentPath && (
                <div className='header-content'>
                    <Header />
                </div>
            )}
            <div className={!currentPath ? `app-content` : ''}>
                {/* <button onClick={() => {
                    setSampleVar(getRandomNumber(1, 100))
                }}>sampleVar</button> */}
                <AppRouter />
            </div>
        </div>
    );
};

export default App;
