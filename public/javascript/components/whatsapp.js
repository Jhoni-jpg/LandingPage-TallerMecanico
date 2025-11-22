const button = document.getElementById('whatsappButton');
const menu = document.getElementById('whatsappMenu');
const overlay = document.getElementById('menuOverlay');

// Alternar menú
button.addEventListener('click', function () {
    const isActive = menu.classList.contains('active');

    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Cerrar menú al hacer clic en el overlay
overlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en una opción
document.querySelectorAll('.menu-option').forEach(option => {
    option.addEventListener('click', function () {
        setTimeout(closeMenu, 300);
    });
});

function openMenu() {
    menu.classList.add('active');
    button.classList.add('active');
    overlay.classList.add('active');
}

function closeMenu() {
    menu.classList.remove('active');
    button.classList.remove('active');
    overlay.classList.remove('active');
}

// Cerrar menú con tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});