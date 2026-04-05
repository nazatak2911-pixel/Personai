document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const brandTrigger = document.getElementById('brand-trigger');
    const triggerArea = document.getElementById('trigger-area');
    
    // Desktop: Hover triggers
    const openSidebar = () => {
        sidebar.classList.add('open');
        mainContent.classList.add('shifted');
    };
    
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        mainContent.classList.remove('shifted');
    };

    // When hovering over the invisible left edge
    triggerArea.addEventListener('mouseenter', openSidebar);
    
    // When leaving the sidebar
    sidebar.addEventListener('mouseleave', closeSidebar);
    
    // Close sidebar if mouse moves back to main content to ensure clear hiding
    mainContent.addEventListener('mouseenter', closeSidebar);

    // Mobile: Click trigger toggle
    brandTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        // Prevent click toggle on desktop, rely purely on hover there
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
            mainContent.classList.toggle('shifted');
        }
    });

    // Close on mobile when clicking somewhere else
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !brandTrigger.contains(e.target)) {
                closeSidebar();
            }
        }
    });
});
