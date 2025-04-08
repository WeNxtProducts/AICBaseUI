import { Popover } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import SignaturePad from '../../../components/signaturePad/SignaturePad';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { useSelector } from 'react-redux';

const fileData = {
    module: 'quote',
    replaceFlag: 'N',
    dms_status: 'N',
    screenName: 'DMS',
    genType: '.png',
    uploadscrn: 'Sign-digital'
};

const CusBroSign = ({ title, doctype, data }) => {
    const DMSFileUpload = useApiRequests('DMSFileUpload64', 'POST');
    const DMSFileDelete = useApiRequests('DMSDelete64', 'POST');
    const DMSFileView = useApiRequests('DMSView64', 'POST');
    const tranId = useSelector(state => state?.quote?.tranId);
    const [signatureData, setSignatureData] = useState({ name: '', signature: '' });
    const [open, setOpen] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState(0);
    const inputContainerRef = useRef(null);

    useEffect(() => {
        if (inputContainerRef.current) setPopoverWidth(inputContainerRef.current.offsetWidth);
    }, []);

    useEffect(() => {
        console.log("signatureData : ", signatureData)
    }, [signatureData])

    const handleGetBase64 = async (pathDoc) => {
        console.log("handleGetBase64 : ")
        const payload = [{ path: pathDoc }];
        try {
            const response = await DMSFileView(payload);
            if (response?.status === 'FAILURE') showNotification.ERROR('File Not Viewed!');
            if (response?.status === 'SUCCESS') {
                console.log("Inside :")
                setSignatureData({
                    name: data?.name,
                    signature: `data:image/png;base64,${response?.base64Strings[0]}`,
                    ...data
                });
            }
        } catch {
            showNotification.ERROR('File Not Viewed!');
        }
    }

    useEffect(() => {
        if (data && data?.signature && data?.name) {
            console.log("call")
            handleGetBase64(data?.signature)
        }
    }, [data]);

    const handleVisibleChange = (visible) => {
        setOpen(visible);
    };

    const handleSignatureSave = (name, signature) => {
        setSignatureData({ name, signature });
        handleUpload({ name, signature, ...data })
        setOpen(false);
    };

    const uploadNewSign = async (signdata) => {
        console.log(signdata)
        const payload = {
            ...fileData,
            filename: `${tranId}-${title}-Sign`,
            base64String: signdata.signature?.replace(/^data:image\/[a-z]+;base64,/, ''),
            DocType: `sign`,
            TranId: tranId?.toString(),
            param_add1: signdata?.name,
            param_add2: doctype
        }
        // console.log("handleUpload : ", payload)
        try {
            const response = await DMSFileUpload([payload]);
            if (response?.Overall[0]?.status === 'FAILURE')
                showNotification.ERROR('File Not Uploaded!');
            if (response?.Overall[0]?.status === 'SUCCESS') {
                console.log("response : ", response)
                showNotification.SUCCESS(`${payload?.filename} Uploaded Successfully`);
            }
        } catch {
            showNotification.ERROR('File Not Uploaded!');
        }
    }

    const handleDelete = async (signdata) => {
        const { doc_sys_id } = signdata;
        const deleteId = { doc_sys_id: [doc_sys_id] };
        try {
            const response = await DMSFileDelete(deleteId);
            if (response?.status === 'SUCCESS') {
                uploadNewSign(signdata)
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR('File Not Deleted!');
            }
        } catch {
            showNotification.ERROR('File Not Deleted!');
        }
    };

    const handleUpload = async (signdata) => {
        console.log("signdata : ", signdata)
        if (signdata?.doc_sys_id) {
            handleDelete(signdata)
        } else {
            uploadNewSign(signdata)
        }
    }

    return (
        <>
            <p className='review_title'>{title}</p>
            <Popover
                content={
                    <SignaturePad
                        onSave={handleSignatureSave}
                        initialName={signatureData.name}
                        initialSignature={signatureData.signature}
                    />
                }
                placement='bottom'
                trigger='click'
                title={title}
                arrow={false}
                open={open}
                onOpenChange={handleVisibleChange}
            >
                <div className='signature-container mt-3'>
                    <div className='signature-title'>Digital Signature
                        {signatureData.name && (
                            <span className='signature-name'> ({signatureData.name})</span>
                        )}
                    </div>
                    <div className='signature-content'>
                        {signatureData.signature ? (
                            <>
                                <img
                                    src={signatureData.signature}
                                    alt="Digital Signature"
                                    className='signature-image'
                                />
                            </>
                        ) : (
                            <div className='signature-placeholder'>
                                No signature available
                            </div>
                        )}
                    </div>

                </div>
            </Popover>
        </>
    )
}

export default CusBroSign