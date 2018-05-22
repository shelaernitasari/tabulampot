module.exports = function(bot, message){

    // bot.onText(/\/start/, (msg) => {
    
    // UserModel.update('curr_menu');
    // let getMenu = MenuModel.aggregate({

    // })
    
    let getMenuA = {
        "reply_markup": {
            "keyboard": [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
        }
    }

    let getMenuB = {
        "reply_markup": {
            "keyboard": [["uno :+1:"],["uno \ud83d\udc4d", "due"]]
        }
    }

    let getMenuC = {
        "reply_markup": {
            "keyboard": [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"]]
        }
    }

    switch (message.text){
        case "a": 
            bot.sendMessage(message.chat.id, "Menu A", getMenuA); 
            break
        case "b": 
            bot.sendMessage(message.chat.id, "Menu B", getMenuB); 
            break
        case "c": 
            bot.sendMessage(message.chat.id, "Menu C", getMenuC); 
            break
    }

    console.log(message)
};