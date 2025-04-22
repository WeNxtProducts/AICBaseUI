import React, { useState, useEffect } from 'react';
import './NewSidebar.scss';

const NewSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [selectedPath, setSelectedPath] = useState([]);
    const [openMenus, setOpenMenus] = useState([]);

    const menuItems = [
        { icon: '🏠', title: 'Home with a very long title' },
        {
            icon: '📁',
            title: 'Projects',
            subItems: [
                {
                    icon: '📄',
                    title: 'Project 1',
                    subItems: [
                        { icon: '📝', title: 'Tasks' },
                        { icon: '👥', title: 'Team' },
                    ],
                },
                {
                    icon: '📄',
                    title: 'Project 2',
                    subItems: [
                        { icon: '📊', title: 'Analytics' },
                        { icon: '💰', title: 'Budget' },
                    ],
                },
            ],
        },
        { icon: '📊', title: 'Analytics' },
        {
            icon: '⚙️',
            title: 'Settings',
            subItems: [
                { icon: '👤', title: 'Profile' },
                {
                    icon: '🔒',
                    title: 'Security',
                    subItems: [
                        { icon: '🔑', title: 'Passwords' },
                        { icon: '📱', title: 'Two-Factor Auth' },
                    ],
                },
            ],
        },
    ];

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
            className={`new-sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => handleExpand(true)}
            onMouseLeave={() => handleExpand(false)}
        >
            <div className="sidebar-header-new">
                <button className="pin-button" onClick={() => setIsPinned(!isPinned)}>
                    {isPinned ? '📌 Pinned' : '📍 Pin'}
                </button>
            </div>
            <ul>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        isExpanded={isExpanded}
                        level={0}
                        path={[item.title]}
                        selectedPath={selectedPath}
                        openMenus={openMenus}
                        onSelect={handleSelect}
                        onToggle={handleToggle}
                        isLastChild={index === menuItems.length - 1}
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
        selectedPath.length > level && selectedPath[level] === item.title;

    useEffect(() => {
        if (hasSelectedChild && !isOpen) {
            onToggle(path, true);
        }
    }, [hasSelectedChild, isOpen, onToggle, path]);

    const handleClick = () => {
        if (item.subItems) {
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

    return (
        <li className={`level-${level} ${isLastChild ? 'last-child' : ''}`}>
            <div
                className={`menu-item-new ${isOpen ? 'open' : ''} ${isSelected ? 'selected' : ''
                    }`}
                onClick={handleClick}
            >
                {renderLevelLines()}
                <span className={`icon ${level === 0 ? 'level-0' : ''}`}>
                    {item.icon}
                </span>
                {isExpanded && <span className="title">{item.title}</span>}
                {item.subItems && isExpanded && (
                    <span className="arrow">{isOpen ? '▼' : '▶'}</span>
                )}
            </div>
            {item.subItems && (
                <ul className={`sub-menu ${isOpen && isExpanded ? 'open' : ''}`}>
                    {item.subItems.map((subItem, index) => (
                        <MenuItem
                            key={index}
                            item={subItem}
                            isExpanded={isExpanded}
                            level={level + 1}
                            path={[...path, subItem.title]}
                            selectedPath={selectedPath}
                            openMenus={openMenus}
                            onSelect={onSelect}
                            onToggle={onToggle}
                            isLastChild={index === item.subItems.length - 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NewSidebar;
