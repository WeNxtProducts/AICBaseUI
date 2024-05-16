import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../../globalStore/slices/MenuSlices';
import { useNavigate } from 'react-router-dom';
import { setCurrentMenuId } from '../../globalStore/slices/TokenAndMenuList';

export default function SidebarItem({ item, isExpanded }) {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const menuSelected = useSelector(state => state?.menuSelected);
 const [open, setOpen] = useState(false);
 const menuList = useSelector(state => state?.tokenAndMenuList?.sidebarList);
 const [activateClassName, setActivateClassName] = useState(false);

 const findParentIds = (data, id) => {
  let parentIds = [];
  const search = (items, targetId, parentPath = []) => {
   for (const item of items) {
    const currentPath = [...parentPath, item.menuId];
    if (item.menuId === targetId) {
     parentIds = currentPath;
     return true;
    }
    if (item.childrens && search(item.childrens, targetId, currentPath)) {
     return true;
    }
   }
   return false;
  };
  search(data, id);
  return parentIds;
 };

 const handleMenuClick = selected => {
  dispatch(setMenu(findParentIds(menuList, selected?.menuId)));
  dispatch(setCurrentMenuId(selected));
  navigate(selected?.menuURL);
 };

 useEffect(() => {
  setOpen(false);
  if (isExpanded)
   setTimeout(() => {
    setActivateClassName(true);
   }, 200);
  else setActivateClassName(false);
 }, [isExpanded]);

 const handleMenuSelected = () => {
  setOpen(!open);
 };

 if (item?.childrens) {
  return (
   <div
    className={
     open ? 'sidebar-item open cursor-pointer' : 'sidebar-item cursor-pointer'
    }>
    <div
     onClick={() => handleMenuSelected()}
     className={
      menuSelected?.includes(item?.menuId)
       ? 'sidebar-title-selected sidebar-title'
       : 'sidebar-title'
     }>
     <span className='ml-3 children-menu'>
      {item?.menuIconPath && (
       <i
        className={`${item?.menuIconPath} ${
         menuSelected?.includes(item?.menuId)
          ? 'icon-color-selected'
          : 'icon-color'
        }`}></i>
      )}
      <span
       //  onClick={() => handleMenuSelected()}
       className={
        activateClassName ? 'sidebar-text select-none' : 'hidden select-none'
       }>
       {item?.menuOptionDesc}
      </span>
     </span>
     <span
      // onClick={() => handleMenuSelected()}
      className={activateClassName ? 'sidebar-text' : 'hidden'}>
      <i className='bi-chevron-down toggle-btn icon-color'></i>
     </span>
    </div>
    <div className='sidebar-content'>
     {item?.childrens.map((child, index) => (
      <SidebarItem
       key={index}
       item={child}
       isExpanded={isExpanded}
       parent={item}
      />
     ))}
    </div>
   </div>
  );
 } else {
  return (
   <div className='sidebar-item sidebar-item-sub plain'>
    <div
     onClick={() => handleMenuClick(item)}
     className={`sidebar-title-sub cursor-pointer ${
      menuSelected && menuSelected.includes(item?.menuId)
       ? menuSelected.length === 1
         ? 'sidebar-title-selected'
         : 'sidebar-title-selected-sub'
       : ''
     }`}>
     <span className='ml-3 children-menu'>
      {item.menuIconPath && (
       <i
        className={`${item.menuIconPath} ${
         menuSelected?.includes(item?.menuId)
          ? 'icon-color-selected'
          : 'icon-color'
        }`}></i>
      )}
      <span
       className={
        activateClassName
         ? 'sidebar-text sidebar-text-sub select-none'
         : 'hidden select-none'
       }>
       {item.menuOptionDesc}
      </span>
     </span>
    </div>
   </div>
  );
 }
}
