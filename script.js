// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Helper to hide loader
window.addEventListener("load", () => {
    // Wait for signature animation (approx 2.5s)
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        if(loader) {
            loader.classList.add("hidden");
            // Allow GSAP hero animations to start AFTER loader is gone
            // We can restart the timeline here if needed, or just let it play
            // If TL was playing behind, we might missed it. 
            // Better to pause TL initially? Let's restart it for impact.
            tl.restart();
        }
    }, 2500);
});

// 1. Initial Entry Animations
const tl = gsap.timeline({ paused: true }); // Pause initially

// Navbar elements
tl.fromTo(".dark-btn", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
  .from(".nav-links a", { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.6");

// Hero elements (Left Column)
tl.from(".hero-text h1", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
  .from(".role-text", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
  .from(".bio-text", { 
    y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
  .from(".social-text", { opacity: 0, duration: 0.6 }, "-=0.4")
  .fromTo(".resume-btn", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4")
  .from(".tech-badge", { y: 20, opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }, "-=0.2");

// Hero Image (Right Column)
tl.from(".hero-img-container", { x: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");

// 2. Navbar Scroll Effect (Glassmorphism & Shrink)
ScrollTrigger.create({
    trigger: "body",
    start: "top -50",
    end: 99999,
    toggleClass: { className: "scrolled", targets: ".navbar" }
});

// 3. Section Reveal Animation (Replaces old 'reveal' logic)
gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // Trigger when top of section hits 85% of viewport height
                toggleActions: "play none none reverse" 
            }
        }
    );
});


// --- Existing Logic ---

function sayHi() {
    alert("Thank you for visiting my portfolio 💖");
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields 🙏");
        return false;
    }

    alert("Message sent successfully 💖");
    return false; // prevents page reload
}

function toggleDark() {
    document.body.classList.toggle("dark-mode");
}

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

function closeMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.remove("active");
}

// Typing Effect
const roles = ["Java Developer", "Web Developer", "Frontend Enthusiast", "Tech Learner"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 60;
const delayBetweenRoles = 1500;

function typingEffect() {
    const typingElement = document.getElementById("typing");
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex <= currentRole.length) {
        typingElement.textContent = currentRole.substring(0, charIndex);
        charIndex++;
        setTimeout(typingEffect, typingSpeed);
    } 
    else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentRole.substring(0, charIndex);
        charIndex--;
        setTimeout(typingEffect, erasingSpeed);
    } 
    else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typingEffect, delayBetweenRoles);
    }
}
typingEffect();

// Certificate Modal
function openCert(image) {
    document.getElementById("certModal").style.display = "flex";
    document.getElementById("certImg").src = image;
}

function closeCert() {
    document.getElementById("certModal").style.display = "none";
}

// Scroll Progress Bar
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / height) * 100;
    document.getElementById("progress").style.width = progress + "%";
};

// Custom Cursor
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".cursor");
    // Ensure cursor exists before trying to style it
    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

// Top Button Visibility
window.addEventListener("scroll", () => {
    const topBtn = document.getElementById("topBtn");
    if(topBtn) {
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Active Link Highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    // Adjust offset for the fixed navbar
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

