import React, { useState } from 'react'

const CoverCodeSidbar = () => {
    const arr = ['LPLAN1', 'LPLAN2', 'LPLAN3', 'LPLAN4', 'LPLAN5']
    const [selected, setSelected] = useState('LPLAN1')

    return (
        <div className='cover_code_sidbar'>
            <div className='cover_title'>
                <p>Cover Code</p>
            </div>
            <div className='cover_code_list'>
                {arr?.map(item => (
                    <div
                        onClick={() => setSelected(item)}
                        key={item}
                        className={`label_wrap ${item === selected ? 'label_wrap_selected' : ''}`}>
                        <p className='label_text'>{item}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CoverCodeSidbar
