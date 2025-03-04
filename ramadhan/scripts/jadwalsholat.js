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

        // Data bulan Hijriah dalam Bahasa Inggris dan Bahasa Indonesia
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

        // Tanggal Hijriah mulai dari 4 Ramadhan 1446 H
        const startHijriYear = 1446;
        const startHijriMonth = 9; // Ramadhan
        const startHijriDay = 4; // Ramadhan ke-4

        // Tanggal Gregorian yang diperkirakan untuk 4 Ramadhan 1446H (dalam format YYYY, MM, DD)
        const startGregorianDate = new Date(2025, 2, 17);  // 17 Maret 2025 (perkiraan tanggal 4 Ramadhan 1446 H)

        // Fungsi untuk menghitung tanggal Hijriah berdasarkan tanggal Gregorian
        function getHijriDate() {
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

        // Menampilkan tanggalan Hijriah yang dinamis
        function displayHijriDate() {
            const hijriDate = getHijriDate();
            const hijriMonthInIndonesian = hijriMonthsIndonesian[hijriDate.month];
            const hijriMonthInEnglish = hijriMonths[hijriDate.month];

            // Menampilkan tanggal Hijriah di elemen dengan id "current-date"
            document.getElementById('current-date').textContent = 
                `${hijriDate.day} ${hijriMonthInIndonesian} ${hijriDate.year}H (${hijriDate.day} ${hijriMonthInEnglish} ${hijriDate.year}H)`;
        }

        // Memanggil fungsi untuk menampilkan tanggal Hijriah
        displayHijriDate();

        // Set interval untuk memperbarui tanggal setiap hari (24 jam)
        setInterval(displayHijriDate, 24 * 60 * 60 * 1000);  // Update setiap 24 jam

        // Inisialisasi jam
        setInterval(updateClock, 1000); // Memperbarui jam setiap detik
        updateClock();
