/**
 * Updates the `X Stars · Y Forks` text with live metadata if available
 */
async function updateRepositoryMetadata() {
    document.querySelectorAll('[data-repo]')
        .forEach(async (element) => {
            const URL = "https://api.github.com/repos/" + element.getAttribute("data-repo");

            try {
                const response = await fetch(URL);
                
                if (response.ok) {
                    const result = await response.json();
                    element.textContent = `${result.stargazers_count} Stars · ${result.forks_count} Forks`;
                }

            } catch (error) {
                console.error(error);
            }
        });
}

const HIGHLIGHT_DURATION_MS = 500;
let highlightTimeout;

/**
 * Briefly highlights the section a nav link points to by setting its box shadow
 */
function onNavButtonClicked(event) {
    const target = document.querySelector(event.currentTarget.getAttribute("href"));

    if (!target) {
        return;
    }

    // Clear any previous highlight so only one section is emphasized at a time
    clearTimeout(highlightTimeout);
    document.querySelectorAll('.panel')
        .forEach((panel) => panel.style.boxShadow = "");

    target.style.boxShadow = "0 0 20px 4px var(--accent-primary)";

    highlightTimeout = setTimeout(() => target.style.boxShadow = "", HIGHLIGHT_DURATION_MS);
}

document.querySelectorAll('nav a[href^="#"]')
    .forEach((link) => link.addEventListener("click", onNavButtonClicked));

updateRepositoryMetadata();