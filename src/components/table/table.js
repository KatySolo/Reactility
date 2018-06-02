import React from 'react'
import styles from './table.less'
import Chart from '../chart/chart'

export default class Table extends React.Component {
    render() {
        const {themes, slides, teachers, slidesOrder} = this.props;
        return (
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}/>
                    {themes.map((item, index) => <th key={item.id} className={styles.th}
                                                     colSpan={item.slidesCount}>{item.title}</th>)}
                </tr>
                <tr>
                    <th className={styles.th}/>
                    {slides.map((item, index) => <th key={item.id} className={styles.th}>{item.title}</th>)}
                </tr>

                </thead>
                <tbody>
                {teachers.map((teacher, index) => {
                        const filledCells = filledCellsMap(slidesOrder, teacher.exercises)
                        // console.log(filledCells)
                        return (
                            <tr key={index}>
                                <td className={styles.td} key={index}>
                                    {teacher.name}
                                </td>
                                {slides.map((_, index) => {
                                    if (filledCells.indexOf(index) !== -1) {
                                        // console.log("found")
                                        return <td>
                                            <Chart success={teacher.columnPointer[index].reviewed_count}
                                                   fail={teacher.columnPointer[index].unreviewed_count}/>
                                        </td>
                                    }
                                    else {
                                        return <td/>
                                    }
                                })}
                            </tr>)
                    }
                )}
                </tbody>
            </table>
        )
    }
}

function filledCellsMap(order, exercises) {
    return exercises.map(item => order[item.slide_id])
}
