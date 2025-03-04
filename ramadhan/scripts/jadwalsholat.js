// Fungsi untuk format waktu menjadi HH:MM:SS
function formatTime(date) {
    return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }).format(date);
}

// Fungsi untuk memperbarui waktu
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = formatTime(now);
}

// Fungsi untuk format tanggal Gregorian
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Menghitung tanggal Hijriah berdasarkan tanggal Gregorian
function getHijriDate() {
    const startHijriYear = 1446;
    const startHijriMonth = 9; // Ramadhan
    const startHijriDay = 4; // Ramadhan ke-4

    // Tanggal Gregorian yang diperkirakan untuk 4 Ramadhan 1446H (dalam format YYYY, MM, DD)
    const startGregorianDate = new Date(2025, 3, 4);  // 4 Maret 2025 (perkiraan tanggal 4 Ramadhan 1446 H)

    const today = new Date();

    // Hitung jumlah hari antara tanggal mulai dan tanggal sekarang
    const diffTime = today - startGregorianDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Selisih dalam hari

    // Hitung hari Hijriah yang baru
    let hijriDay = startHijriDay + diffDays;
    let hijriMonth = startHijriMonth;
    let hijriYear = startHijriYear;

    // Tangani jika bulan Ramadhan sudah lewat atau tahun sudah bergeser
    if (hijriDay > 30) {
        hijriMonth++;
        hijriDay -= 30;  // Jika lebih dari 30 hari, pindah bulan
    }

    if (hijriMonth > 12) {
        hijriMonth = 1;  // Kembali ke bulan pertama (Muharram)
        hijriYear++;  // Tahun Hijriah bertambah
    }

    return {
        day: hijriDay,
        month: hijriMonth,
        year: hijriYear
    };
}

// Fungsi untuk menampilkan tanggal Hijriah
function displayHijriDate() {
    const hijriDate = getHijriDate();
    const hijriMonthsIndonesian = {
        '1': 'Muharram',
        '2': 'Safar',
        '3': 'Rabi\'ul Awal',
        '4': 'Rabi\'ul Akhir',
        '5': 'Jumadil Awal',
        '6': 'Jumadil Akhir',
        '7': 'Rajab',
        '8': 'Sya\'ban',
        '9': 'Ramadhan',
        '10': 'Syawwal',
        '11': 'Dzulqa\'dah',
        '12': 'Dzulhijjah'
    };

    const hijriMonthInIndonesian = hijriMonthsIndonesian[hijriDate.month];

    document.getElementById('current-date').textContent = 
        `${hijriDate.day} ${hijriMonthInIndonesian} ${hijriDate.year}H`;
}

// Fungsi untuk mendapatkan lokasi pengguna
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError);
    } else {
        document.getElementById('loading-indicator').innerHTML = 
            "<p>Geolocation tidak didukung oleh browser Anda.</p>";
    }
}

// Fungsi untuk mengambil waktu sholat berdasarkan lokasi
function fetchPrayerTimes(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const date = new Date().toISOString().slice(0, 10);

    const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=5`;

    // Membuat elemen anchor
    const link = document.createElement('a');
    link.href = `https://www.google.com/maps/place/${latitude},${longitude}`;
    link.target = '_blank';
    link.style.color = 'white';
    link.textContent = 'Klik untuk lihat di Google Maps';

    // Menampilkan informasi lokasi dengan teks biasa dan link yang dapat diklik
    const locationInfo = document.getElementById('location-info');
    locationInfo.textContent = `Lokasi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\nGaris Bujur: ${longitude.toFixed(4)}\nGaris Lintang: ${latitude.toFixed(4)}\n`;

    // Menambahkan link ke dalam elemen location-info
    locationInfo.appendChild(link);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                document.getElementById('loading-indicator').style.display = 'none';
                document.getElementById('prayer-cards').style.display = 'block';

                const timings = data.data.timings;
                document.getElementById('imsak').textContent = timings.Imsak;
                document.getElementById('fajr').textContent = timings.Fajr;
                document.getElementById('sunrise').textContent = timings.Sunrise;
                document.getElementById('dhuhr').textContent = timings.Dhuhr;
                document.getElementById('asr').textContent = timings.Asr;
                document.getElementById('maghrib').textContent = timings.Maghrib;
                document.getElementById('isha').textContent = timings.Isha;
                document.getElementById('midnight').textContent = timings.Midnight;
                document.getElementById('sepertigamalam').textContent = timings.Firstthird;
                document.getElementById('akhirwaktu').textContent = timings.Lastthird;
            } else {
                document.getElementById('loading-indicator').innerHTML = 
                    "<p>Gagal mengambil data jadwal sholat</p>";
            }
        })
        .catch(error => {
            document.getElementById('loading-indicator').innerHTML = 
                "<p>Terjadi kesalahan saat mengambil data</p>";
        });
}

// Fungsi untuk menangani error pada geolocation
function showError(error) {
    let message = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Pengguna menolak permintaan lokasi.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            message = "Waktu untuk mendapatkan lokasi telah habis.";
            break;
        case error.UNKNOWN_ERROR:
            message = "Terjadi kesalahan yang tidak diketahui.";
            break;
    }
    document.getElementById('loading-indicator').innerHTML = `<p>${message}</p>`;
}

// Inisialisasi halaman
window.onload = function() {
    getUserLocation();
    setInterval(updateClock, 1000); // Memperbarui jam setiap detik
    updateClock(); // Memperbarui jam saat halaman dimuat
    displayHijriDate(); // Menampilkan tanggal Hijriah saat halaman dimuat
    setInterval(displayHijriDate, 24 * 60 * 60 * 1000);  // Memperbarui tanggal Hijriah setiap 24 jam
};
