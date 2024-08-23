const teamUpMessagePattern = /(play(.*)?((with|wth)(.*)?(yo)?u|together|(sub(scriber)?(s))))|((team|squad)(.*)(up)?|(sub(scriber)?(s))|(v)?(onna)|(ung(a|o)l(a|o)da)|(k(u|o)o?da)|(se(r)?n(d|t)hu))(.*)?(play|a(a)?da|pan(n)?(a|u)|session)(.*)/ig
const whenDidYouPlay = /(when|what|ep(p)?(a|o)|en(d|t)ha)(.*)(start(ed)?|a(a)?da|pann|play)(.*)/ig
let teamUpMessageTimeOut = 0;
let whenDidYouPlatTimeOut = 0
function applyCustomActions(data){
	var tid = false;
	if (data.tid){tid = data.tid;}

    if (urlParams.has("autoRespond")) {
        if (!["yogibytes.studio", "yogibytesstudio", "yogibytes studio"].includes(data.chatname.toLowerCase())) {
            let chatmessage = data.chatmessage;
            if (teamUpMessagePattern.test(chatmessage)) {
                if (Date.now() - teamUpMessageTimeOut > 15000){ // respond only once in 15 seconds
                    teamUpMessageTimeOut = Date.now();
                    respondP2P("You Can play with YogiBytes on the Team Up Sessions, follow YogiBytes Socials for the announcement!", tid);
                }
            } else if (whenDidYouPlay.test(chatmessage)) {
                if (Date.now() - whenDidYouPlatTimeOut > 15000){ // respond only once in 15 seconds
                    whenDidYouPlatTimeOut = Date.now();
                    respondP2P("YogiBytes Started Playing Fortnite From Chapter 1 Season 2 (2018)!", tid);
                }
            }
        }
    }
	
	return data; // return the data, if you want to modify it. If you return "null", it will stop the processing. (also false works, but I'll deprecate that I think)
}
