// public/javascript/components/home/loader.js
(() => {
    const loaderEl = document.getElementById('global-page-loader');
    if (!loaderEl) return;

    let showTimeout = null;

    const show = (message = 'Cargando...') => {
        clearTimeout(showTimeout);
        // show only after short delay to avoid flicker
        showTimeout = setTimeout(() => {
            const msgEl = loaderEl.querySelector('.loader-message');
            if (msgEl) msgEl.textContent = message;
            loaderEl.classList.remove('hidden');
            loaderEl.classList.add('flex');
            // ensure focus trap not required here; just prevent pointer events under the overlay
            document.documentElement.style.pointerEvents = 'none';
            loaderEl.style.pointerEvents = 'auto';
        }, 120);
    };

    const hide = () => {
        clearTimeout(showTimeout);
        loaderEl.classList.remove('flex');
        loaderEl.classList.add('hidden');
        document.documentElement.style.pointerEvents = '';
        loaderEl.style.pointerEvents = '';
    };

    // On page show (back/forward or reload), hide loader
    window.addEventListener('pageshow', () => {
        hide();
    });

    window.addEventListener('DOMContentLoaded', () => {
        hide();
    });

    // Intercept clicks on internal links
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href) return;

        // respect user intent: modifiers, external links, anchors, mailto/tel, targets other than _self
        const isExternal = href.startsWith('http') || href.startsWith('//');
        const isAnchor = href.startsWith('#');
        const isMailTel = href.startsWith('mailto:') || href.startsWith('tel:');
        const hasModifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
        const hasTarget = a.target && a.target !== '_self';

        if (isExternal || isAnchor || isMailTel || hasModifier || hasTarget) return;

        // internal link -> show loader and allow navigation
        // if you want to delay navigation so loader appears, uncomment preventDefault & manual navigate
        // e.preventDefault();
        show('Cargando página...');
        // leave normal navigation to browser (it will follow the link)
    });

    // Optional: hide loader on error (network failure) after short timeout
    window.addEventListener('error', () => {
        setTimeout(hide, 300);
    });
    window.addEventListener('unhandledrejection', () => {
        setTimeout(hide, 300);
    });
})();
