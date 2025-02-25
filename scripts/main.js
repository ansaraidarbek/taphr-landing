import { loadLanguage } from "./language.js";
import { handlePopUp, updatePopUp } from "./popUp.js";
import { handleForm } from "./form.js";
import { retrieveDocs } from "./documents.js";
import { handleCurrencySwitch } from "./currency.js";
import { handleCloseMenu } from "./closeMenu.js";


const info = {
    isDesktop :  window.innerWidth > window.innerHeight,
    languageStorage: {
        "kz" : 0,
        "ru" : 1,
        "en" : 2
    },
    currentLanguage: null,
}

const retrieveDefaultLanguage = (storage) => {
    const path = window.location.pathname;
    const pathArray = path.split("/");

    if (pathArray.length === 2 && storage[pathArray[1]] !== undefined) {
        return pathArray[1];
    }
    return "ru";
}

async function run () {
    const defaultLanguage = retrieveDefaultLanguage(info.languageStorage);
    updatePopUp(info, defaultLanguage);
    retrieveDocs(defaultLanguage);
    loadLanguage(info, defaultLanguage);
    handleForm(info);
    handleCurrencySwitch();
    handleCloseMenu();
}

document.getElementById("language-switcher")?.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON" && target.value && target.value !== info.currentLanguage) {
        window.location.href = `https://taphr.kz/${target.value}`;
    }
});

document.getElementById("language-switcher-popup")?.addEventListener("click", (event) => {
    const selectedLanguage = event.target.getAttribute("data-value");
    if (selectedLanguage && selectedLanguage !== info.currentLanguage) {
        window.location.href = `https://taphr.kz/${selectedLanguage}`;
    }
});

// Listen for window resize to update dictionary dynamically
window.addEventListener("resize", () => {
    // change language settings if resized to mobile and viceversa
    loadLanguage(info);
});

document.addEventListener("click", (e) => {
    handlePopUp(e);
});


run();

