import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import './NewLoginForm.scss';
import RightSideForm from './RightSideForm';
import useMobileDetect from '../../components/useMobileDetect/useMobileDetect';
import CustomerLogin from './CustomerLogin';
import { useLocation } from 'react-router-dom';

const NewLoginForm = () => {
    //  const isMobile = useMobileDetect();
    const location = useLocation();
    const currentLoginForm = location.pathname

    return (
        <div className='flex h-screen new_login_style'>
            <div className='leftside'>
                <div className=''>
                    <img className='logo-resize-login  p-1' alt='logo' src={weNxtLogo} />
                </div>
                <div className='content-login-grid'>
                    <p>Today is your</p>
                    <p>opportunity to build the</p>
                    <p>tomorrow you want</p>
                </div>
            </div>
            <div className='rightside'>
                {currentLoginForm === '/login' && <RightSideForm />}
                {currentLoginForm === '/customerLogin' && <CustomerLogin />}
            </div>
        </div>
    );
};

export default NewLoginForm;
