import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './PlanListSelection.scss';

const PlanListSelection = ({ planList }) => {
    const [selectedPlans, setSelectedPlans] = useState([]);


    const handleSelectPlan = (planId) => {
        setSelectedPlans(prevSelectedPlans => {
            if (prevSelectedPlans.includes(planId)) return prevSelectedPlans.filter(id => id !== planId);
            else return [...prevSelectedPlans, planId];
        });
    };

    return (
        <div className="subscription-container">
            <div className="swiper-navigation">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }}
                className="plan-cards-swiper"
            >
                {planList.map((plan) => (
                    <SwiperSlide key={plan.id}>
                        <div className={`plan-card ${selectedPlans.includes(plan.id) ? 'selected' : ''}`}>
                            <div className="plan-header">
                                <div className="plan-tier">{plan.tier}</div>
                                <div className="plan-name">{plan.name}</div>
                                <div className="plan-icon">
                                    <div className="icon-background">S</div>
                                </div>
                            </div>
                            <div className="plan-users">{plan.users}</div>
                            <div className="plan-description">{plan.description}</div>
                            <div className="plan-actions">
                                <button type="button" className="view-plan-btn">View Plan</button>
                                <button
                                    type="button"
                                    className={`choose-plan-btn ${selectedPlans.includes(plan.id) ? 'selected-btn' : ''}`}
                                    onClick={() => handleSelectPlan(plan.id)}
                                >
                                    Choose plan
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PlanListSelection;