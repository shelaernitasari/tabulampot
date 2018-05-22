module.exports = function(bot, message){

    // bot.onText(/\/start/, (msg) => {
    
    // UserModel.update('curr_menu');
    // let getMenu = MenuModel.aggregate({

    // })
    
    let getMenu = [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]

    bot.sendMessage(msg.chat.id, "Welcome To TabuLampot", getMenu); 
    
    // bot.on('message', msg => {
      
    // });
};