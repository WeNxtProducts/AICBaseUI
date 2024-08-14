import { useCallback, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';

function VirtualScroll() {
 const [items, setItems] = useState([]);
 const [triggerRerender, setTriggerRerender] = useState(false);

 const handleGenerateList = () => {
  setItems(generateList(1000));
  setTimeout(() => {
   setTriggerRerender(pre => !pre);
  }, 1000);
 };

 function generateList(size) {
  return Array.from({ length: size }, (_, index) => `Item ${index + 1}`);
 }

 const rowRenderer = useCallback(
  ({ key, index, style }) => (
   <div key={key} style={style}>
    {items[index]}
   </div>
  ),
  [items],
 );

 return (
  <div>
   <button onClick={() => handleGenerateList()}>Generate List</button>
   <div style={{ width: '100%', height: '400px' }}>
    <AutoSizer>
     {({ width, height }) => (
      <List
       width={width}
       height={height}
       rowCount={items?.length}
       rowHeight={20}
       rowRenderer={rowRenderer}
      />
     )}
    </AutoSizer>
   </div>
  </div>
 );
}

export default VirtualScroll;
