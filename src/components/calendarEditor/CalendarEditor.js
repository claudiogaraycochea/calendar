import React, { Component } from 'react';
import { dataMonth } from '../../commons/Commons';
import './CalendarEditor.css';

class CalendarEditor extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      schedule: [{
          date: '3/10/2019',
          users: [1,2],
        },
        {
          date: '3/15/2019',
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
      dateSelected: {},
      usersSchedule: [],
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
          const data = {
            i,
            j,
            valueDay
          }
          children.push(
            <td key={j}
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>{this.onDrop(e, data)}}
            >
              <div className="item item-draggable">
                <div className="value-day">{valueDay}</div>
                <div className="users-wrapper">{this.getScheduleUsers(valueDay)}</div>
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
  
  buildCalendar = () => {
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

	onDragStart = (ev, userId) => {
		ev.dataTransfer.setData("userId", userId);
	}

	onDragOver = (ev) => {
		ev.preventDefault();
	}

	onDrop = (ev, data) => {
    const userId = parseInt(ev.dataTransfer.getData('userId'));
    const date = this.state.dateSelected.month+'/'+data.valueDay+'/'+this.state.dateSelected.year;
    let schedule = this.state.schedule;
    let scheduleItem = schedule.filter(item => item.date === date );
    if(scheduleItem.length>0){
      scheduleItem[0].users = scheduleItem[0].users.concat(userId);
    }
    else{
      const newScheduleItem = {
        date,
        users: [userId],
      }
      schedule.push(newScheduleItem);
    }
    this.setState({
      schedule,
    });
  }
  
  getUserData = (userId) => {
    const users = this.state.users;
    const user = users.filter(item => item.id === userId );
    return user[0];
  }

  getScheduleUsers = (valueDay) => {
    const date = this.state.dateSelected.month+'/'+valueDay+'/'+this.state.dateSelected.year;
    const schedule = this.state.schedule;
    const scheduleItem = schedule.filter(item => item.date === date );
    if(scheduleItem.length>0){
      const users = scheduleItem[0].users;
      let usersView = [];
      for(let i = 0; i < users.length; i++){
        const user = this.getUserData(users[i]);
        if(user!==undefined) {
          usersView.push(<div key={i}>{user.firstName} {user.lastName}</div>);
        }
      }
      return usersView;
    }
  }

	render() {
		return (
      <div className="container">
        <div className="content">
          {this.buildCalendar()}
        </div>
        <div className="aside">
          {this.state.users.map((item) => {
            return (
              <div key={item.id}
                onDragStart = {(e) => this.onDragStart(e, item.id)}
                draggable
                className="user-item">
                {item.firstName} {item.lastName}
              </div>)          
          })}
        </div>
      </div>
		);
	}
}

export default CalendarEditor;