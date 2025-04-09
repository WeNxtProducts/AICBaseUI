import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Input, Tooltip } from 'antd';
import { UndoOutlined, RedoOutlined, ClearOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import './SignaturePad.scss';

const SignaturePad = ({ onSave, width = 600, height = 200, initialName, initialSignature }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(!!initialSignature);
    const [name, setName] = useState(initialName || '');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [tool, setTool] = useState('pen');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setTool('pen');
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear the canvas first
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set canvas properties
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';
        context.globalCompositeOperation = 'source-over';

        // If there's an initial signature, load it onto the canvas
        if (initialSignature) {
            const image = new Image();
            image.src = initialSignature;

            // Add onload handler to ensure image is fully loaded before drawing
            image.onload = () => {
                // Clear canvas again before drawing the image
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);

                context.drawImage(image, 0, 0);
                setHasSignature(true);

                // Important: Reset the composite operation to ensure proper drawing
                context.globalCompositeOperation = 'source-over';

                // Save initial state to history after image is loaded
                if (!isInitialized) {
                    saveToHistory();
                    setIsInitialized(true);
                }
            };

            // Handle image loading errors
            image.onerror = () => {
                console.error("Failed to load signature image");
                setHasSignature(false);
                // Still initialize history with blank canvas
                if (!isInitialized) {
                    saveToHistory();
                    setIsInitialized(true);
                }
            };
        } else {
            // No initial signature, just save blank state to history
            if (!isInitialized) {
                saveToHistory();
                setIsInitialized(true);
            }
        }

        // Set initial cursor
        updateCanvasCursor('pen');
    }, [initialSignature]);

    // Update cursor when tool changes
    useEffect(() => {
        updateCanvasCursor(tool);
    }, [tool]);

    const updateCanvasCursor = (currentTool) => {
        if (!canvasRef.current) return;

        if (currentTool === 'eraser') {
            canvasRef.current.className = 'signature-pad-canvas eraser-cursor';
        } else {
            canvasRef.current.className = 'signature-pad-canvas pen-cursor';
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Get correct coordinates for both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        context.beginPath();
        context.moveTo(offsetX, offsetY);

        // Set eraser or pen properties
        if (tool === 'eraser') {
            context.globalCompositeOperation = 'destination-out';
            context.lineWidth = 15; // Wider for eraser
        } else {
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
        }

        setIsDrawing(true);
        setHasSignature(true);

        // Prevent default behavior to avoid scrolling on touch devices
        e.preventDefault();
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Get correct coordinates for both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        context.lineTo(offsetX, offsetY);
        context.stroke();

        // Prevent default behavior to avoid scrolling on touch devices
        e.preventDefault();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const context = canvasRef.current.getContext('2d');
            context.closePath();
            setIsDrawing(false);

            // Save state to history when stroke is complete
            saveToHistory();
        }
    };

    const saveToHistory = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');

        // If we're not at the end of the history, remove future states
        if (historyIndex < history.length - 1) {
            setHistory(prevHistory => prevHistory.slice(0, historyIndex + 1));
        }

        // Add new state to history
        setHistory(prevHistory => [...prevHistory, imageData]);
        setHistoryIndex(prev => prev + 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            loadFromHistory(historyIndex - 1);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            loadFromHistory(historyIndex + 1);
        }
    };

    const loadFromHistory = (index) => {
        if (index >= 0 && index < history.length) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const image = new Image();

            image.onload = () => {
                // Clear canvas first
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);

                // Reset composite operation to ensure proper drawing
                context.globalCompositeOperation = 'source-over';

                // Draw the history state
                context.drawImage(image, 0, 0);
            };

            image.src = history[index];
            setHasSignature(index > 0 || initialSignature != null);
        }
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Reset composite operation before clearing
        context.globalCompositeOperation = 'source-over';

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);

        // Reset history
        const blankCanvas = canvas.toDataURL('image/png');
        setHistory([blankCanvas]);
        setHistoryIndex(0);
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
        // Ensure we're in source-over mode before saving
        const context = canvas.getContext('2d');
        context.globalCompositeOperation = 'source-over';

        const signatureDataURL = canvas.toDataURL('image/png');
        onSave(name, signatureDataURL);
    };

    const toggleTool = (selectedTool) => {
        setTool(selectedTool);
    };

    return (
        <div className="signature-pad-container">
            <div className="signature-pad-title">
                <Input
                    size="large"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="signature-pad-tools">
                <div>
                    <Tooltip title="Undo">
                        <Button
                            icon={<UndoOutlined />}
                            onClick={undo}
                            disabled={historyIndex <= 0}
                        />
                    </Tooltip>
                    <Tooltip title="Redo">
                        <Button
                            icon={<RedoOutlined />}
                            onClick={redo}
                            disabled={historyIndex >= history.length - 1}
                        />
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Pen">
                        <Button
                            icon={<EditOutlined />}
                            className={`${tool === 'pen' ?
                                'edit-selected' :
                                'edit-disabled'}`}
                            onClick={() => toggleTool('pen')}
                        />
                    </Tooltip>
                    <Tooltip title="Eraser">
                        <Button
                            icon={<ClearOutlined />}
                            className={`${tool === 'eraser' ?
                                'edit-selected' :
                                'edit-disabled'}`}
                            onClick={() => toggleTool('eraser')}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className="signature-pad-canvas-container">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="signature-pad-canvas pen-cursor"
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
                <Button
                    onClick={clearSignature}
                    className="signature-pad-clear-btn"
                    icon={<ClearOutlined />}
                >
                    Reset
                </Button>
                <Button
                    type="primary"
                    onClick={saveSignature}
                    className={`${!hasSignature || !name.trim() ?
                        'signature-pad-submit-btn_disabled' :
                        'signature-pad-submit-btn'}`}
                    disabled={!hasSignature || !name.trim()}
                    icon={<SaveOutlined />}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default SignaturePad;