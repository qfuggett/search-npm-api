import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {

    const dispatch = useDispatch();

    return bindActionCreators(actionCreators, dispatch);
    // returns an object that contains all action creators we provided in the first argument
    // { searchRepositories: dispatch(searchRepositories)}
};