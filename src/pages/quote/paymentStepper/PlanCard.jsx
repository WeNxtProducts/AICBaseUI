import React, { useRef, useState, useEffect } from "react";
import { CheckCircleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setPayStepper } from "../../../globalStore/slices/QuoteSlice";

const covers = [
    "Death Any Cause",
    "Accidental Death",
    "Critical Illness",
    "Hospitalization Cover",
    // "Disability Cover",
    // "Income Protection",
    // "Cancer Cover",
    // "Stroke Cover",
    // "Heart Attack Cover",
    // "Permanent Disability",
];

const PlanCard = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true); // Initially true if content overflows

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="plan-card">
                {/* Plan Header Section */}
                <div className="plans">
                    <div className="plan gold">
                        <span className="plan-tier">GOLD</span>
                        <h3>Plan A</h3>
                    </div>
                    <div className="plan silver">
                        <span className="plan-tier">SILVER</span>
                        <h3>Plan B</h3>
                    </div>
                    <div className="plan platinum">
                        <span className="plan-tier">PLATINUM</span>
                        <h3>Plan C</h3>
                    </div>
                    <div className="avatar">S</div>
                </div>

                {/* Cover Details */}
                <div className="cover-details">
                    <h4>List of Covers</h4>

                    {/* Scrollable Cover List with Arrows */}
                    <div className="cover-list-container">
                        {showLeftArrow && (
                            <button className="scroll-arrow left" onClick={() => scroll("left")}>
                                <LeftOutlined />
                            </button>
                        )}
                        <div className="cover-list" ref={scrollRef} onScroll={checkScroll}>
                            {covers.map((cover, index) => (
                                <div className="cover-item" key={index}>
                                    <CheckCircleFilled className="icon" />
                                    <span>{cover}</span>
                                </div>
                            ))}
                        </div>
                        {showRightArrow && (
                            <button className="scroll-arrow right" onClick={() => scroll("right")}>
                                <RightOutlined />
                            </button>
                        )}
                    </div>

                    {/* Summary Section */}
                    <div className="summary">
                        <div className="row">
                            <span>Total Sum Insured</span>
                            <span>$ 10,00,000</span>
                        </div>
                        <div className="row">
                            <span>Total Premium</span>
                            <span>$ 1,00,000</span>
                        </div>
                        <div className="row">
                            <span>Charges</span>
                            <span>$ 1,000</span>
                        </div>
                        <div className="row">
                            <span>Loading</span>
                            <span>$ 1,000</span>
                        </div>
                        <div className="grand-total">
                            <strong>Grand Total</strong>
                            <strong>$ 1,02,000</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="save_btn_grid">
                    {/* <button>Back</button> */}
                    <button onClick={() => dispatch(setPayStepper(1))}>Make Payment</button>
                </div>
            </div>
        </>
    );
};

export default PlanCard;
