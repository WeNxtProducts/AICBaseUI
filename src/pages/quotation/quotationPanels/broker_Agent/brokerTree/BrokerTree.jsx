import { DownOutlined } from '@ant-design/icons'
import { Tree } from 'antd'
import React from 'react'

const BrokerTree = () => {
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-2',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-1-0',
                        },
                    ],
                },
                {
                    title: 'parent 1-2',
                    key: '0-0-2',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-2-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-2-1',
                        },
                    ],
                },
            ],
        },
    ];

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <div>
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
    )
}

export default BrokerTree


// const treeData = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         children: [
//           { title: 'leaf', key: '0-0-0-0' },
//           { title: 'leaf', key: '0-0-0-1' },
//           { title: 'leaf', key: '0-0-0-2' },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: 'leaf', key: '0-0-1-0' }],
//       },
//       {
//         title: 'parent 1-2',
//         key: '0-0-2',
//         children: [
//           { title: 'leaf', key: '0-0-2-0' },
//           { title: 'leaf Check', key: '0-0-2-1' },
//         ],
//       },
//     ],
//   },
// ];

// const CustomTreeNode = ({ title, isLeaf }) => (
//   <Card
//     size="small"
//     className={`w-full mb-2 ${isLeaf ? 'bg-gray-100' : 'bg-white'}`}
//     bodyStyle={{ padding: '8px' }}
//   >
//     <div className="text-sm font-medium">{title}</div>
//   </Card>
// );

// const App = () => {
//   const onSelect = (selectedKeys, info) => {
//     console.log('selected', selectedKeys, info);
//   };

//   const renderTreeNodes = (data) =>
//     data.map((item) => {
//       if (item.children) {
//         return (
//           <Tree.TreeNode
//             key={item.key}
//             title={<CustomTreeNode title={item.title} />}
//           >
//             {renderTreeNodes(item.children)}
//           </Tree.TreeNode>
//         );
//       }
//       return (
//         <Tree.TreeNode
//           key={item.key}
//           title={<CustomTreeNode title={item.title} isLeaf />}
//         />
//       );
//     });

//   return (
//     <div className="p-4">
//       <Tree
//         showLine
//         switcherIcon={<DownOutlined />}
//         defaultExpandedKeys={['0-0-1']}
//         onSelect={onSelect}
//       >
//         {renderTreeNodes(treeData)}
//       </Tree>
//     </div>
//   );
// };
