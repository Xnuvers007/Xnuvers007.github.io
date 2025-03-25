  audio = new Audio('' + linkmp3.innerHTML); function showDiv() {setTimeout(setel,50);pergantian();document.getElementById('Content').style = "opacity:1;margin-top:4vh;animation:kont 5s infinite;";bq.style = "opacity:1;visibility:visible;margin-top:5px";document.querySelector("body").style.animation = "none 8s ease infinite";}
  function tombol(){Tombol.style="opacity:1;transform: scale(1);";ftom=1;} ftom=0;
  function otomatis2() {befanimkataa();setTimeout(animkataa,200);} function befanimkataa(){kalimatc.style="transform:scale(.3);font-size:14px;margin-top:30px;";} function animkataa() {kalimatc.style="transform:scale(1);font-size:14px;margin-top:30px;";}
  function finalakhir(){ftom=2;otomatis2();By.innerHTML = "Kirim Pesan";kalimatc.innerHTML = "Jawabanmu: " + pesanwhatsapp;} function sjawab(){if(ftom==1){kalimatc.innerHTML = "";otomatis2();jawab();} if(ftom==2){menuju();}} function setel(){audio.play();}
  
  var aa=0,kata1;kata1=idkata1.innerHTML;idkata1.innerHTML="";
  var au=0,kata2;kata2=idkata2.innerHTML;idkata2.innerHTML="";
  var ai=0,kata3;kata3=idkata3.innerHTML;idkata3.innerHTML="";
  
  function ngetik() {kalimat.style="margin:0 20px";if(aa<kata1.length){kalimat.innerHTML += kata1.charAt(aa);aa++;setTimeout(ngetik,48);}}
  function ngetik2() {kalimat.style="margin:0 20px";if(au<kata2.length){kalimat.innerHTML += kata2.charAt(au);au++;setTimeout(ngetik2,55);}}
  function ngetik3() {kalimat.style="margin:0 20px";if(ai<kata3.length){kalimat.innerHTML += kata3.charAt(ai);ai++;setTimeout(ngetik3,50);}}

  function munculkata1(){wallpaper.style="transform: scale(1.5);opacity:.2";kalimat.style.animation="none";kalimat.style.animation="rth 1s";kalimat.innerHTML = idkata4.innerHTML;}
  function munculkata2(){wallpaper.style="transform: scale(2.2);opacity:.2";kalimat.style.animation="none";kalimat.style.animation="rth 1s";kalimat.innerHTML = idkata5.innerHTML;}
  function munculkata3(){kalimatc.style.animation="none";kalimatc.style.animation="rth 1s";kalimatc.innerHTML = idkata6.innerHTML;}
  
  function pergantian(){fotoatas.src = idfoto1.src;setTimeout(gantikata,1800);setTimeout(gantikata,4800);setTimeout(gantikata,5900);setTimeout(gantikata,8900);setTimeout(gantikata,9800);}
  function tfkata(){fkata+=1;} function bersihkan(){kalimat.innerHTML = "";}
  fkata=1;function gantikata(){
        if(fkata==1){kalimat.innerHTML = "";setTimeout(ngetik,50);}
        if(fkata==2){kalimat.innerHTML = "";setTimeout(ngetik2,50);}
        if(fkata==3){kalimat.innerHTML = "";setTimeout(ngetik3,50);fotoatas.src = idfoto2.src;}
        if(fkata==4){kalimat.innerHTML = "";setTimeout(munculkata1,50);fotoatas.src = idfoto3.src;}
        if(fkata==5){kalimat.innerHTML = "";setTimeout(munculkata2,50);setTimeout(tombol,1200);}
        setTimeout(tfkata, 300);
  }
       async function menuju(){await swals.fire('Kirim pesan ke WhatsApp aku, ya!');window.location = "https://api.whatsapp.com/send?phone=&text=" + pesanwhatsapp;}
       async function jawab(){
           var { value: jawaban } = await swals.fire({
               title: 'Isi Pesan Kamu &#128073;&#128072;', 
               input: 'text', allowOutsideClick: false, showCancelButton: false,
           });
           if(jawaban && jawaban.length < 61){
           	window.jawaban = jawaban;
               pesanwhatsapp = jawaban;
               finalakhir();
           } else {
               await swals.fire('Ups!', 'Jawaban tidak boleh kosong atau lebih dari 60 karakter, ya!');jawab();
           }
       }

      async function pertama(){
         await swals.fire('Selamat datang!', 'Sekarang lihat ini ya sayang ♥');setTimeout(showDiv,300);
       } pertama();