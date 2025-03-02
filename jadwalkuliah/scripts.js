document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("jadwal-body");
    const loadingElement = document.getElementById("loading");
    const errorElement = document.getElementById("error-message");
    const dayFilter = document.getElementById("filter-day");
    const searchInput = document.getElementById("search-input");
    const cardsContainer = document.getElementById("course-cards-container");
    const dayView = document.getElementById("day-view");
    
    // Tab navigation
    const tabs = document.querySelectorAll('.tab');
    const tableView = document.getElementById('table-view');
    const cardView = document.getElementById('card-view');
    
    // Variabel untuk menyimpan data jadwal
    let jadwalData = [];

    // Mengelola tampilan tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Hapus kelas aktif dari semua tab
            tabs.forEach(t => t.classList.remove('active'));
            
            // Tambahkan kelas aktif ke tab yang diklik
            this.classList.add('active');
            
            // Sembunyikan semua tampilan
            tableView.style.display = 'none';
            cardView.style.display = 'none';
            dayView.style.display = 'none';
            
            // Tampilkan tampilan yang dipilih
            const viewType = this.getAttribute('data-view');
            if (viewType === 'table') {
                tableView.style.display = 'block';
            } else if (viewType === 'card') {
                cardView.style.display = 'block';
            } else if (viewType === 'day') {
                dayView.style.display = 'block';
            }
        });
    });

    // Function to sanitize input to prevent XSS
    function sanitizeHTML(text) {
        const element = document.createElement('div');
        element.textContent = text;
        return element.innerHTML;
    }

    // Function to safely set text content
    function safeSetTextContent(element, text) {
        if (element) {
            element.textContent = text;
        }
    }

    // Function to create and append a cell with safe text content
    function createSafeCell(row, content) {
        const cell = document.createElement('td');
        cell.textContent = content;
        row.appendChild(cell);
    }

    // Ambil data jadwal dari jadwal.txt
    fetch('jadwal.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Validate data format
            if (!Array.isArray(data)) {
                throw new Error('Data is not in the expected format (array)');
            }
            
            jadwalData = data;  // Simpan data ke jadwalData
            displayData(jadwalData);  // Tampilkan data di awal
            loadingElement.style.display = 'none';  // Sembunyikan loading
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            safeSetTextContent(
                document.querySelector('#error-message p'), 
                `Terjadi kesalahan saat memuat data jadwal: ${error.message}. Silakan coba lagi nanti.`
            );
        });
    
    // Fungsi untuk menampilkan data
    function displayData(data) {
        tableBody.innerHTML = '';
        cardsContainer.innerHTML = '';
        dayView.innerHTML = '';

        data.forEach((jadwal, index) => {
            // Validate each jadwal object for required properties
            const properties = ['kode', 'mata_kuliah', 'dosen', 'kelas', 'hari', 'waktu', 'mulai', 'selesai', 'semester', 'ruangan'];
            const isValid = properties.every(prop => jadwal.hasOwnProperty(prop) && jadwal[prop] !== null);
            
            if (!isValid) {
                console.warn('Invalid jadwal data at index', index, jadwal);
                return; // Skip this item
            }
            
            // Tampilan Table - using safer appendChild methods instead of innerHTML
            const tr = document.createElement('tr');
            createSafeCell(tr, jadwal.kode);
            createSafeCell(tr, jadwal.mata_kuliah);
            createSafeCell(tr, jadwal.dosen);
            createSafeCell(tr, jadwal.kelas);
            createSafeCell(tr, jadwal.hari);
            createSafeCell(tr, jadwal.waktu);
            createSafeCell(tr, jadwal.mulai);
            createSafeCell(tr, jadwal.selesai);
            createSafeCell(tr, jadwal.semester);
            createSafeCell(tr, jadwal.ruangan);
            tableBody.appendChild(tr);
            
            // Tampilan Card - safer DOM creation
            const card = document.createElement('div');
            card.classList.add('course-card');
            
            const courseInfo = document.createElement('div');
            courseInfo.classList.add('course-info');
            
            const courseTitle = document.createElement('div');
            courseTitle.classList.add('course-title');
            courseTitle.textContent = jadwal.mata_kuliah;
            courseInfo.appendChild(courseTitle);
            
            const courseCode = document.createElement('div');
            courseCode.classList.add('course-code');
            courseCode.textContent = jadwal.kode;
            courseInfo.appendChild(courseCode);
            
            const courseInstructor = document.createElement('div');
            courseInstructor.classList.add('course-instructor');
            
            const instructorIcon = document.createElement('i');
            instructorIcon.classList.add('fas', 'fa-user-tie');
            courseInstructor.appendChild(instructorIcon);
            
            courseInstructor.appendChild(document.createTextNode(` ${jadwal.dosen}`));
            courseInfo.appendChild(courseInstructor);
            
            const courseLocation = document.createElement('div');
            courseLocation.classList.add('course-location');
            
            const locationIcon = document.createElement('i');
            locationIcon.classList.add('fas', 'fa-door-open');
            courseLocation.appendChild(locationIcon);
            
            courseLocation.appendChild(document.createTextNode(` ${jadwal.ruangan}`));
            courseInfo.appendChild(courseLocation);
            
            const courseDates = document.createElement('div');
            courseDates.classList.add('course-dates');
            
            const dateIcon = document.createElement('i');
            dateIcon.classList.add('fas', 'fa-calendar');
            courseDates.appendChild(dateIcon);
            
            courseDates.appendChild(document.createTextNode(` ${jadwal.hari}, ${jadwal.waktu}`));
            courseInfo.appendChild(courseDates);
            
            card.appendChild(courseInfo);
            
            const courseTime = document.createElement('div');
            courseTime.classList.add('course-time');
            
            const courseSchedule = document.createElement('div');
            courseSchedule.classList.add('course-schedule');
            
            const timeIcon = document.createElement('i');
            timeIcon.classList.add('fas', 'fa-hourglass-start');
            courseSchedule.appendChild(timeIcon);
            
            courseSchedule.appendChild(document.createTextNode(` ${jadwal.mulai} - ${jadwal.selesai}`));
            courseTime.appendChild(courseSchedule);
            
            card.appendChild(courseTime);
            cardsContainer.appendChild(card);
            
            // Tampilan Day View - reuse the card creation code
            const dayCard = card.cloneNode(true);
            dayView.appendChild(dayCard);
        });
    }

    // Filter data berdasarkan hari dan pencarian
    dayFilter.addEventListener('change', function() {
        filterAndDisplayData();
    });

    searchInput.addEventListener('input', function() {
        filterAndDisplayData();
    });
    
    function filterAndDisplayData() {
        const selectedDay = dayFilter.value;
        const searchValue = searchInput.value.toLowerCase().trim();
        
        const filteredData = jadwalData.filter(jadwal => {
            let isValid = true;
            if (selectedDay !== 'all') {
                isValid = jadwal.hari === selectedDay;
            }
            
            if (searchValue && isValid) {
                isValid = jadwal.mata_kuliah.toLowerCase().includes(searchValue) || 
                          jadwal.dosen.toLowerCase().includes(searchValue) ||
                          jadwal.kode.toLowerCase().includes(searchValue);
            }
            
            return isValid;
        });
        
        displayData(filteredData);
    }
});