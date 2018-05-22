module.exports = function(bot, message){
    let keyboardResponse = {}

    keyboardResponse.reply_markup = {}
    keyboardResponse.reply_markup.keyboard = [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
    console.log(keyboardResponse)
    bot.sendMessage(message.chat.id, "Menu A", keyboardResponse); 

    console.log(message)
};