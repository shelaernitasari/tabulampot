module.exports = function(bot){

    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Welcome To TabuLampot", {
        "reply_markup": {
            "keyboard": [["Penanaman", "Perawatan"],   ["Tips & Trik"], ["Keluhan", "FAQ"]]
            }
        });
    });
    
    bot.on('message', msg => {
        var pn = "Penanaman";
        if (msg.text.indexOf(pn) === 0) {
            bot.sendMessage(msg.chat.id, "Penanaman Tabulampot");
        }
        var pr = "Perawatan";
        if (msg.text.indexOf(pr) === 0) {
            bot.sendMessage(msg.chat.id, "Perawatan Masing masing buah");
        }    
        var tp = "Tips & Trik";
        if (msg.text.indexOf(tp) === 0) {
            bot.sendMessage(msg.chat.id, "Tips and trik agar cepat berbuah");
        }

        var kl = "Keluhan";
        if (msg.text.indexOf(kl) === 0) {
            bot.sendMessage(msg.chat.id, "Keluhan apa yang anda alami");
        }
    });
};