    /*global chrome*/
var update_interval = 1;
var count_interval = 300;
var request_url = "http://127.0.0.1:8888/upload"

function setDefault(){
    if(!localStorage["blacklist"]){
        localStorage['blacklist'] = JSON.stringify(['example.com'])
    }

    localStorage['time'] = Math.floor((new Date().getTime())/1000/count_interval)*count_interval;

    if(!localStorage['domains']){
        localStorage['domains'] = JSON.stringify({});
    }
    if(!localStorage['today_domains']){
        var day = new Date().getDay();
        localStorage['today'] = day;
        localStorage['today_domains'] = JSON.stringify({});
    }
    if(!localStorage['inactivity_interval']) {
        localStorage['inactivity_interval'] = 300;
    }
    if(!localStorage['is_tracking']) {
        localStorage['is_tracking'] = true;
    }
}

function checkTime(){
    var pre_time = localStorage['time'];
    var now_time = Math.floor((new Date().getTime())/1000/count_interval)*count_interval;
    if (pre_time == now_time){
        return false;
    }else{
        return now_time;
    }
}

function checkDay(){
    var pre_time = localStorage['today'];
    var now_time = new Date().getDay();
    if (pre_time == now_time){
        return false;
    }else{
        return now_time;
    }
}

function extractDomain(url) {
    var re = /:\/\/(www\.)?(.+?)\//;
    return url.match(re)[2];
}

function inBlacklist(url) {
    if (!url.match(/^http/)) {
        return true;
    }
    var blacklist = JSON.parse(localStorage["blacklist"]);
    for (var i = 0; i < blacklist.length; i++) {
        if (url.match(blacklist[i])) {
            return true;
        }
    }
    return false;
}

function upload_data(){
    var timestamp = localStorage['time'];
    var domains_data = JSON.parse(localStorage['domains']);
    var data = {'timestamp':timestamp,"domains_data":domains_data,"user":"tmp_user"};
    console.log(data)
    var xhr = new XMLHttpRequest();
    xhr.open("POST",request_url);
    xhr.send(JSON.stringify(data));
}


function updateData(){
    chrome.idle.queryState(JSON.parse(localStorage['inactivity_interval']), function(state) {
        if (state === "active"){
            chrome.tabs.query({"active":true,"lastFocusedWindow":true,}, function(tabs) {

                if (tabs.length === 0){
                    return;
                }

                var tab = tabs[0];
                chrome.windows.get(tab.windowId,function(win){
                    if(win.focused){

                        if(!inBlacklist(tab.url)){
                            var domain = extractDomain(tab.url);
                            var domains = JSON.parse(localStorage['domains']);

                            if(! domains[domain]){
                                domains[domain] = 0;
                            }
                            var check_time = checkTime();
                            if(check_time === false){
                                domains[domain] += update_interval;
                            }else{
                                upload_data();
                                localStorage['time'] = check_time;
                                domains = {};
                                domains[domain] = update_interval;
                            }

                            localStorage['domains'] = JSON.stringify(domains);

                            var today_domains = JSON.parse(localStorage['today_domains']);
                            if(! today_domains[domain]){
                                today_domains[domain] = 0;
                            }
                            var check_day = checkDay();
                            if(check_day === false){
                                today_domains[domain] += update_interval;
                            }else{
                                localStorage['today'] = check_day;
                                    today_domains = {};
                                    today_domains[domain] = update_interval;
                            }
                            localStorage['today_domains'] = JSON.stringify(today_domains);
                        }
                    }
                });
            });
        }
    });
}


setDefault();
if(JSON.parse(localStorage['is_tracking']) === true) {
    setInterval(updateData,update_interval * 1000);
}
// setInterval(updateLocalStorage, 1000);


