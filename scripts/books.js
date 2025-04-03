// Function to load content dynamically
async function loadContent(url, targetElementId, linkElement) {
    const contentElement = document.getElementById(targetElementId);
    if (!contentElement) return;

    // Show loading spinner
    contentElement.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <p>Loading content...</p>
        </div>
    `;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error loading content: ${response.statusText}`);

        const data = await response.text();

        // Smooth transition
        setTimeout(() => {
            contentElement.innerHTML = data;
            
            // Update active link
            document.querySelectorAll('.sidebar a').forEach(link => {
                link.classList.remove('active');
            });
            linkElement.classList.add('active');
            
            // Scroll to top of content
            contentElement.scrollTo(0, 0);
        }, 300);
    } catch (error) {
        console.error(error);
        contentElement.innerHTML = `
            <div class="error-message">
                <p>Sorry, we couldn't load the requested content.</p>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Initialize sidebar navigation
function initSidebarNavigation() {
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = link.getAttribute('href');
            const targetElementId = link.getAttribute('data-target');
            loadContent(url, targetElementId, link);
        });
    });
}

// Initialize Kanda dropdown
function initKandaDropdown() {
    const kandaLinks = [
        { url: "/Books/book_link/Bala_Srga.html", name: "बालकाण्डः" },
        { url: "/Books/book_link/Ay_Sarga.html", name: "अयोध्याकाण्डः" },
        { url: "/Books/book_link/Ara_sarga.html", name: "अरण्यकाण्डः" },
        { url: "/Books/book_link/KIs_Sraga.html", name: "किष्किन्धाकाण्डः" },
        { url: "/Books/book_link/SU_Sraga.html", name: "सुन्दरकाण्डः" },
        { url: "/Books/book_link/YU_Sarga.html", name: "युद्धकाण्डः" }
    ];

    const dropdownMenu = document.getElementById("kanda-dropdown-menu");
    const currentPage = window.location.pathname;

    if (dropdownMenu) {
        kandaLinks.forEach(link => {
            if (link.url !== currentPage) {
                const listItem = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = link.url;
                anchor.textContent = link.name;
                listItem.appendChild(anchor);
                dropdownMenu.appendChild(listItem);
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSidebarNavigation();
    initKandaDropdown();
    
    // Load first content by default if content area is empty
    const contentElement = document.getElementById("content");
    if (contentElement && contentElement.innerHTML.trim() === "") {
        const firstLink = document.querySelector('.sidebar a');
        if (firstLink) {
            const url = firstLink.getAttribute('href');
            const targetElementId = firstLink.getAttribute('data-target');
            loadContent(url, targetElementId, firstLink);
        }
    }
});