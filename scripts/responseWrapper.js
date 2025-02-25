export const responseWrapper = (response) => {
    if (response.data !== undefined) {
        // Если статус success, возвращаем data
        return response.data;
    } else if (response.data.status === "failed") {
        // Если статус failed, выбрасываем ошибку с сообщением из ответа
        throw new Error(response.data.message || "Ошибка при создании кандидата");
    } else {
        // Обработка непредвиденного формата ответа
        throw new Error("Неизвестный формат ответа от сервера");
    }
}
