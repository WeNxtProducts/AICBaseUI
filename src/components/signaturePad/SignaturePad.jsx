import React, { useRef, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import './SignaturePad.scss';

const SignaturePad = ({ onSave, width = 600, height = 200 }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [signatureImage, setSignatureImage] = useState('');
    const [showSignatureImage, setShowSignatureImage] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas properties
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';

        // Clear canvas initially
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Calculate mouse position relative to canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
        setHasSignature(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Calculate mouse position relative to canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.closePath();
            setIsDrawing(false);
        }
    };

    // For touch devices
    const handleTouchStart = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvasRef.current.dispatchEvent(mouseEvent);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvasRef.current.dispatchEvent(mouseEvent);
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvasRef.current.dispatchEvent(mouseEvent);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
        setShowSignatureImage(false);
        setSignatureImage('');
    };

    const saveSignature = () => {
        if (!hasSignature) {
            message.error('Please provide a signature before submitting');
            return;
        }

        const canvas = canvasRef.current;
        const signatureDataURL = canvas.toDataURL('image/png');
        console.log("Signature data URL:", signatureDataURL);

        // Store the signature image data URL in state
        setSignatureImage(signatureDataURL);
        setShowSignatureImage(true);

        if (onSave) {
            onSave(signatureDataURL);
            message.success('Signature saved successfully');
        } else {
            message.success('Signature saved successfully');
        }
    };

    return (
        <div className="signature-pad-container">
            <div className="signature-pad-canvas-container">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="signature-pad-canvas"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                />
            </div>
            <div className="signature-pad-actions">
                <Button
                    onClick={clearSignature}
                    className="signature-pad-clear-btn"
                >
                    Clear
                </Button>
                <Button
                    type="primary"
                    onClick={saveSignature}
                    className="signature-pad-submit-btn"
                    disabled={!hasSignature}
                >
                    Submit Signature
                </Button>
            </div>
            {showSignatureImage && (
                <div className="signature-image-display">
                    <h4>Your Signature:</h4>
                    <img
                        src={signatureImage}
                        alt="Your signature"
                        className="signature-image"
                    />
                </div>
            )}
        </div>
    );
};

export default SignaturePad;