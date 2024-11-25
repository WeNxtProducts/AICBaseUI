import React, { useState } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CustomNumberField from '../../../components/customFieldComponents/customNumberField/CustomNumberField';
import CustomSelect from '../../../components/customFieldComponents/customSelect/CustomSelect';
import './AnnuityType.scss';
import CustomDatePicker from './../../../components/customFieldComponents/customDatePicker/CustomDatePicker';

const AnnuityType = () => {
    const [rows, setRows] = useState([{
        id: Date.now(), AGE_OF_MATURITY: '', MODE: '', G_PEROD: '', CATG_CODE: '',
        RATE: '', RATE_PER: '', EFF_FM_DATE: '', EFF_TO_DATE: ''
    }]);
    const [editingRow, setEditingRow] = useState(null);

    const handleAddRow = () => {
        setRows([...rows, {
            id: Date.now(), AGE_OF_MATURITY: '', MODE: '', G_PEROD: '', CATG_CODE: '',
            RATE: '', RATE_PER: '', EFF_FM_DATE: '', EFF_TO_DATE: ''
        }]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setEditingRow(id);
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                    }
                    : row
            )
        );
    };

    return (
        <div className='annuity_type mb-3 mt-5'>
            <div className="annuity_type_table">
                <div className="add-btn pt-3 mb-9">
                    <Button type="primary" onClick={handleAddRow} className="add-row-btn">
                        <PlusOutlined /> Add
                    </Button>
                </div>
                <div className='mb-6'>
                    <table className="borderless-table-tax">
                        <thead>
                            <tr>
                                <th>Age at Maturity</th>
                                <th>Mode of Pmnt</th>
                                <th>Guarantee Period</th>
                                <th>Catg Code</th>
                                <th>Rate</th>
                                <th>Rate Per</th>
                                <th>Eff From Date</th>
                                <th>Eff To Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={editingRow === row.id ? 'editing-row' : ''}
                                >
                                    <td>
                                        <CustomNumberField
                                            name='AGE_OF_MATURITY'
                                            placeholder='0'
                                            format='number'
                                            size='large'
                                            readOnly={false}
                                            value={row?.AGE_OF_MATURITY}
                                            onChange={(e) => handleChange(row.id, 'AGE_OF_MATURITY', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <CustomSelect
                                            name='MODE'
                                            size='large'
                                            showSearch={false}
                                            readOnly={false}
                                            options={[]}
                                            placeholder='select'
                                            value={row?.MODE || undefined}
                                            onChange={(e) => handleChange(row.id, 'MODE', e)}
                                        />
                                    </td>
                                    <td>
                                        <CustomNumberField
                                            name='G_PEROD'
                                            format='number'
                                            placeholder='0'
                                            size='large'
                                            readOnly={false}
                                            value={row?.G_PEROD}
                                            onChange={(e) => handleChange(row.id, 'G_PEROD', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <CustomNumberField
                                            name='CATG_CODE'
                                            format='number'
                                            placeholder='1'
                                            size='large'
                                            readOnly={false}
                                            value={row?.CATG_CODE}
                                            onChange={(e) => handleChange(row.id, 'CATG_CODE', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <CustomNumberField
                                            name='RATE'
                                            placeholder='.00'
                                            size='large'
                                            readOnly={false}
                                            value={row?.RATE}
                                            onChange={(e) => handleChange(row.id, 'RATE', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <CustomNumberField
                                            name='RATE_PER'
                                            placeholder='.00'
                                            size='large'
                                            readOnly={false}
                                            value={row?.RATE_PER}
                                            onChange={(e) => handleChange(row.id, 'RATE_PER', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <CustomDatePicker
                                            name='EFF_FM_DATE'
                                            placeholder='date'
                                            size='large'
                                            readOnly={false}
                                            value={row?.EFF_FM_DATE}
                                            onChange={(date) => handleChange(row.id, 'EFF_FM_DATE', date)}
                                        />
                                    </td>
                                    <td>
                                        <CustomDatePicker
                                            name='EFF_TO_DATE'
                                            placeholder='date'
                                            size='large'
                                            readOnly={false}
                                            value={row?.EFF_TO_DATE}
                                            onChange={(date) => handleChange(row.id, 'EFF_TO_DATE', date)}
                                        />
                                    </td>
                                    <td>
                                        <DeleteOutlined
                                            className="delete-icon"
                                            onClick={() => handleDeleteRow(row.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='mt-1 flex justify-center'>
                        <Button className="sub-btn">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnnuityType
