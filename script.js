// ====================================
// شاشة الترحيب
// ====================================

window.addEventListener("load", () => {

setTimeout(() => {

const splash = document.getElementById("splash");

splash.style.opacity = "0";

setTimeout(() => {
splash.style.display = "none";
}, 1000);

}, 2500);

});

// ====================================
// السنة التلقائية
// ====================================

document.getElementById("year").textContent =
new Date().getFullYear();

// ====================================
// البحث
// ====================================

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

const value = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

const text = card.innerText.toLowerCase();

if (text.includes(value)) {

card.style.display = "block";

} else {

card.style.display = "none";

}

});

});

// ====================================
// زر العودة للأعلى
// ====================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

if (window.scrollY > 300) {

topBtn.style.display = "block";

} else {

topBtn.style.display = "none";

}

});

topBtn.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});

// ====================================
// صوت الأزرار
// ====================================

function playClickSound() {

const audio = new Audio(
"https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8d0d4d8f0.mp3"
);

audio.volume = 0.3;

audio.play();

}

document.querySelectorAll(".download-btn")
.forEach(btn => {

btn.addEventListener("click", () => {

playClickSound();

});

});

// ====================================
// تأثير ظهور البطاقات
// ====================================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.style.opacity = "1";

entry.target.style.transform = "translateY(0)";

}

});

});

cards.forEach(card => {

card.style.opacity = "0";

card.style.transform = "translateY(40px)";
card.style.transition = "0.8s";

observer.observe(card);

});

// ====================================
// عداد التحميلات المحلي
// ====================================

document.querySelectorAll(".download-btn")
.forEach((btn, index) => {

const key = "downloads_" + index;

let count = localStorage.getItem(key);

if (!count) {

localStorage.setItem(key, 0);

count = 0;

}

const counter = document.createElement("div");

counter.style.marginTop = "10px";
counter.style.opacity = ".8";
counter.style.fontSize = ".9rem";

counter.textContent =
"التحميلات: " + count;

btn.parentElement.appendChild(counter);

btn.addEventListener("click", () => {

let current =
parseInt(localStorage.getItem(key));

current++;

localStorage.setItem(key, current);

counter.textContent =
"التحميلات: " + current;

});

});

// ====================================
// معالجة الصور التالفة
// ====================================

document.querySelectorAll("img")
.forEach(img => {

img.onerror = function() {

this.src =
"https://via.placeholder.com/512x512?text=App";

};

});

// ====================================
// رسالة ترحيب
// ====================================

setTimeout(() => {

console.log(
"Welcome To Abood Apps Store 🚀"
);

}, 3000);

// ====================================
// تأثير بسيط للماوس
// ====================================

document.addEventListener("mousemove", e => {

document.documentElement.style.setProperty(
"--mouse-x",
e.clientX + "px"
);

document.documentElement.style.setProperty(
"--mouse-y",
e.clientY + "px"
);

});
