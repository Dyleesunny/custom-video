function secondToDate(result) {
    var h = Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
} 


export default{
    secondToDate
}