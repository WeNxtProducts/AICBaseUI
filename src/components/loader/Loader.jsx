import './Loader.scss';

const Loader = () => {
 return (
  <div className='full-screen-loader'>
   <div className='simple-loader'>
    <div className='spinner'></div>
    <div className='loading-text'>
     Loading
     <span className='dots'>
      <span className='dot'>.</span>
      <span className='dot'>.</span>
      <span className='dot'>.</span>
     </span>
    </div>
   </div>
  </div>
 );
};

export default Loader;
