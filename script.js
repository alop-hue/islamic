const tabsContainer = document.getElementById("tabs");
const newTabBtn = document.getElementById("newTab");
const urlInput = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");
const contentFrame = document.getElementById("contentFrame");
const adBlockToggle = document.getElementById("adBlock");
const trackerToggle = document.getElementById("trackerBlock");
const fingerprintToggle = document.getElementById("fingerprintBlock");
const blockedAds = document.getElementById("blockedAds");
const blockedTrackers = document.getElementById("blockedTrackers");
const adSlot = document.getElementById("adSlot");
const themeBtns = document.querySelectorAll(".theme-btn");
const radiusControl = document.getElementById("radius");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

const tabs = ["لوحة البداية", "العمل", "ترفيه"];
let activeTab = 0;

function renderTabs() {
  tabsContainer.innerHTML = "";
  tabs.forEach((tab, idx) => {
    const el = document.createElement("button");
    el.className = `tab ${idx === activeTab ? "active" : ""}`;
    el.textContent = tab;
    el.onclick = () => {
      activeTab = idx;
      renderTabs();
    };
    tabsContainer.appendChild(el);
  });
}

newTabBtn.onclick = () => {
  tabs.push(`تبويب ${tabs.length + 1}`);
  activeTab = tabs.length - 1;
  renderTabs();
};

function updatePrivacy() {
  adSlot.style.display = adBlockToggle.checked ? "none" : "block";
  blockedAds.textContent = adBlockToggle.checked ? "129" : "128";
  blockedTrackers.textContent = trackerToggle.checked && fingerprintToggle.checked ? "76" : "74";
}

adBlockToggle.onchange = updatePrivacy;
trackerToggle.onchange = updatePrivacy;
fingerprintToggle.onchange = updatePrivacy;

function navigate() {
  const value = urlInput.value.trim();
  contentFrame.querySelector("h2").textContent = `تصفح: ${value}`;
  contentFrame.querySelector("p").textContent = "تجربة عرض ذكية: يمكن هنا إظهار محتوى الويب مع طبقات الحماية والتخصيص.";
}

goBtn.onclick = navigate;
urlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") navigate();
});

themeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    themeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const theme = btn.dataset.theme;
    if (theme === "sunset") {
      document.documentElement.style.setProperty("--bg", "linear-gradient(135deg, #351126, #7f2f4a, #e76f51)");
      document.documentElement.style.setProperty("--accent", "#ffb4a2");
    } else if (theme === "forest") {
      document.documentElement.style.setProperty("--bg", "linear-gradient(135deg, #092b1f, #124734, #1f7a4f)");
      document.documentElement.style.setProperty("--accent", "#9be9a8");
    } else {
      document.documentElement.style.setProperty("--bg", "linear-gradient(135deg, #0e1430, #182d5f, #0f1b42)");
      document.documentElement.style.setProperty("--accent", "#5ee6ff");
    }
  });
});

radiusControl.addEventListener("input", () => {
  document.documentElement.style.setProperty("--radius", `${radiusControl.value}px`);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);

  const aiMsg = document.createElement("div");
  aiMsg.className = "msg ai";
  aiMsg.textContent = `اقتراح ذكي: يمكنك فتح تبويب جديد للبحث عن "${text}" مع تفعيل وضع الخصوصية القصوى.`;
  chatBox.appendChild(aiMsg);

  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});

renderTabs();
updatePrivacy();
