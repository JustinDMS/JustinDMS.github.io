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

updateRepositoryMetadata();