// Cache translations to avoid repeated fetches
let translations = null;

// Highlight the active language button
const highlightActiveLanguage = (currentLanguage, lang) => {
    document.getElementById(`lang-button_${currentLanguage}`)?.classList.remove("active-language");
    const newButton = document.getElementById(`lang-button_${lang}`);

    if (newButton) {
        newButton.classList.add("active-language");
    } else {
        document.getElementById('lang-button_ru').classList.add("active-language");
    }
};

export const loadLanguage = async (info, lang) => {
    // on resize lang will not be passed
    if (!lang) {
        lang = info.currentLanguage;
    }

    // Determine the dictionary type (desktop or mobile)
    const isDesktop = window.innerWidth > window.innerHeight;
    const dictionaryType = isDesktop ? "desktop" : "mobile";

    // Fetch the correct dictionary based on the aspect ratio
    if (!translations) {
        const response = await fetch(`./language_dict.json`);
        translations = await response.json();
    }

    // Check if the language exists in the JSON
    let langData = translations[lang]?.[dictionaryType];
    if (!langData) {
        console.error(`Language '${lang}/${dictionaryType}' not found.`);
        langData = translations["ru"]?.[dictionaryType];
    }

    // Update all elements with data-lang attributes
    document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang");
        let translation = key.split(".").reduce((obj, k) => obj && obj[k], langData);
        if (translation) {
            // part which is inside <s> </s> tag should be converted to <a href="#" itemprop="url"></a>.
            if (key.includes("privacy_note")) {
                element.innerHTML = translation
                .map((text) => `<span>${text.replace(/<s>(.*?)<\/s>/g, `<a href="https://taphr.kz/${lang}/privacy_policy" target="_blank" itemprop="url">$1</a>`)}</span>`)
                .join("<br>");
            } else if (element.tagName === "H1") {
                // for each element in translation array create new span, if color is provided add a preview-title-green class and between spans there is always <br>
                element.innerHTML = translation.map((text) => `<span class="${text.color ? "preview-title-green" : ""}">${text.text}</span>`).join("<br>");
            } else if (element.tagName === "IMG") {
                // element.alt = translation; // For image alt attributes
                element.src = translation;
            } else if (element.tagName === "INPUT") {
                element.placeholder = translation; // For input placeholders
            }else {
                if(Array.isArray(translation)){
                    element.innerHTML = translation.join("<br>");
                } else {
                    element.textContent = translation; // For text content
                    if (key.includes("price_sign")) {
                        const parent = element.parentElement;
                        
                        if (parent && lang === "en") { // Ensure parent exists and language is "en"
                            parent.insertBefore(element, parent.firstChild);
                        }else if (lang === "ru" || lang === "kz") {
                            // Move the element back to the second position 
                            parent.insertBefore(element, parent.children[2]);
                        }
                    }
                }
            }
        }
    });

    // Highlight the active language button
    highlightActiveLanguage(info.currentLanguage, lang);

    // Update the current language
    info.currentLanguage = lang;
};