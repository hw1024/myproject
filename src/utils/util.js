function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function strToJson(str){ 
 var json = (new Function("return " + str))(); 
 return json; 
} 

function formatRand(n){
  var num = Math.floor(Math.random() * n)
 return num;
}

module.exports = {
  formatTime: formatTime,
  formatRand: formatRand,
  strToJson: strToJson
}
