import React from 'react';
import './WebAct.css';

class WebAct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 0,
            siteList: []
        }

        this.sort_keys = this.sort_keys.bind(this);
    }

    sort_keys(obj) {
        var domain_keys = Object.keys(obj).sort(function(a,b){return obj[a] - obj[b]}).reverse()
        return domain_keys;
    }
    
    format_seconds(seconds) {
        if(seconds <60){
            return seconds+" s";
        }else if(seconds >=60 && seconds< 3600){
            return Math.floor(seconds/60)+" m "+seconds%60+" s";
        }else if(seconds > 3600){
            var hour = Math.floor(seconds/3600);
            var minute = Math.floor((seconds-hour*3600)/60);
            return hour+" h "+minute+" m "+seconds%60+" s";
        }
    }

    componentDidMount() {
        var domains = JSON.parse(localStorage['today_domains']);
        var domain_keys = this.sort_keys(domains);
        this.setState({ siteList: domain_keys });
    }


    render() {
        return (
            <div class="webact">
                <dl>
                    {this.state.siteList.map((site) =>
                        <div><dt>{site}</dt><dd>{this.format_seconds(JSON.parse(localStorage['today_domains'])[site])}</dd></div>
                    )}
                    
                </dl>
            </div>
        );
    }
}

export default WebAct