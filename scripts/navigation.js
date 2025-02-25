
                    onclick="window.open('https://app.taphr.kz/', '_blank')"
const buttons = document.body.querySelectorAll(".demo-navigation")
const secondNavLogin = document.getElementById("second-nav-login");

buttons.forEach(el => {
    el.addEventListener('click', function() {
        window.location.href = '#demo'; // Navigate to demo section
    });
})

if (secondNavLogin) {
    secondNavLogin.addEventListener('click', function() {
        window.open('https://app.taphr.kz/', '_blank'); // Navigate to demo section
    });
}