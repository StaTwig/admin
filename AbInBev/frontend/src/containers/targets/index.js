import React, { useEffect, useState } from 'react';
import { getAllStates } from '../../actions/analyticsAction';
import TargetsCoponent from '../../components/targets';
import { useDispatch } from 'react-redux';
import { getDistrictsByState } from '../../actions/inventoryAction';


const Targets = (props) => {

    const [states, setStates] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        debugger
        (async () => {
            const result = await dispatch(getAllStates());
            setStates(result.data)
            console.log(states)
        })();
    }, []);

    const getDistricts = async (state) => {
        const result = await dispatch(getDistrictsByState(state));
        return result;
    }

    return <TargetsCoponent {...props} states={states} getDistricts={getDistricts}></TargetsCoponent>
}

export default Targets;