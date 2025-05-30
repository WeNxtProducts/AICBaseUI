import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import useMRVListingPayload from '../mrvListing/useMRVListingPayload';
import { formatNumber } from '../commonHelper/CurrentFormatter';
import './InstallmentModal.scss';

const modalStyles = {
    topPosition: { top: 60 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_title_installment select-none'>{title}</p>;

const InstallmentModal = ({ open, handleClose, tranId, POL_NO }) => {
    const { rowData, columnData, handleMRVListingPayload } = useMRVListingPayload();
    const [Open, setOpen] = useState(false);
    const [tableColumn, setTableColumn] = useState(null)

    useEffect(() => {
        setOpen(open);
        if (tranId) {
            handleMRVListingPayload({ queryId: 228, tranId });
        }
    }, [open]);

    useEffect(() => {
        if (Object.keys(columnData).length > 0)
            setTableColumn(JSON.parse(columnData))
    }, [columnData]);

    const onClose = () => {
        setOpen(false);
        handleClose();
    };

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const renderFlag = (status) => (
        <div>
            <p className={`status_notify ${status === 'Y' ? 'approved' : 'pending'}`}>
                {status === 'Y' ? 'Paid' : 'Unpaid'}
            </p>
        </div>
    )

    return (
        <Modal
            open={Open}
            width={1150}
            title={<MessageTitle title={`Installments for Policy: ${POL_NO}`} />}
            style={modalStyles?.topPosition}
            onCancel={onClose}
            maskClosable={false}
            className='installment_style'
            footer={null}
        >
            {(hasValidRowData(rowData) && tableColumn !== null) ? (
                <div className="table-container_installment_modal">
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(tableColumn)?.map(item => (
                                    <th key={item}>{tableColumn[item]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rowData?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.keys(tableColumn)?.map(currentValue => {
                                            const mainKey = tableColumn[currentValue]
                                            return (
                                                <td className='select-none' key={mainKey}>
                                                    {['Gross_Amount', 'Premium_Amount']?.includes(currentValue) ?
                                                        formatNumber(item[currentValue])
                                                        : ['Paid_Date', 'Payment_Date']?.includes(currentValue)
                                                            ? item[currentValue] ? dayjs(item[currentValue]).format(`YYYY-MM-DD`) : '-'
                                                            : currentValue === 'Paid_Flag' ? renderFlag(item[currentValue])
                                                                : item[currentValue]}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ):(
                <p>No Data</p>
            )}
        </Modal>
    );
};

export default InstallmentModal;
