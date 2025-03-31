import React, { useEffect, useRef, useState } from 'react'
import SignaturePad from '../../../components/signaturePad/signaturePad'
import { Button, Popover } from 'antd';

const Content = ({ width, setOpen, handleSignatureSave }) => {
    return (
        <div style={{ minWidth: `${width}px`, height: '200px' }} className='overflow-y-auto'>
            <SignaturePad onSave={handleSignatureSave} />
        </div>
    );
}

const ReviewFooter = () => {
    const [signatureImage, setSignatureImage] = useState('');
    const [open, setOpen] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState(0);
    const inputContainerRef = useRef(null);

    useEffect(() => {
        if (inputContainerRef.current) setPopoverWidth(inputContainerRef.current.offsetWidth);
    }, []);

    const handleVisibleChange = visible => {
        setOpen(visible);
    };

    const handleSignatureSave = (dataURL) => {
        setSignatureImage(dataURL);
    };

    return (
        <>
            <div className='digital_signature'>
                <Popover
                    content={<Content width={popoverWidth} setOpen={setOpen} handleSignatureSave={handleSignatureSave} />}
                    placement='bottom'
                    trigger='click'
                    arrow={false}
                    open={open}
                    onOpenChange={handleVisibleChange}>
                    <div className='signature-container'>
                        <div className='signature-title'>Digital Signature</div>
                        <div className='signature-content'>
                            {signatureImage ? (
                                <img
                                    src={signatureImage}
                                    alt="Digital Signature"
                                    className='signature-image'
                                />
                            ) : (
                                <div className='signature-placeholder'>
                                    No signature available
                                </div>
                            )}
                        </div>
                    </div>
                </Popover>
            </div>
            <div className='review_footer_btn'>
                <Button className='oth_btn'>Submit</Button>
                <Button className='acc_btn'>Back</Button>
            </div>
        </>
    )
}

export default ReviewFooter