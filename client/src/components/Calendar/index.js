import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import './styles.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: ApiCalendar.sign,
            events: []
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            console.log("stuff");
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    handleItemClick(event, name) {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            this.setState({ events: [] });
            ApiCalendar.handleSignoutClick();
        }
    }

    signUpdate(sign) {
        let events = [];
        console.log("signUpdate");
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents(10)
                .then(({ result }) => {
                    console.log(result.items);
                    events = JSON.parse(JSON.stringify(result.items));
                    this.setState({ events: events });
                });
        this.setState({
            sign: sign
        })
    }

    render() {
        const eventList = this.state.events;
        return (
            <div className="container">
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-in')}
                    name="signin"
                    id="signin"
                >
                    Sign-in
            </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-out')}
                    name="signout"
                    id="signout"
                >
                    Sign-out
            </button>
                <div>
                    You are signed {this.state.sign ? "in" : "out"}!
                </div>
                <div>test {eventList.length > 0 ? "events" : "no events"}</div>
                <div>test {eventList.length > 0 ? eventList[0].summary : "no events"}</div>
            </div>
        );
    }
}

export default Calendar;