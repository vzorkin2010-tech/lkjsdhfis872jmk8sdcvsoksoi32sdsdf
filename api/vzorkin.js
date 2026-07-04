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
  "что вы"
];

const complexTerms = [
  "inventory",
  "shop system",
  "trade",
  "trading",
  "datastore",
  "save system",
  "quest system",
  "combat",
  "economy",
  "admin",
  "full game",
  "anti cheat",
  "multiplayer system",
  "инвентарь",
  "магазин",
  "трейд",
  "сохран",
  "квест",
  "комбат",
  "экономик",
  "админ",
  "полная игра",
  "античит",
  "система"
];

const unsafeTerms = [
  "exploit",
  "executor",
  "cheat",
  "hack",
  "bypass",
  "steal",
  "cookie",
  "token",
  "scam",
  "phishing",
  "porn",
  "racist",
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

function parseBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body || "{}");
    } catch {
      return {};
    }
  }
  return {};
}

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function replyText(language, key) {
  const messages = {
    ru: {
      scope:
        "Я могу помогать только по Roblox Studio: куда положить скрипт и как написать очень простой Luau-пример.",
      unsafe:
        "Не могу помочь с этим. Я отвечаю только по безопасным Roblox Studio задачам.",
      complex:
        "Это уже не простой скрипт, а полноценная система. Лучше оформить это как услугу на сайте в разделе заказа.",
      missingKey:
        "Mistral API не настроен на сервере. Пока могу отвечать только локальными простыми шаблонами.",
      siteServices:
        "На vz.services можно заказать услуги скриптера для Roblox Studio.\n\nMini Script: одна небольшая механика, настройка в Studio и короткая инструкция.\n\nGame System: полноценная игровая система с сервером, клиентом и UI.\n\nProject Support: регулярные доработки, фиксы, оптимизация и помощь с релизом.\n\nЕсли задача простая, я могу объяснить ее тут. Если нужен магазин, инвентарь, квесты, экономика, сохранение данных, трейды, combat или другая полноценная система, лучше оформить заказ на сайте."
    },
    en: {
      scope:
        "I can only help with Roblox Studio: where scripts go and how to write very simple Luau examples.",
      unsafe: "I cannot help with that. I only answer safe Roblox Studio requests.",
      complex:
        "That is no longer a simple script. It is a full system, so please order this service on the site.",
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

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { reply: "Method not allowed" });
  }

  const body = parseBody(request);
  const message = String(body.message || "").trim().slice(0, 650);
  const language = body.language === "en" ? "en" : "ru";

  if (!message) {
    return sendJson(response, 400, { reply: replyText(language, "scope") });
  }

  const guard = guardMessage(message, language);
  if (guard) {
    return sendJson(response, 200, { reply: guard });
  }

  const apiKey = process.env.MISTRAL_API_KEY || "";
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest";

  if (!apiKey) {
    const fallback = includesAny(message.toLowerCase(), siteTerms)
      ? replyText(language, "siteServices")
      : replyText(language, "missingKey");
    return sendJson(response, 503, { reply: fallback });
  }

  const systemPrompt =
    language === "en"
      ? "You are vzorkin, a strict Roblox Studio assistant for the vz.services website. The chat is not saved. You may answer questions about this site and explain what services can be ordered: Mini Script for one small mechanic, Game System for a full server/client/UI gameplay system, and Project Support for regular fixes, optimization, improvements, and release help. Help with very simple Roblox Studio Luau scripts and where to place them. Refuse anything outside Roblox Studio, this site, or not suitable for Roblox. If the user asks for a complex system, explain that it should be ordered as a service on the site. Keep answers short. Include code only for simple scripts. Avoid decorative markdown, headings, and bold markers; use plain text plus fenced lua code blocks only when needed."
      : "Ты vzorkin, строгий помощник сайта vz.services. Чат не сохраняется. Ты можешь отвечать на вопросы про этот сайт и объяснять, какие услуги можно заказать: Mini Script для одной небольшой механики, Game System для полноценной системы с сервером/клиентом/UI, Project Support для регулярных фиксов, оптимизации, доработок и помощи с релизом. Помогай с очень простыми Roblox Studio Luau скриптами и объясняй, куда их положить. Отказывайся от всего вне Roblox Studio, вне этого сайта или неподходящего для Roblox. Если просят сложную систему, объясняй, что ее лучше заказать как услугу на сайте. Отвечай коротко. Код давай только для простых скриптов. Не используй декоративный markdown, заголовки и жирные звездочки; пиши обычным текстом и fenced lua code block только когда нужен код.";

  try {
    const apiResponse = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
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
      return sendJson(response, 502, { reply: fallback });
    }

    const data = await apiResponse.json();
    const reply = extractAssistantText(data) || replyText(language, "scope");
    return sendJson(response, 200, { reply });
  } catch {
    const fallback = includesAny(message.toLowerCase(), siteTerms)
      ? replyText(language, "siteServices")
      : replyText(language, "missingKey");
    return sendJson(response, 502, { reply: fallback });
  }
};
