// ===============================
// شاشة الترحيب
// ===============================

window.addEventListener("load", () => {

setTimeout(() => {

const splash = document.getElementById("splash");

if(splash){

splash.style.transition = "1s";

splash.style.opacity = "0";

setTimeout(() => {

splash.remove();

},1000);

}

},2500);

});

// ===============================
// السنة التلقائية
// ===============================

const year = document.getElementById("year");

if(year){

year.textContent = new Date().getFullYear();

}

// ===============================
// شريط التقدم
// ===============================

window.addEventListener("scroll", () => {

const winScroll =
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

const progress =
document.getElementById("scrollProgress");

if(progress){

progress.style.width =
scrolled + "%";

}

});

// ===============================
// زر العودة للأعلى
// ===============================

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", () => {

if(!topBtn) return;

if(window.scrollY > 300){

topBtn.style.display = "block";

}else{

topBtn.style.display = "none";

}

});

if(topBtn){

topBtn.addEventListener("click", () => {

window.scrollTo({

top:0,
behavior:"smooth"

});

});

}

// ===============================
// البحث
// ===============================

const search =
document.getElementById("search");

if(search){

search.addEventListener("input", () => {

const value =
search.value.toLowerCase();

document
.querySelectorAll(".app-card")
.forEach(card => {

const text =
card.innerText.toLowerCase();

card.style.display =
text.includes(value)
? "block"
: "none";

});

});

}

// ===============================
// ظهور العناصر عند النزول
// ===============================

const observer =
new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform =
"translateY(0px)";

}

});

},{
threshold:0.15
});

document
.querySelectorAll(
".app-card,.feature-box,.stat-box,.update-box,.developer-card,.featured-card"
)
.forEach(item => {

item.style.opacity = "0";

item.style.transform =
"translateY(40px)";

item.style.transition =
".8s ease";

observer.observe(item);

});

// ===============================
// تأثير الضغط على الأزرار
// ===============================

document
.querySelectorAll(
".download-btn,.btn-primary,.btn-secondary"
)
.forEach(btn => {

btn.addEventListener("mousedown", () => {

btn.style.transform =
"scale(.96)";

});

btn.addEventListener("mouseup", () => {

btn.style.transform = "";

});

});

// ===============================
// أصوات الأزرار
// ===============================

function playClick(){

const audio =
document.getElementById("clickSound");

if(audio){

audio.currentTime = 0;

audio.play().catch(()=>{});

}

}

document
.querySelectorAll(
".download-btn,.btn-primary,.btn-secondary"
)
.forEach(btn => {

btn.addEventListener(
"click",
playClick
);

});

// ===============================
// عداد التحميلات المحلي
// ===============================

document
.querySelectorAll(".download-btn")
.forEach((btn,index) => {

const key =
"app_downloads_" + index;

let count =
localStorage.getItem(key) || 0;

const counter =
document.createElement("div");

counter.className =
"download-counter";

counter.innerHTML =
"⬇ التحميلات: " + count;

counter.style.marginTop =
"12px";

counter.style.opacity =
".8";

btn.parentElement
.appendChild(counter);

btn.addEventListener(
"click",
() => {

count++;

localStorage.setItem(
key,
count
);

counter.innerHTML =
"⬇ التحميلات: " + count;

}
);

});

// ===============================
// إصلاح الصور التالفة
// ===============================

document
.querySelectorAll("img")
.forEach(img => {

img.onerror = function(){

this.src =
"https://via.placeholder.com/512x512?text=App";

};

});

// ===============================
// عداد الزوار المحلي
// ===============================

let visits =
localStorage.getItem(
"abood_visits"
) || 0;

visits++;

localStorage.setItem(
"abood_visits",
visits
);

console.log(
"Visitors:",
visits
);

// ===============================
// رسالة ترحيب
// ===============================

console.log(
"🚀 Welcome To Abood Apps Store"
);

// ===============================
// تأثير بسيط للماوس
// ===============================

document.addEventListener(
"mousemove",
e => {

document.documentElement
.style.setProperty(
"--mouse-x",
e.clientX + "px"
);

document.documentElement
.style.setProperty(
"--mouse-y",
e.clientY + "px"
);

}
);

// ===============================
// جاهزية كاملة
// ===============================

console.log(
"✅ Website Loaded Successfully"
);
