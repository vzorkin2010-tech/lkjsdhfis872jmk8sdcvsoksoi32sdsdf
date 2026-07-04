const translations = {
  ru: {
    navOrder: "Заказ",
    navServices: "Услуги",
    navPackages: "Пакеты",
    heroBadge: "Roblox Studio · Luau scripting",
    heroTitle: "Скрипты и игровые системы для Roblox Studio",
    heroLead:
      "Создаю чистую игровую логику, UI-системы, магазины, квесты, экономики и механики под твой проект.",
    heroPrimary: "Смотреть услуги",
    heroSecondary: "Смотреть услуги",
    statOneTitle: "Luau",
    statOneText: "чистый код",
    statTwoTitle: "UI + Systems",
    statTwoText: "под ключ",
    statThreeTitle: "Studio-ready",
    statThreeText: "готово к вставке",
    stackServer: "безопасная серверная логика",
    stackShared: "модули и RemoteEvents",
    stackUi: "интерактивные интерфейсы",
    servicesBadge: "Что можно заказать",
    servicesTitle: "Услуги скриптера",
    servicesLead:
      "Основа сайта уже готова под магазин услуг: дальше добавим реальные кейсы, цены, отзывы и контакты.",
    serviceOneTitle: "Игровые системы",
    serviceOneText:
      "Магазины, инвентари, квесты, награды, лидерборды, прокачка и внутренняя экономика.",
    serviceTwoTitle: "UI-логика",
    serviceTwoText:
      "Меню, кнопки, анимации, shop UI, daily rewards и понятная связь интерфейса с сервером.",
    serviceThreeTitle: "Модульная архитектура",
    serviceThreeText:
      "Аккуратная структура проекта, ModuleScripts, RemoteEvents и код, который легче поддерживать.",
    serviceFourTitle: "Доработки и фиксы",
    serviceFourText:
      "Исправление багов, оптимизация старых скриптов и подключение новых механик к готовой игре.",
    packagesBadge: "Формат заказа",
    packagesTitle: "Пакеты услуг",
    packageOneKicker: "Старт",
    packageOneTitle: "Mini Script",
    packagePrice: "по ТЗ",
    packageOneA: "Одна небольшая механика",
    packageOneB: "Настройка в Roblox Studio",
    packageOneC: "Краткая инструкция",
    packageTwoKicker: "Популярно",
    packageTwoTitle: "Game System",
    packageTwoA: "Полная игровая система",
    packageTwoB: "Сервер + клиент + UI",
    packageTwoC: "Тестирование сценариев",
    packageThreeKicker: "Поддержка",
    packageThreeTitle: "Project Support",
    packageThreeA: "Регулярные доработки",
    packageThreeB: "Фиксы и оптимизация",
    packageThreeC: "Помощь с релизом",
    processBadge: "Как работаем",
    processTitle: "Понятный процесс",
    processOneTitle: "Бриф",
    processOneText: "Разбираем идею, механику, UI и нужные ограничения.",
    processTwoTitle: "Сборка",
    processTwoText: "Пишу скрипты и собираю систему внутри Roblox Studio.",
    processThreeTitle: "Тест",
    processThreeText: "Проверяем кейсы, баги, сохранение данных и UX.",
    processFourTitle: "Передача",
    processFourText: "Отдаю готовый результат и объясняю, где что менять.",
    chatSubtitle: "Roblox Studio helper",
    chatInputLabel: "Сообщение"
  },
  en: {
    navOrder: "Order",
    navServices: "Services",
    navPackages: "Packages",
    heroBadge: "Roblox Studio · Luau scripting",
    heroTitle: "Scripts and game systems for Roblox Studio",
    heroLead:
      "I build clean game logic, UI systems, shops, quests, economies, and custom mechanics for your project.",
    heroPrimary: "View services",
    heroSecondary: "View services",
    statOneTitle: "Luau",
    statOneText: "clean code",
    statTwoTitle: "UI + Systems",
    statTwoText: "full setup",
    statThreeTitle: "Studio-ready",
    statThreeText: "ready to insert",
    stackServer: "secure server-side logic",
    stackShared: "modules and RemoteEvents",
    stackUi: "interactive interfaces",
    servicesBadge: "What you can order",
    servicesTitle: "Scripting services",
    servicesLead:
      "The service-shop foundation is ready: next we can add real cases, pricing, and testimonials.",
    serviceOneTitle: "Game systems",
    serviceOneText:
      "Shops, inventories, quests, rewards, leaderboards, progression, and in-game economies.",
    serviceTwoTitle: "UI logic",
    serviceTwoText:
      "Menus, buttons, animations, shop UI, daily rewards, and clear client-server connection.",
    serviceThreeTitle: "Modular architecture",
    serviceThreeText:
      "Clean project structure, ModuleScripts, RemoteEvents, and code that is easier to maintain.",
    serviceFourTitle: "Fixes and upgrades",
    serviceFourText:
      "Bug fixes, optimization of old scripts, and new mechanics connected to an existing game.",
    packagesBadge: "Order format",
    packagesTitle: "Service packages",
    packageOneKicker: "Start",
    packageOneTitle: "Mini Script",
    packagePrice: "by brief",
    packageOneA: "One small mechanic",
    packageOneB: "Roblox Studio setup",
    packageOneC: "Short instructions",
    packageTwoKicker: "Popular",
    packageTwoTitle: "Game System",
    packageTwoA: "Complete gameplay system",
    packageTwoB: "Server + client + UI",
    packageTwoC: "Scenario testing",
    packageThreeKicker: "Support",
    packageThreeTitle: "Project Support",
    packageThreeA: "Regular improvements",
    packageThreeB: "Fixes and optimization",
    packageThreeC: "Release assistance",
    processBadge: "Workflow",
    processTitle: "Clear process",
    processOneTitle: "Brief",
    processOneText: "We define the idea, mechanic, UI, and required limits.",
    processTwoTitle: "Build",
    processTwoText: "I write scripts and assemble the system in Roblox Studio.",
    processThreeTitle: "Test",
    processThreeText: "We check edge cases, bugs, data saving, and UX.",
    processFourTitle: "Delivery",
    processFourText: "I deliver the result and explain where to change things.",
    chatSubtitle: "Roblox Studio helper",
    chatInputLabel: "Message"
  }
};

