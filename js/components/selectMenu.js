import generateArticles from "./generateArticles";

function handleSelectMenu(id) {
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

  function handleClick(e) {
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

    if (e.target === menuItem[0] || e.target === menuItem[1]) {
      const itemClickedInnerText = e.explicitOriginalTarget.innerText;
      const selectedItemTextInnerText = selectedItemTextElement.innerText;

      // if e.target is an menu item, change the selected item by this one
      selectedItemTextElement.innerText = itemClickedInnerText;
      e.target.innerText = selectedItemTextInnerText;

      // generateArticles(data, 2, id);
      // generateArticles(myData, type, param)
    }

    // tu prends la valeur innerText et tu fais générer la page avec des articles étant filtrer avec la valeur
  }

  selectMenu.addEventListener("click", (e) => handleClick(e));
}
export default handleSelectMenu;
