// ===== Custom Cursor =====
let firstCursor = document.querySelector(".first-cursor");
let secondCursor = document.querySelector(".second-cursor");

function cursor_move(self) {
    firstCursor.style.top = self.pageY + "px";
    secondCursor.style.top = self.pageY + "px";
    firstCursor.style.left = self.pageX + "px";
    secondCursor.style.left = self.pageX + "px";
}

document.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("mouseenter", function() {
        firstCursor.classList.add("active");
        secondCursor.classList.add("active");
    });

    link.addEventListener("mouseleave", function() {
        firstCursor.classList.remove("active");
        secondCursor.classList.remove("active");
    });
});

// ===== Dark Mode =====
let tmSwitch = document.getElementById("tm-switch");
let userTheme = localStorage.getItem("theme");
let sysTheme = matchMedia("(prefers-color-scheme: dark)").matches;

// Theme Check
function theme_check() {
    if (userTheme === "dark" || (!userTheme && sysTheme)) {
        document.documentElement.classList.add("dark");
        tmSwitch.classList.replace("bx-moon", "bx-sun");
    } else {
        tmSwitch.classList.replace("bx-sun", "bx-moon");
    }
}

// Theme Switch
tmSwitch.addEventListener("click", function() {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        tmSwitch.classList.replace("bx-sun", "bx-moon");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        tmSwitch.classList.replace("bx-moon", "bx-sun");
        localStorage.setItem("theme", "dark");
    }
});

// ===== Header / Toggle =====
let header = document.querySelector("header");

function header_toggle() {
    header.classList.toggle("toggle");

    let headerTI = document.querySelector(".header-toggler-icon");

    if (header.classList.contains("toggle")) headerTI.classList.replace("bx-menu", "bx-menu-alt-right");
    else headerTI.classList.replace("bx-menu-alt-right", "bx-menu");
}

// ===== Header / Navlink Active =====
let section = document.querySelectorAll("section");

function navlink_active() {
    let sY = scrollY;

    section.forEach(function(item) {
        let sectionTop = item.offsetTop - 250;
        let sectionBottom = sectionTop + item.offsetHeight;
        let sectionId = item.getAttribute("id");

        if (sY > sectionTop && sY <= sectionBottom) document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.add("active");
        else document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.remove("active");
    });
}

// ===== Header / Fixed =====
let link = document.querySelectorAll("a[href*='#']:not([href='#'])");

link.forEach(function(item) {
    item.addEventListener("click", function(event) {
        if (innerWidth <= 768 && item.classList.contains("nav-link")) header_toggle();

        let href = item.getAttribute("href");
        let targetPos = document.querySelector(href).offsetTop;

        scroll({
            behavior: "smooth",
            top: targetPos
        });

        event.preventDefault();
    });
});

// ===== Initial Load =====
theme_check();
navlink_active();

// ===== Window Event =====
onscroll = function() {
    navlink_active();
}

onmousemove = function(e) {
    cursor_move(e);
}