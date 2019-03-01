import React, { Component } from 'react';
import { dataMonth } from '../../commons/Commons';
import './CalendarEditor.css';

class CalendarEditor extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      schedule: [{
          date: '02/10/2019',
          users: [1,2],
        },
        {
          date: '02/15/2019',
          users: [1],
        },
      ],
      users: [{
          id: 0,
          firstName: 'Claudio',
          lastName: 'Garaycochea',
        }, 
        {
          id: 1,
          firstName: 'Tomy',
          lastName: 'Gary',
        }
      ],
      dateSelected: {}
    }
  }

  componentWillMount(){
    const dateSelected = dataMonth.getToday();
    console.log('-----> date selected: ',dateSelected);
    this.setState({dateSelected});
  }

  showMonth = (date) => {
    /*const dataMonth = {
      day: 12,
      month: 10,
      year: 2019,
      days: 30
    }*/
    return (<div>Testing</div>);
  }

  buildCalendarContent = () => {
		let table = []
    let counterDay = 0;
    let dayName = '';
    let dayRestart = this.state.dateSelected.dayNumber;
		for (let i = 0; i < 6; i++) {
			let children = []
			for (let j = 0; j < 7; j++) {
        dayName = dataMonth.getDayNumberToName(j+1);
        counterDay++;
        if(counterDay>dayRestart) {
          counterDay = 1;
          dayRestart = this.state.dateSelected.days;
        }
        children.push(
          <td key={j}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, i)}}
          >
            <div className="item-draggable">{dayName} {counterDay}</div> 
          </td>
        )
      }
      
			table.push(<tr key={i}>{children}</tr>)
		}
		return table
  }

  buildCalendar = (date) => {
    return(
			<table className="calendar-wrapper">
				<tbody>
					{this.buildCalendarContent()}
				</tbody>
			</table>
		)
  }

	render() {
    console.log(this.state.dateSelected);
		return (
			<div>
				CalendarEditor
        <div>
          {this.buildCalendar('02/28/2019')}
        </div>
			</div>
		);
	}
}

export default CalendarEditor;