import './Loader.scss';

const Loader = () => {
 return (
  <div className='full-screen-loader'>
   <p className='loading-text'>
    Loading
    <span className='loading-dots'>
     <span className='dot'>.</span>
     <span className='dot'>.</span>
     <span className='dot'>.</span>
    </span>
   </p>
  </div>
 );
};

export default Loader;
