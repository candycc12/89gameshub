(function () {
  const body = document.body;
  const pageMeta = {
    topic: body.dataset.topic || "ai_learning",
    page_slug: body.dataset.pageSlug || location.pathname.split("/").filter(Boolean).pop() || "page"
  };

  function track(eventName, detail) {
    const payload = Object.assign({}, pageMeta, detail || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }
    window.dispatchEvent(new CustomEvent("learning_page_event", { detail: { event: eventName, payload } }));
  }

  track("learning_page_view", { cta_position: "page_load", cta_type: "view" });

  document.querySelectorAll(".adsbygoogle").forEach(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      track("ad_slot_render", {
        cta_position: "after_diagnostic",
        cta_type: "adsense_responsive",
        ad_client: "ca-pub-5502975373459743",
        ad_slot: "1172840816"
      });
    } catch (error) {
      void error;
    }
  });

  document.querySelectorAll(".js-track").forEach((element) => {
    element.addEventListener("click", () => {
      track(element.dataset.event || "cta_click", {
        topic: element.dataset.topic,
        page_slug: element.dataset.pageSlug,
        cta_position: element.dataset.ctaPosition,
        cta_type: element.dataset.ctaType
      });
    });
  });

  let diagnosticStarted = false;
  const result = document.getElementById("diagnosticResult");
  const resultTitle = document.getElementById("resultTitle");
  const resultCopy = document.getElementById("resultCopy");
  document.querySelectorAll("[data-diagnostic] button").forEach((button) => {
    button.addEventListener("click", () => {
      if (!diagnosticStarted) {
        diagnosticStarted = true;
        track("diagnostic_start", {
          cta_position: "diagnostic",
          cta_type: "first_answer_click"
        });
      }
      document.querySelectorAll("[data-diagnostic] button").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      if (result && resultTitle && resultCopy) {
        resultTitle.textContent = button.dataset.resultTitle || "Your first path is ready.";
        resultCopy.textContent = button.dataset.resultCopy || "Start with one short practice session and build from there.";
        result.classList.add("is-visible");
      }
      track("diagnostic_complete", {
        cta_position: "diagnostic",
        cta_type: button.dataset.profile || "answer",
        diagnostic_profile: button.dataset.profile || "answer"
      });
    });
  });

  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest("[data-choice-group]");
      if (group) group.querySelectorAll("[data-choice]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      track("starter_lesson_click", {
        cta_position: button.dataset.choiceGroup || "starter_tool",
        cta_type: button.dataset.choice || button.textContent.trim()
      });
    });
  });

  document.querySelectorAll("[data-tool-result]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.toolResult);
      if (target) target.textContent = button.dataset.resultText || "Saved. Continue with the next step.";
      track("starter_lesson_click", {
        cta_position: button.dataset.ctaPosition || "micro_tool",
        cta_type: button.dataset.ctaType || "tool_action"
      });
    });
  });

  const form = document.querySelector("[data-waitlist-form]");
  if (form) {
    const note = form.parentElement.querySelector("[data-waitlist-note]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      const email = emailInput ? emailInput.value.trim() : "";
      if (!email) return;
      try {
        const key = `${pageMeta.page_slug}Waitlist`;
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        saved.push({ email, createdAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(saved));
      } catch (error) {
        void error;
      }
      track("email_submit", {
        cta_position: "early_access_form",
        cta_type: "send_my_plan"
      });
      if (note) note.textContent = "Saved. Your recommended path is ready to continue from lesson 1.";
      form.reset();
    });
  }
})();
