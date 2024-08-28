export function addLoading(item) {
  if (item) {
    item.classList.add("loading");
  }
}

export function hideLoading(item) {
  if (item) {
    item.classList.remove("loading");
  }
}
