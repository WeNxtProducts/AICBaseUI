import React, { useContext } from 'react'
import { ReInsuranceContext } from '../../ReInsurance';

const CoverCodeSidbar = ({ CoverCodeList }) => {
    const { selectedCover, setSelectedCover } = useContext(ReInsuranceContext);

    return (
        <div className='cover_code_sidbar'>
            <div className='cover_title'>
                <p>Cover Code</p>
            </div>
            {CoverCodeList?.length > 0 ?
                <div className='cover_code_list'>
                    {CoverCodeList?.map((item, index) => (
                        <div
                            onClick={() => setSelectedCover(item?.RED_COVER_CODE)}
                            key={`${item?.RED_COVER_CODE}-${index}`}
                            className={`label_wrap ${item?.RED_COVER_CODE === selectedCover ? 'label_wrap_selected' : ''}`}>
                            <p className='label_text'>{item?.RED_COVER_CODE}</p>
                        </div>
                    ))}
                </div>
                :
                <p>No Cover Code</p>
            }
        </div>
    )
}

export default CoverCodeSidbar
