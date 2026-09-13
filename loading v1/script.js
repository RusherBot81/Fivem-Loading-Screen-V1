// FiveM Yükleme Yüzdesi Dinleyicisi
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.type == "loadProgress") {
        var percentage = item.loadFraction * 100;
        console.log("FiveM Loading: " + percentage + "%");
    }
});

// Arka Plan Müziği ve Ses Ayarı (Fixlendi)
function playLoadingMusic() {
    var audio = document.getElementById("loading-music");
    if (audio) {
        audio.volume = 0.2; // Ses seviyesi (%20)
        
        // Müziği oynatmayı dene
        var playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Müzik başarıyla başlatıldı.");
            }).catch(error => {
                console.log("Autoplay engellendi, tekrar deneniyor...");
                // Autoplay engeline takılırsa 1 saniye sonra tekrar dene
                setTimeout(playLoadingMusic, 1000);
            });
        }
    }
}

// Sayfa ve tüm öğeler tamamen yüklendiğinde müziği başlat
window.addEventListener('load', function() {
    playLoadingMusic();
});

// 'M' tuşuna basınca müziği aç/kapat (Susturma Özelliği)
window.addEventListener('keydown', function(e) {
    if (e.key === 'm' || e.key === 'M') {
        var audio = document.getElementById("loading-music");
        if (audio) {
            audio.muted = !audio.muted;
        }
    }
});