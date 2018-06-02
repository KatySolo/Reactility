import tasksData from './data_slides.json'
import teachersData from './data_instructors.json'

export default {
    getSlides: function () {
        const result = tasksData;
        const themes = result.units.map(item => ({
            id: item.id,
            title: item.title,
            slidesCount: item.slides.filter(slide => slide.type !== 'lesson' && slide.type !== 'quiz').length,
        }))
        const slidesSep = result.units.map(unit => [...unit.slides.filter(slide => slide.type !== 'lesson' && slide.type !== 'quiz')])
        const slides = slidesSep.map((unit, pointer) => unit.map((slide, index) => ({
            id: slide.id,
            title: slide.title
        })))
            .reduce(function (prev, cur) {
                var more = [].concat(cur).some(Array.isArray);
                return prev.concat(more ? cur.flatten() : cur);
            }, []);
        return {themes, slides}
    },

    getInstuctorResults: function () {
        const result = teachersData;
        const teachers = result.instructors.map(item => ({
            name: item.instructor.visible_name,
            exercises: item.exercises
        }))
        return {teachers}
    }
}