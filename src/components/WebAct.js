/*global chrome*/
import React from 'react';
import './WebAct.css';

class WebAct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteList: []
        }

        // this.sort_keys = this.sort_keys.bind(this);
        // this.format_seconds = this.format_seconds.bind(this);
        // this.timestamp_to_string = this.timestamp_to_string.bind(this);
        // this.get_detail_data = this.get_detail_data.bind(this);
        // this.get_detail_title = this.get_detail_title.bind(this);
        // this.get_today_data = this.get_today_data.bind(this);
    }

    sort_keys(obj) {
        var domain_keys = Object.keys(obj).sort(function(a,b){return obj[a] - obj[b]}).reverse()
        return domain_keys;
    }
    
    format_seconds(seconds) {
        if(seconds <60){
            return seconds+" Seconds";
        }else if(seconds >=60 && seconds< 3600){
            return Math.floor(seconds/60)+" Minutes "+seconds%60+" Seconds";
        }else if(seconds > 3600){
            var hour = Math.floor(seconds/3600);
            var minute = Math.floor((seconds-hour*3600)/60);
            return hour+" Hour "+minute+" Minutes "+seconds%60+" Seconds";
        }
    }
    
    timestamp_to_string(timestamp) {
        return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\d{4}\/\d{1,2}\/\d{1,2}/,"");
    }
    
    get_detail_data() {
        var domains = JSON.parse(localStorage["info"]["domains"]);
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
        var time = localStorage["info"]['time'];
        var time_start = time - this.count_interval;
        return this.timestamp_to_string(time_start*1000) + " 到 "+ this.timestamp_to_string(time*1000)+" 的访问记录";
    }

    get_today_data() {
        chrome.runtime.sendMessage('get-localstorage', (response) => {
            console.log(response);
            localStorage.setItem("today_domains", response);
        });
        
        var domains = JSON.parse(localStorage["today_domains"]);
        // var domains = JSON.parse('{"google.com":"50"}');
        var domain_keys = this.sort_keys(domains);
        var top_keys = domain_keys.slice(0,window.top);
        var other_keys = domain_keys.slice(window.top+1,-1);
        var total_time = 0;
        var other_time = 0;
        for (var i in domain_keys){
            total_time += domains[domain_keys[i]];
        }
        for (var i in other_keys){
            other_time += domains[other_keys[i]];
        }
        var top_time = total_time - other_time;
        var data = [];
        var rotation = -90;
        for (var i in top_keys){
            var rotation = Math.floor(domains[top_keys[i]]/top_time*360) + rotation;
            rotation = rotation>90 ? rotation-180:rotation;
            data.push({"name":top_keys[i],"y":domains[top_keys[i]],"dataLabels":{"rotation":rotation}});
        }
    
        var percentage = Math.round(other_time*1000/total_time)/10;
        data.push({"name":"others","y":other_time,"dataLabels":{"percentage":percentage,"total_time":total_time}});

        // this is constantly outputed (i.e. get_today_data is constantly getting ran which is good)
        console.log("data extracted");

        return data;
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

                    { this.setState({ siteList: this.get_today_data() }) }
                    
                    {this.state.siteList.map((site) =>
                        <dt>{site.toString()}</dt>
                    )}
                    {/* <dt>{this.state.siteList}</dt> */}
                    
                </dl>
            </div>
        );
    }
}

export default WebAct