import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import RightSideForm from './RightSideForm';
import useMobileDetect from '../../components/useMobileDetect/useMobileDetect';
import CustomerLogin from './CustomerLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';
import './NewLoginForm.scss';

const NewLoginForm = () => {
    //  const isMobile = useMobileDetect();
    const navigate = useNavigate();
    const location = useLocation();
    const currentLoginForm = location.pathname

    const handleLoginNavigate = () => {
        if (currentLoginForm === '/login') {
            navigate('/customerLogin')
        } else if (currentLoginForm === '/customerLogin') {
            navigate('/login')
        }
    }

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
                <div
                    onClick={() => handleLoginNavigate()}
                    className="flex items-center space-x-2 justify-end mr-8 mt-2 group cursor-pointer">
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">
                        {currentLoginForm === '/login' ? 'Customer Login' : 'Login'}
                    </span>
                    <DoubleRightOutlined
                        className="h-3 w-3 text-blue-600 group-hover:text-blue-800"
                    />
                </div>
                {currentLoginForm === '/login' && <RightSideForm />}
                {currentLoginForm === '/customerLogin' && <CustomerLogin />}
            </div>
        </div>
    );
};

export default NewLoginForm;
