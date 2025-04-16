import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';
import './PhoneInput.scss';

const { Option } = Select;

// Country codes with formatting patterns and max length
const countryCodes = [
    { code: '+1', country: 'US', format: '(###) ###-####', maxDigits: 10 },
    { code: '+44', country: 'UK', format: '#### ######', maxDigits: 10 },
    { code: '+91', country: 'IN', format: '##### #####', maxDigits: 10 },
    { code: '+49', country: 'DE', format: '#### ######', maxDigits: 11 },
    { code: '+33', country: 'FR', format: '# ## ## ## ##', maxDigits: 9 },
    { code: '+61', country: 'AU', format: '#### ####', maxDigits: 8 },
    { code: '+86', country: 'CN', format: '### #### ####', maxDigits: 11 },
    { code: '+81', country: 'JP', format: '## #### ####', maxDigits: 10 },
    // Add more countries as needed
];

const PhoneInput = ({
    value = '',
    onChange,
    placeholder = 'Enter phone number',
    style = {},
    className = '',
    defaultCountryCode = '+1',
}) => {
    const [selectedCountry, setSelectedCountry] = useState(
        countryCodes.find(country => country.code === defaultCountryCode) || countryCodes[0]
    );
    const [phoneNumber, setPhoneNumber] = useState('');

    // Effect to handle incoming value prop
    useEffect(() => {
        if (value && typeof value === 'string') {
            // Extract country code and phone number from value if provided
            const countryCode = countryCodes.find(country => value.startsWith(country.code));

            if (countryCode) {
                setSelectedCountry(countryCode);
                setPhoneNumber(value.substring(countryCode.code.length).trim());
            } else {
                setPhoneNumber(value);
            }
        }
    }, []);

    // Format the phone number according to the selected country pattern
    const formatPhoneNumber = (input, pattern, maxDigits) => {
        if (!input || !pattern) return input;

        // Extract only digits from input
        const digits = input.replace(/\D/g, '');

        // Limit to max digits allowed for this country
        const limitedDigits = digits.slice(0, maxDigits);

        let result = '';
        let digitIndex = 0;

        for (let i = 0; i < pattern.length && digitIndex < limitedDigits.length; i++) {
            if (pattern[i] === '#') {
                result += limitedDigits[digitIndex];
                digitIndex++;
            } else {
                result += pattern[i];
                // If next char in pattern is # and we have more digits, add the separator
                if (digitIndex < limitedDigits.length) {
                    result += '';
                }
            }
        }

        // Add any remaining digits up to the maxDigits limit
        if (digitIndex < limitedDigits.length) {
            result += limitedDigits.substring(digitIndex);
        }

        return result;
    };

    const handleCountryChange = (value) => {
        const newCountry = countryCodes.find(country => country.code === value);
        setSelectedCountry(newCountry);

        // Format existing phone number according to new country format
        const digits = phoneNumber.replace(/\D/g, '');
        const formattedNumber = formatPhoneNumber(
            digits,
            newCountry.format,
            newCountry.maxDigits
        );

        setPhoneNumber(formattedNumber);

        // Trigger onChange with new combined value
        if (onChange) {
            onChange(`${newCountry.code} ${formattedNumber}`);
        }
    };

    const handlePhoneChange = (e) => {
        // Remove any non-numeric characters except spaces
        const sanitizedInput = e.target.value.replace(/[^\d\s-()]/g, '');
        const formattedNumber = formatPhoneNumber(
            sanitizedInput,
            selectedCountry.format,
            selectedCountry.maxDigits
        );

        setPhoneNumber(formattedNumber);

        // Trigger onChange with combined value
        if (onChange) {
            onChange(`${selectedCountry.code} ${formattedNumber}`);
        }
    };

    // Render country code selector
    const countrySelector = (
        <Select
            defaultValue={selectedCountry.code}
            onChange={handleCountryChange}
            className="country-select"
        >
            {countryCodes.map(country => (
                <Option key={country.code} value={country.code}>
                    {country.code}
                </Option>
            ))}
        </Select>
    );

    return (
        <div className={`custom-phone-input ${className}`} style={style}>
            <Input
                addonBefore={countrySelector}
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={placeholder}
                className="phone-number-input"
            />
        </div>
    );
};

export default PhoneInput;