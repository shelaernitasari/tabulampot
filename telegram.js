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
        // let j = 0
        // let k = 0
        let half = defaultMenu.length / 2

        if(defaultMenu.length % 2 != 0){
            half = half + 0.5
        }

        //console.log(half);
        for (let i = 0 ; i < half; i++){
            console.log(defaultMenu[i].menu) 
            let subKeyboard = []

            subKeyboard.push(defaultMenu[i].menu)
           

            if ((i+half) < defaultMenu.length - 1){
                subKeyboard.push(defaultMenu[i+half].menu)
            }
            
            // if (i % 2 == 0){
            //     keyboard.push(new Array(2))
            //     k = 0
            //     j++
            // }

            keyboard.push(subKeyboard)

            // keyboard.push(defaultMenu[i].menu)
        }
        console.log(keyboard)
    }

    keyboardResponse.reply_markup.keyboard = keyboard
    // console.log(keyboardResponse)
    bot.sendMessage(message.chat.id, chat, keyboardResponse); 

    // console.log(message)
};