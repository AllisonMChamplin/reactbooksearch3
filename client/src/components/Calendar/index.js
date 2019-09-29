import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import './styles.css';

class StatusSign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: ApiCalendar.sign,
        };
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            console.log("stuff");
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    signUpdate(sign) {
        console.log("signUpdate");
        this.setState({
            sign
        })
    }

    render() {
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents(10)
                .then(({ result }) => {
                    console.log(result.items);
                });
        return (
            <div>You are signed {this.state.sign ? "in" : "out"}!</div>
        );
    }
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event, name) {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }

    render() {
        return (
            <div className="container">
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-in')}
                >
                    Sign-in
            </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-out')}
                >
                    Sign-out
            </button>
                <StatusSign />
            </div>
        );
    }
}

export default Calendar;