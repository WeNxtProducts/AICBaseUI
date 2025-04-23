import React, { useState, useEffect } from 'react';
import { menuData } from './menuConstant';
import './NewSidebar.scss';

const NewSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [selectedPath, setSelectedPath] = useState([]);
    const [openMenus, setOpenMenus] = useState([]);

    const handleSelect = (path) => {
        setSelectedPath(path);
    };

    const handleExpand = (expand) => {
        if (isPinned && !expand) return;
        setIsExpanded(expand);
        if (!expand) {
            setOpenMenus(selectedPath.slice(0, -1));
        }
    };

    const handleToggle = (path, isOpen) => {
        setOpenMenus((prevOpenMenus) => {
            const pathString = path.join('/');
            if (isOpen) {
                return [...prevOpenMenus, pathString];
            } else {
                return prevOpenMenus.filter((menu) => !menu.startsWith(pathString));
            }
        });
    };

    return (
        <div
            className={`new-sidebar ${isExpanded ? 'expanded new_sideBar_hovered' : ''}`}
            onMouseEnter={() => handleExpand(true)}
            onMouseLeave={() => handleExpand(false)}
        >
            <div className="sidebar-header-new">
                <button className="pin-button" onClick={() => setIsPinned(!isPinned)}>
                    {isPinned ? '📌 Pinned' : '📍 Pin'}
                </button>
            </div>
            <ul>
                {menuData.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        isExpanded={isExpanded}
                        level={0}
                        path={[item.menuOptionDesc]}
                        selectedPath={selectedPath}
                        openMenus={openMenus}
                        onSelect={handleSelect}
                        onToggle={handleToggle}
                        isLastChild={index === menuData.length - 1}
                    />
                ))}
            </ul>
        </div>
    );
};

const MenuItem = ({
    item,
    isExpanded,
    level,
    path,
    selectedPath,
    openMenus,
    onSelect,
    onToggle,
    isLastChild,
}) => {
    const isSelected = selectedPath.join('/') === path.join('/');
    const isOpen = openMenus.includes(path.join('/'));
    const hasSelectedChild =
        selectedPath.length > level && selectedPath[level] === item.menuOptionDesc;

    useEffect(() => {
        if (hasSelectedChild && !isOpen) {
            onToggle(path, true);
        }
    }, [hasSelectedChild, isOpen, onToggle, path]);

    const handleClick = () => {
        if (item.childrens && item.childrens.length > 0) {
            onToggle(path, !isOpen);
        } else {
            onSelect(path);
        }
    };

    const renderLevelLines = () => {
        return Array.from({ length: level }, (_, index) => (
            <div key={index} className={`level-line level-${index + 1}`} />
        ));
    };

    const isParent = item.childrens && item.childrens.length > 0;
    const isChild = level > 0;
    const isItemSelected = selectedPath.join('/') === path.join('/');
    const isParentOfSelectedChild =
        isParent &&
        selectedPath.length > level + 1 &&
        selectedPath[level] === item.menuOptionDesc;

    return (
        <li className={`level-${level} ${isLastChild ? 'last-child' : ''}`}>
            <div
                className={`menu-item-new 
                    ${isOpen ? 'open' : ''} 
                    ${isItemSelected && isParent ? 'selected parent' : ''}
                    ${isItemSelected && !isParent ? 'selected parent' : ''}
                    ${isItemSelected && isChild ? 'selected child' : ''}
                    ${isParentOfSelectedChild ? 'selected parent-of-child' : ''}
                `}
                onClick={handleClick}
            >
                {renderLevelLines()}
                {(level === 0 || isParent) && (
                    <span className={`icon ${level === 0 ? 'level-0' : ''}`}>
                        <i className={`${item.menuIconPath}`}></i>
                    </span>
                )}
                {isExpanded && <span className="title">{item.menuOptionDesc}</span>}
                {item.childrens && item.childrens.length > 0 && isExpanded && (
                    <span className={`arrow ${isOpen ? 'open' : ''}`}>{isOpen ? '▼' : '▶'}</span>
                )}
            </div>
            {item.childrens && item.childrens.length > 0 && (
                <ul className={`sub-menu ${isOpen && isExpanded ? 'open' : ''}`}>
                    {item.childrens.map((subItem, index) => (
                        <MenuItem
                            key={index}
                            item={subItem}
                            isExpanded={isExpanded}
                            level={level + 1}
                            path={[...path, subItem.menuOptionDesc]}
                            selectedPath={selectedPath}
                            openMenus={openMenus}
                            onSelect={onSelect}
                            onToggle={onToggle}
                            isLastChild={index === item.childrens.length - 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NewSidebar;