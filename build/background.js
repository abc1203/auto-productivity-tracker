    /*global chrome*/
var update_interval = 3;
var count_interval = 300;
var request_url = "http://127.0.0.1:8888/upload"

function setDefault(){
    if(!chrome.storage.local["blacklist"]){
        chrome.storage.local['blacklist'] = JSON.stringify(['example.com'])
    }

    chrome.storage.local['time'] = Math.floor((new Date().getTime())/1000/count_interval)*count_interval;

    if(!chrome.storage.local['domains']){
        chrome.storage.local['domains'] = JSON.stringify({});
    }
    if(!chrome.storage.local['today_domains']){
        var day = new Date().getDay();
        chrome.storage.local['today'] = day;
        chrome.storage.local['today_domains'] = JSON.stringify({});
    }
    console.log("background loaded");
    window.alert("background loaded");
}
function checkTime(){
    var pre_time = chrome.storage.local['time'];
    var now_time = Math.floor((new Date().getTime())/1000/count_interval)*count_interval;
    if (pre_time == now_time){
        return false;
    }else{
        return now_time;
    }
}

function checkDay(){
    var pre_time = chrome.storage.local['today'];
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
    var blacklist = JSON.parse(chrome.storage.local["blacklist"]);
    for (var i = 0; i < blacklist.length; i++) {
        if (url.match(blacklist[i])) {
            return true;
        }
    }
    return false;
}

function upload_data(){
    var timestamp = chrome.storage.local['time'];
    var domains_data = JSON.parse(chrome.storage.local['domains']);
    var data = {'timestamp':timestamp,"domains_data":domains_data,"user":"tmp_user"};
    console.log(data)
    var xhr = new XMLHttpRequest();
    xhr.open("POST",request_url);
    xhr.send(JSON.stringify(data));
}


function updateData(){
    chrome.idle.queryState(30,function(state) {
        if (state === "active"){
            chrome.tabs.query({"active":true,"lastFocusedWindow":true,}, function(tabs){

                if (tabs.length === 0){
                    return;
                }

                var tab = tabs[0];
                chrome.windows.get(tab.windowId,function(win){
                    if(win.focused){

                        if(!inBlacklist(tab.url)){
                            var domain = extractDomain(tab.url);
                            var domains = JSON.parse(chrome.storage.local['domains']);

                            if(! domains[domain]){
                                domains[domain] = 0;
                            }
                            var check_time = checkTime();
                            if(check_time === false){
                                domains[domain] += update_interval;
                            }else{
                                upload_data();
                                chrome.storage.local['time'] = check_time;
                                domains = {};
                                domains[domain] = update_interval;
                            }

                            chrome.storage.local['domains'] = JSON.stringify(domains);

                            var today_domains = JSON.parse(chrome.storage.local['today_domains']);
                            if(! today_domains[domain]){
                                today_domains[domain] = 0;
                            }
                            var check_day = checkDay();
                            if(check_day === false){
                                today_domains[domain] += update_interval;
                            }else{
                                chrome.storage.local['today'] = check_day;
                                    today_domains = {};
                                    today_domains[domain] = update_interval;
                            }
                            chrome.storage.local['today_domains'] = JSON.stringify(today_domains);
                        }
                    }
                });
            });
        }
    });
}


function updateLocalStorage() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if(message === 'get-localstorage') {
            sendResponse(chrome.storage.local['today_domains']);
        }
        return true;
    });
}


setDefault();
setInterval(updateData,update_interval * 1000);
// setInterval(updateLocalStorage, 1000);


