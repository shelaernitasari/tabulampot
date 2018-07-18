const Cleaner = require('nalapa').cleaner;
const Tokenizer = require('nalapa').tokenizer;

const MenuModel = require('./api/models/menu')
const isiModel = require('./api/models/isi')

module.exports = async (bot, message) => {
    let keyboardResponse = {}
    keyboardResponse.reply_markup = {}

    let chat = message.text

    // let photo = message.text
    // let lokasi = message.latitude
    // let semuaMenu = await MenuModel.find().select('menu')
    // console.log("semua menu",semuaMenu)
    let menu = await MenuModel.find({menu: chat})
    
    let chatYangAda = []
    let tampung = []
    // console.log('menu',menu)

    // let input = message.chat.id
    chat = Cleaner.removeNonASCII(chat);
    let inputQuery = Tokenizer.tokenize(chat)
    let input = Tokenizer.tokenize(chat);
    let nilai = []
    console.log(inputQuery);
   
    const setMenu = new Set();
    const tmpMenuAl = [];
    const ws = new WeakSet();
    const nama = []
    let iterator = 0
    
    for(let x = 0 ; x < input.length-2;x++){
        inputQuery.push(input[x]+' '+input[x+1] + ' '+ input[x+2])
    }
    
    for(let x = 0 ; x < input.length-1;x++){
      inputQuery.push(input[x]+' '+input[x+1])
    }
  
    for ( let i = 0; i < inputQuery.length; i++){
        let tmpMenu = await MenuModel.find({menu: {$regex: inputQuery[i], $options:"$i"} });
        tmpMenuAl.push(tmpMenu)
    }  
    
    for (let i = 0 ; i < tmpMenuAl.length ; i++) {
        for(let j = 0 ; j < tmpMenuAl[i].length ; j++) {
            setMenu.add(JSON.stringify(tmpMenuAl[i][j]))
        }
    }
    console.log("set menu", setMenu)
    let setMenuTmp = Array.from(setMenu)
    let hitung = [setMenu.size]
    for (let i = 0 ; i < setMenuTmp.length ; i++) {
        hitung[i] = 0
        for(let j = 0 ; j < tmpMenuAl.length ; j++) {
            for(let k=0; k < tmpMenuAl[j].length; k++){
                console.log(JSON.parse(setMenuTmp[i]))
                if(String(tmpMenuAl[j][k]._id) == String(JSON.parse(setMenuTmp[i])._id)){
                    hitung[i]++
                }
            }
            
        }
    } 
    console.log(setMenuTmp)
    console.log(hitung)

    let tmpIn = hitung[0]
    let indexIn = 0
    for(let i = 1; i < hitung.length ; i ++){
        if(tmpIn < hitung[i]){
            tmpIn = hitung[i]
            indexIn = i
        }
    } 
    
    try {
        menu = await MenuModel.find({menu: JSON.parse(setMenuTmp[indexIn]).menu})
        chat = menu[0].menu
        console.log(chat)
    } catch (e) {
        menu = [] 
    }

    console.log(menu)
    if (menu.length > 0) {
        // let targetMenu = await MenuModel.find({root: menu[menu.length - 1]._id})
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
                if(chat == "Alamat"){
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
//         console.log(menu[i].menu) 
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