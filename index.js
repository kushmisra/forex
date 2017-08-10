var Table;
$(document).ready(function() {
  var Table = $('#table').DataTable();
});
var USDNPR = 1;
var socket = io.connect('https://coincap.io');
function redraw (){
Table.order( [[ 1, 'asc' ]] ).draw() ;
}
socket.on('trades', function(tradeMsg) {
  //dataX();
  console.log(tradeMsg);
  var X = document.getElementById("Crypto");
  //console.log(tradeMsg.message.msg);
  var msgx = tradeMsg.message.msg;
  //console.log(msgx.long);
  var Y = document.getElementById("TR_" + msgx.short);

  var Price = msgx.price * USDNPR;
  if (Y === null) {
    X.innerHTML += '<tr id="TR_' + tradeMsg.message.coin + '">' + '<td>' + msgx.long + ' \(' + msgx.short + '\)</td><td>' + Price.toFixed(Price < 1 ? 8 : 2) + '</td><td>' + (msgx.volume * USDNPR).toFixed(0) + '</td><td>' + (msgx.mktcap * USDNPR).toFixed(0) + '</td><td>' + msgx.supply + ' ' + msgx.short + '</td><td>' + msgx.cap24hrChange + '</td><td>' + (1 / Price).toFixed((1 / Price) < 1 ? 8 : 2) + ' ' + msgx.short + '</td></tr>';
  // redraw();
  } else {
    // console.log(Y);
    // console.log((Y.getElementsByTagName('td')[1]).innerHTML);
    var old = (Y.getElementsByTagName('td')[1]).innerHTML;
    console.log(Price);
    if(old>Price){
      Y.style.backgroundColor = "rgba(255,0,0,0.3)";
    }else if(old<Price){
      Y.style.backgroundColor = "rgba(0,255,0,0.3)";
    }
    Y.innerHTML = '<td>'+ msgx.long + ' \(' + msgx.short + '\)</td><td>' + Price.toFixed(Price < 1 ? 8 : 2) + '</td><td>' + (msgx.volume * USDNPR).toFixed(0) + '</td><td>' + (msgx.mktcap * USDNPR).toFixed(0) + '</td><td>' + msgx.supply + ' ' + msgx.short + '</td><td>' + msgx.cap24hrChange + '</td><td>' + (1 / Price).toFixed((1 / Price) < 1 ? 8 : 2) + ' ' + msgx.short + '</td>';
  //redraw();
  }
});
