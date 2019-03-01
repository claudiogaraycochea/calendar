import React, { Component } from 'react';
import CalendarEditor from '../calendarEditor/CalendarEditor';

class Main extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
    }
  }

	render() {
		return (
			<div>
				<h2>Calendar</h2>
				<CalendarEditor />
			</div>
		);
	}
}

export default Main;