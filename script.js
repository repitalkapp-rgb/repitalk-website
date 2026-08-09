"use strict";

/*
 * 公開情報の差し替えは、まずこの設定を変更してください。
 * メインCTAは案内セクションへ誘導し、外部の参加リンクは案内内に配置しています。
 */
const SITE_CONFIG = {
  closedTestUrl: "#closed-test",
  ctaLabel: "クローズドテストに参加する",
  ctaShortLabel: "テストに参加する",
  privacyPolicyUrl: "https://sites.google.com/view/repitalk-privacyx",
};

const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".visually-hidden").textContent = "メニューを開く";
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    menuButton.querySelector(".visually-hidden").textContent = shouldOpen
      ? "メニューを閉じる"
      : "メニューを開く";
    navigation.classList.toggle("is-open", shouldOpen);
    document.body.classList.toggle("menu-open", shouldOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });
}

document.querySelectorAll("[data-test-cta]").forEach((link) => {
  link.href = SITE_CONFIG.closedTestUrl;
  link.textContent = link.classList.contains("button-small")
    ? SITE_CONFIG.ctaShortLabel
    : SITE_CONFIG.ctaLabel;
});

document.querySelectorAll("[data-privacy-link]").forEach((link) => {
  link.href = SITE_CONFIG.privacyPolicyUrl;
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
