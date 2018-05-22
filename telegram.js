const MenuModel = require('./api/models/menu')

module.exports = async (bot, message) => {
    let keyboardResponse = {}
    keyboardResponse.reply_markup = {}

    let chat = message.text
    let menu = await MenuModel.find({menu: chat})

    let keyboard = []

    if (menu.length > 0) {
        // console.log(menu)
    } else {
        chat = "Menu utama"
        let menuUtama = await MenuModel.find({menu: "Menu Utama"})
        let defaultMenu = await MenuModel.aggregate([{
            $match: {
                root: menuUtama[0]._id
            }
        }])
        for (let i = 0 ; i < defaultMenu.length ; i++){
            for(let j = 0 ; j < 2 ; j++){
                keyboard[i][j] = defaultMenu[i].menu
            }
        }
        console.log(keyboard)
    }

    keyboardResponse.reply_markup.keyboard = [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
    // console.log(keyboardResponse)
    bot.sendMessage(message.chat.id, chat, keyboardResponse); 

    // console.log(message)
};