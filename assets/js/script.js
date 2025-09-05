// ===================================
// AOS
// ===================================
AOS.init();

// ===================================
// SOUND SETUP
// ===================================
var tempMusic = '';
var music = document.querySelector('.music');
if (tempMusic) {
    music.src = tempMusic;
}

// ===================================
// BUTTON MUSIC
// ===================================
var isPlaying = true;

function toggleMusic(event) {
    event.preventDefault();

    const musicButton = document.getElementById('music-button');
    const disc = document.querySelector('.disc'); // elemen piringan (CD/vinyl)

    if (isPlaying) {
        // Pause
        musicButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        musicButton.classList.remove('rotate');
        musicButton.style.transform = 'translateY(0)';
        music.pause();
    } else {
        // Play
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
        musicButton.classList.add('rotate');
        music.play();
    }
    isPlaying = !isPlaying;
}


document.addEventListener("DOMContentLoaded", function () {
    const bukaUndanganBtn = document.getElementById("bukaUndangan");
    const navbar = document.querySelector(".nav");
  
    if (bukaUndanganBtn && navbar) {
      bukaUndanganBtn.addEventListener("click", function (e) {
        e.preventDefault();
  
        // tambahkan class show ke navbar
        navbar.classList.add("show");
  
        // kalau mau scroll ke section pembuka juga
        const pembuka = document.querySelector("#pembuka-section");
        if (pembuka) {
          pembuka.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
  
  

// ===================================
// COUNTDOWN WEDDING
// ===================================
var countdownDate = new Date("Oct 04, 2025 10:00:00").getTime();

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countdownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var countdownEl = document.getElementById('countdown-wedding');
    if (countdownEl) {
        if (distance >= 0) {
            countdownEl.innerHTML = `
                <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5>Hari</div></div>
                <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5>Jam</div></div>
                <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5>Menit</div></div>
                <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5>Detik</div></div>
            `;
        } else {
            clearInterval(x);
            countdownEl.innerHTML = `
                <span class="text-center p-3 rounded text-light m-2">
                    <h2>Sudah dimulai!</h2>
                </span>
            `;
        }
    }
}, 1000);

// ===================================
// NAMA SAMBUTAN
// ===================================
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get('p') || '';
const nama = urlParams.get('n') || '';
const namaSambutan = document.querySelector('#nama-sambutan');

if (namaSambutan) {
    if (panggilan || nama) {
        namaSambutan.innerText = `${panggilan}${nama},`;
    } else {
        namaSambutan.innerText = 'Tamu Undangan,';
    }
}

// copy text
function copyText(el)
{
    var content = jQuery(el).siblings(`div.card-container`).find(`div.card-number`).text().trim()
    var temp = document.createElement("textarea")
    document.body.appendChild(temp)
    temp.value = content.replace(/\s+/g, '')
    temp.select()
    document.execCommand("copy")
    document.body.removeChild(temp)
    jQuery(el).text('Berhasil di copy')
    setTimeout(function(){
        jQuery(el).html(`<i class= "fas fa-regular fa-copy"></i> Copy`)
    })
}

//rsvp
window.addEventListener("load", function(){
    const form = this.document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if(nama === ""){
            Swal.fire({
                icon:"error",
                text:"Nama harus diisi!"
            })
            return;
        }
        if(status == "0") {
            Swal.fire({
                icon:"error",
                text:"Pilih salah satu status terlebih dahulu!"
            })
            return;
        }
        const data = new FormData(form);
        const action = e.target.action;
        const input= form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })
        fetch(action,{
            method: 'POST',
            body: data
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                text: "Konfirmasi kehadiran Anda berhasil terkirim"
            })
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: "error"
            })
        })
        .finally(() => {
            input.forEach(input => {
                input.disabled = false
            })
        })
    })
})