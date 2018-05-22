module.exports = function(bot){

    bot.onText(/\/start/, (msg) => {
    
    UserModel.update('curr_menu');
    let getMenu = MenuModel.aggregate({

    })
    
    bot.sendMessage(msg.chat.id, "Welcome To TabuLampot", getMenu); 
        
    });
    
    bot.on('message', msg => {
      
    });
};