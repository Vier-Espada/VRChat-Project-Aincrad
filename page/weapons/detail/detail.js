function showTab(tabId, btn) {

  const contents = document.querySelectorAll(".tab-content");
  const tabs = document.querySelectorAll(".tab");

  contents.forEach(c => c.classList.remove("active"));
  tabs.forEach(t => t.classList.remove("active"));

  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  if (btn) btn.classList.add("active");
}
