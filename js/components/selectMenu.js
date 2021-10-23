import createPhotographer from "./createPhotographer.js";

function handleSelectMenu(id, photographerDatas, mediaDatas) {
  const selectedItemElement = document.querySelector(
    ".select-menu__selected-item"
  );
  const selectedItemTextElement = document.querySelector(
    ".select-menu__selected-item-text"
  );
  const arrow = document.querySelector(".select-menu__selected-item .fas");
  const menuItems = document.querySelector(".select-menu__items");
  const menuItem = document.querySelectorAll(".select-menu__item");
  const selectMenu = document.querySelector(".select-menu");

  async function handleClick(e) {
    // if menu open, close it
    if (menuItems.style.display === "flex") {
      menuItems.style.display = "none";
      selectedItemElement.setAttribute("aria-expanded", "false");
      arrow.className = "fas fa-chevron-down";
    } else {
      // else open it
      menuItems.style.display = "flex";
      selectedItemElement.setAttribute("aria-expanded", "true");
      arrow.className = "fas fa-chevron-up";
    }
    // if e.target is an menu item...
    if (e.target === menuItem[0] || e.target === menuItem[1]) {
      const itemClickedInnerText = e.explicitOriginalTarget.innerText;
      const selectedItemTextInnerText = selectedItemTextElement.innerText;

      // ...change the selected item by e.target.innerText
      selectedItemTextElement.innerText = itemClickedInnerText;
      e.target.innerText = selectedItemTextInnerText;

      // and generate articles sorted by selectedItem
      const test = createPhotographer(photographerDatas, mediaDatas);

      test.then((tests) => tests.generateCard("media", itemClickedInnerText));
      console.log("itemClickedInnerText");
      console.log(itemClickedInnerText);
    }
  }

  selectMenu.addEventListener("click", (e) => handleClick(e));
}
export default handleSelectMenu;
