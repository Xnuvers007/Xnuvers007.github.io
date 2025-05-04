    document.addEventListener("DOMContentLoaded", function () {
      const ciphertextInput = document.getElementById("ciphertext");
      const keyLengthInput = document.getElementById("keyLength");
      const maxResultsInput = document.getElementById("maxResults");
      const decryptBtn = document.getElementById("decryptBtn");
      const clearBtn = document.getElementById("clearBtn");
      const resultsContainer = document.getElementById("results-container");
      const results = document.getElementById("results");
      const loading = document.querySelector(".loading");
      const resultFilter = document.getElementById("resultFilter");
      const sortKeyBtn = document.getElementById("sortKeyBtn");
      const sortTextBtn = document.getElementById("sortTextBtn");
      const sortScoreBtn = document.getElementById("sortScoreBtn");
      const toggleControlsBtn = document.getElementById("toggleControlsBtn");
      const mobileControls = document.querySelector(".mobile-controls");

      // Toggle mobile controls visibility
      toggleControlsBtn.addEventListener("click", function() {
        mobileControls.classList.toggle("show");
        this.textContent = mobileControls.classList.contains("show") ? 
          "Sembunyikan Opsi" : "Tampilkan Opsi";
      });

      function sortByKey() {
        const resultItems = Array.from(document.querySelectorAll(".result-item"));
        resultItems.sort((a, b) => {
          const keyA = a.querySelector(".key").textContent.toLowerCase();
          const keyB = b.querySelector(".key").textContent.toLowerCase();
          return keyA.localeCompare(keyB);
        });
        resultItems.forEach((item) => results.appendChild(item));
      }

      function sortByScore() {
        const resultItems = Array.from(document.querySelectorAll(".result-item"));
        resultItems.sort((a, b) => {
          const scoreA = parseFloat(
            a.querySelector(".key").textContent.match(/Skor: (\d+\.\d+)/)[1]
          );
          const scoreB = parseFloat(
            b.querySelector(".key").textContent.match(/Skor: (\d+\.\d+)/)[1]
          );
          return scoreB - scoreA;
        });
        resultItems.forEach((item) => results.appendChild(item));
      }

      function sortByText() {
        const resultItems = Array.from(document.querySelectorAll(".result-item"));
        resultItems.sort((a, b) => {
          const textA = a.querySelector(".plaintext").textContent.toLowerCase();
          const textB = b.querySelector(".plaintext").textContent.toLowerCase();
          return textA.localeCompare(textB);
        });
        resultItems.forEach((item) => results.appendChild(item));
      }

      sortKeyBtn.addEventListener("click", sortByKey);
      sortTextBtn.addEventListener("click", sortByText);
      sortScoreBtn.addEventListener("click", sortByScore);

      // Fungsi untuk mendekripsi teks dengan kunci tertentu
      function vigenereDecrypt(ciphertext, key) {
        let plaintext = "";
        key = key.toLowerCase();
        const keyIndices = [...key].map((k) => k.charCodeAt(0) - "a".charCodeAt(0));
        const keyLength = key.length;

        let i = 0;
        for (const char of ciphertext) {
          if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const offset = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
            const charIndex = char.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
            const keyIndex = keyIndices[i % keyLength];
            const plainIndex = (charIndex - keyIndex + 26) % 26;
            plaintext += String.fromCharCode(plainIndex + offset);
            i++;
          } else {
            plaintext += char;
          }
        }

        return plaintext;
      }

      // Menggunakan iterators untuk menghasilkan kunci dengan lebih efisien
      function* keyGenerator(length) {
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const charCount = characters.length;

        // Membuat array indeks untuk melacak posisi dalam menghasilkan kunci
        const indices = new Array(length).fill(0);

        while (true) {
          // Menghasilkan kunci saat ini
          let key = "";
          for (let i = 0; i < length; i++) {
            key += characters[indices[i]];
          }
          yield key;

          // Memperbarui indeks untuk kombinasi berikutnya
          let pos = length - 1;
          while (pos >= 0) {
            indices[pos]++;
            if (indices[pos] < charCount) {
              break;
            }
            indices[pos] = 0;
            pos--;
          }

          // Jika kita telah mencapai akhir dari semua kombinasi
          if (pos < 0) {
            break;
          }
        }
      }

      // Fungsi untuk mengukur kualitas teks (kemungkinan bahasa Inggris)
      // Menggunakan frekuensi umum karakter dan bigram
      function scoreText(text) {
        const frequencyMap = {
          e: 12.7, t: 9.1, a: 8.2, o: 7.5, i: 7, n: 6.7, s: 6.3, h: 6, r: 6, d: 4.3,
          l: 4, u: 2.8, c: 2.8, m: 2.4, w: 2.4, f: 2.2, g: 2, y: 2, p: 1.9, b: 1.5,
          v: 1, k: 0.8, j: 0.2, x: 0.2, q: 0.1, z: 0.1,
        };

        // Common English bigrams
        const bigramMap = {
          th: 3.56, he: 3.07, in: 2.43, er: 2.05, an: 1.99, re: 1.85, on: 1.76, 
          at: 1.49, en: 1.45, nd: 1.35,
        };

        // Common English word beginnings
        const commonBeginnings = ["th", "wh", "tr", "st", "pr", "pl", "gr", "ch"];

        // Common English word endings
        const commonEndings = ["ing", "ed", "ly", "er", "tion", "es", "s", "ment"];

        let score = 0;
        const cleanText = text.toLowerCase().replace(/[^a-z]/g, "");

        // Character frequency score
        for (let i = 0; i < cleanText.length; i++) {
          const char = cleanText[i];
          if (frequencyMap[char]) {
            score += frequencyMap[char];
          }
        }

        // Bigram score
        for (let i = 0; i < cleanText.length - 1; i++) {
          const bigram = cleanText.substr(i, 2);
          if (bigramMap[bigram]) {
            score += bigramMap[bigram] * 2; // Give more weight to bigrams
          }
        }

        // Word pattern score - split by spaces and check patterns
        const words = text.toLowerCase().split(/\s+/);
        for (const word of words) {
          if (word.length > 2) {
            // Check for common beginnings
            for (const beginning of commonBeginnings) {
              if (word.startsWith(beginning)) {
                score += 5;
              }
            }

            // Check for common endings
            for (const ending of commonEndings) {
              if (word.endsWith(ending)) {
                score += 5;
              }
            }
          }
        }

        // Normalize score by text length
        return score / cleanText.length;
      }

      // Fungsi untuk menghasilkan MD5 hash (untuk identifikasi unik)
      function simpleHash(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      }

      // Fungsi untuk mendekripsi teks
      function decryptText() {
        const ciphertext = ciphertextInput.value.trim();
        const keyLength = parseInt(keyLengthInput.value, 10);
        const maxResults = parseInt(maxResultsInput.value, 10);

        if (!ciphertext) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Silakan masukkan teks tersandi.",
          });
          return;
        }

        if (!keyLength || keyLength <= 0 || keyLength > 5) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Silakan masukkan panjang kunci antara 1-5.",
          });
          return;
        }

        loading.style.display = "block";
        results.innerHTML = "";
        resultsContainer.style.display = "none";

        // Menggunakan setTimeout untuk memberi waktu UI memperbarui sebelum memulai proses yang intensif
        setTimeout(() => {
          const decryptedResults = [];
          const keysGenerator = keyGenerator(keyLength);
          const uniqueResults = new Set();

          let count = 0;
          let key;

          while (!(key = keysGenerator.next()).done) {
            const currentKey = key.value;
            const decrypted = vigenereDecrypt(ciphertext, currentKey);
            const resultHash = simpleHash(decrypted);

            // Hanya menyimpan hasil yang unik
            if (!uniqueResults.has(resultHash)) {
              uniqueResults.add(resultHash);

              // Menghitung skor untuk peringkat
              const score = scoreText(decrypted);

              decryptedResults.push({
                key: currentKey,
                plaintext: decrypted,
                score: score,
              });

              count++;
              if (count >= 10000) {
                // Batas keamanan
                break;
              }
            }
          }

          // Urutkan hasil berdasarkan skor (kemungkinan bahasa Inggris)
          decryptedResults.sort((a, b) => b.score - a.score);

          // Tampilkan hasil terbatas
          const limitedResults = decryptedResults.slice(0, maxResults);

          if (limitedResults.length === 0) {
            results.innerHTML = "<p>Tidak ada hasil yang ditemukan.</p>";
          } else {
            // limitedResults.forEach((result, index) => {
            decryptedResults.forEach((result, index) => {
              const resultElement = document.createElement("div");
              resultElement.className = "result-item";
              resultElement.innerHTML = `
                <div class="key">Kunci: ${
                  result.key
                } (Skor: ${result.score.toFixed(2)})</div>
                <div class="plaintext">${result.plaintext}</div>
                <button class="copy-btn" data-text="${
                  result.plaintext
                }">Salin Teks</button>
              `;
              results.appendChild(resultElement);
            });

            // Tambahkan event listener untuk tombol salin
            document.querySelectorAll(".copy-btn").forEach((button) => {
              button.addEventListener("click", function () {
                const textToCopy = this.getAttribute("data-text");
                navigator.clipboard.writeText(textToCopy).then(() => {
                  const originalText = this.textContent;
                  this.textContent = "Tersalin!";
                  Swal.fire({
                    icon: "success",
                    title: "Teks Tersalin!",
                    text: "Teks berhasil disalin ke clipboard.",
                  });
                  setTimeout(() => {
                    this.textContent = originalText;
                  }, 2000);
                });
              });
            });
          }

          loading.style.display = "none";
          resultsContainer.style.display = "block";
        }, 100);
      }

      // Fungsi untuk membersihkan input dan hasil
      function clearAll() {
        ciphertextInput.value = "";
        results.innerHTML = "";
        resultsContainer.style.display = "none";
        ciphertextInput.focus();
      }

      // Fungsi untuk memfilter hasil
      function filterResults() {
        const filterText = resultFilter.value.toLowerCase();
        document.querySelectorAll(".result-item").forEach((item) => {
          const keyText = item.querySelector(".key").textContent.toLowerCase();
          const plaintext = item
            .querySelector(".plaintext")
            .textContent.toLowerCase();

          if (keyText.includes(filterText) || plaintext.includes(filterText)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }

      // Event listeners
      decryptBtn.addEventListener("click", decryptText);
      clearBtn.addEventListener("click", clearAll);
      resultFilter.addEventListener("input", filterResults);

      // Tambahkan validasi untuk input
      keyLengthInput.addEventListener("input", function () {
        if (this.value > 5) {
          this.value = 5;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Maksimum panjang kunci adalah 5 untuk mencegah waktu pemrosesan yang terlalu lama.",
          });
        }
      });

      // Tambahkan kemampuan menekan Enter untuk mendekripsi
      ciphertextInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.ctrlKey) {
          decryptText();
        }
      });
    });
