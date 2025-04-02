import React, { useState } from "react";
import { Input, Button, DatePicker } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { setPayFinish } from "../../../../globalStore/slices/QuoteSlice";
import { useDispatch } from "react-redux";

const CardPayment = () => {
    const dispatch = useDispatch();
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 16);
        value = value.replace(/(\d{4})/g, "$1 ").trim();
        setCardNumber(value);
    };
    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 3);
        setCvv(value);
    };

    return (
        <div className="card-payment">
            <h3 className="title">Card Number</h3>
            <p className="subtitle">Enter 16-digit card number</p>
            <div className="input-container">
                <Input
                    className="card-number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    suffix={<CreditCardOutlined />}
                />
            </div>

            <h3 className="title">Name on card</h3>
            <Input className="name-input" placeholder="Name" />

            <div className="expiry-cvv-container">
                <div className="expiry-section">
                    <h3 className="title">Expiry Date</h3>
                    <DatePicker
                        className="expiry-picker"
                        picker="month"
                        format="MM / YYYY"
                        placeholder="MM / YYYY"
                        disabledDate={(current) => current && current < dayjs().startOf("month")}
                    />
                </div>

                <div className="cvv-section">
                    <h3 className="title">CVV</h3>
                    <Input
                        className="cvv-input"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={3}
                        placeholder="•••"
                        type="password"
                    />
                </div>
            </div>

            <Button
                onClick={() => dispatch(setPayFinish(true))}
                type="primary"
                className="pay-now-btn">
                Pay Now
            </Button>
        </div>
    );
};

export default CardPayment;
