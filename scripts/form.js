const form = document.getElementById("demo-form");

export const handleForm = (info) => {
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("form-name").value.trim();
        const company = document.getElementById("form-company").value.trim();
        const phone = document.getElementById("form-phone").value.trim();

        // Basic Validation
        if (!name || !company || !phone) {
            return;
        }

        // Construct the data object
        const requestData = {
            name: name,
            phone: phone,
            company_name: company
        };

        try {
            const response = await fetch("https://api.taphr.kz/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("Your request has been submitted successfully!");
                form.reset();
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while submitting. Please check your connection.");
        }
    });

    document.getElementById("form-phone")?.addEventListener("input", (event) => {
        let numbers = event.target.value;
    
        if (info.currentLanguage !== "en") {
            if (numbers.startsWith("+7")) {
                numbers = numbers.substring(2);
            }
        
            numbers = numbers.replace(/\D/g, ""); // Remove non-numeric characters
        
            // If user deletes everything, reset to placeholder
            if (numbers.length === 0) {
                event.target.value = "";
                return;
            }
        
            let formattedPhone = "+7 "; // Always start with +7 
            if (numbers.length > 0) formattedPhone += `(${numbers.substring(0, 3)}`;
            if (numbers.length > 3) formattedPhone += `) ${numbers.substring(3, 6)}`;
            if (numbers.length > 6) formattedPhone += ` ${numbers.substring(6, 8)}`;
            if (numbers.length > 8) formattedPhone += ` ${numbers.substring(8, 10)}`;
            event.target.value = formattedPhone;
        } else {
            numbers = numbers.replace(/\D/g, ""); // Remove non-numeric characters
            event.target.value = numbers;
        }
    });
}