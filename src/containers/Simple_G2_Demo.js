import createG2 from 'g2-react';
import { Stat } from 'g2';
import React, { Component } from 'react';
import data from './Simple_G2_Demo_data.json';

const Pie = createG2(chart => {
    chart.coord('theta');
    chart.intervalStack().position(Stat.summary.proportion()).color('cut');
    chart.render();
});

export default class Simple_G2_Demo extends Component {

    state = {
        data: data.slice(0, data.length / 2 - 1),
        width: 1000,
        height: 500,
        plotCfg: {
            margin: [10, 100, 50, 120],
        },
    }

    changeHandler = () => {
        const { chart } = this.refs.myChart;
        chart.clear();
        chart.intervalStack().position(Stat.summary.proportion()).color('clarity');      // operation
        chart.render();
    }

    render() {
        return (
            <div>
                <Pie
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    plotCfg={this.state.plotCfg}
                    ref="myChart"
                />
                <button onClick={this.changeHandler}>change</button>
            </div>
        );
    }
}

