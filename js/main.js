document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");

  /* ==========================
     ヘッダー縮小
  ========================== */
	const handleHeaderScroll = () => {
	  if (window.scrollY > 20) {
		header?.classList.add("scrolled");
	  } else {
		header?.classList.remove("scrolled");
	  }
	};

	window.addEventListener("scroll", handleHeaderScroll);
	handleHeaderScroll();




  /* ==========================
     ハンバーガー開閉
  ========================== */
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }


  /* ==========================
     スムーススクロール
  ========================== */
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {

      const targetId = this.getAttribute("href");

      // ページ内リンクのみ対象
      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          // モバイル時はメニュー閉じる
          hamburger?.classList.remove("active");
          nav?.classList.remove("active");
          document.body.classList.remove("no-scroll");
        }
      }
    });
  });


  /* ==========================
     スクロールスパイ
  ========================== */
  if ("IntersectionObserver" in window) {

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (href === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });

        }

      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

});

  /* ==========================
     header logo
  ========================== */
const body = document.body;

if (body.classList.contains("home")) {

  const heroSection = document.querySelector("#top");
  const header = document.querySelector(".header");

  if ("IntersectionObserver" in window && heroSection && header) {

    const heroObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          header.classList.remove("visible");
        } else {
          header.classList.add("visible");
        }

      });
    }, {
      threshold: 0.3
    });

    heroObserver.observe(heroSection);
  }

}
  /* ==========================
     LightBox
  ========================== */

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.work-detail img');
  const lightbox = document.getElementById('lightbox-overlay');
  const lightboxImg = lightbox.querySelector('img');

  images.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
});