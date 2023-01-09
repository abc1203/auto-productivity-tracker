import React from 'react';
import './Settings.css';



class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTracking: true,
            clearAllData: false
        };
    }

    render() {
        return(
            <div class="settings">
                <div class="settings-content">
                    Stop Tracking After {" "}

                    <select name="time-options" class="settings-options">
                        <option value="0">30 seconds</option>
                        <option value="1">1 minute</option>
                        <option value="2" selected="selected">5 minutes</option>
                        <option value="3">10 minutes</option>
                        <option value="4">15 minutes</option>
                        <option value="5">30 minutes</option>
                        <option value="6">1 hour</option>
                        <option value="7">Infinite</option>
                    </select>

                    {" "} of Inactivity
                </div>

                <button class="settings-button" 
                    onClick={() => {
                        this.setState( { isTracking: !this.state.isTracking } );
                        localStorage['is_tracking'] = !(JSON.parse(localStorage['is_tracking']));
                    }}>
                        { this.state.isTracking ? "Pause Tracking" : "Continue Tracking" }
                </button>

                <button class="settings-button" 
                    onClick={() => {
                        this.setState( { clearAllData: true } );
                        // productive, unproductive, today_domains, domains
                    }}>
                        Clear All Data
                </button>
            </div>

        );
    }
}

export default Settings