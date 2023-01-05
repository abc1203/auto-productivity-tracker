import React from 'react';

import Button from '@mui/material/Button';
import './Sites.css';

class Sites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            site: '',
            siteList: []
        }

        this.load_sites = this.load_sites.bind(this);
    }

    sort_keys(obj) {
        var domain_keys = Object.keys(obj).sort(function(a,b){return obj[a] - obj[b]}).reverse()
        return domain_keys;
    }
    
    format_seconds(seconds) {
        if(!seconds) {
            return "0 s";
        }

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

    load_sites() {
        this.setState({ siteList: JSON.parse(localStorage[this.props.type]) });
    }


    render() {
        // initialize localstorage item if undefined
        if(!localStorage[this.props.type]) {
            localStorage[this.props.type] = JSON.stringify([]);
        }

        // update sitelist every second
        setInterval(this.load_sites, 500);

        return (
            <div class="sites">
                <form>
                    <input id={this.props.type} type="text" placeholder="Add site to list" onChange={(e) => this.setState({ site: e.target.value })} />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(this.state.site.length !== 0 && !JSON.parse(localStorage[this.props.type]).includes(this.state.site)) {
                            var domains = JSON.parse(localStorage[this.props.type]);
                            domains.push(this.state.site);
                            localStorage[this.props.type] = JSON.stringify(domains);
                
                            this.setState({ site: '' });
                        }
                        document.getElementById(this.props.type).value=null;
                    }}>Add</button>
                </form>

                <dl>
                    {this.state.siteList.map((site) =>
                        <div><dt>{site.toString()}</dt><dd>{this.format_seconds(JSON.parse(localStorage['today_domains'])[site])}</dd></div>
                    )}
                </dl>
            </div>
        );
    }
}

export default Sites