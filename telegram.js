const MenuModel = require('./api/models/menu')
const isiModel = require('./api/models/isi')

module.exports = async (bot, message) => {
    let keyboardResponse = {}
    keyboardResponse.reply_markup = {}

    let chat = message.text
    let menu = await MenuModel.find({menu: chat})
    // console.log('menu',menu)

    if (menu.length > 0) {
        let targetMenu = await MenuModel.find({root: menu[0]._id})
        //console.log(targetMenu)
        if(targetMenu.length == 0 ){
            
            //let tampil = await isiModel.find({content: targetMenu})
            let isi = await isiModel.find({judul: chat})
            // chat = isi[0].content
            //chat = tampil
            console.log('isi',isi)
            //console.log('tampil',tampil)
            // console.log('tampil',chat)
           
        }else{
            keyboardResponse.reply_markup.keyboard = parseMenu(targetMenu)
        }
        
    } else {
        chat = "Menu Utama"
        let menuUtama = await MenuModel.find({menu: "Menu Utama"})
        let defaultMenu = await MenuModel.aggregate([{
            $match: {
                root: menuUtama[0]._id
            }
        }])
        // let j = 0
        // let k = 0
        keyboardResponse.reply_markup.keyboard = parseMenu(defaultMenu)
    }
    // console.log(keyboardResponse)


    bot.sendMessage(message.chat.id, chat, keyboardResponse); 

    // console.log(message)
};

function parseMenu (menu) {
    let keyboard = []
    let half = menu.length / 2
    if(menu.length % 2 != 0){
        half = half + 0.5
    }
    // console.log(half);
    for (let i = 0 ; i < half; i++){
        console.log(menu[i].menu) 
        let subKeyboard = []

        subKeyboard.push(menu[i].menu)
    
        if ((i+half) < menu.length){
            subKeyboard.push(menu[i+half].menu)
        }
        
        // if (i % 2 == 0){
        //     keyboard.push(new Array(2))
        //     k = 0
        //     j++
        // }

        keyboard.push(subKeyboard)

        // keyboard.push(menu[i].menu)
    }
    return keyboard
}