const languageButtons = document.querySelectorAll(".lang-btn");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const localizedPlaceholderNodes = document.querySelectorAll("[data-placeholder-ru]");
const languageStorageKey = "vz-services-language";
let currentLanguage = "ru";

function readStoredLanguage() {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

function writeStoredLanguage(language) {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    return;
  }
}

function setLanguage(language) {
  const resolvedLanguage = translations[language] ? language : "ru";
  const dictionary = translations[resolvedLanguage];
  currentLanguage = resolvedLanguage;

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === resolvedLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localizedPlaceholderNodes.forEach((node) => {
    const placeholder = node.dataset[`placeholder${resolvedLanguage.toUpperCase()}`];
    if (placeholder) {
      node.setAttribute("placeholder", placeholder);
    }
  });

  document.documentElement.lang = resolvedLanguage;
  writeStoredLanguage(resolvedLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

const savedLanguage = readStoredLanguage();
setLanguage(savedLanguage || "ru");

const chatWidget = document.getElementById("vzorkin-chat");
const chatFab = document.getElementById("chat-fab");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

const chatCopy = {
  ru: {
    privacy:
      "Чат не сохраняется после перезахода на сайт. После обновления страницы история будет очищена.",
    thinking: "Думаю",
    scope:
      "Я могу помогать только по Roblox Studio: куда положить скрипт, что такое Script/LocalScript/ModuleScript и очень простые Luau-примеры.",
    unsafe:
      "Не могу помогать с этим. Я отвечаю только по безопасным Roblox Studio задачам и не пишу скрипты/тексты, которые не подходят для Roblox.",
    complex:
      "Это уже не простой скрипт, а полноценная система. Лучше обратитесь за этой услугой на нашем сайте в разделе пакетов.",
    fallback:
      "Могу дать только очень простой пример. Напиши, например: leaderstats, kill brick, click detector, teleport part или color part.",
    remoteError:
      "Mistral сейчас недоступен, поэтому отвечаю локальным простым шаблоном.",
    whereToPut:
      "Куда положить: создай Script внутри ServerScriptService, если это серверная логика. LocalScript клади в StarterGui/StarterPlayerScripts, если это UI или клиент."
  },
  en: {
    privacy:
      "Chat is not saved after you leave the site. After refreshing the page, the history is cleared.",
    thinking: "Thinking",
    scope:
      "I can only help with Roblox Studio: where scripts go, Script/LocalScript/ModuleScript basics, and very simple Luau examples.",
    unsafe:
      "I cannot help with that. I only answer safe Roblox Studio requests and will not write scripts/text that do not fit Roblox.",
    complex:
      "That is no longer a simple script. It is a full system, so please order this service on the site packages section.",
    fallback:
      "I can only give a very simple example. Try: leaderstats, kill brick, click detector, teleport part, or color part.",
    remoteError:
      "Mistral is unavailable right now, so I am using a local simple template.",
    whereToPut:
      "Where to put it: create a Script inside ServerScriptService for server logic. Use a LocalScript in StarterGui/StarterPlayerScripts for UI or client logic."
  }
};

const robloxTerms = [
  "roblox",
  "studio",
  "luau",
  "lua",
  "script",
  "localscript",
  "modulescript",
  "serverscriptservice",
  "startergui",
  "workspace",
  "part",
  "clickdetector",
  "leaderstats",
  "remoteevent",
  "tool",
  "gui",
  "роблокс",
  "студи",
  "скрипт",
  "локалскрипт",
  "модуль",
  "парт",
  "детектор",
  "гуи"
];

const simpleTerms = [
  "leaderstats",
  "kill brick",
  "click",
  "clickdetector",
  "teleport",
  "color",
  "part",
  "touch",
  "speed",
  "jump",
  "damage",
  "where",
  "куда",
  "полож",
  "цвет",
  "телепорт",
  "скорост",
  "прыж",
  "касани",
  "урон",
  "клик"
];

const siteTerms = [
  "vz.services",
  "site",
  "website",
  "service",
  "services",
  "package",
  "packages",
  "offer",
  "offers",
  "buy",
  "order",
  "price",
  "pricing",
  "cost",
  "hire",
  "your site",
  "what can you",
  "what do you",
  "услуг",
  "сайт",
  "пакет",
  "пакеты",
  "предлага",
  "купить",
  "заказать",
  "заказ",
  "цена",
  "цены",
  "стоимость",
  "сколько стоит",
  "что можете",
  "что вы",
  "нанять"
];

const complexTerms = [
  "datastore",
  "save",
  "inventory",
  "shop",
  "economy",
  "trading",
  "trade",
  "quest",
  "combat",
  "admin",
  "anti-cheat",
  "anticheat",
  "pathfinding",
  "matchmaking",
  "developer product",
  "gamepass",
  "monetization",
  "full system",
  "complete system",
  "сохран",
  "инвент",
  "магазин",
  "эконом",
  "трейд",
  "обмен",
  "квест",
  "комбат",
  "админ",
  "античит",
  "монетизац",
  "полную систему",
  "полная система"
];

const unsafeTerms = [
  "exploit",
  "executor",
  "synapse",
  "krnl",
  "bypass",
  "steal",
  "cookie",
  "token",
  "scam",
  "phish",
  "ddos",
  "nsfw",
  "porn",
  "gore",
  "hate",
  "чит",
  "эксплойт",
  "обход",
  "украсть",
  "токен",
  "куки",
  "скам",
  "фишинг",
  "порно",
  "расизм"
];

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function getChatText(key) {
  return chatCopy[currentLanguage]?.[key] || chatCopy.ru[key];
}

function isRobloxRequest(message) {
  const text = message.toLowerCase();
  return includesAny(text, robloxTerms) || includesAny(text, simpleTerms);
}

function isSiteQuestion(message) {
  return includesAny(message.toLowerCase(), siteTerms);
}

function getGuardResponse(message) {
  const text = message.toLowerCase();

  if (includesAny(text, unsafeTerms)) {
    return getChatText("unsafe");
  }

  if (isSiteQuestion(text)) {
    return "";
  }

  if (!isRobloxRequest(text)) {
    return getChatText("scope");
  }

  if (includesAny(text, complexTerms)) {
    return getChatText("complex");
  }

  return "";
}

function getLocalSimpleReply(message) {
  const text = message.toLowerCase();

  if (isSiteQuestion(text)) {
    return getSiteServicesReply();
  }

  if (text.includes("куда") || text.includes("where") || text.includes("полож")) {
    return getChatText("whereToPut");
  }

  if (text.includes("leaderstats")) {
    return `${getChatText("whereToPut")}\n\n\`\`\`lua\nlocal Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n  local leaderstats = Instance.new("Folder")\n  leaderstats.Name = "leaderstats"\n  leaderstats.Parent = player\n\n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = 0\n  coins.Parent = leaderstats\nend)\n\`\`\``;
  }

  if (text.includes("kill") || text.includes("touch") || text.includes("касани") || text.includes("урон")) {
    return `Положи Script внутрь Part, который должен наносить урон.\n\n\`\`\`lua\nlocal part = script.Parent\nlocal damage = 100\n\npart.Touched:Connect(function(hit)\n  local humanoid = hit.Parent:FindFirstChild("Humanoid")\n  if humanoid then\n    humanoid:TakeDamage(damage)\n  end\nend)\n\`\`\``;
  }

  if (text.includes("click")) {
    return `Положи ClickDetector и Script внутрь Part.\n\n\`\`\`lua\nlocal part = script.Parent\nlocal clickDetector = part:WaitForChild("ClickDetector")\n\nclickDetector.MouseClick:Connect(function(player)\n  part.BrickColor = BrickColor.Random()\nend)\n\`\`\``;
  }

  if (text.includes("teleport") || text.includes("телепорт")) {
    return `Положи Script внутрь Part-телепорта. Создай второй Part с именем TeleportPoint.\n\n\`\`\`lua\nlocal teleportPart = script.Parent\nlocal point = workspace:WaitForChild("TeleportPoint")\n\nteleportPart.Touched:Connect(function(hit)\n  local character = hit.Parent\n  local root = character:FindFirstChild("HumanoidRootPart")\n  if root then\n    root.CFrame = point.CFrame + Vector3.new(0, 3, 0)\n  end\nend)\n\`\`\``;
  }

  if (text.includes("color") || text.includes("цвет")) {
    return `Положи Script внутрь Part. Скрипт будет менять цвет каждые 2 секунды.\n\n\`\`\`lua\nlocal part = script.Parent\n\nwhile true do\n  part.BrickColor = BrickColor.Random()\n  task.wait(2)\nend\n\`\`\``;
  }

  if (text.includes("speed") || text.includes("скорост")) {
    return `Положи Script внутрь Part, который дает скорость при касании.\n\n\`\`\`lua\nlocal part = script.Parent\n\npart.Touched:Connect(function(hit)\n  local humanoid = hit.Parent:FindFirstChild("Humanoid")\n  if humanoid then\n    humanoid.WalkSpeed = 32\n  end\nend)\n\`\`\``;
  }

  return getChatText("fallback");
}

function getSiteServicesReply() {
  if (currentLanguage === "en") {
    return "On vz.services you can order Roblox Studio scripting services.\n\nMini Script: one small mechanic, Studio setup, short instructions.\n\nGame System: a complete gameplay system with server logic, client logic, and UI.\n\nProject Support: regular improvements, bug fixes, optimization, and release help.\n\nIf your task is simple, I can explain it here. If it is a shop, inventory, quest, economy, saving system, trading, combat, or another full system, it is better to order it as a service.";
  }

  return "На vz.services можно заказать услуги скриптера для Roblox Studio.\n\nMini Script: одна небольшая механика, настройка в Studio и краткая инструкция.\n\nGame System: полноценная игровая система с сервером, клиентом и UI.\n\nProject Support: регулярные доработки, фиксы, оптимизация и помощь с релизом.\n\nЕсли задача простая, я могу объяснить ее тут. Если нужен магазин, инвентарь, квесты, экономика, сохранение данных, трейды, combat или другая полноценная система, лучше оформить это как услугу.";
}

function renderChatContent(container, text) {
  const parts = text.split(/```(?:lua|luau)?\n?([\s\S]*?)```/g);

  parts.forEach((part, index) => {
    if (!part) return;

    if (index % 2 === 1) {
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = part.trim();
      pre.append(code);
      container.append(pre);
    } else {
      renderInlineMarkdown(container, part.trim());
    }
  });
}

function parseInlineTokens(text) {
  const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\n)/g;
  const tokens = [];
  let cursor = 0;
  let match;

  function pushPlain(value) {
    if (!value) return;
    tokens.push({ type: "text", value });
  }

  while ((match = tokenPattern.exec(text)) !== null) {
    pushPlain(text.slice(cursor, match.index));

    const token = match[0];
    if (token === "\n") {
      tokens.push({ type: "br" });
    } else if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push({ type: "strong", value: token.slice(2, -2) });
    } else if (token.startsWith("*") && token.endsWith("*")) {
      tokens.push({ type: "em", value: token.slice(1, -1) });
    } else if (token.startsWith("`") && token.endsWith("`")) {
      tokens.push({ type: "code", value: token.slice(1, -1) });
    }

    cursor = tokenPattern.lastIndex;
  }

  pushPlain(text.slice(cursor));
  return tokens;
}

