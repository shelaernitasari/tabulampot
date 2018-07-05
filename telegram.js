const MenuModel = require('./api/models/menu')
const isiModel = require('./api/models/isi')

module.exports = async (bot, message) => {
    let keyboardResponse = {}
    keyboardResponse.reply_markup = {}

    let chat = message.text
    // let photo = message.text
    // let lokasi = message.latitude

    let menu = await MenuModel.find({menu: chat})
    // console.log('menu',menu)

    // let input = message.chat.id
    let input = chat.split(" ");

    console.log(input);

    for ( let i = 0; i < input.length; i++){
        let tampung = input[i]
        // console.log(tampung);

        let find = await MenuModel.find({menu: tampung});
        // console.log(find);
        
        // if(find.length > 0){
        //     let hasil = tampung
        //     console.log(hasil);
        //     // bot.sendMessage(message.chat.id, "shela cantik");    
        //     // break;
        // } 
        if(!find){
            
        } else {
            // let hasil = tampung
            // console.log(hasil);
            bot.sendMessage(message.chat.id, targetMenu);    
            // break;
        }
        // if(input[i] === menu){
        //     let hasil = input[i];
        //     console.log(hasil);

        //     // bot.sendMessage(message.chat.id, "shela cantik");    
        //     // break;  
        // }    
    } 
    
    if (menu.length > 0) {
        let targetMenu = await MenuModel.find({root: menu[0]._id})
        //console.log(targetMenu)
        if(targetMenu.length == 0 ){
            let isi = await isiModel.find({judul: chat})
            console.log(isi);
            if (isi.length > 0) {
                chat = isi[0].content
                let photo = isi[0].foto
                bot.sendPhoto(message.chat.id, photo);
                
            } else {
                chat = menu[0].menu
                if(chat == "FAQ"){
                    bot.sendLocation(message.chat.id, -7.276361, 112.793847);
                    // chat = menu[0].pertanyaan
                }else{
                chat = "belum ada"
                }
            }
            
        }else{
            chat = menu[0].pertanyaan
            keyboardResponse.reply_markup.keyboard = parseMenu(targetMenu)
        }
        
    } else {
        chat = "Selamat Datang di T-Messenger, silahkan memilih menu untuk konsultasi budidaya tabulampot"
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
    // bot.sendLocation(message.chat.id, lokasi);
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