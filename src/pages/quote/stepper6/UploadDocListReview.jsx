import React, { useEffect } from 'react';

const UploadDocListReview = ({ list }) => {

    return (
        <div className='doc_list_upload'>
            <p className="review_title">Upload Document</p>
            <table className="doc_table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Description</th>
                        <th>File Name</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((item, index) => (
                        <tr key={item.DTL_SR_NO}>
                            <td>{index + 1}</td>
                            <td>{item.DTL_TODO_LIST_ITEM}</td>
                            <td>{item.filename}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UploadDocListReview;
