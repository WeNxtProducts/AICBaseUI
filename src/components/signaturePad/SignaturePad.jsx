import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Input } from 'antd';
import './SignaturePad.scss';

const SignaturePad = ({ onSave, width = 600, height = 200, initialName, initialSignature }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(!!initialSignature);
    const [name, setName] = useState(initialName || '');

    useEffect(() => {
        console.log("initialSignature : ",initialSignature);
    }, [initialName, initialSignature]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas properties
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';

        // If there's an initial signature, load it onto the canvas
        if (initialSignature) {
            const image = new Image();
            image.src = initialSignature;
            image.onload = () => {
                context.drawImage(image, 0, 0);
            };
        } else {
            // Clear canvas initially
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [initialSignature]);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setHasSignature(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const context = canvasRef.current.getContext('2d');
            context.closePath();
            setIsDrawing(false);
        }
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    const saveSignature = () => {
        if (!hasSignature) {
            message.error('Please provide a signature before submitting');
            return;
        }
        if (!name.trim()) {
            message.error('Please enter your name before submitting');
            return;
        }

        const canvas = canvasRef.current;
        const signatureDataURL = canvas.toDataURL('image/png');
        onSave(name, signatureDataURL);
        message.success('Signature saved successfully');
    };

    return (
        <div className="signature-pad-container">
            <div className='signature-pad-title'>
                <Input
                    size='large'
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
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
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
            <div className="signature-pad-actions">
                <Button onClick={clearSignature} className="signature-pad-clear-btn">
                    Reset
                </Button>
                <Button
                    type="primary"
                    onClick={saveSignature}
                    className="signature-pad-submit-btn"
                    disabled={!hasSignature || !name.trim()}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default SignaturePad;
