const STAR_COUNT = 68;

fillSky();

const STORAGE_KEY = "magicbox-history";
const HISTORY_LIMIT = 10;
const VISIBLE_HISTORY = 3;

const ORACLE = {
    1: "Ты знаешь сам(а)",
    10: "Ты знаешь сам(а)",
    19: "Ты знаешь сам(а)",
    2: "Да!",
    11: "Да!",
    3: "Нет!",
    12: "Нет!",
    4: "Обязательно!",
    13: "Обязательно!",
    5: "Возможно.",
    14: "Возможно.",
    6: "Будут препятствия.",
    15: "Будут препятствия.",
    7: "Всё зависит от тебя",
    16: "Всё зависит от тебя",
    8: "Да, но не сейчас.",
    17: "Да, но не сейчас.",
    9: "Позже.",
    18: "Позже.",
};

const form = document.getElementById("ask-form");
const input = document.getElementById("userInput");
const hint = document.getElementById("hint");
const dialog = document.getElementById("oracle");
const answerEl = document.getElementById("oracle-answer");
const questionEl = document.getElementById("oracle-question");
const historySection = document.getElementById("history");
const historyList = document.getElementById("history-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    reveal();
});

document.getElementById("clear-btn").addEventListener("click", () => {
    input.value = "";
    fitInput();
    clearError();
    input.focus();
});

input.addEventListener("input", () => {
    fitInput();
    if (input.value.trim()) clearError();
});

fitInput();
renderHistory();

document.getElementById("clear-history").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
});

document.getElementById("oracle-close").addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) dialog.close();
});

function reveal() {
    const question = input.value;
    if (!question.trim()) {
        input.setAttribute("aria-invalid", "true");
        hint.hidden = false;
        hint.textContent = "Сначала задай вопрос — звёзды молчат.";
        input.focus();
        return;
    }

    clearError();
    const text = answerFor(question);
    const asked = question.trim();
    answerEl.textContent = text;
    questionEl.textContent = `«${asked}»`;
    remember(asked, text);

    if (!dialog.open) dialog.showModal();
}

function answerFor(question) {
    const cleaned = String(question)
        .trim()
        .replaceAll(" ", "")
        .replaceAll(/[\[,\?&!/\(\)-:;\.\*\^<>\]]/g, "");
    const length = cleaned.length;
    const ones = length % 10;
    const tens = (length - ones) / 10;
    return ORACLE[ones + tens] || "Тут даже звёзды не знают...";
}

function loadHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (!Array.isArray(saved)) return [];
        const history = saved.filter((item) => item && item.question && item.answer).slice(0, HISTORY_LIMIT);
        if (saved.length !== history.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        }
        return history;
    } catch {
        return [];
    }
}

function remember(question, answer) {
    const history = [{ question, answer, at: Date.now() }, ...loadHistory()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
    renderHistory();
}

function renderHistory() {
    const history = loadHistory();
    historyList.replaceChildren();
    historySection.hidden = history.length === 0;

    history.forEach((item) => {
        const row = document.createElement("li");
        row.className = "history-item";

        const question = document.createElement("p");
        question.className = "history-question";
        question.textContent = `«${item.question}»`;

        const answer = document.createElement("p");
        answer.className = "history-answer";
        answer.textContent = item.answer;

        row.append(question, answer);
        historyList.append(row);
    });

    fitHistory();
}

function fitHistory() {
    const items = [...historyList.children];
    if (items.length <= VISIBLE_HISTORY) {
        historyList.style.maxHeight = "";
        return;
    }

    const gap = parseFloat(getComputedStyle(historyList).rowGap) || 0;
    const visible = items.slice(0, VISIBLE_HISTORY);
    const height = visible.reduce((sum, item) => sum + item.offsetHeight, 0) + gap * (visible.length - 1);
    historyList.style.maxHeight = `${height}px`;
}

window.addEventListener("resize", () => {
    fitInput();
    fitHistory();
});

if (document.fonts) {
    document.fonts.ready.then(fitInput);
}

function fillSky() {
    const sky = document.querySelector(".night");
    if (!sky) return;

    for (let index = 0; index < STAR_COUNT; index++) {
        const star = document.createElement("span");
        star.className = "star";
        moveStar(star);
        const duration = 2.8 + Math.random() * 4.4;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `-${Math.random() * duration}s`;
        star.addEventListener("animationiteration", () => moveStar(star));
        sky.appendChild(star);
    }
}

function moveStar(star) {
    const size = Math.random() < 0.18 ? 2.2 + Math.random() * 1.2 : 1 + Math.random() * 1.2;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
}

function fitInput() {
    input.style.minHeight = "0px";
    input.style.height = "0px";
    const height = input.scrollHeight;
    input.style.removeProperty("min-height");
    input.style.height = `${height}px`;
    input.scrollTop = 0;
}

function clearError() {
    input.removeAttribute("aria-invalid");
    hint.hidden = true;
    hint.textContent = "";
}
