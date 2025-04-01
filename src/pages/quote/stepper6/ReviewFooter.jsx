import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from '../../../components/signaturePad/SignaturePad';
import { Button, Popover } from 'antd';
import { digitalSignature } from '../../../pages/quote/QuoteConstant';

const ReviewFooter = () => {
    const [signatureData, setSignatureData] = useState({ name: '', signature: '' });
    const [open, setOpen] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState(0);
    const inputContainerRef = useRef(null);

    useEffect(() => {
        if (inputContainerRef.current) setPopoverWidth(inputContainerRef.current.offsetWidth);
    }, []);

    const handleVisibleChange = (visible) => {
        setOpen(visible);
    };

    const handleSignatureSave = (name, signature) => {
        setSignatureData({ name, signature });
        setOpen(false);
    };

    return (
        <>
            <div className='digital_signature'>
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
                    title='Digital Signature'
                    arrow={false}
                    open={open}
                    onOpenChange={handleVisibleChange}
                >
                    <div className='signature-container'>
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
            </div>
            <div className='review_footer_btn'>
                <Button className='oth_btn'>Submit</Button>
                <Button className='acc_btn'>Back</Button>
            </div>
        </>
    );
};

export default ReviewFooter;
