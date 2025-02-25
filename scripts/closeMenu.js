const aside = document.getElementById('aside');
const checkbox = document.getElementById('menu-checkbox');
const submissionButton = document.getElementById('cta-button');

export const handleCloseMenu = () => {
    // Attach event listener to each <a> tag to close the menu when clicked
    aside.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || submissionButton.contains(e.target)) {
            checkbox.checked = false;
        }
    });
}