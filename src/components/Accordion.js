import React from 'react';
import './Accordion.css';


class Accordion extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <button type="button" class="accordion-header">{ this.props.name }</button>

                <div class="accordion-content">
                    <p>Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. 
                    Vestibulum tortor quam, feugiat vitae, 
                    ultricies eget, tempor sit amet, ante. 
                    Donec eu libero sit amet quam egestas semper. 
                    Aenean ultricies mi vitae est. 
                    Mauris placerat eleifend leo.</p>
                </div>
            
            </div>
        );
    }
}

export default Accordion