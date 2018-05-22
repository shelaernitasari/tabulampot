module.exports = function(bot, message){

    // bot.onText(/\/start/, (msg) => {
    
    // UserModel.update('curr_menu');
    // let getMenu = MenuModel.aggregate({

    // })
    
    let getMenu = {
        "reply_markup": {
            "keyboard": [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
        }
    }

    console.log(message)
    bot.sendMessage(message.message.chat.id, "Welcome To TabuLampot", getMenu); 
    
    // bot.on('message', msg => {
      
    // });
};