import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8788);
const envPath = path.join(root, ".env");

if (existsSync(envPath)) {
  const envText = readFileSync(envPath, "utf8");
  envText.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!match) return;
    const [, key, rawValue] = match;
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  });
}

const mistralApiKey = process.env.MISTRAL_API_KEY || "";
const mistralModel = process.env.MISTRAL_MODEL || "mistral-small-latest";
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || "";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json"
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
  "tool",
  "gui",
  "роблокс",
  "студи",
  "скрипт",
  "парт",
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
  "quest",
  "combat",
  "admin",
  "anti-cheat",
  "pathfinding",
  "matchmaking",
  "developer product",
  "gamepass",
  "full system",
  "complete system",
  "сохран",
  "инвент",
  "магазин",
  "эконом",
  "трейд",
  "квест",
  "комбат",
  "админ",
  "античит",
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

function replyText(language, key) {
  const messages = {
    ru: {
      scope:
        "Я могу помогать только по Roblox Studio: куда положить скрипт и как написать очень простой Luau-пример.",
      unsafe:
        "Не могу помогать с этим. Я отвечаю только по безопасным Roblox Studio задачам.",
      complex:
        "Это уже не простой скрипт, а полноценная система. Лучше обратитесь за этой услугой на нашем сайте в разделе пакетов.",
      missingKey:
        "Mistral API не настроен на сервере. Пока могу отвечать только локальными простыми шаблонами.",
      siteServices:
        "На vz.services можно заказать услуги скриптера для Roblox Studio.\n\nMini Script: одна небольшая механика, настройка в Studio и краткая инструкция.\n\nGame System: полноценная игровая система с сервером, клиентом и UI.\n\nProject Support: регулярные доработки, фиксы, оптимизация и помощь с релизом.\n\nЕсли задача простая, я могу объяснить ее тут. Если нужен магазин, инвентарь, квесты, экономика, сохранение данных, трейды, combat или другая полноценная система, лучше оформить это как услугу."
    },
    en: {
      scope:
        "I can only help with Roblox Studio: where scripts go and how to write very simple Luau examples.",
      unsafe: "I cannot help with that. I only answer safe Roblox Studio requests.",
      complex:
        "That is no longer a simple script. It is a full system, so please order this service on the site packages section.",
      missingKey:
        "Mistral API is not configured on the server. For now, I can only use local simple templates.",
      siteServices:
        "On vz.services you can order Roblox Studio scripting services.\n\nMini Script: one small mechanic, Studio setup, short instructions.\n\nGame System: a complete gameplay system with server logic, client logic, and UI.\n\nProject Support: regular improvements, bug fixes, optimization, and release help.\n\nIf your task is simple, I can explain it here. If it is a shop, inventory, quest, economy, saving system, trading, combat, or another full system, it is better to order it as a service."
    }
  };

  return messages[language]?.[key] || messages.ru[key];
}

function guardMessage(message, language) {
  const text = message.toLowerCase();

  if (includesAny(text, unsafeTerms)) return replyText(language, "unsafe");
  if (includesAny(text, siteTerms)) return "";
  if (!(includesAny(text, robloxTerms) || includesAny(text, simpleTerms))) {
    return replyText(language, "scope");
  }
  if (includesAny(text, complexTerms)) return replyText(language, "complex");
  return "";
}

function readJsonBody(request, maxLength = 12000) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxLength) {
        request.destroy();
        reject(new Error("Request too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function extractAssistantText(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((chunk) => {
        if (typeof chunk === "string") return chunk;
        return chunk?.text || "";
      })
      .join("")
      .trim();
  }
  return "";
}

