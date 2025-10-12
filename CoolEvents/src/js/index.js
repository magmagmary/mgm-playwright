(() => {
    'use strict';

    // Check if the user has already made a choice
    document.addEventListener("DOMContentLoaded", function () {
        // load cookie consent status from cookie
        console.log(1)
        console.log(document.cookie)
        if (document.cookie) {
            const cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent=')).split('=')[1];
            console.log(2)
            console.log("Cookie consent status:", cookieConsent);
            if (cookieConsent !== "accepted") {
                document.getElementById("cookie-banner").style.display = "none";
            }
        } else {
            document.getElementById("cookie-banner").style.display = "block";
        }
    });

})()

// Handle cookie consent
function handleCookieConsent(consent) {
    if (consent) {
        document.cookie = `cookieConsent="accepted"; path=/; max-age=31536000`;
    }
    document.getElementById("cookie-banner").style.display = "none";
}