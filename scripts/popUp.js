const popUpButton = document.getElementById("language-switcher-dropdown");
const selectLanguageBox = document.getElementById("language-switcher-popup");
const openIcon = document.getElementById("language-switcher-when-open");
const closeIcon = document.getElementById("language-switcher-when-closed");
const liElements = selectLanguageBox?.children;

export const handlePopUp = (e) => {
    if (popUpButton && selectLanguageBox) {
        const isButtonClick = popUpButton.contains(e.target);
        const isClosed = selectLanguageBox.classList.contains("hide-popup");

        if (isButtonClick && isClosed) {
            // Toggle popup visibility when clicking the button
            selectLanguageBox.classList.remove("hide-popup");
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
        } else {
            // Close the popup when clicking outside of it and the button
            selectLanguageBox.classList.add("hide-popup");
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
        }
    }
}


export const updatePopUp = (info, newLang) => {
    if (info.currentLanguage === newLang) {
        return;
    }
    const languageStorage = info.languageStorage;
    if (liElements) {
        for (let i = 0; i < liElements.length; i++) {
            if (i === languageStorage[newLang]) {
                liElements[i].classList.add("active-select-language");
            } else {
                liElements[i].classList.remove("active-select-language");
            }
        }
        popUpButton.children[0].textContent = liElements[languageStorage[newLang]].textContent;
    }
}