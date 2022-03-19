import React, { useEffect, useState } from 'react';
import { getAllStates, getAllTargets } from '../../actions/analyticsAction';
import TargetsCoponent from '../../components/targets';
import { useDispatch } from 'react-redux';
import { getDistrictsByState } from '../../actions/inventoryAction';


const Targets = (props) => {

    const [states, setStates] = useState([])
    const [depots, setDepots] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [targetDistricts, setTargetDistricts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await dispatch(getAllTargets());
            if (res) {
                setDepots(res.data)
                let abc = res.data.map((obj) => obj._id.depot)
                setTargetDistricts(abc);
            }
            const result = await dispatch(getAllStates());
            setStates(result.data)
        })();
    }, [refresh]);

    const getDistricts = async (state) => {
        const res = await dispatch(getAllTargets());
        if (res)
            setDepots(res.data)
        const result = await dispatch(getDistrictsByState(state));
        return result;
    }
    const refreshPage = () => {
        setRefresh(!refresh)
    }
    return <TargetsCoponent {...props} states={states} targetDistricts={targetDistricts} depots={depots} refreshPage={refreshPage} getDistricts={getDistricts}></TargetsCoponent>
}

export default Targets;