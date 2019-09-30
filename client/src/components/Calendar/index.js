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
                    events = result.items;
                    this.setState({ events: events });
                });
        this.setState({
            sign: sign
        })
    }

    render() {
        // const isLoggedIn = this.state.sign;
        let button;

        if (!this.state.sign) {
            button = <button
                onClick={(e) => this.handleItemClick(e, 'sign-in')}
            >
                Sign-in
    </button>
        } else {
            button = <button
            onClick={(e) => this.handleItemClick(e, 'sign-out')}
        >
            Sign-out
    </button>
        }

        return (
            <div className="container">
                {button}
                {/* <button
                    onClick={(e) => this.handleItemClick(e, 'sign-in')}
                >
                    Sign-in
            </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-out')}
                >
                    Sign-out
            </button> */}
                <div>
                    You are signed {this.state.sign ? "in" : "out"}!
                </div>

            </div>
        );
    }
}

export default Calendar;