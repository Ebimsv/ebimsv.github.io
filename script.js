(function () {
    var header = document.querySelector(".site-header");
    var hero = document.querySelector(".hero");
    var button = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    var links = nav.querySelectorAll("a");

    if (button && nav) {
        button.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            button.setAttribute("aria-expanded", open ? "true" : "false");
        });

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                button.setAttribute("aria-expanded", "false");
            });
        });
    }

    if ("IntersectionObserver" in window && hero && header) {
        var heroWatch = new IntersectionObserver(function (entries) {
            header.classList.toggle("is-solid", !entries[0].isIntersecting);
        }, { threshold: 0.12 });
        heroWatch.observe(hero);
    } else if (header) {
        header.classList.add("is-solid");
    }

    if ("IntersectionObserver" in window) {
        var sections = [];
        links.forEach(function (link) {
            var id = link.getAttribute("href");
            if (id && id.charAt(0) === "#") {
                var section = document.querySelector(id);
                if (section) sections.push(section);
            }
        });

        var sectionWatch = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (link) {
                    link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

        sections.forEach(function (section) {
            sectionWatch.observe(section);
        });
    }
})();
