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
        // this.format_seconds = this.format_seconds.bind(this);
        // this.timestamp_to_string = this.timestamp_to_string.bind(this);
        // this.get_detail_data = this.get_detail_data.bind(this);
        // this.get_detail_title = this.get_detail_title.bind(this);
        this.get_today_data = this.get_today_data.bind(this);
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
    
    timestamp_to_string(timestamp) {
        return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\d{4}\/\d{1,2}\/\d{1,2}/,"");
    }
    
    get_detail_data() {
        var domains = JSON.parse(localStorage["domains"]);
        console.log(domains)
        var domain_keys = this.sort_keys(domains);
        var return_data = {}
        return_data['domains'] = []
        return_data['times'] = []
        for (var i in domain_keys){
            return_data['domains'].push(domain_keys[i]);
            return_data['times'].push(domains[domain_keys[i]]);
        }
        return return_data
    }
    
    get_detail_title() {
        var time = localStorage['time'];
        var time_start = time - this.count_interval;
        return this.timestamp_to_string(time_start*1000) + " 到 "+ this.timestamp_to_string(time*1000)+" 的访问记录";
    }

    get_today_data() {
        var domains = JSON.parse(localStorage['today_domains']);
        var domain_keys = this.sort_keys(domains);
        this.setState({ siteList: domain_keys });
    }


    render() {
        this.state.intervalID = setInterval(this.get_today_data, 1000);
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