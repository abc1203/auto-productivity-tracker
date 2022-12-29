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
    }

    render() {
        return (
            <div class="sites">
                <form>
                    <input id="site-field" type="text" placeholder="Add site to list" onChange={(e) => this.setState({ site: e.target.value })} />
                    <Button variant="contained" type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(this.state.site.length !== 0 && !this.state.siteList.includes(this.state.site)) {
                            this.setState({ siteList: [...this.state.siteList, this.state.site], site: '' });
                        }
                        document.getElementById('site-field').value=null;
                    }}>Add</Button>
                </form>

                <dl>
                    {this.state.siteList.map((site) =>
                        <div><dt>{site.toString()}</dt><dd>{0}</dd></div>
                    )}
                </dl>
            </div>
        );
    }
}

export default Sites