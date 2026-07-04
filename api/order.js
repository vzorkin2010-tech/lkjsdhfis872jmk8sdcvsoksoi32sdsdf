function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

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

function buildField(name, value, inline = false) {
  return {
    name,
    value: value || "Не указано",
    inline
  };
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, {
      ok: false,
      message: "Метод не поддерживается."
    });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || "";
  const body = parseBody(request);

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
    return sendJson(response, 400, {
      ok: false,
      message: "Заполни услугу, бюджет, описание и хотя бы один контакт."
    });
  }

  if (!webhookUrl) {
    return sendJson(response, 500, {
      ok: false,
      message: "Webhook не настроен на сервере."
    });
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
      buildField("Услуга", service, true),
      buildField("Бюджет", budget, true),
      buildField("Срок", deadline || "Не указан", true),
      buildField("Контакты", contactLines.join("\n") || "Не указано"),
      buildField("Проект", projectName || "Не указано", true),
      buildField("Стадия проекта", projectStage || "Не указано", true),
      buildField("Что нужно", priorities),
      buildField("Детали", details || "Не указано"),
      buildField("Референсы / ссылки", references || "Не указано")
    ],
    footer: {
      text: "vz.services order form"
    },
    timestamp: new Date().toISOString()
  };

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "vz.services orders",
        embeds: [embed]
      })
    });

    if (!discordResponse.ok) {
      return sendJson(response, 502, {
        ok: false,
        message: "Discord не принял заявку. Попробуй позже."
      });
    }

    return sendJson(response, 200, {
      ok: true,
      message: "Заявка отправлена. Я скоро посмотрю детали."
    });
  } catch {
    return sendJson(response, 502, {
      ok: false,
      message: "Не получилось отправить заявку. Попробуй позже."
    });
  }
};
