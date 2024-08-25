const patterns = [
    {
        pattern: /((when|bro)(.*))?((play|join)(.*)((with|wth)(.*)(yo)?u(r)?|together|me|(sub(scriber)?s?))(game)?)|((party|team|squad)(.*)(up)?|game|(sub(scriber)?s?)|(v)?(onna)|(ung(a|o)l(a|o)da)|(k(u|o)o?da)|(se(r)?n(d|t)hu)|join|come|nam(m|b)a)(.*)(play|a(a)?d(a|u)|pan(n)?(a|u)|session|(n(e)?xt(.*)match)|v(e|a)l(a|e)d(a|u)|vara)(.*)/ig,
        lastSentAt: 0,
        message: "You Can play with YogiBytes on the Team Up Sessions, follow YogiBytes Socials for the announcement!",
    },
    {
        pattern: /(when|what|ep(p)?(a|o)|en(d|t)ha)(.*)(start(ed)?|a(a)?da|pann|play)(.*)/ig,
        lastSentAt: 0,
        message: "YogiBytes Started Playing Fortnite From Chapter 1 Season 2 (2018)!",
    },
    {
        pattern: /((unga|you)(.*))?((what|en(n)?a)(.*))?(pc|(c|g)pu|processor|(graphics card))(.*)((spec|specification|component|config|build|cost|price|ev(a|o)l(a|o)|enna)(s|uration)?(.*))?(enna|(a)?achu|have|vachir)?(.*)/ig,
        lastSentAt: 0,
        message: "YogiBytes PC Specs: Processor: Intel Core i7 14700K, RAM: 32GB DDR5, GPU: Zotac GeForce 4080 Super. Full Specs and Price Video: https://youtu.be/ld4alEIMCwo",
    },
    {
        pattern: /(fav(e)?(o(u)?rite)?|p(u|i)d(u|i)cha)(\s)?(game)/ig,
        lastSentAt: 0,
        message: "YogiBytes Favorite Games are: God of War, Pokemon, Assassin's Creed, Mario, Red Dead Redemption, Batman Arkham, GTA V, GTA San Andreas, Fortnite",
    },
    {
        pattern: /((en?(n|g)a|wh(at|ere)|wer|do(.*)(yo)?u)(.*)(velai|job|work|do(.*)(for)?(living)))|((work(ing)?|job|velai)(.*)o?r(.*))|((full|part)(.*)(time(.*))?(stream)(.*))/ig,
        lastSentAt: 0,
        message: "YogiBytes is a Software Engineer, that's his Primary Job. YouTubing is one of his hobby!"
    },
    {
        pattern: /((en?n(t|d)?h?a)(.*)|wh(at|ere|ich)|wer|do(.*)(yo)?u)(.*)(ooru?|city|stay|live|loca|country)(.*)/ig,
        lastSentAt: 0,
        message: "YogiBytes is from Madurai, he works in Chennai!"
    }
]

const globalTimeout = 15000;

function applyCustomActions(data){
    var tid = false;
    if (data.tid) tid = data.tid;

    if (urlParams.has("autoRespond")) {
        if (!["yogibytes.studio", "yogibytesstudio", "yogibytes studio"].includes(data.chatname.toLowerCase())) {
            let chatmessage = data.chatmessage;
            for (let i = 0; i < patterns.length; i++) {
                let item = patterns[i];
                if(item.pattern.test(chatmessage) && Date.now() - item.lastSentAt > globalTimeout) {
                    respondP2P(item.message, tid);
                }
            }
        }
    }
	
    return data; // return the data, if you want to modify it. If you return "null", it will stop the processing. (also false works, but I'll deprecate that I think)
}
