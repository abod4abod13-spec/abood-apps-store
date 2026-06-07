/* ==========================================================================
   Abood Apps Store - Professional JavaScript (2026)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. شاشة الترحيب (Splash Screen) مع التلاشي السلس
    window.addEventListener("load", () => {
        const splash = document.getElementById("splash");
        if (splash) {
            setTimeout(() => {
                splash.style.opacity = "0";
                // الانتظار حتى ينتهي أنيميشن التلاشي ثم الحذف نهائياً
                setTimeout(() => {
                    splash.style.display = "none";
                    splash.remove();
                }, 800); 
            }, 2000); // تعرض شاشة التحميل لمدة ثانيتين
        }
    });

    // 2. تحديث السنة تلقائياً في الفوتر
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. شريط التقدم العلوي عند التمرير (Scroll Progress)
    window.addEventListener("scroll", () => {
        const progress = document.getElementById("scrollProgress");
        if (progress) {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) {
                const scrolled = (winScroll / height) * 100;
                progress.style.width = scrolled + "%";
            }
        }
    });

    // 4. زر العودة للأعلى الذكي (Back To Top)
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        if (topBtn) {
            if (window.scrollY > 400) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 5. نظام البحث المطور والفوري مع تأثير اختفاء سلس (تصفية الكروت)
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".app-card");

            cards.forEach(card => {
                const title = card.querySelector("h2").innerText.toLowerCase();
                const desc = card.querySelector("p").innerText.toLowerCase();

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = "flex";
                    // إعادة تأثير الظهور السلس
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    // إخفاء العنصر تماماً بعد انتهاء تأثير الأنميشن
                    setTimeout(() => { card.style.display = "none"; }, 300);
                }
            });
        });
    }

    // 6. تأثير حركي ثلاثي الأبعاد خفيف عند تمرير الماوس فوق كروت التطبيقات
    const appCards = document.querySelectorAll(".app-card, .featured-card, .developer-card");
    appCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // تحريك الكرت بزاواية طفيفة جداً تعطي شعوراً بالتفاعل (3D Effect)
            card.style.transform = `translateY(-10px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            // إعادة الكرت لوضعه الطبيعي عند خروج الماوس
            card.style.transform = "translateY(0px) rotateX(0deg) rotateY(0deg)";
        });
    });

    // 7. نظام عداد التحميلات الذكي والمحلي (تخزين سحابي محلي لكل تطبيق)
    const downloadButtons = document.querySelectorAll(".download-btn");
    downloadButtons.forEach((btn, index) => {
        // نستخدم رابط التحميل كمعرّف فريد لكل تطبيق لكي لا تتداخل العدادات
        const appIdentifier = "abood_app_dl_" + btoa(btn.href).substring(0, 15);
        let currentDownloads = parseInt(localStorage.getItem(appIdentifier)) || Math.floor(Math.random() * 40) + 10; // رقم وهمي مبدئي ليعطي فخامة للموقع

        // إنشاء وعرض العداد أسفل الزر إذا لم يكن موجوداً
        let counterDiv = btn.parentElement.querySelector(".download-counter");
        if (!counterDiv) {
            counterDiv = document.createElement("div");
            counterDiv.className = "download-counter";
            counterDiv.style.marginTop = "12px";
            counterDiv.style.fontSize = "13px";
            counterDiv.style.fontWeight = "700";
            counterDiv.style.color = "var(--text-muted)";
            btn.parentElement.appendChild(counterDiv);
        }
        counterDiv.innerHTML = `⬇️ التحميلات: <span style="color:var(--color-primary)">${currentDownloads}</span>`;

        // زيادة العداد عند الضغط على زر التحميل
        btn.addEventListener("click", () => {
            currentDownloads++;
            localStorage.setItem(appIdentifier, currentDownloads);
            counterDiv.innerHTML = `⬇️ التحميلات: <span style="color:var(--color-accent)">${currentDownloads}</span>`;
            
            // تأثير نبض سريع للزر عند الضغط عليه
            btn.style.transform = "scale(0.95)";
            setTimeout(() => { btn.style.transform = "none"; }, 150);
        });
    });

    // 8. تحديث تلقائي لعداد الإحصائيات (عدد التطبيقات المتوفرة في الصفحة)
    const appCountElement = document.getElementById("appCount");
    if (appCountElement) {
        const totalApps = document.querySelectorAll(".apps .app-card").length;
        appCountElement.textContent = totalApps;
    }

    // 9. أنيميشن ظهور العناصر التلقائي عند النزول بالسكرول (Scroll Reveal)
    const revealItems = document.querySelectorAll(".app-card, .feature-box, .stat-box, .update-box, .developer-card, .featured-card");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
                revealObserver.unobserve(entry.target); // تشغيل الأنميشن مرة واحدة فقط
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        revealObserver.observe(item);
    });

    // 10. حماية ومعالجة الصور التالفة تلقائياً برابط احتياطي جذاب
    const allImages = document.querySelectorAll("img");
    allImages.forEach(img => {
        img.addEventListener("error", function() {
            this.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"; // خلفية تجريدية فخمة بديلة
            this.style.border = "1px solid rgba(255,255,255,0.1)";
        });
    });

    // 11. نظام عداد الزيارات الذكي للموقع (عرض في الكونسول للفحص)
    let totalVisits = parseInt(localStorage.getItem("abood_store_visits")) || 0;
    totalVisits++;
    localStorage.setItem("abood_store_visits", totalVisits);
    
    console.log("%c🚀 Abood Apps Store Console", "color: #3b82f6; font-size: 20px; font-weight: bold;");
    console.log(`%c📊 إجمالي زياراتك لهذا المتجر: ${totalVisits} مرة`, "color: #10b981; font-size: 14px; font-weight: bold;");
});

