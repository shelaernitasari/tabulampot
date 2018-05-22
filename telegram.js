const MenuModel = require('./api/models/menu')

module.exports = function(bot, message){
    let keyboardResponse = {}
    keyboardResponse.reply_markup = {}

    let chat = message.text
    let menu = await MenuModel.find({menu: chat})
    if (menu.length > 0) {

    } else {
        let menuUtama = await MenuModel.find({root: "null"})
        console.log(menu, menuUtama)
    }
    keyboardResponse.reply_markup.keyboard = [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
    console.log(keyboardResponse)
    bot.sendMessage(message.chat.id, "Menu A", keyboardResponse); 

    console.log(message)
};