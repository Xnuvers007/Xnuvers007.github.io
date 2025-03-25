function createHearts() {
  const heartsContainer = document.querySelector(".floating-hearts");
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  const hearts = [
    "❤️",
    "💖",
    "💝",
    "💕",
    "💗",
    "❤",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
  ];
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHearts, 300);

function openGift() {
  const giftContent = document.getElementById("giftContent");
  if (giftContent.style.display === "none" || !giftContent.style.display) {
    giftContent.style.display = "block";
    playPopSound();
  } else {
    giftContent.style.display = "none";
  }
}

function showLove() {
  const messages = [
    `💖 Aku Sayang Kamu 💖\nKamu adalah segalanya bagiku!`,
    `⭐ Kamu adalah bintang terindah dalam hidupku ⭐\nYang selalu menerangi setiap langkahku`,
    `💑 Bersamamu, setiap hari terasa seperti Valentine 💑\nKarena cintamu membuat hidupku sempurna`,
    `💕 You're my everything! 💕\nMy love, my life, my world!`,
    `🌈 Kamu membuat hidupku lebih berwarna 🌈\nSeperti pelangi yang indah setelah hujan`,
    `💫 Setiap detik bersamamu adalah keajaiban 💫\nHidupku lebih indah karena ada kamu!`,
    `🌹 Cinta kita seperti bunga yang selalu mekar, tak akan pernah layu 🌹\nKamu adalah wangi bunga yang selalu ada di hatiku`,
    `✨ Kamu adalah impian yang jadi kenyataan ✨\nSaat aku menutup mata, aku hanya melihat kamu`,
    `🌟 Kamu adalah sinar dalam hidupku, lebih terang dari bintang 🌟\nSetiap hari bersamamu adalah anugerah`,
    `💌 Tak ada kata yang cukup untuk menggambarkan rasa cintaku 💌\nSetiap detik denganmu adalah kebahagiaan yang tak ternilai`,
    `🌸 Hatiku milikmu 🌸\nTak ada yang lebih indah selain cintamu`,
    `💖 Kamu adalah rumah hatiku 💖\nTempat aku kembali, tempat aku merasa aman dan dicintai`,
    `💓 Setiap sentuhanmu membuat dunia ini terasa lebih indah 💓\nCintamu adalah kekuatan yang membuatku hidup`,
    `🌷 Kamu adalah keindahan yang tak ternilai 🌷\nSetiap tatapanmu adalah kebahagiaan bagiku`,
    `🌹 Kehadiranmu membuat dunia ini lebih manis 🌹\nKamu adalah alasan aku tersenyum setiap hari`,
    `💞 Cintamu adalah hadiah terbesar dalam hidupku 💞\nTak ada yang bisa memisahkan kita!`,
    `💖 Kamu membuatku merasa sempurna 💖\nSetiap hari bersamamu adalah keajaiban yang aku tak ingin lewatkan`,
    `💘 Kamu adalah hatiku yang berdetak 💘\nDan aku ingin hidup bersamamu selamanya`,
    `🌟 Tak ada yang lebih indah selain cinta kita 🌟\nKamu adalah bagian terbaik dari hidupku`,
    `💎 Cinta kita lebih berharga dari permata 💎\nSetiap detik bersamamu adalah kenangan yang tak ternilai`,
    `🦋 Setiap momen bersamamu terasa seperti terbang di atas awan 🦋\nKamu adalah kebahagiaanku.`,
    `🌻 Dengan kamu, aku merasa seperti bunga yang selalu mekar 🌻\nCintamu adalah segalanya bagi hidupku`,
    `💖 Cinta kita adalah perjalanan yang tak akan pernah berakhir 💖\nSetiap langkahku selalu mengarah ke kamu`,
    `💓 Kamu adalah kekuatan dalam hidupku 💓\nSaat kamu ada di dekatku, aku merasa bisa mengalahkan dunia`,
    `💑 Bersamamu, hidup ini penuh dengan tawa dan kebahagiaan 💑\nKamu adalah teman terbaik, kekasih terbaik, dan segalanya bagiku`,
    `🌸 Tiada yang lebih indah selain melihat senyumanmu 🌸\nKarena senyumanmu adalah sumber kebahagiaanku`,
    `💖 Dalam dunia ini, hanya ada kamu dan aku 💖\nCintamu adalah segalanya yang aku perluka`,
  ];

  const tombolkirim = document.getElementById("giftContent");
  tombolkirim.style.display = "none";

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  swal({
    title: "Pesan Cinta",
    html: true,
    text: randomMessage,
    buttons: {
      cancel: "Tutup",
      confirm: {
        text: "Kirim ke WhatsApp",
        value: true,
      },
    },
  }).then((value) => {
    if (value) {
      // TERSERAH KALIAN MAU APA
      swal("Masukkan pesan yang ingin kamu kirim:", {
        content: "input",
      }).then((value) => {
        if (value) {
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            value
          )}%0A+I+Love+You`;
          window.open(whatsappUrl, "_blank");
        } else {
          swal("Pesan tidak boleh kosong!", {
            icon: "error",
          });
        }
      });
    }
  });

  playPopSound();
}

function closeLoveMessage() {
  document.getElementById("loveMessage").style.display = "none";
}

function playPopSound() {
  // Tambahkan suara pop jika diinginkan
  const audio = new Audio("./music/maro-jump-sound-effect_1.mp3");
  audio.play();

  const button = document.querySelector("button");
  button.style.transform = "scale(1.1)";

  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 200);

  setTimeout(() => {
    button.style.transform = "scale(1.1)";
  }, 400);

  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 600);
}

function updateLoveCounter() {
  const startDate = new Date("2021-06-21"); // Ganti dengan tanggal anniversary Anda YYYY-MM-DD
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("loveCounter").innerHTML = `
        <p style="font-size: 1.5em; margin: 10px 0;">
            ${diffDays} Hari Penuh Cinta ❤️<br />I Love You Buat kamu sayanggg
        </p>
    `;
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.querySelector(".modal-caption");
const closeBtn = document.querySelector(".modal-close");

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    const title = this.querySelector(".gallery-title").textContent;

    modal.style.display = "flex";
    modalImg.src = img.src;
    modalCaption.textContent = title;

    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "50px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

galleryItems.forEach((item) => {
  observer.observe(item);
});

window.onload = function () {
  const container = document.querySelector(".container");
  container.style.opacity = 0;
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fadeIn);
    }
    container.style.opacity = opacity;
    opacity += 0.02;
  }, 20);
  updateLoveCounter();

  var audioElement = document.getElementById("linkmp3");

  function playAudio() {
    audioElement.muted = false;
    audioElement.play().catch(function (error) {
      console.log("Autoplay blocked by browser: ", error);
    });
  }

  playAudio();

  document.body.addEventListener("click", playAudio);

  window.addEventListener("scroll", playAudio);

  audioElement.loop = true;
  audioElement.volume = 1.0;

  audioElement.addEventListener("ended", function () {
    audioElement.currentTime = 0;
    audioElement.play();
  });
};

// function _0x4a9f(_0x35ede0,_0x53052c){const _0x532406=_0x5324();return _0x4a9f=function(_0x4a9f43,_0x2d24ae){_0x4a9f43=_0x4a9f43-0xb6;let _0x54474d=_0x532406[_0x4a9f43];return _0x54474d;},_0x4a9f(_0x35ede0,_0x53052c);}(function(_0x548ca8,_0xaf1291){const _0x25cd99=_0x4a9f,_0x3ca0e6=_0x548ca8();while(!![]){try{const _0xdb6563=parseInt(_0x25cd99(0xe1))/0x1*(parseInt(_0x25cd99(0xd1))/0x2)+-parseInt(_0x25cd99(0xc9))/0x3*(parseInt(_0x25cd99(0xc0))/0x4)+parseInt(_0x25cd99(0xcb))/0x5+-parseInt(_0x25cd99(0xbb))/0x6+-parseInt(_0x25cd99(0xdf))/0x7+parseInt(_0x25cd99(0xb6))/0x8+-parseInt(_0x25cd99(0xd8))/0x9*(-parseInt(_0x25cd99(0xc4))/0xa);if(_0xdb6563===_0xaf1291)break;else _0x3ca0e6['push'](_0x3ca0e6['shift']());}catch(_0x352921){_0x3ca0e6['push'](_0x3ca0e6['shift']());}}}(_0x5324,0x723fe));function forfooterwatermark(){const _0x411277=_0x4a9f,_0x5e7333=document[_0x411277(0xc7)](_0x411277(0xc5)),_0xf24e22=document['createElement']('div');_0xf24e22[_0x411277(0xcd)]='\x0a\x20\x20\x20\x20\x20\x20\x20\x20Made\x20with\x20<span\x20class=\x22heart\x22>❤️</span>\x20by\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22https://www.instagram.com/indradwi.25/\x22>Luckysora007</a>\x0a\x20\x20\x20\x20',document[_0x411277(0xc2)][_0x411277(0xbf)](_0x5e7333),_0x5e7333['appendChild'](_0xf24e22),Object['assign'](_0x5e7333[_0x411277(0xd4)],{'position':_0x411277(0xb7),'bottom':_0x411277(0xdc),'left':'50%','transform':_0x411277(0xe8),'padding':_0x411277(0xda),'backgroundColor':_0x411277(0xd5),'color':_0x411277(0xdd),'borderRadius':_0x411277(0xdc),'boxShadow':_0x411277(0xea),'fontFamily':_0x411277(0xdb),'fontSize':_0x411277(0xe9),'textAlign':_0x411277(0xde),'zIndex':'9999','backdropFilter':_0x411277(0xd6),'transition':_0x411277(0xb9),'cursor':_0x411277(0xe6)});const _0x175869=_0x5e7333[_0x411277(0xe5)]('a');Object[_0x411277(0xc3)](_0x175869[_0x411277(0xd4)],{'color':_0x411277(0xc1),'textDecoration':_0x411277(0xd3),'fontWeight':_0x411277(0xbd),'transition':_0x411277(0xb9)});const _0x2c141a=_0x5e7333[_0x411277(0xe5)](_0x411277(0xcf));Object[_0x411277(0xc3)](_0x2c141a[_0x411277(0xd4)],{'display':_0x411277(0xbc),'margin':'0\x203px','transition':_0x411277(0xb8)}),_0x5e7333[_0x411277(0xbe)](_0x411277(0xe7),()=>{const _0x323b13=_0x411277;_0x5e7333[_0x323b13(0xd4)][_0x323b13(0xc6)]=_0x323b13(0xd7),_0x5e7333['style']['boxShadow']=_0x323b13(0xcc),_0x175869[_0x323b13(0xd4)][_0x323b13(0xd0)]='#00ffaa',_0x2c141a[_0x323b13(0xd4)][_0x323b13(0xc6)]=_0x323b13(0xe2);}),_0x5e7333['addEventListener'](_0x411277(0xe4),()=>{const _0x581099=_0x411277;_0x5e7333[_0x581099(0xd4)][_0x581099(0xc6)]='translateX(-50%)',_0x5e7333[_0x581099(0xd4)][_0x581099(0xce)]=_0x581099(0xea),_0x175869[_0x581099(0xd4)]['color']=_0x581099(0xc1),_0x2c141a[_0x581099(0xd4)][_0x581099(0xc6)]=_0x581099(0xd2);});let _0x3ea4a4=0x1;setInterval(()=>{const _0xb27768=_0x411277;_0x3ea4a4=_0x3ea4a4===0x1?1.2:0x1,_0x2c141a['style'][_0xb27768(0xc6)]=_0xb27768(0xc8)+_0x3ea4a4+')';},0x3e8);let _0x39d73=0x0,_0x508944=!![];setInterval(()=>{const _0x407cdf=_0x411277;if(_0x508944){_0x39d73+=0.5;if(_0x39d73>=0x5)_0x508944=![];}else{_0x39d73-=0.5;if(_0x39d73<=0x0)_0x508944=!![];}_0x5e7333[_0x407cdf(0xd4)][_0x407cdf(0xc6)]=_0x407cdf(0xba)+-_0x39d73+_0x407cdf(0xe0);},0x32),_0x5e7333[_0x411277(0xd4)][_0x411277(0xe3)]='0',requestAnimationFrame(()=>{const _0x1e1baa=_0x411277;_0x5e7333[_0x1e1baa(0xd4)][_0x1e1baa(0xca)]=_0x1e1baa(0xd9),_0x5e7333[_0x1e1baa(0xd4)]['opacity']='1';});}function _0x5324(){const _0x40210a=['translateX(-50%)\x20translateY(','4718112LFIecp','inline-block','bold','addEventListener','appendChild','28620kynxBw','#00ff88','body','assign','10PgCAxy','footer','transform','createElement','scale(','132HpodeV','transition','1967305SbuoEW','0\x206px\x2020px\x20rgba(0,\x200,\x200,\x200.3)','innerHTML','boxShadow','.heart','color','288326CpagKO','scale(1)','none','style','rgba(0,\x200,\x200,\x200.7)','blur(5px)','translateX(-50%)\x20translateY(-5px)','6054363lTdpCV','opacity\x200.5s\x20ease,\x20transform\x200.3s\x20ease','10px\x2020px','\x27Segoe\x20UI\x27,\x20Arial,\x20sans-serif','20px','white','center','2222759sYhHSy','px)','1bDAvFH','scale(1.2)','opacity','mouseout','querySelector','pointer','mouseover','translateX(-50%)','14px','0\x204px\x2015px\x20rgba(0,\x200,\x200,\x200.2)','5410752WUwUTG','absolute','transform\x200.4s\x20ease','all\x200.3s\x20ease'];_0x5324=function(){return _0x40210a;};return _0x5324();}forfooterwatermark();