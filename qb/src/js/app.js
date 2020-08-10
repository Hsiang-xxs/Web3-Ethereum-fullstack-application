App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      ethereum.enable();
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      ethereum.enable();
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },


  

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // 初始化合约
      App.contracts.Election = TruffleContract(election);
      // 连接与合约进行交互
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // 监听合约事件
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {



    });
  },
  
  render: function() {
  

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("ADDRESS: " + account);   
       

        web3.eth.getBalance( account,function(err,res){
          if(!err) {
              console.log(res);
              $("#accBalance").html("BALANCE: " + res+'wei');   
          }else{
              console.log(err);
          }
      });


        }     
    });


   

 },






  sendTransaction:function () {
    var fromAccount = $('#fromAccount').val();
    var toAccount = $('#toAccount').val();
    var amount = $('#amount').val();

    if (web3.isAddress(fromAccount) &&
        web3.isAddress(toAccount) &&
        amount != null && amount.length > 0
    ) {
        // Example 1: 使用Metamask 给的gas Limit 及 gas 价
         var message = {from: fromAccount, to:toAccount, value: web3.toWei(amount, 'ether')};


        web3.eth.sendTransaction(message, (err, res) => {
        var output = "";
        if (!err) {
            output += res;
        } else {
            output = "Error";
        }
        document.getElementById('transactionResponse').innerHTML = "Transaction response= " + output + "<br />";
        })
    } else {
        console.log("input error");
    }
}


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});