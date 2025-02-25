
const annual = document.getElementById("price-suitable");
const monthly = document.getElementById("pricing-badge-monthly");
const standard = document.getElementById("price-standard-value");
const premium = document.getElementById("price-premium-value");

export const handleCurrencySwitch = () => {
    annual.addEventListener("click", () => {
        if (annual.classList.contains("price-disactive")) {
            annual.classList.toggle("price-disactive");
            monthly.classList.toggle("price-disactive");
            if (standard.textContent !== "35 400") {
                standard.textContent = "55";
                premium.textContent = "130";
            } else {
                standard.textContent = "29 500";
                premium.textContent = "70 000";
            }
        }
    });
    
    monthly.addEventListener("click", () => {
        if (monthly.classList.contains("price-disactive")) {
            monthly.classList.toggle("price-disactive");
            annual.classList.toggle("price-disactive");
            if (standard.textContent !== "29 500") {
                standard.textContent = "65";
                premium.textContent = "155";
            } else {
                standard.textContent = "35 400";
                premium.textContent = "84 000";
            }
        }
    });
}