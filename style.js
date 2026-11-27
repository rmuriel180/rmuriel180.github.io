// ---------- Mobile menu ----------
const menu = document.querySelector('#menu');
const navList = document.querySelector('nav ul');

if (menu && navList) {
    menu.addEventListener('click', () => {
        navList.classList.toggle('active');
        menu.classList.toggle('bx-x');
        menu.classList.toggle('bx-menu-alt-right');
    });

    // Close the menu after tapping a link
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menu.classList.remove('bx-x');
            menu.classList.add('bx-menu-alt-right');
        });
    });
}

// ---------- Light / dark mode ----------
const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');

function setThemeIcon() {
    if (!themeToggle) return;
    const isDark = root.getAttribute('data-theme') !== 'light';
    // Show a sun in dark mode (click for light) and a moon in light mode (click for dark)
    themeToggle.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
}

if (themeToggle) {
    setThemeIcon();
    themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        setThemeIcon();
    });
}

// ---------- Project pop-up ----------
// Clicking a project tile copies that project's <template> into the pop-up and opens it.
const modal = document.querySelector('#project-modal');

if (modal) {
    const modalContent = modal.querySelector('.modal-scroll');

    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const template = document.getElementById(tile.dataset.target);
            if (!template) return;
            modalContent.replaceChildren(template.content.cloneNode(true));
            modal.showModal();
            modalContent.scrollTop = 0;   // always start at the top of the pop-up
            document.body.classList.add('modal-open');
        });
    });

    // Close with the X button
    modal.querySelector('.modal-close').addEventListener('click', () => modal.close());

    // Close by clicking the dark area outside the pop-up
    modal.addEventListener('click', event => {
        if (event.target === modal) modal.close();
    });

    // Runs however it closes (X, outside click, or Esc key)
    modal.addEventListener('close', () => {
        document.body.classList.remove('modal-open');
    });
}
