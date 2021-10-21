function handleModal() {
  const body = document.querySelector("body");

  function closeModal(e) {
    let dialog;

    const targetClassName = e.explicitOriginalTarget.className;
    switch (true) {
      // if element clicked has lightbox as className then dialog is lightbox dialog
      case targetClassName.includes("lightbox"):
        dialog = document.querySelector(".contact-dialog--lightbox");
        break;

      // if element clicked has contact-dialog as className then dialog is "contact me" dialog
      case targetClassName.includes("contact-dialog"):
        dialog = document.querySelector(".contact-dialog");
        break;

      default:
        break;
    }

    dialog.removeAttribute("open");
    dialog.style.display = "none";
    body.removeAttribute("style");
  }

  const modalCrosses = document.querySelectorAll(".contact-dialog__close-btn");
  for (let i = 0; i < modalCrosses.length; i += 1) {
    modalCrosses[i].addEventListener("click", (e) => closeModal(e));
  }

  function openModal(e) {
    let dialog;
    switch (e.explicitOriginalTarget.tagName) {
      case "BUTTON":
        dialog = document.querySelector(".contact-dialog");
        break;
      case "IMG":
        dialog = document.querySelector(".contact-dialog--lightbox");
        break;

      default:
        break;
    }

    dialog.style.display = "flex";
    dialog.setAttribute("open", "");
    body.style.cssText =
      "height: 100vh; overflow-y: hidden; padding-right: 17px;";
  }

  const triggerModal = document.querySelectorAll(".triggerModal");
  for (let j = 0; j < triggerModal.length; j += 1) {
    triggerModal[j].addEventListener("click", (e) => openModal(e));
  }
}

export default handleModal;
