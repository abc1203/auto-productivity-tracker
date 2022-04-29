import React from 'react';
import './Accordion.css';


class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }   
    
    render() { 
        return (
            <div class="accordion">
                <div type="button" 
                    class="accordion-header"
                    onClick={() => this.setState({ isActive: !this.state.isActive })}>
                        <div class="accordion-title"> { this.props.name } </div>
                        <div class="accordion-indicator"> { this.state.isActive ? '-' : '+'} </div>
                        { this.state.isActive && 
                        <div class="accordion-content"> { this.props.content } </div>
                        }
                </div> 
            
            </div>
        );
    }
}

export default Accordion
