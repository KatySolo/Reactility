import {handleActions} from 'redux-actions';

const initialState = {
    loading: false,
    data: null
};
export default handleActions({
    'getDataStart': (state) => ({
        ...state,
        loading: true
    }),
    'getDataFinish': (state, {payload}) => ({
        ...state,
        loading: false,
        themes: payload.tasks.themes,
        slides: payload.tasks.slides,
        teachers: orderedTeachers(payload.teachers, slidesOrdering(payload.tasks.slides)),
        slidesOrder: slidesOrdering(payload.tasks.slides)
    })
}, initialState);

//Визуализация статистики проверки преподавателями студенческих задач 

function slidesOrdering(slides) {
    return slides.reduce((acc, item, index) => {
        acc[item.id] = index
        return acc
    }, {})
}

function orderedTeachers(teachers, slidesOrder) {
    return teachers.teachers.map((item, index) => ({
            ...item,
            columnPointer: slideIDChanger(item, slidesOrder)
        })
    )
}

function slideIDChanger(item, slidesOrder) {
    if (item.exercises.length > 0) {
        return item.exercises.reduce((acc, task, pointer) => {
            // console.log(task)
            acc[slidesOrder[task.slide_id]] = ({
                reviewed_count: task.reviewed_submissions_count,
                unreviewed_count: task.queue_size
            })
            return acc
        }, {})
    } else {
        return {}
    }
}

//{reviewed_count: task.reviewed_subbmisiion_count,unreviewed_count: task.queue_size}