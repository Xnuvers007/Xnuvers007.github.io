var message="Sorry,Right click disabled. Message from Xnuvers007";
///////////////////////////////////
function clickIE() {if (document.all) {alert(message);return false;}}
function clickNS(e) {if 
(document.layers||(document.getElementById&&!document.all)) {
if (e.which==2||e.which==3) {alert(message);return false;}}}
if (document.layers) 
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}

document.oncontextmenu=new Function("return false")

function disableselect(e){
return false
}
function reEnable(){
return true
}
document.onselectstart=new Function ("return false")
if (window.sidebar){
document.onmousedown=disableselect
document.onclick=reEnable
}

// ============= //

$.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
    $("#ip").html(data.ip);
    $("#isp").html(data.isp);
    $("#org").html(data.org);
    $("#host").html(data.hostname);
    $("#lat").html(data.latitude);
    $("#long").html(data.longitude);
    $("#post").html(data.postal_code);
    $("#city").html(data.city);
    $("#code").html(data.country_code);
    $("#codename").html(data.country_name);
    $("#contcode").html(data.continent_code);
    $("#contname").html(data.continent_name);
    $("#reg").html(data.region);
    $("#district").html(data.district);
    $("#time").html(data.timezone_name);
    $("#conn").html(data.connection_type);
    $("#asnn").html(data.asn_number);
    $("#asno").html(data.asn_org);
    $("#asn").html(data.asn);
    $("#curcod").html(data.currency_code);
    $("#curname").html(data.currency_name);
    $("#succ").html(data.success)
    $("#prem").html(data.premium)
    });