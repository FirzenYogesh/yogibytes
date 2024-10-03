const commandReplaceString = "##COMMAND##"
const linkMessage = `Here is the ${commandReplaceString} Link `
const instagramProfile = "@yogibytes.gaming"

const responses = [
    {
        pattern: /((when|ep?po|bro)(.*))?((play|join)(.*)((with|wth)(.*)(yo)?u(r)?|together|me|(sub(scriber)?s?))(game)?)|((party|team|squad)(.*)(up)?|game|(sub(scriber)?s?)|(v)?(onna)|(ung(a|o)l(a|o)da)|(k(u|o)o?da)|(se(r)?n(d|t)hu)|join|come|nam(m|b)a)(.*)(play|a(a)?d(a|u)|pan(n)?(a|u)|session|(n(e)?xt(.*)match)|v(e|a)l(a|e)d(a|u)|vara)(.*)/ig,
        lastSentAt: {},
        message: "You Can play with YogiBytes on the Team Up Sessions, follow YogiBytes Socials for the announcement!",
    },
    {
        pattern: /(when|what|ep(p)?(a|o)|en(d|t)ha)(.*)(start(ed)?|a(a)?da|pann|play)(.*)/ig,
        lastSentAt: {},
        message: "YogiBytes Started Playing Fortnite From Chapter 1 Season 2 (2018)!",
    },
    {
        pattern: /((unga|you)(.*))?((what|en(n)?a)(.*))?(pc|(c|g)pu|processor|(graphics card))(.*)((spec|specification|component|config|build|cost|price|ev(a|o)l(a|o)|enna)(s|uration)?(.*))?(enna|(a)?achu|have|vachir)?(.*)/ig,
        lastSentAt: {},
        message: "YogiBytes PC Specs: Processor: Intel Core i7 14700K, RAM: 32GB DDR5, GPU: Zotac GeForce 4080 Super. Full Specs and Price Video: https://youtu.be/ld4alEIMCwo",
    },
    {
        pattern: /(fav(e)?(o(u)?rite)?|p(u|i)d(u|i)cha)(\s)?(game)/ig,
        lastSentAt: {},
        message: "YogiBytes Favorite Games are: God of War, Pokemon, Assassin's Creed, Mario, Red Dead Redemption, Batman Arkham, GTA V, GTA San Andreas, Fortnite",
    },
    {
        pattern: /((en?(n|g)a|wh(at|ere)|wer|do(.*)(yo)?u)(.*)(velai|job|work|do(.*)(for)?(living)))|((work(ing)?|job|velai)(.*)o?r(.*))|((full|part)(.*)(time(.*))?(stream)(.*))/ig,
        lastSentAt: {},
        message: "YogiBytes is a Software Engineer, that's his Primary Job. YouTubing is one of his hobby!"
    },
    {
        pattern: /((en?n(t|d)?h?a)(.*)|wh(at|ere|ich)|wer|do(.*)(yo)?u)(.*)(ooru?|city|stay|live|loca|country)(.*)/ig,
        lastSentAt: {},
        message: "YogiBytes is from Madurai, he works in Chennai!"
    },
    {
        pattern: "!discord",
        lastSentAt: {},
        platformSpecificMessage: {
            instagramlive: `The ${commandReplaceString} Link is available in ${instagramProfile} bio`,
        },
        message: `${linkMessage}https://discord.gg/TTjgB3EDnT`
    },
    {
        pattern: "!youtube",
        lastSentAt: {},
        platformSpecificMessage: {
            instagramlive: `The ${commandReplaceString} Link is available in ${instagramProfile} bio`,
        },
        message: `${linkMessage}https://www.youtube.com/@YogiBytes.Gaming`
    },
    {
        pattern: "!twitch",
        lastSentAt: {},
        platformSpecificMessage: {
            instagramlive: `The ${commandReplaceString} Link is available in ${instagramProfile} bio`,
        },
        message: `${linkMessage}https://www.twitch.tv/yogibytes`
    },
    {
        pattern: "!socials",
        lastSentAt: {},
        platformSpecificMessage: {
            instagramlive: `The ${commandReplaceString} Link is available in ${instagramProfile} bio`,
        },
        message: `${linkMessage}https://taplink.cc/yogibytes.gaming`
    }
]

function capitalizeWord(s) {
    return (s && s[0].toUpperCase() + s.slice(1)) || "";
}

// this is in milliseconds
const globalTimeout = 15000;

function applyCustomActions(data){
    var tid = false;
    console.log("the data is", data);
    if (data.tid) tid = data.tid;

    if (urlParams.has("autoRespond")) {
        console.log("auto responder active")
        if (!["yogibytes.studio", "yogibytesstudio", "yogibytes studio"].includes(data.chatname.toLowerCase())) {
            let chatmessage = data.chatmessage;
            console.log("checking non bot chat")
            for (let i = 0; i < responses.length; i++) {
                let item = responses[i];
                if(checkIfMessageMatches(item, chatmessage) && checkIfCrossedTimeout(item, data)) {
                    let message = formReplyMessage(item, data);
                    item.lastSentAt[data.type] = Date.now();
                    console.log(`Responding to ${chatmessage} with ${message}`, item);
                    respondP2P(message, tid);
                    break;
                }
            }
        }
    }
	
    return data; // return the data, if you want to modify it. If you return "null", it will stop the processing. (also false works, but I'll deprecate that I think)
}

function checkIfMessageMatches(item, message) {
    console.log("checking if message matches a pattern")
    let isPatternMatching = false
    try {
        if (typeof item.pattern === 'string' || item.pattern instanceof String) {
            console.log("Item is of String")
            isPatternMatching = item.pattern == message;
        } else if (item.pattern instanceof RegExp || item.pattern.constructor == RegExp) {
            console.log("Item is of RegEx")
            isPatternMatching = item.pattern.test(message);
        }
    } catch (e) {
        console.log("error while checking message matches a pattern", e);
    }
    console.log("pattern matched", isPatternMatching);
    return isPatternMatching;
}

function checkIfCrossedTimeout(item, data) {
    let timeDiff = Date.now() - item.lastSentAt[data.type] || 0;
    let hasCrossedTimeout = timeDiff === 0 || timeDiff > globalTimeout;
    console.log("has crossed timeout", hasCrossedTimeout)
    return hasCrossedTimeout;
}

function formReplyMessage(item, data) {
    console.log("Forming a reply")
    return (item.platformSpecificMessage?.[data.type] || item.message)
            .replace(commandReplaceString, capitalizeWord(item.pattern));
}
