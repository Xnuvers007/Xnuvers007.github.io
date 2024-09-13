
import fetch from 'node-fetch';

const tanggalSekarang = new Date();
const opsiTanggal = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const opsiWaktu = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
};

// Menentukan waktu untuk WIB, WITA, dan WIT
const tanggalSekarangWIB = new Date(tanggalSekarang.getTime() + (7 * 60 * 60 * 1000));
const tanggalSekarangWITA = new Date(tanggalSekarang.getTime() + (8 * 60 * 60 * 1000));
const tanggalSekarangWIT = new Date(tanggalSekarang.getTime() + (9 * 60 * 60 * 1000));

// Format tanggal dan waktu untuk WIB, WITA, dan WIT
const tanggalFormatWIB = tanggalSekarangWIB.toLocaleDateString('id-ID', opsiTanggal);
const waktuFormatWIB = tanggalSekarangWIB.toLocaleTimeString('id-ID', opsiWaktu);
const tanggalDanWaktuWIB = `${tanggalFormatWIB} ${waktuFormatWIB}`;

const tanggalFormatWITA = tanggalSekarangWITA.toLocaleDateString('id-ID', opsiTanggal);
const waktuFormatWITA = tanggalSekarangWITA.toLocaleTimeString('id-ID', opsiWaktu);
const tanggalDanWaktuWITA = `${tanggalFormatWITA} ${waktuFormatWITA}`;

const tanggalFormatWIT = tanggalSekarangWIT.toLocaleDateString('id-ID', opsiTanggal);
const waktuFormatWIT = tanggalSekarangWIT.toLocaleTimeString('id-ID', opsiWaktu);
const tanggalDanWaktuWIT = `${tanggalFormatWIT} ${waktuFormatWIT}`;

async function ambilKutipan() {
  try {
    const response = await fetch('https://quote-generator-api-six.vercel.app/api/quotes/random');
    const data = await response.json();
    if (data.status) {
      const kutipan = data.quote;
      const kategori = data.category;
      const readme = `\
⏰ Diperbarui pada:
- WIB: ${tanggalDanWaktuWIB}
- WITA: ${tanggalDanWaktuWITA}
- WIT: ${tanggalDanWaktuWIT}

Kutipan Inspiratif:
"${kutipan}"
\n
Kategori: ${kategori}
`;
      console.log(readme);
    } else {
      console.error('Gagal mendapatkan kutipan');
      console.log(`\
⏰ Diperbarui pada:
- WIB: ${tanggalDanWaktuWIB}
- WITA: ${tanggalDanWaktuWITA}
- WIT: ${tanggalDanWaktuWIT}

Kutipan Inspiratif:
Tidak dapat memuat kutipan saat ini.
`);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    console.log(`\
⏰ Diperbarui pada:
- WIB: ${tanggalDanWaktuWIB}
- WITA: ${tanggalDanWaktuWITA}
- WIT: ${tanggalDanWaktuWIT}

Kutipan Inspiratif:
Tidak dapat memuat kutipan saat ini.
`);
  }
}

ambilKutipan();
