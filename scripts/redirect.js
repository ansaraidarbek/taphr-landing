const languageStorage = { "kz": true, "ru": true, "en": true };
const path = window.location.pathname;

const isValidPath = () => {
    const pathArray = path.split("/").filter(Boolean); // Remove empty strings from split

    // Case 1: Path has exactly one valid language (e.g., "/en", "/ru", "/kz")
    if (pathArray.length === 1 && languageStorage[pathArray[0]]) {
        return true;
    }

    // Case 2: Path has exactly two segments and follows "{lang}/{document}" format
    if (pathArray.length === 2) {
        const [lang, page] = pathArray;
        if (languageStorage[lang] && (page === "privacy_policy" || page === "offer")) {
            return { language: lang, document: page};
        }
    }

    return false; // Anything else is invalid
};

const handleDocs = async () => {
    try {
        const result = await fetch("https://api.taphr.kz/api/documents");
        if (!result.ok) throw new Error("Failed to fetch documents");

        const response = await result.json();

        if (response.data !== undefined) {
            // Если статус success, возвращаем data
            return response.data;
        } else if (response.status === "failed") {
            // Если статус failed, выбрасываем ошибку с сообщением из ответа
            throw new Error(response.message || "Ошибка при создании кандидата");
        } else {
            // Обработка непредвиденного формата ответа
            throw new Error("Неизвестный формат ответа от сервера");
        }
    } catch (error) {
        console.error("Error loading footer documents:", error);
    }
}

const redirectIfNeeded = async () => {
    document.documentElement.classList.add("loading");
    const pathInfo = isValidPath();

    if (!pathInfo) {
        window.location.href = "https://taphr.kz/ru";
        return;
    }

    if (typeof pathInfo === "object") {
        // Case when the path includes "privacy" or "offer"

        // 2. **Fetch documents**
        const documents = await handleDocs();
        if (!documents) return;

        // 3. **Redirect to the correct document**
        const { language, document } = pathInfo;
        const targetDocuments = documents[language];

        if (document === "privacy_policy") {
            window.location.href = targetDocuments[1].file;
        } else if (document === "offer") {
            window.location.href = targetDocuments[0].file;
        }
    } else {
        document.documentElement.classList.remove("loading"); // Show content if valid
    }
};

redirectIfNeeded();