import React from 'react'
import d3Chart from './d3Chart'

const chart = new d3Chart()

export default class Chart extends React.Component {
    componentDidMount() {
        chart.create(this.chartElement, this.getChartState())
    }

    componentDidUpdate() {
        chart.update(this.chartElement, this.getChartState())
    }

    componentWillUnmount() {
        chart.destroy(this.chartElement);
    }

    render() {
        return (
            <svg ref={el => {
                el ? this.chartElement = el : null
            }} className="chart"/>
        );
    }

    getChartState() {
        return {
            success: this.props.success,
            fail: this.props.fail
        };
    }
}