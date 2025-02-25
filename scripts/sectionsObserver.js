document.addEventListener("DOMContentLoaded", () => {
    // Select all sections to be animated
    const fadeSections = document.querySelectorAll(".fade-section");

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate"); // Add the animation class
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    // Observe each section
    fadeSections.forEach((section) => observer.observe(section));
});