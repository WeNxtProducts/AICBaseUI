import { useEffect } from "react";
import CustomSelect from "../../components/customFieldComponents/customSelect/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import { setDateRange, setGraphType } from "../../globalStore/slices/dashboardSlice";

const typesDashboard = [
    {
        label: 'Sales Performance',
        value: "S"
    },
    {
        label: 'Customer Demographics',
        value: "C"
    },
    {
        label: 'Policy Portfolio',
        value: "P"
    },
    {
        label: 'Claims Management',
        value: "CM"
    }
]
const { RangePicker } = DatePicker;

const UserDetail = () => {
    const dispatch = useDispatch();
    const { graphType, fromDate, toDate } = useSelector((state) => state.dashboard);

    const handleDateChange = (dates, dateStrings) => {
        if (dates) {
            dispatch(setDateRange({ fromDate: dateStrings[0], toDate: dateStrings[1] }));
        } else {
            dispatch(setDateRange({ fromDate: '', toDate: '' }));
        }
    };

    return (
        <div className='header-card-details'>
            <div className='name-details mt-5'>
                <p className='name-style'>Hello! George Martin</p>
                <p className='company-style'>Welcome to WENXT Technologies</p>
            </div>
            <div className="filter_details">
                <div className="w-[200px]">
                    <CustomSelect
                        options={typesDashboard}
                        size='large'
                        placeholder='Select'
                        value={graphType || undefined}
                        showSearch={false}
                        onChange={e => {
                            dispatch(setGraphType(e))
                        }}
                    />
                </div>
                <div className="w-[250px]">
                    <RangePicker picker="month" onChange={handleDateChange} />
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
