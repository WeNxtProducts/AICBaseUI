import React from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import '../../../../../../styles/components/MRV_Card.scss'

const MRVPanList = ({
    tableColumn = '',
    tableData = [],
    handleEdit,
    handleDelete,
    selectedRow = '',
    action,
    isView = true,
    isEdit = true,
    isDelete = true,
    freeze = false,
    highlightKey = 'ID',
}) => {
    const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

    return (
        <div className='MRV_card mt-4 pe-3 pl-3'>
            {tableData?.map((item, index) => (
                <div
                    data-id={item?.[highlightKey]}
                    key={item?.[highlightKey]}
                    className={
                        selectedRow == item?.[highlightKey]
                            ? `list_card_highlighted_row pb-${2}`
                            : `list_card pb-${2}`
                    }>
                    <div className={`action_header flex item-center justify-${action && !freeze ? 'between' : 'between'}`}>

                        <div
                            // onClick={e => {
                            //     handleDelete(item);
                            // }}
                            className='pl-2'>
                            <div className='mrv_checkbox'>
                                <input readOnly checked={item?.isSelected === 'Y'} id={index} type='checkbox' />
                                <label />
                            </div>
                        </div>

                        <div className='flex gap-2 pe-3 p-1'>

                            <Tooltip title='View'>
                                <EyeOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
                            </Tooltip>


                            <Tooltip title='Edit'>
                                <EditOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
                            </Tooltip>


                            <Tooltip title='Delete'>
                                <DeleteOutlined onClick={() => handleDelete(item)} className='mrv_icons delete_mrv_row' />
                            </Tooltip>

                        </div>
                    </div>

                    {Object.keys(column)?.map(key => (
                        <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
                            <p className='col-span-6 key_font'>{column[key]}</p>
                            <p className='col-span-6 value_font'>{item[key]}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MRVPanList;
