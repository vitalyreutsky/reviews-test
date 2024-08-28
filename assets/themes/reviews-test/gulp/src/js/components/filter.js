import { addLoading, hideLoading } from "../functions/loading.js";

window.addEventListener("DOMContentLoaded", () => {
  const btnsSort = document.querySelectorAll(".sort-btn");
  const reviewsCards = document.querySelector(".reviews__cards");

  btnsSort.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btnsSort.forEach((btnItem) => {
        btnItem.classList.remove("active");
      });

      btn.classList.add("active");
      const value = btn.getAttribute("value");
      addLoading(reviewsCards.parentElement);
      sort(value);
    });
  });

  async function sort(value) {
    const _domain = window.location.origin;
    const post_id = document.querySelector(".hide-field").getAttribute("value");

    try {
      const response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: `action=sort_reviews&date=${value}&post_id=${post_id}`,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();

      if (res) {
        hideLoading(reviewsCards.parentElement);
        reviewsCards.innerHTML = res.result;
      } else {
        console.error("No results received");
        hideLoading(reviewsCards.parentElement);
      }
    } catch (error) {
      console.error("Error:", error);
      hideLoading(reviewsCards.parentElement);
    }
  }
});
