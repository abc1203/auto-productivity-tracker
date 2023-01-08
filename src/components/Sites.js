import React from 'react';

import Button from '@mui/material/Button';
import './Sites.css';

class Sites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            site: '',
            siteDel: '',
            siteList: []
        }
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

    componentDidMount() {
        this.setState({ siteList: JSON.parse(localStorage[this.props.type]) });
    }


    render() {
        // initialize localstorage item if undefined
        if(!localStorage[this.props.type]) {
            localStorage[this.props.type] = JSON.stringify([]);
        }
        
        return (
            <div class="sites">
                <form>
                    <input id={this.props.type+"add"} type="text" placeholder="Add site to list" onChange={(e) => this.setState({ site: e.target.value })} />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(this.state.site.length !== 0 && !JSON.parse(localStorage[this.props.type]).includes(this.state.site)) {
                            var domains = JSON.parse(localStorage[this.props.type]);
                            domains.push(this.state.site);
                            localStorage[this.props.type] = JSON.stringify(domains);
                
                            this.setState({ site: '', siteList: JSON.parse(localStorage[this.props.type]) });
                        }
                        document.getElementById(this.props.type+"add").value=null;
                    }}>Add</button>

                    <input id={this.props.type+"remove"} type="text" placeholder="Remove site from list" onChange={(e) => this.setState({ siteDel: e.target.value })} />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(this.state.siteDel.length !== 0 && JSON.parse(localStorage[this.props.type]).includes(this.state.siteDel)) {
                            var domains = JSON.parse(localStorage[this.props.type]);
                            domains.splice(domains.indexOf(this.state.siteDel), 1);
                            localStorage[this.props.type] = JSON.stringify(domains);
                
                            this.setState({ siteDel: '', siteList: JSON.parse(localStorage[this.props.type]) });
                        }
                        document.getElementById(this.props.type+"remove").value=null;
                    }}>Remove</button>
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