const teamUpMessagePattern = /((when|bro)(.*))?((play|join)(.*)((with|wth)(.*)(yo)?u(r)?|together|me|(sub(scriber)?s?))(game)?)|((party|team|squad)(.*)(up)?|game|(sub(scriber)?s?)|(v)?(onna)|(ung(a|o)l(a|o)da)|(k(u|o)o?da)|(se(r)?n(d|t)hu)|join|come|nam(m|b)a)(.*)(play|a(a)?d(a|u)|pan(n)?(a|u)|session|(n(e)?xt(.*)match)|v(e|a)l(a|e)d(a|u)|vara)(.*)/ig
const whenDidYouPlayPattern = /(when|what|ep(p)?(a|o)|en(d|t)ha)(.*)(start(ed)?|a(a)?da|pann|play)(.*)/ig
const pcSpecsPattern = /((unga|you)(.*))?((what|en(n)?a)(.*))?(pc|(c|g)pu|processor|(graphics card))(.*)((spec|specification|component|config|build|cost|price|ev(a|o)l(a|o)|enna)(s|uration)?(.*))?(enna|(a)?achu|have|vachir)?(.*)/ig
const favoriteGamePattern = /(fav(e)?(o(u)?rite)?|p(u|i)d(u|i)cha)(\s)?(game)/ig

let teamUpMessageTimeOut = 0;
let whenDidYouPlatTimeOut = 0;
let pcSpecsTimeout = 0;
let favoriteGameTimeout = 0;

const globalTimeout = 15000;

function applyCustomActions(data){
    var tid = false;
    if (data.tid) tid = data.tid;

    if (urlParams.has("autoRespond")) {
        if (!["yogibytes.studio", "yogibytesstudio", "yogibytes studio"].includes(data.chatname.toLowerCase())) {
            let chatmessage = data.chatmessage;
            if (teamUpMessagePattern.test(chatmessage)) {
                if (Date.now() - teamUpMessageTimeOut > globalTimeout){ // respond only once in 15 seconds
                    teamUpMessageTimeOut = Date.now();
                    respondP2P("You Can play with YogiBytes on the Team Up Sessions, follow YogiBytes Socials for the announcement!", tid);
                }
            } else if (whenDidYouPlayPattern.test(chatmessage)) {
                if (Date.now() - whenDidYouPlatTimeOut > globalTimeout){ // respond only once in 15 seconds
                    whenDidYouPlatTimeOut = Date.now();
                    respondP2P("YogiBytes Started Playing Fortnite From Chapter 1 Season 2 (2018)!", tid);
                }
            } else if (pcSpecsPattern.test(chatmessage)) {
                if (Date.now() - pcSpecsTimeout > globalTimeout){ // respond only once in 15 seconds
                    pcSpecsTimeout = Date.now();
                    respondP2P("YogiBytes PC Specs: Processor: Intel Core i7 14700K, RAM: 32GB DDR5, GPU: Zotac GeForce 4080 Super. Full Specs and Price Video: https://youtu.be/ld4alEIMCwo", tid);
                }
            } else if (favoriteGamePattern.test(chatmessage)) {
                if (Date.now() - favoriteGameTimeout > globalTimeout){ // respond only once in 15 seconds
                    favoriteGameTimeout = Date.now();
                    respondP2P("YogiBytes Favorite Games are: God of War, Pokemon, Assassin's Creed, Mario, Red Dead Redemption, Batman Arkham, GTA V, GTA San Andreas, Fortnite", tid);
                }
            }
        }
    }
	
    return data; // return the data, if you want to modify it. If you return "null", it will stop the processing. (also false works, but I'll deprecate that I think)
}
