var Table;
$(document).ready(function() {
  var Table = $('#table').DataTable();
});
var USDNPR = 106.33;
var socket = io.connect('https://coincap.io');
function redraw (){
Table.order( [[ 1, 'asc' ]] ).draw() ;
}
socket.on('trades', function(tradeMsg) {
  //dataX();
  var X = document.getElementById("Crypto");
  //console.log(tradeMsg.message.msg);
  var msgx = tradeMsg.message.msg;
  //console.log(msgx.long);
  var Y = document.getElementById("TR_" + msgx.short);
  var Price = msgx.price * USDNPR;
  if (Y === null) {
    X.innerHTML += '<tr id="TR_' + tradeMsg.message.coin + '"><td>' + msgx.position24 + '</td><td>' + msgx.long + ' \(' + msgx.short + '\)</td><td>' + Price.toFixed(Price < 1 ? 8 : 2) + '</td><td>' + (msgx.volume * USDNPR).toFixed(0) + '</td><td>' + (msgx.mktcap * USDNPR).toFixed(0) + '</td><td>' + msgx.supply + ' ' + msgx.short + '</td><td>' + msgx.cap24hrChange + '</td><td>' + (1 / Price).toFixed((1 / Price) < 1 ? 8 : 2) + ' ' + msgx.short + '</td></tr>';
  // redraw();
  } else {
    Y.innerHTML = '<td>' + msgx.position24 + '</td><td>' + msgx.long + ' \(' + msgx.short + '\)</td><td>' + Price.toFixed(Price < 1 ? 8 : 2) + '</td><td>' + (msgx.volume * USDNPR).toFixed(0) + '</td><td>' + (msgx.mktcap * USDNPR).toFixed(0) + '</td><td>' + msgx.supply + ' ' + msgx.short + '</td><td>' + msgx.cap24hrChange + '</td><td>' + (1 / Price).toFixed((1 / Price) < 1 ? 8 : 2) + ' ' + msgx.short + '</td>';
  //redraw();
  }
});
