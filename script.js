// Navbarni mobil qurilmalarda ochish/yopish
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function searchTeacher() {
    const teacherName = document.getElementById("teacher-name").value;
    if (teacherName) {
        alert(`Siz qidirgan o'qituvchi: ${teacherName}`);
    } else {
        alert("Iltimos, o'qituvchi ismini kiriting!");
    }
}

// Google xaritasi funksiyasi
function initMap() {
    var map = new google.maps.Map(document.getElementById('google-map'), {
        center: { lat: 41.3174, lng: 69.2425 }, // Namangan koordinatalari
        zoom: 16
    });

    var marker = new google.maps.Marker({
        position: { lat: 41.3174, lng: 69.2425 },
        map: map,
        title: "Namangan shahar, 18-umumiy ta'lim maktabi"
    });
}

// Forma yuborish funksiyasi
// Telegram Bot API ma'lumotlari
const BOT_TOKEN = '7501294862:AAGIxhN8xUX6iSIfSehldi6BWYS6pHa0Ixg'; // Bu yerga bot tokeningizni kiriting
const CHAT_ID = '6206221012'; // Bu yerga chat ID yoki kanal ID'sini kiriting

// Forma yuborish funksiyasi
document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;

    // Foydalanuvchi kiritgan ma'lumotlar
    const message = `
    🆕 *Yangi obuna:*\n
    👤 Ismi: ${name}\n
    👨‍👩‍👦 Familiyasi: ${surname}\n
    📞 Telefon raqami: ${phone}
    `;

    // Botga yuborish uchun API so'rovi
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Obuna muvaffaqiyatli qabul qilindi! Bot orqali tasdiq xabar yuborildi.");
            } else {
                alert("Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
            }
        })
        .catch(error => {
            console.error("Xatolik:", error);
            alert("Xatolik yuz berdi. Iltimos, internetni tekshiring.");
        });
});

function searchTeacher() {
    const searchName = document.getElementById("search-teacher-name").value;

    // LocalStorage'dan o'qituvchini olish
    const storedName = localStorage.getItem("teacherName");
    const storedSurname = localStorage.getItem("teacherSurname");

    if (searchName === storedName) {
        // Agar o'qituvchi topilsa, u holda ma'lumotlarni ko'rsatish
        localStorage.setItem("searchName", storedName);
        localStorage.setItem("searchSurname", storedSurname);

        // O'qituvchi haqida sahifaga o'tish
        window.location.href = "teacher-details.html";
    } else {
        alert("O'qituvchi topilmadi!");
    }
}