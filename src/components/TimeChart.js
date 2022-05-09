import React from 'react';
import DonutChart from 'react-donut-chart';
import './TimeChart.css';


class TimeChart extends React.Component {
    
    render() {
        return(
            <div class="time-chart-section">
                <div class="time-chart-heading">Today's Usage</div>
                <DonutChart 
                    className="time-chart"  
                    data={[
                        { label: 'google.com', value: 25 },
                        { label: 'github.com', value: 40 },
                        { label: 'discord.com', value: 30 },
                        { label: 'leetcode.com', value: 25 },
                        { label: 'stackoverflow.com', value: 50 },
                    ]}
                    height={ 1000/3 }
                    width={ 500 }
                    innerRadius={ 0.75 }
                    colors={ ['#4169E1', '#FF4500', '#32CD32', '#00FFFF', '#FFC0CB', 
                              '#FFA500', '#EE82EE', '#FFD700', '#F08080', '#D3D3D3'] }
                />

            </div>
        );
    }
}

export default TimeChart