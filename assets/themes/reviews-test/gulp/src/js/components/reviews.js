import { addLoading, hideLoading } from "../functions/loading.js";

window.addEventListener("DOMContentLoaded", function () {
  const reviewsBlock = document.querySelector(".reviews");

  if (reviewsBlock) {
    const form = reviewsBlock.querySelector(".form");
    const reviewsCards = reviewsBlock.querySelector(".reviews__cards");
    const filter = reviewsBlock.querySelector(".reviews__filter");
    const formResult = reviewsBlock.querySelector(".form__result");
    const formResultText = formResult.querySelector(".form__result-text");

    async function post(data) {
      const _domain = window.location.origin;

      try {
        const response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          body: `action=set_reviews&data=${data}`,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let res = await response.json();

        hideLoading(form);
        formResult.classList.remove("is-hidden");
        formResultText.textContent = res.moderation_text;

        if (reviewsCards.children.length > 1) {
          filter.classList.remove("is-hidden");
        }

        setTimeout(() => {
          formResult.classList.add("is-hidden");
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        hideLoading(form);
        formResult.classList.remove("is-hidden");
        formResultText.textContent =
          "There was an error when submitting your feedback. Please try again.";
        setTimeout(() => {
          formResult.classList.add("is-hidden");
        }, 2000);
      }
    }

    const validateForm = (e) => {
      e.preventDefault();
      const fields = e.target.querySelectorAll(".field");

      const data = {
        name: null,
        message: null,
      };

      let isValid = true;

      fields.forEach((el) => {
        const value = el.value.trim();

        if (value === "") {
          el.classList.add("error");
          isValid = false;
        } else {
          el.classList.remove("error");
          data[el.name] = value;
        }
      });

      if (isValid) {
        addLoading(e.target);
        post(JSON.stringify(data));
        e.target.reset();
      } else {
        console.log("error: form validation failed");
      }
    };

    form.addEventListener("submit", (e) => {
      validateForm(e);
    });
  }
});
