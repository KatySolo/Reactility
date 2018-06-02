import React from 'react'
import Table from './table/table'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        props.loadData();
    }

    render() {
        const {loading, slides, themes, teachers, slidesOrder} = this.props;
        return (
            <div>
                <h1>Статистика по учителям</h1>
                {loading && <div className='loader'/>}
                {!loading && slides && <div>
                    <Table themes={themes} slides={slides} teachers={teachers} slidesOrder={slidesOrder}/>
                </div>
                }
            </div>

        )
    }
}