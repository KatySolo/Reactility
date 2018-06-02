export default {
    getSlides: function () {
        return fetch('https://api.ulearn.me/courses/BasicProgramming')
            .then(function (response) {
                const result = response.json();
                const themes = result.units.map(item => ({
                    id: item.id,
                    title: item.title,
                    slidesCount: item.slides.filter(slide => slide.type !== 'lesson').length,
                }))

                const slides = result.units.map(unit => [...unit.slides.filter(slide => slide.type !== 'lesson')])
                return response.json();
            })
    },
    getInstuctorResults: function () {
        return fetch("https://api.ulearn.me/codereview/statistics/BasicProgramming/instructor")
            .then(function (response) {
                return response.json();
            })
    }
}