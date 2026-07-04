const orderForm = document.getElementById("order-form");
const orderStatus = document.getElementById("order-status");

function setOrderStatus(message, type = "") {
  if (!orderStatus) return;
  orderStatus.textContent = message;
  orderStatus.className = `order-status ${type}`.trim();
}

function getCheckedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function getFormValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function setSubmitState(button, isSending) {
  if (!button) return;
  button.disabled = isSending;
  button.querySelector("span").textContent = isSending ? "Отправляю..." : "Отправить заказ";
}

if (orderForm) {
  const submitButton = orderForm.querySelector(".order-submit");

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const payload = {
      service: getFormValue(formData, "service"),
      contactName: getFormValue(formData, "contactName"),
      discord: getFormValue(formData, "discord"),
      telegram: getFormValue(formData, "telegram"),
      email: getFormValue(formData, "email"),
      projectName: getFormValue(formData, "projectName"),
      projectStage: getFormValue(formData, "projectStage"),
      budget: getFormValue(formData, "budget"),
      deadline: getFormValue(formData, "deadline"),
      description: getFormValue(formData, "description"),
      details: getFormValue(formData, "details"),
      references: getFormValue(formData, "references"),
      priorities: getCheckedValues(orderForm, "priorities")
    };

    if (!payload.budget || !payload.description || (!payload.discord && !payload.telegram && !payload.email)) {
      setOrderStatus("Заполни бюджет, описание и хотя бы один контакт.", "error");
      return;
    }

    setSubmitState(submitButton, true);
    setOrderStatus("Собираю заявку и отправляю в Discord...", "loading");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Не получилось отправить заявку.");
      }

      setOrderStatus(result.message || "Заявка отправлена.", "success");
      orderForm.reset();
      const firstOption = orderForm.querySelector('input[name="service"]');
      if (firstOption) firstOption.checked = true;
    } catch (error) {
      setOrderStatus(error.message || "Ошибка отправки. Попробуй ещё раз.", "error");
    } finally {
      setSubmitState(submitButton, false);
    }
  });
}
