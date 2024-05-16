import './collapsePanelHeader.scss';

const CollapsePanelHeader = ({ name, saved, completed }) => {
 return (
  <div className='custom-header-panel flex items-center justify-between select-none'>
   <div>
    <p className='title-style pl-2'>{name}</p>
   </div>
   {saved?.status === 'completed' && completed !== 'completed' && (
    <div className='saved-status mr-5'>
     <p>Saved!!!</p>
    </div>
   )}
  </div>
 );
};

export default CollapsePanelHeader;
