import React, { ReactNode, SyntheticEvent } from 'react';
import ApiCalendar from 'react-google-calendar-api';

class DoubleButton extends React.Component {
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
            <>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-in')}
            >
                sign-in
            </button>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-out')}
            >
                sign-out
            </button>
            </>
        );
    }
}

export default DoubleButton;