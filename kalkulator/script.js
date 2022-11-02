function jam() {
    var waktu = new Date();
    var jam = waktu.getHours();
    var menit = waktu.getMinutes();
    var detik = waktu.getSeconds();
    document.getElementById("clock").innerHTML = jam + ":" + menit + ":" + detik;
}
var interval = setInterval(jam, 1000);