const StatisticsCards = () => {
    return (
        <div className='statics-card-details mt-7'>
            <div className='das_card card1 flex items-center'>
                <i className='bi bi-calendar3 icon-color' />
                <div className='ml-5'>
                    <p className='count'>325</p>
                    <p className='type'>Total Premiums</p>
                </div>
            </div>
            <div className='das_card card2 flex items-center'>
                <i className='bi bi-geo-alt icon-color' />
                <div className='ml-5'>
                    <p className='count'>1575</p>
                    <p className='type'>Total Claims</p>
                </div>
            </div>
            <div className='das_card card3 flex items-center'>
                <i className='bi bi-clock icon-color' />
                <div className='ml-5'>
                    <p className='count'>123</p>
                    <p className='type'>Total Policies</p>
                </div>
            </div>
            <div className='das_card card4 flex items-center'>
                <i className='bi bi-fire icon-color' />
                <div className='ml-5'>
                    <p className='count'>2015</p>
                    <p className='type'>Total Renewals</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCards;
