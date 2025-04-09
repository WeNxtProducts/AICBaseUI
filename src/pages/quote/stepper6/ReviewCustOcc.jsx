import React from 'react'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';

const ReviewCustOcc = ({ title, data }) => {
    const dropDown = useSelector((state) => state?.quote?.dropDown);

    const getLovData = (value, fieldKey) => {
        return dropDown?.[fieldKey]?.find(item => item?.value === value)?.label;
    }

    return (
        <div className="review_details">
            <p className="review_title">{title}</p>

            <div className="details_grid">
                {Object.entries(data?.formFields || {}).map(
                    ([fieldKey, { PFD_FLD_NAME, PFD_DATA_TYPE, PFD_FLD_VALUE }]) => (
                        <div key={fieldKey} className="detail_field">
                            <p>{PFD_FLD_NAME}</p>
                            <p>
                                {PFD_DATA_TYPE === "lov"
                                    ? getLovData(PFD_FLD_VALUE, fieldKey)
                                    : PFD_DATA_TYPE === "amount" ? formatNumber(PFD_FLD_VALUE)
                                        : PFD_FLD_VALUE}
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default ReviewCustOcc