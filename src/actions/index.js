import {createAction} from 'redux-actions';
import delay from '../utils/delay';
import 'babel-polyfill';
import api from '../api/fake_API/data_export';

const _loadDataStart = createAction('getDataStart');
const _loadDataFinish = createAction('getDataFinish');
export const getData = () => {
    return async (dispatch) => {
        dispatch(_loadDataStart());
        await delay(1000);
        // console.log(api);
        const slides = api.getSlides();
        // console.log(slides)
        const teachers = api.getInstuctorResults();
        // console.log(teachers)     
        dispatch(_loadDataFinish({teachers, tasks: slides}));
        // disaptch для взятие данных из fakeApi
    }
}


// export const getDataFinish = () => {
//     return async(dispatch) => {

//         await delay(500);
//     }
// }