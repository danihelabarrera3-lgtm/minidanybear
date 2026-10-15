
/* ==========================================
   MINI BEAR 🧸🌈
   JavaScript: mundos mágicos e interactividad
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. ELEMENTOS PRINCIPALES
    const body = document.body;
    const themeButtons = document.querySelectorAll(".theme-btn");
    const magicScene = document.getElementById("magicScene");
    const sceneEmoji = document.getElementById("sceneEmoji");
    const sceneTitle = document.getElementById("sceneTitle");
    const sceneDescription = document.getElementById("sceneDescription");
    const sceneDecoration = document.getElementById("sceneDecoration");
    const magicEffects = document.getElementById("magicEffects");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    // 2. INFORMACIÓN DE LOS SEIS MUNDOS
    const themes = {
        rainbow: {
            className: "theme-rainbow",
            emoji: "🌈🧸✨",
            title: "¡Un mundo lleno de colores!",
            description:
                "Bienvenido a Mini Bear, donde cada pequeño detalle está lleno de amor, ternura y magia.",
            decorations: ["🌈", "⭐", "🦋", "☁️", "💖"],
            particles: ["✨", "💖", "⭐", "🌸", "🌈"],
            particleType: "sparkle"
        },

        dark: {
            className: "theme-dark",
            emoji: "🌙⭐🧸",
            title: "Una noche mágica",
            description:
                "Las estrellas brillan y los sueños de los más pequeños iluminan el cielo.",
            decorations: ["🌙", "⭐", "✨", "🌌", "💫"],
            particles: ["✨", "⭐", "💫", "🎆", "🌟"],
            particleType: "firework"
        },

        rain: {
            className: "theme-rain",
            emoji: "🌧️☂️🧸",
            title: "Un día de lluvia",
            description:
                "¡Que cada gotita sea una aventura! Descubre prendas suaves y cómodas para los días fresquitos.",
            decorations: ["☁️", "🌧️", "☂️", "💧", "🌈"],
            particles: ["💧", "💦", "💧", "🌧️"],
            particleType: "rain"
        },

        snow: {
            className: "theme-snow",
            emoji: "⛄❄️🧸",
            title: "El reino de la nieve",
            description:
                "Copos mágicos, muñecos de nieve y prendas acogedoras para disfrutar del frío.",
            decorations: ["❄️", "⛄", "☃️", "❄️", "🌨️"],
            particles: ["❄️", "❅", "❆", "❄️", "✨"],
            particleType: "snow"
        },

        autumn: {
            className: "theme-autumn",
            emoji: "🍂🧸🍁",
            title: "La magia del otoño",
            description:
                "Hojitas de colores bailan en el aire mientras exploramos un mundo cálido y adorable.",
            decorations: ["🍁", "🍂", "🌰", "🍃", "🧡"],
            particles: ["🍂", "🍁", "🍃", "🍂"],
            particleType: "leaves"
        },

        spring: {
            className: "theme-spring",
            emoji: "🌷🦋🐻",
            title: "¡Llegó la primavera!",
            description:
                "Flores, mariposas y pajaritos llenan Mini Bear de alegría, color y dulzura.",
            decorations: ["🌷", "🌼", "🦋", "🐦", "🌸"],
            particles: ["🌸", "🌼", "🦋", "🌷", "🐦"],
            particleType: "flowers"
        }
    };

    // 3. CAMBIAR DE MUNDO
    function changeTheme(themeName) {
        const theme = themes[themeName];

        if (!theme) return;

        // Quitar los temas anteriores.
        Object.values(themes).forEach(item => {
            body.classList.remove(item.className);
        });

        // Activar el tema elegido.
        body.classList.add(theme.className);

        // Actualizar los botones.
        themeButtons.forEach(button => {
            const isActive = button.dataset.theme === themeName;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        // Actualizar el contenido de la escena.
        if (sceneEmoji) {
            sceneEmoji.textContent = theme.emoji;
        }

        if (sceneTitle) {
            sceneTitle.textContent = theme.title;
        }

        if (sceneDescription) {
            sceneDescription.textContent = theme.description;
        }

        // Decoraciones flotantes.
        if (sceneDecoration) {
            sceneDecoration.replaceChildren();

            theme.decorations.forEach((emoji, index) => {
                const decoration = document.createElement("span");
                decoration.textContent = emoji;
                decoration.style.animationDelay = `${index * 0.25}s`;
                sceneDecoration.appendChild(decoration);
            });
        }

        // Cambiar las partículas del ambiente.
        startParticles(themeName);
    }

    // Escuchar los botones de los temas.
    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeTheme(button.dataset.theme);
        });
    });

    // 4. CREAR PARTÍCULAS ANIMADAS
    let particleInterval = null;
    let currentTheme = "rainbow";

    function startParticles(themeName) {
        currentTheme = themeName;

        if (particleInterval !== null) {
            clearInterval(particleInterval);
            particleInterval = null;
        }

        if (!magicEffects) return;

        magicEffects.replaceChildren();

        // No crear demasiados elementos si se prefiere
        // reducir el movimiento.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        // Crear partículas de forma continua.
        particleInterval = setInterval(() => {
            if (currentTheme !== themeName) return;

            // Mantener la cantidad de partículas bajo control.
            if (magicEffects.childElementCount > 28) return;

            createParticle(themeName);
        }, themeName === "dark" ? 220 : 300);
    }

    function createParticle(themeName) {
        const theme = themes[themeName];

        if (!theme || !magicEffects) return;

        const particle = document.createElement("span");
        const emoji = theme.particles[
            Math.floor(Math.random() * theme.particles.length)
        ];

        particle.className = "magic-particle";
        particle.textContent = emoji;

        const left = Math.random() * 100;
        const size = 14 + Math.random() * 20;
        const duration = 3 + Math.random() * 4;

        particle.style.setProperty("--left", `${left}%`);
        particle.style.setProperty("--size", `${size}px`);
        particle.style.setProperty("--duration", `${duration}s`);

        if (theme.particleType === "firework") {
            particle.style.top = `${15 + Math.random() * 45}%`;
            particle.style.left = `${10 + Math.random() * 80}%`;
            particle.style.animationName = "sparkle";
            particle.style.animationDuration = `${1 + Math.random() * 1.5}s`;
        } else if (theme.particleType === "rain") {
            particle.style.left = `${left}%`;
            particle.style.fontSize = `${12 + Math.random() * 12}px`;
        }

        magicEffects.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        }, { once: true });
    }

    // 5. EFECTOS MÁGICOS AL TOCAR O HACER CLIC
    function createMagicBurst(x, y) {
        if (!magicScene || !magicEffects) return;

        const rect = magicScene.getBoundingClientRect();

        // Ignorar toques que no estén dentro de la escena.
        if (
            x < rect.left ||
            x > rect.right ||
            y < rect.top ||
            y > rect.bottom
        ) {
            return;
        }

        const localX = x - rect.left;
        const localY = y - rect.top;

        const symbols = ["✨", "💖", "⭐", "🌸", "💫", "🦋"];

        for (let i = 0; i < 7; i++) {
            const sparkle = document.createElement("span");

            sparkle.className = "magic-particle";
            sparkle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            sparkle.style.left = `${localX}px`;
            sparkle.style.top = `${localY}px`;
            sparkle.style.setProperty("--size", `${16 + Math.random() * 16}px`);
            sparkle.style.setProperty("--duration", "1.5s");
            sparkle.style.animationName = "sparkle";

            magicEffects.appendChild(sparkle);

            sparkle.addEventListener("animationend", () => {
                sparkle.remove();
            }, { once: true });
        }
    }

    if (magicScene) {
        magicScene.addEventListener("click", event => {
            createMagicBurst(event.clientX, event.clientY);
        });
    }

    // 6. MENÚ PARA CELULARES
    if (menuToggle && navigation) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Cerrar el menú después de elegir una página.
        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            });
        });

        // Cerrar el menú si se vuelve a una pantalla grande.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // 7. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 8. VALIDACIÓN BÁSICA DE FORMULARIOS
    const forms = document.querySelectorAll(".contact-form");

    forms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            let message = form.querySelector(".form-message");

            if (!message) {
                message = document.createElement("p");
                message.className = "form-message success";
                message.setAttribute("role", "status");
                form.appendChild(message);
            }

            message.textContent =
                "¡Gracias por contactar a Mini Bear! El formulario está validado. Para recibir tu mensaje, debes conectarlo a un servicio de envío.";
        });
    });

    // 9. AÑO Y TEMA INICIAL
    const initialTheme = Array.from(themeButtons).find(
        button => button.dataset.theme === "rainbow"
    );

    if (initialTheme) {
        changeTheme("rainbow");
    }

});
