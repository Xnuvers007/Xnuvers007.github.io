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

        function formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        }

        function getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError);
            } else {
                document.getElementById('loading-indicator').innerHTML = 
                    "<p>Geolocation tidak didukung oleh browser Anda.</p>";
            }
        }

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

                        // Update date with hijri date if available
                               const hijriMonths = {
            '1': 'Muharram',
            '2': 'Safar',
            '3': 'Rabi\' al-Awwal',
            '4': 'Rabi\' al-Thani',
            '5': 'Jumada al-Awwal',
            '6': 'Jumada al-Thani',
            '7': 'Rajab',
            '8': 'Sha\'ban',
            '9': 'Ramadan',
            '10': 'Shawwal',
            '11': 'Dhul-Qi\'dah',
            '12': 'Dhul-Hijjah'
        };

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

        // Ambil tanggal Gregorian saat ini
        const currentDate = moment();

        // Mengambil tanggal Hijriah
        const hijriDate = currentDate.format('iD iMMMM iYYYY'); // format hijri
        const hijriMonthNumber = currentDate.format('iM');

        // Ambil bulan dalam bahasa Indonesia dan Inggris
        const hijriMonthInEnglish = hijriMonths[hijriMonthNumber];
        const hijriMonthInIndonesian = hijriMonthsIndonesian[hijriMonthNumber];

        // Menampilkan tanggal dalam format yang diinginkan
        document.getElementById('current-date').textContent = 
            `Gregorian Date: ${currentDate.format('YYYY-MM-DD')} | Hijri Date: ${hijriDate} (${hijriMonthInIndonesian} -
 ${hijriMonthInEnglish})`;
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

        // Set current date
        const today = new Date();
        document.getElementById('current-date').textContent = formatDate(today);

        // Initialize on page load
        window.onload = function() {
            getUserLocation();
            setInterval(updateClock, 1000); // Memperbarui jam setiap detik
            updateClock(); // Memperbarui jam saat halaman dimuat
        }
