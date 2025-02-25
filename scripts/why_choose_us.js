
const dotsNav = document.getElementById('why-choose-us-nav');
const track = document.getElementById('why-choose-us-features');
const dots = Array.from(dotsNav.children);
const features = Array.from(track.children);
let currentActiveSlide = document.querySelector('.current-slide');
let isControled = false;
let currentIndex = 0;
let autoScrollInterval;
let scrollTimeout;

// Function to start the auto-scroll interval
const startAutoScroll = (currIndex) => {
    clearInterval(autoScrollInterval); // Clear any existing interval
    currentIndex = currIndex; // Update the current index
    autoScrollInterval = setInterval(scrollCarousel, 5000); // Start a new interval
};

const updateCurrentSlide = (target, currIndex) => {
    currentActiveSlide.classList.remove('current-slide');
    target.classList.add("current-slide");

    currentActiveSlide = target;

    // Renew the auto-scroll interval whenever the slide is updated
    startAutoScroll(currIndex);
}

const updateCurrentFeature = () => {
    if (isControled) {
        clearTimeout(scrollTimeout); // Clear the previous timeout (if any)
    
        scrollTimeout = setTimeout(() => {
            // This code will run after scrolling has stopped for 150ms
            isControled = false; // Set isControled to false after scrolling stops
        }, 150); // 150ms timeout duration, adjust as needed
        
        return
    }
    let containerRect = track.getBoundingClientRect();
    let currentIndex = -1;

    features.forEach((feature, index) => {
        let featureRect = feature.getBoundingClientRect();

        // Check which feature is mostly visible in the container
        const visibleWidth = Math.min(featureRect.right, containerRect.right) - Math.max(featureRect.left, containerRect.left);
        if (visibleWidth > featureRect.width / 2) {
            currentIndex = index; // Mark the currently visible feature
        }
    });

    if (currentIndex !== -1) {
        // Update the navigation
        updateCurrentSlide(dots[currentIndex], currentIndex);
    }
};

track.addEventListener('scroll', updateCurrentFeature, { passive: true });

dotsNav.addEventListener('click', (e) => {
    e.preventDefault();
    const targetNav = e.target.closest('a');
    
    if (!targetNav) {
        return
    }

    const targetId = targetNav.getAttribute("href").substring(1);
    const currentIndex = parseInt(targetId.substring(targetId.length - 1)) - 1;
    const targetElement = document.getElementById(targetId);

    track.scrollTo({
        top: 0,
        left: targetElement.offsetLeft,
        behavior: 'smooth'
    });

    isControled = true;
    updateCurrentSlide(targetNav, currentIndex);
});

const scrollCarousel = () => {
    // Calculate the next scroll position
    currentIndex = (currentIndex + 1) % features.length; // Loop back to the first item
    const targetFeature = features[currentIndex];

    // Scroll to the next feature
    track.scrollTo({
        top: 0,
        left: targetFeature.offsetLeft,
        behavior: "smooth"
    });

    isControled = true;
    updateCurrentSlide(dots[currentIndex], currentIndex);
};

// Start auto-scroll initially
startAutoScroll(0);

// Stop the auto-scroll interval when the user interacts with the carousel
track.addEventListener('pointerdown', () => {
    clearInterval(autoScrollInterval);
});

track.addEventListener('pointerup', () => {
    startAutoScroll(currentIndex);
});