import React from 'react';
import './WebAct.css';

class WebAct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="webact">
                <dl>
                    <dt>google.com</dt><dd>25</dd>
                    <dt>github.com</dt><dd>40</dd>
                    <dt>discord.com</dt><dd>30</dd>
                    <dt>leetcode.com</dt><dd>25</dd>
                    <dt>stackoverflow.com</dt><dd>50</dd>
                </dl>
            </div>
        );
    }
}

export default WebAct