function appendInlineToken(container, token) {
  if (token.type === "br") {
    const br = document.createElement("br");
    container.append(br);
    return br;
  }

  if (token.type === "strong") {
    const strong = document.createElement("strong");
    strong.textContent = token.value;
    container.append(strong);
    return strong;
  }

  if (token.type === "em") {
    const em = document.createElement("em");
    em.textContent = token.value;
    container.append(em);
    return em;
  }

  if (token.type === "code") {
    const code = document.createElement("code");
    code.textContent = token.value;
    container.append(code);
    return code;
  }

  const textNode = document.createTextNode(token.value || "");
  container.append(textNode);
  return textNode;
}

function renderInlineMarkdown(container, text) {
  parseInlineTokens(text).forEach((token) => appendInlineToken(container, token));
}

function addChatMessage(role, text, isLoading = false) {
  const message = document.createElement("div");
  message.className = `chat-message ${role}${isLoading ? " loading" : ""}`;
  renderChatContent(message, text);
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

function addThinkingMessage() {
  const message = document.createElement("div");
  message.className = "chat-message bot thinking";

  const core = document.createElement("span");
  core.className = "thinking-core";

  const label = document.createElement("span");
  label.className = "thinking-label";
  label.textContent = getChatText("thinking");

  const dots = document.createElement("span");
  dots.className = "thinking-dots";
  dots.append(document.createElement("span"), document.createElement("span"), document.createElement("span"));

  message.append(core, label, dots);
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function typeTextIntoNode(node, text, chunkSize = 2, delay = 12) {
  for (let index = 0; index < text.length; index += chunkSize) {
    node.textContent += text.slice(index, index + chunkSize);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    await wait(delay);
  }
}

async function typeInlineToken(container, token) {
  if (token.type === "br") {
    container.append(document.createElement("br"));
    await wait(42);
    return;
  }

  if (token.type === "strong" || token.type === "em" || token.type === "code") {
    const element = document.createElement(token.type);
    container.append(element);
    await typeTextIntoNode(element, token.value || "", 2, token.type === "code" ? 8 : 12);
    return;
  }

  const textNode = document.createTextNode("");
  container.append(textNode);
  await typeTextIntoNode(textNode, token.value || "", 2, 12);
}

async function typeChatContent(container, text) {
  const parts = text.split(/```(?:lua|luau)?\n?([\s\S]*?)```/g);
  container.classList.add("typing");

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (!part) continue;

    if (index % 2 === 1) {
      const pre = document.createElement("pre");
      pre.className = "typing-code";
      const code = document.createElement("code");
      pre.append(code);
      container.append(pre);
      await typeTextIntoNode(code, part.trim(), 4, 7);
      pre.classList.remove("typing-code");
    } else {
      const tokens = parseInlineTokens(part.trim());
      for (const token of tokens) {
        await typeInlineToken(container, token);
      }
    }
  }

  container.classList.remove("typing");
}

async function addTypedBotMessage(text) {
  const message = document.createElement("div");
  message.className = "chat-message bot";
  chatMessages.append(message);
  await typeChatContent(message, text);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

async function requestMistralReply(message) {
  if (window.location.protocol === "file:") {
    return "";
  }

  try {
    const response = await fetch("/api/vzorkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        language: currentLanguage
      })
    });

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    return typeof data.reply === "string" ? data.reply : "";
  } catch {
    return "";
  }
}

