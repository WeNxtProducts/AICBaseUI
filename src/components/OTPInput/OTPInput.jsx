// OTPInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import './OTPInput.scss';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Initialize refs array when component mounts
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array with the new value
    const newOtp = [...otp];
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // If a digit was entered and there's a next input, focus it
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    
    // Check if OTP is complete
    const otpValue = newOtp.join('');
    // if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    // }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    } 
    // Move to previous field on left arrow key
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } 
    // Move to next field on right arrow key
    else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is all numbers
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    
    // Fill the OTP array with the pasted digits
    for (let i = 0; i < Math.min(pastedData.length, length - index); i++) {
      newOtp[index + i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the appropriate input after paste
    const focusIndex = Math.min(index + pastedData.length, length - 1);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
    
    // Check if OTP is complete after paste
    const otpValue = newOtp.join('');
    // if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    // }
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          maxLength={1}
          autoComplete="off"
          className="otp-input"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;