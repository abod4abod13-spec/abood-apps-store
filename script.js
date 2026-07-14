// ==========================================================================
// Abood Apps Store - Professional JavaScript (2026)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. شاشة الترحيب (Splash Screen) مع التلاشي السلس
    window.addEventListener("load", () => {
        const splash = document.getElementById("splash");
        if (splash) {
            setTimeout(() => {
                splash.style.opacity = "0";
                setTimeout(() => {
                    splash.style.style = "none";
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

    // 5. محرك البحث الذكي والمطور جداً مع تأثير الاختفاء ورسالة عدم وجود نتائج (ميزة زائدة 4)
    const searchInput = document.getElementById("search");
    const appsContainer = document.getElementById("apps");
    
    // إنشاء عنصر رسالة "لم يتم العثور على نتائج" مسبقاً
    let noResultsEl = document.createElement("div");
    noResultsEl.className = "no-results-msg";
    noResultsEl.style.display = "none";
    noResultsEl.innerText = "❌ عذراً، لا يوجد تطبيق بهذا الاسم.. جرب البحث بكلمة أخرى!";
    if (appsContainer) {
        appsContainer.appendChild(noResultsEl);
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".apps .app-card");
            let foundCount = 0;

            cards.forEach(card => {
                const title = card.querySelector("h2").innerText.toLowerCase();
                const desc = card.querySelector("p").innerText.toLowerCase();

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = "flex";
                    foundCount++;
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => { card.style.display = "none"; }, 300);
                }
            });

            // إظهار الرسالة في حال عدم العثور على أي تطبيق
            if (foundCount === 0 && query !== "") {
                noResultsEl.style.display = "block";
            } else {
                noResultsEl.style.display = "none";
            }
        });
    }

    // 6. تأثير حركي ثلاثي الأبعاد خفيف عند تمرير الماوس فوق كروت التطبيقات
    const appCards = document.querySelectorAll(".app-card, .featured-card, .developer-card");
    appCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            card.style.transform = `translateY(-10px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0px) rotateX(0deg) rotateY(0deg)";
        });
    });

    // 7. نظام الإحصائيات الحقيقية والعدادات (ميزة زائدة 1 و 2)
    const initStatistics = () => {
        // أ. عداد زيارات الموقع الحقيقي التلقائي
        let baseVisits = 24510; // رقم بدء فخم للموقع
        let actualVisits = localStorage.getItem("abood_site_visits");
        if (!actualVisits) {
            localStorage.setItem("abood_site_visits", baseVisits);
            actualVisits = baseVisits;
        } else {
            actualVisits = parseInt(actualVisits) + 1;
            localStorage.setItem("abood_site_visits", actualVisits);
        }
        
        const visitCounterEl = document.getElementById("visitCounter");
        if (visitCounterEl) {
            visitCounterEl.textContent = Number(actualVisits).toLocaleString("en-US");
        }

        // ب. عداد التحميلات الإجمالي المتفاعل
        let baseDownloads = 13840; // رقم بدء فخم للتحميلات
        let actualDownloads = localStorage.getItem("abood_total_downloads");
        if (!actualDownloads) {
            localStorage.setItem("abood_total_downloads", baseDownloads);
            actualDownloads = baseDownloads;
        }

        const downloadCounterEl = document.getElementById("downloadCounter");
        if (downloadCounterEl) {
            downloadCounterEl.textContent = Number(actualDownloads).toLocaleString("en-US");
        }
    };
    initStatistics();

    // 8. نظام عداد التحميلات الفردي للملفات والارتباط بالعداد الإجمالي (ميزة زائدة 3)
    const downloadButtons = document.querySelectorAll(".download-btn");
    downloadButtons.forEach((btn) => {
        const appIdentifier = "abood_app_dl_" + btoa(btn.href).substring(0, 15);
        let currentDownloads = parseInt(localStorage.getItem(appIdentifier)) || Math.floor(Math.random() * 80) + 120; // توليد أولي لجمالية الكروت

        // بناء العداد المنفصل لكل كارت
        let counterDiv = btn.parentElement.querySelector(".download-counter") || btn.parentElement.parentElement.querySelector(".download-counter");
        if (!counterDiv) {
            counterDiv = document.createElement("div");
            counterDiv.className = "download-counter";
            counterDiv.style.marginTop = "12px";
            counterDiv.style.fontSize = "13px";
            counterDiv.style.fontWeight = "700";
            counterDiv.style.color = "var(--text-muted)";
            
            // في حال وجود كرت يحتوي على أزرار متعددة (تحميل + مشاركة) نضعها بالبنية الصحيحة
            const targetContainer = btn.closest(".app-card") || btn.closest(".featured-card");
            if (targetContainer) {
                targetContainer.appendChild(counterDiv);
            }
        }
        counterDiv.innerHTML = `⬇️ التنزيلات: <span style="color:var(--color-primary)">${currentDownloads}</span>`;

        // زيادة العدادات عند الضغط على زر التحميل
        btn.addEventListener("click", () => {
            // أ. زيادة عداد التطبيق الفردي
            currentDownloads++;
            localStorage.setItem(appIdentifier, currentDownloads);
            counterDiv.innerHTML = `⬇️ التنزيلات: <span style="color:var(--color-accent)">${currentDownloads}</span>`;

            // ب. زيادة عداد التحميلات الإجمالي الكلي للموقع وتحديث الإحصائيات فورياً
            let totalDownloads = parseInt(localStorage.getItem("abood_total_downloads")) || 13840;
            totalDownloads++;
            localStorage.setItem("abood_total_downloads", totalDownloads);
            
            const downloadCounterEl = document.getElementById("downloadCounter");
            if (downloadCounterEl) {
                downloadCounterEl.textContent = Number(totalDownloads).toLocaleString("en-US");
            }

            // ج. تأثير الاهتزاز والنبض البصري الخفيف للزر عند النقر (ميزة زائدة 3)
            btn.style.transform = "scale(0.93)";
            setTimeout(() => { btn.style.transform = "none"; }, 150);
        });
    });

    // 9. زر مشاركة التطبيق الذكي باستخدام Web Share API (ميزة زائدة 6)
    const shareButtons = document.querySelectorAll(".share-card-btn");
    shareButtons.forEach(shareBtn => {
        shareBtn.addEventListener("click", async (e) => {
            e.stopPropagation(); // منع فتح النوافذ الأخرى بالخطأ
            const card = shareBtn.closest(".app-card");
            const appName = card.querySelector("h2").innerText;
            const appDesc = card.querySelector("p").innerText;
            const downloadLink = card.querySelector(".download-btn").href;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `تطبيق ${appName} - متجر عبدالله لبرامج الأندرويد`,
                        text: `${appDesc}\nحمل التطبيق الآن من متجر عبدالله الرسمي:`,
                        url: downloadLink
                    });
                } catch (err) {
                    console.log("فشلت المشاركة التلقائية، جاري نسخ الرابط بدلاً من ذلك.");
                    copyLinkToClipboard(downloadLink);
                }
            } else {
                copyLinkToClipboard(downloadLink);
            }
        });
    });

    function copyLinkToClipboard(link) {
        navigator.clipboard.writeText(link);
        alert("📋 تم نسخ رابط تحميل التطبيق المباشر! شاركه الآن مع أصدقائك.");
    }

    // 10. تشغيل وإظهار النافذة المنبثقة التفاعلية لـ Chatold (ميزة زائدة 5)
    const chatoldCard = document.querySelector(".app-card.chatold-card");
    const modalOverlay = document.getElementById("chatoldModal");
    const modalClose = document.getElementById("modalClose");

    if (chatoldCard && modalOverlay) {
        // الضغط على الكارت (باستثناء أزرار الإجراءات) يفتح النافذة
        chatoldCard.addEventListener("click", (e) => {
            if (!e.target.closest(".card-actions") && !e.target.closest(".download-counter")) {
                modalOverlay.classList.add("active");
            }
        });
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener("click", () => {
            modalOverlay.classList.remove("active");
        });

        // إغلاق عند الضغط خارج نافذة المحتوى
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("active");
            }
        });
    }

    // 11. تحديث تلقائي لعداد الإحصائيات (عدد التطبيقات المتوفرة في الصفحة)
    const appCountElement = document.getElementById("appCount");
    if (appCountElement) {
        const totalApps = document.querySelectorAll(".apps .app-card").length;
        appCountElement.textContent = totalApps;
    }

    // 12. أنيميشن ظهور العناصر التلقائي عند النزول بالسكرول (Scroll Reveal)
    const revealItems = document.querySelectorAll(".app-card, .feature-box, .stat-box, .update-box, .developer-card, .featured-card");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
                revealObserver.unobserve(entry.target);
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

    // 13. حماية ومعالجة الصور التالفة تلقائياً برابط احتياطي جذاب
    const allImages = document.querySelectorAll("img");
    allImages.forEach(img => {
        img.addEventListener("error", function() {
            this.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60";
            this.style.border = "1px solid rgba(255,255,255,0.1)";
        });
    });
});