async function handleVzorkin(request, response) {
  const body = await readJsonBody(request, 4096);
  const message = String(body.message || "").trim().slice(0, 650);
  const language = body.language === "en" ? "en" : "ru";

  if (!message) {
    sendJson(response, 400, { reply: replyText(language, "scope") });
    return;
  }

  const guard = guardMessage(message, language);
  if (guard) {
    sendJson(response, 200, { reply: guard });
    return;
  }

  if (!mistralApiKey) {
    const fallback = includesAny(message.toLowerCase(), siteTerms)
      ? replyText(language, "siteServices")
      : replyText(language, "missingKey");
    sendJson(response, 503, { reply: fallback });
    return;
  }

  const systemPrompt =
    language === "en"
      ? "You are vzorkin, a strict Roblox Studio assistant for the vz.services website. The chat is not saved. You may answer questions about this site and explain what services can be ordered: Mini Script for one small mechanic, Game System for a full server/client/UI gameplay system, and Project Support for regular fixes, optimization, improvements, and release help. Help with very simple Roblox Studio Luau scripts and where to place them. Refuse anything outside Roblox Studio, this site, or not suitable for Roblox. If the user asks for a complex system, explain that it should be ordered as a service on the site. Keep answers short. Include code only for simple scripts. Avoid decorative markdown, headings, and bold markers; use plain text plus fenced lua code blocks only when needed."
      : "Ты vzorkin, строгий помощник сайта vz.services. Чат не сохраняется. Ты можешь отвечать на вопросы про этот сайт и объяснять, какие услуги можно заказать: Mini Script для одной небольшой механики, Game System для полноценной системы с сервером/клиентом/UI, Project Support для регулярных фиксов, оптимизации, доработок и помощи с релизом. Помогай с очень простыми Roblox Studio Luau скриптами и объясняй, куда их положить. Отказывайся от всего вне Roblox Studio, вне этого сайта или не подходящего для Roblox. Если просят сложную систему, объясняй, что ее лучше заказать как услугу на сайте. Отвечай коротко. Код давай только для простых скриптов. Не используй декоративный markdown, заголовки и жирные звездочки; пиши обычным текстом и fenced lua code block только когда нужен код.";

  const apiResponse = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mistralApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: mistralModel,
      temperature: 0.25,
      max_tokens: 650,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    })
  });

  if (!apiResponse.ok) {
    const fallback = includesAny(message.toLowerCase(), siteTerms)
      ? replyText(language, "siteServices")
      : replyText(language, "missingKey");
    sendJson(response, 502, { reply: fallback });
    return;
  }

  const data = await apiResponse.json();
  const reply = extractAssistantText(data) || replyText(language, "scope");
  sendJson(response, 200, { reply });
}

function cleanText(value, maxLength = 500) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanLongText(value, maxLength = 1800) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function formatList(value) {
  if (!Array.isArray(value)) return "Не указано";
  const items = value.map((item) => cleanText(item, 80)).filter(Boolean);
  return items.length ? items.join(", ") : "Не указано";
}

function buildOrderField(name, value, inline = false) {
  return {
    name,
    value: value || "Не указано",
    inline
  };
}

async function handleOrder(request, response) {
  const body = await readJsonBody(request);

  const service = cleanText(body.service, 120);
  const budget = cleanText(body.budget, 120);
  const deadline = cleanText(body.deadline, 120);
  const contactName = cleanText(body.contactName, 120);
  const discord = cleanText(body.discord, 120);
  const telegram = cleanText(body.telegram, 120);
  const email = cleanText(body.email, 160);
  const projectName = cleanText(body.projectName, 160);
  const projectStage = cleanText(body.projectStage, 120);
  const references = cleanText(body.references, 300);
  const description = cleanLongText(body.description, 1800);
  const details = cleanLongText(body.details, 1200);
  const priorities = formatList(body.priorities);

  if (!service || !budget || !description || (!discord && !telegram && !email)) {
    sendJson(response, 400, {
      ok: false,
      message: "Заполни услугу, бюджет, описание и хотя бы один контакт."
    });
    return;
  }

  if (!discordWebhookUrl) {
    sendJson(response, 500, {
      ok: false,
      message: "Webhook не настроен на сервере."
    });
    return;
  }

  const contactLines = [
    contactName ? `Имя: ${contactName}` : "",
    discord ? `Discord: ${discord}` : "",
    telegram ? `Telegram: ${telegram}` : "",
    email ? `Email: ${email}` : ""
  ].filter(Boolean);

  const embed = {
    title: "Новый заказ на vz.services",
    color: 0xbfefff,
    description,
    fields: [
      buildOrderField("Услуга", service, true),
      buildOrderField("Бюджет", budget, true),
      buildOrderField("Срок", deadline || "Не указан", true),
      buildOrderField("Контакты", contactLines.join("\n") || "Не указано"),
      buildOrderField("Проект", projectName || "Не указано", true),
      buildOrderField("Стадия проекта", projectStage || "Не указано", true),
      buildOrderField("Что нужно", priorities),
      buildOrderField("Детали", details || "Не указано"),
      buildOrderField("Референсы / ссылки", references || "Не указано")
    ],
    footer: {
      text: "vz.services order form"
    },
    timestamp: new Date().toISOString()
  };

  const webhookResponse = await fetch(discordWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "vz.services orders",
      embeds: [embed]
    })
  });

  if (!webhookResponse.ok) {
    sendJson(response, 502, {
      ok: false,
      message: "Discord не принял заявку. Попробуй позже."
    });
    return;
  }

  sendJson(response, 200, {
    ok: true,
    message: "Заявка отправлена. Я скоро посмотрю детали."
  });
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const targetPath = path.normalize(path.join(root, pathname));

  if (!targetPath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(targetPath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(targetPath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "POST" && request.url?.startsWith("/api/vzorkin")) {
      await handleVzorkin(request, response);
      return;
    }

    if (request.method === "POST" && request.url?.startsWith("/api/order")) {
      await handleOrder(request, response);
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response);
      return;
    }

    response.writeHead(405);
    response.end("Method not allowed");
  } catch {
    sendJson(response, 500, { reply: "Server error" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`vz.services running at http://127.0.0.1:${port}/`);
});
