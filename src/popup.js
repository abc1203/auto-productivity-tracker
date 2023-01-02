import 'background.js';

function sort_keys(obj){
    var domain_keys = Object.keys(obj).sort(function(a,b){return obj[a] - obj[b]}).reverse()
    return domain_keys;

}

function format_seconds(seconds){
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

function timestamp_to_string(timestamp){
    return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\d{4}\/\d{1,2}\/\d{1,2}/,"");
}

function get_detail_data(){
    var domains = JSON.parse(localStorage["domains"]);
    var domain_keys = sort_keys(domains);
    var return_data = {}
    return_data['domains'] = []
    return_data['times'] = []
    for (var i in domain_keys){
        return_data['domains'].push(domain_keys[i]);
        return_data['times'].push(domains[domain_keys[i]]);
    }
    return return_data

}

function get_detail_title(){
    var time = localStorage['time'];
    var time_start = time - count_interval;
    return timestamp_to_string(time_start*1000) + " 到 "+timestamp_to_string(time*1000)+" 的访问记录";

}


function get_today_data(){		
    var domains = JSON.parse(localStorage["today_domains"]);
    var domain_keys = sort_keys(domains);
    var top_keys = domain_keys.slice(0,top);
    var other_keys = domain_keys.slice(top+1,-1);
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
    window.alert("hello");
    return data;

}

