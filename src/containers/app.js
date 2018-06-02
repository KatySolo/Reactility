import App from '../components/app';
import {getData} from '../actions';
import {connect} from 'react-redux';

const props = (state) => {
    return {
        loading: state.loading,
        slides: state.slides,
        themes: state.themes,
        teachers: state.teachers,
        slidesOrder: state.slidesOrder
    };
};

const actions = {
    loadData: getData,
    // loadDataFinish: getDataFinish
};

export default connect(props, actions)(App)