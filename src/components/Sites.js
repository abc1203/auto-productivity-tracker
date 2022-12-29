import React from 'react';

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
                    <input type="text" placeholder="Add site to list" onChange={(e) => this.setState({ site: e.target.value })} />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        if(this.state.site.length !== 0 && !this.state.siteList.includes(this.state.site)) {
                            this.setState({ siteList: [...this.state.siteList, this.state.site], site: '' });
                        }
                    }}>Add</button>
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