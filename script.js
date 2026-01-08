let deviceInfo = {};

function getDeviceDetails() {
    const ua = navigator.userAgent;

    let os = "Unknown", browser = "Unknown";

    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iOS";
    else if (ua.includes("Mac")) os = "macOS";

    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";

    deviceInfo = { os, browser };
}

getDeviceDetails();

document.getElementById("submitBtn").onclick = async () => {

    const name = document.getElementById("name").value;
    const family = document.getElementById("family").value;

    if (!name || !family) {
        document.getElementById("error").textContent = "Fill all fields!";
        return;
    }

    try {
        const res = await fetch("http://212.227.64.179:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, family, device: deviceInfo })
        });

        const data = await res.text();
        console.log(data);
        document.getElementById("error").textContent = "Sent Successfully ✅";

    } catch (err) {
        console.error(err);
        document.getElementById("error").textContent = "Server Error ❌";
    }
};