async function answerChatMessage(message) {
  const guardResponse = getGuardResponse(message);
  if (guardResponse) {
    return guardResponse;
  }

  const remoteReply = await requestMistralReply(message);
  if (remoteReply) {
    return remoteReply;
  }

  return getLocalSimpleReply(message);
}

if (chatWidget && chatForm && chatInput && chatMessages) {
  addChatMessage("bot", getChatText("privacy"));

  chatFab?.addEventListener("click", () => {
    chatWidget.classList.add("open");
    chatInput.focus();
  });

  chatClose?.addEventListener("click", () => {
    chatWidget.classList.remove("open");
  });

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message) {
      return;
    }

    chatInput.value = "";
    addChatMessage("user", message);
    const loadingMessage = addThinkingMessage();
    const reply = await answerChatMessage(message);
    loadingMessage.remove();
    await addTypedBotMessage(reply);
  });
}

const fxCanvas = document.getElementById("fx-canvas");
const ambientScene = document.querySelector(".ambient-scene");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fxCanvas && ambientScene && !reduceMotion) {
  const ctx = fxCanvas.getContext("2d", { alpha: true });
  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.25,
    active: false
  };
  let particles = [];
  let sparks = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function updateCursorGlow(x, y) {
    ambientScene.style.setProperty("--cursor-x", `${x}px`);
    ambientScene.style.setProperty("--cursor-y", `${y}px`);
  }

  function createParticles() {
    const density = window.innerWidth < 620 ? 19000 : 12500;
    const count = Math.min(96, Math.max(42, Math.floor((width * height) / density)));

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomBetween(-0.24, 0.24),
      vy: randomBetween(0.1, 0.42),
      size: randomBetween(0.9, 2.3),
      alpha: randomBetween(0.22, 0.82),
      pulse: randomBetween(0, Math.PI * 2)
    }));
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    fxCanvas.width = Math.floor(width * dpr);
    fxCanvas.height = Math.floor(height * dpr);
    fxCanvas.style.width = `${width}px`;
    fxCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
    updateCursorGlow(pointer.x, pointer.y);
  }

  function addSparkBurst(x, y) {
    const burstSize = window.innerWidth < 620 ? 10 : 18;

    for (let i = 0; i < burstSize; i += 1) {
      const angle = (Math.PI * 2 * i) / burstSize + randomBetween(-0.18, 0.18);
      const speed = randomBetween(1.2, 3.4);

      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: randomBetween(1.4, 2.8)
      });
    }
  }

  function drawParticleLinks() {
    const linkDistance = window.innerWidth < 620 ? 108 : 150;

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];

      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);

        if (distance < linkDistance) {
          const alpha = (1 - distance / linkDistance) * 0.18;
          ctx.strokeStyle = `rgba(191, 239, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawPointerPull() {
    if (!pointer.active) {
      return;
    }

    const pullDistance = window.innerWidth < 620 ? 140 : 230;
    const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, pullDistance);
    glow.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    glow.addColorStop(0.34, "rgba(191, 239, 255, 0.1)");
    glow.addColorStop(1, "rgba(191, 239, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, pullDistance, 0, Math.PI * 2);
    ctx.fill();

    particles.forEach((particle) => {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy);

      if (distance < pullDistance) {
        const force = 1 - distance / pullDistance;
        particle.x -= dx * force * 0.002;
        particle.y -= dy * force * 0.002;
        ctx.strokeStyle = `rgba(255, 255, 255, ${force * 0.26})`;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1;

    drawParticleLinks();

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulse += 0.024;

      if (particle.y > height + 16) particle.y = -16;
      if (particle.x < -16) particle.x = width + 16;
      if (particle.x > width + 16) particle.x = -16;

      const pulseAlpha = particle.alpha + Math.sin(particle.pulse) * 0.18;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.12, pulseAlpha)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    drawPointerPull();

    sparks = sparks.filter((spark) => spark.life > 0.02);
    sparks.forEach((spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.97;
      spark.vy *= 0.97;
      spark.life *= 0.93;

      ctx.fillStyle = `rgba(191, 239, 255, ${spark.life})`;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(drawFrame);
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    updateCursorGlow(pointer.x, pointer.y);
  });

  window.addEventListener("pointerdown", (event) => {
    pointer.active = true;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    addSparkBurst(pointer.x, pointer.y);
  });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  drawFrame();
}
