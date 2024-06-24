import React from 'react';
import './Tabs.scss';

const Tabs = ({ children, activeTab, onTabClick }) => {
 return (
  <div className='custom_tabs p-2'>
   <div className='tab-list'>
    {React.Children.map(children, (child, index) => (
     <button
      className={`tab ${index === activeTab ? 'active' : ''}`}
      onClick={() => onTabClick(index)}>
      {child.props.label}
     </button>
    ))}
   </div>
   <div className='tab-content'>
    {React.Children.map(children, (child, index) =>
     index === activeTab ? child : null,
    )}
   </div>
  </div>
 );
};

const Tab = ({ children }) => {
 return <div>{children}</div>;
};

export { Tabs, Tab };
