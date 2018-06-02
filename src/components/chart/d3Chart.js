import * as d3 from 'd3'

var isBar = true
var isClicked = false;

export default class d3Chart {

    update(el, state) {
        if (isBar) {
            this._drawBars(el, state);
        }
        else {
            this._drawPoints(el, state);
        }
    }

    destroy(el) {
    }

    create(el, data) {
        // console.log(el)
        //TODO: adjust size according to actual size of table 
        //TODO: 
        // console.log(d3.select(el).attr("height"));
        // var svgContainers = d3.select(el)
        //                         .attr("height",50)
        //                         .attr("width", 50)
        //                         .on("click", () => {
        //                             el.setAttribute("height", 100)
        //                             el.setAttribute("width", 100)
        //                         });
        var chartPlace = d3.select(el);
        // this._drawBars(chartPlace,data);
        this._drawPoints(chartPlace, data);
        // this._drawPies(chartPlace,data);
    }

    // _drawPies (el,data) {
    //     var pie = d3.pie()
    //         .sort(null)
    //         .value (function (d){ return d.count; })
    // }
    _drawPoints(el, data) {
        // console.log(el);
        el.append("circle")
            .attr("cx", 25)
            .attr("cy", 25)
            .attr("r", 25)
            .on("click", function () {
                // console.log(this);
                d3.select(this).style("opacity", 0);
                isBar = true;
                isClicked = true;
            })
            .attr("fill", function () {
                var successPersentage = data.success * 100 / (data.success + data.fail);
                if (successPersentage >= 60) {
                    return "green"
                }
                return "red"
            });
    }

    static _changeChart(el, data) {
        // console.log(this);
        this.update(el, data);
    }

    _drawBars(chartPlace, data) {
        var successLable = chartPlace.append("text")
            .attr("x", 35)
            .attr("y", 20)
            .text("Success: " + data.success)
            .attr("font-size", "10px")
            .style("opacity", 0.1);

        var failedLable = chartPlace.append("text")
            .attr("x", 35)
            .attr("y", 40)
            .text("Failed: " + data.fail)
            .attr("font-size", "10px")
            .style("opacity", 0.1);

        var greenBar = chartPlace.append("rect")
            .attr("x", 1)
            .attr("y", 0)
            .attr("height", function () {
                return data.success * 100 / (data.success + data.fail)
            })
            .attr("width", 30)
            .style("fill", "green")
            .style("opacity", 0.7)
            .on("mouseover", function () {
                greenBar.attr("stroke", "black").attr("stroke-width", "0.5px").style("z-index", "0.5")
                greenBar.style("opacity", 1)
                successLable.style("opacity", 1)
            })
            .on("mouseout", function () {
                greenBar.style("opacity", 0.7)
                greenBar.attr("stroke-width", "0px")
                successLable.style("opacity", 0.1)
            });

        var redBar = chartPlace.append("rect")
            .attr("x", 1)
            .attr("y", function (d) {
                return data.success * 100 / (data.success + data.fail)
            })
            .attr("height", function (d) {
                return data.fail * 100 / (data.success + data.fail)
            })
            .attr("width", 30)
            .style("fill", "red")
            .style("opacity", 0.7)
            .on("mouseover", function () {
                redBar.attr("stroke", "black").attr("stroke-width", "0.5px").style("z-index", "0.5")
                redBar.style("opacity", 1)
                failedLable.style("opacity", 1)
            })
            .on("mouseout", function () {
                redBar.style("opacity", 0.7)
                redBar.attr("stroke-width", "0px")
                failedLable.style("opacity", 0.1)
            });


    }
}

