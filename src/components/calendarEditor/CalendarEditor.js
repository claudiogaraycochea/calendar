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
    this.setState({dateSelected});
  }

  buildCalendarContent = () => {
    const dateSelected = this.state.dateSelected;
    let table = [];
    let itemDraggable = false;
    let counterDay = 0;
    let valueDay = dateSelected.prevMonthData.startDay;
    let monthIndex = 'previous_month';

    console.log('dateSelected:',dateSelected);
    for (let i = 0; i < 6; i++) {
			let children = []
			for (let j = 0; j < 7; j++) {
        counterDay = counterDay + 1;
        valueDay = valueDay + 1;

        if((monthIndex==='previous_month')&&(valueDay===dateSelected.prevMonthData.endDay+1)){
          monthIndex = 'actual_month';
          valueDay = 1;
          itemDraggable = true;
        }

        if((monthIndex==='actual_month')&&(valueDay===dateSelected.monthData.endDay+1)){
          monthIndex = 'next_month';
          valueDay = 1;
          itemDraggable = false;
        }

        if(itemDraggable) {
          children.push(
            <td key={j}
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>{this.onDrop(e, i, j)}}
            >
              <div className="item item-draggable">
                <div className="value-day">{valueDay}</div>
              </div>
            </td>
          )
        }
        else {
          children.push(
            <td key={j}>
              <div className="item item-disabled">
                <div className="value-day">{valueDay}</div>
              </div>
            </td>
          )
        }
      }
			table.push(<tr key={i}>{children}</tr>)
		}
		return table;
  }
  
  buildCalendar = (date) => {
    return(
			<table className="calendar-wrapper">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
				<tbody>
					{this.buildCalendarContent()}
				</tbody>
			</table>
		)
  }

  /* When start to Drag set a Block name as ID */
	onDragStart = (ev, userId) => {
		ev.dataTransfer.setData("userId", userId);
	}

	onDragOver = (ev) => {
		ev.preventDefault();
	}

	/* When is Drop insert the Block */
	onDrop = (ev, i, j) => {
    let userId = ev.dataTransfer.getData("userId");
    console.log('Insert userId ',userId,' to ',i,'/',j);
	}

	render() {
    console.log(this.state.dateSelected);
		return (
			<div>
				CalendarEditor
        <div>
          {this.buildCalendar('02/28/2019')}
        </div>
        <div>
          {this.state.users.map((item) => {
            return (<div key={item.id}
              onDragStart = {(e) => this.onDragStart(e, item.id)}
              draggable
              >
              {item.firstName} {item.lastName}
            </div>)          
          }

          )}
        </div>
			</div>
		);
	}
}

export default CalendarEditor;