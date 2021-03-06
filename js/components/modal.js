function handleModal() {
  const body = document.querySelector("body");
  const carouselCurrentPictureWrapper = document.querySelector(
    ".carousel__picture-wrapper"
  );
  const carouselArrows = document.querySelectorAll(".carousel__arrows");
  const allMediaToDisplay = document.querySelectorAll(
    ".photographer__profile-picture--picture-showcase"
  );

  let currentPictureIndex;
  let carouselCurrentPicture;
  let t;

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

  function handleArrowsClick(event) {
    if (event.target.className.includes("fa-chevron-right")) {
      // allow to get the next picture later in the code
      t = 1;
    } else {
      // allow to get the previous picture later in the code
      t = -1;
    }

    for (let i = 0; i < allMediaToDisplay.length; i += 1) {
      if (allMediaToDisplay[i].src === carouselCurrentPicture.src) {
        currentPictureIndex = i;

        i = allMediaToDisplay.length;
      }
    }
    if (allMediaToDisplay[currentPictureIndex + t]) {
      // identify the type of the next media (img or video)...
      switch (allMediaToDisplay[currentPictureIndex + t].tagName) {
        case "IMG":
          // ...then insert new picture to display
          carouselCurrentPictureWrapper.innerHTML = `
        <img src=${allMediaToDisplay[currentPictureIndex + t].src} alt=${
            allMediaToDisplay[currentPictureIndex + t].alt
          } class="carousel__picture">
        <figcaption>
                <h2 class="carousel__title">${
                  allMediaToDisplay[currentPictureIndex + t].nextElementSibling
                    .firstElementChild.innerText
                }</h2>
        </figcaption>
        `;
          carouselCurrentPicture = document.querySelector(".carousel__picture"); // update currentPicture
          break;
        // ======case VIDEO below=============================================================================================================
        case "VIDEO":
          // ...then insert new video to display
          carouselCurrentPictureWrapper.innerHTML = `

        <video controls="" class="carousel__picture" aria-labelledby="video0">

          <source src=${
            allMediaToDisplay[currentPictureIndex + t].firstElementChild.src
          } type="video/mp4">

        </video>
        <figcaption>
                <h2 class="carousel__title">${
                  allMediaToDisplay[currentPictureIndex + t].nextElementSibling
                    .firstElementChild.innerText
                }</h2>
        </figcaption>
        `;
          carouselCurrentPicture = document.querySelector(".carousel__picture"); // update currentPicture

          break;

        default:
          break;
      }
    }
  }

  function openModal(e) {
    let dialog;
    switch (e.explicitOriginalTarget.tagName) {
      case "BUTTON":
        dialog = document.querySelector(".contact-dialog");
        document
          .querySelector(".contact-dialog__submit-btn")
          .addEventListener("click", (event) => {
            event.preventDefault();

            const inputElements = document.querySelectorAll(
              ".contact-dialog__input"
            );
            const textAreaElement = document.querySelector(
              ".contact-dialog__textarea"
            );

            // as asked, inputs content are shown in the console on submit
            for (let i = 0; i < inputElements.length; i += 1) {
              console.log(
                `${inputElements[i].name}: ${inputElements[i].value}`
              );
            }
            console.log(`${textAreaElement.name}: ${textAreaElement.value}`);
            // simulate submit refresh
            setTimeout(() => {
              closeModal(event);
            }, 1000);
          });

        break;

      // case "VIDEO":
      case "IMG":
        dialog = document.querySelector(".contact-dialog--lightbox");

        carouselCurrentPictureWrapper.innerHTML = `
        <img src=${e.target.src} alt=${e.target.alt} class="carousel__picture">
        <figcaption>
                <h2 class="carousel__title">${e.target.nextElementSibling.firstElementChild.innerText}</h2>
        </figcaption>
        `;
        carouselCurrentPicture = document.querySelector(".carousel__picture");
        for (let j = 0; j < carouselArrows.length; j += 1) {
          carouselArrows[j].addEventListener("click", (event) =>
            handleArrowsClick(event)
          );
        }

        document.addEventListener("keydown", function (e) {
          switch (e.code) {
            case "ArrowLeft":
              console.log("left");
              const arrowLeft = document.querySelector(
                ".carousel__arrows--left"
              );
              arrowLeft.click();
              break;

            case "ArrowRight":
              const arrowRight = document.querySelector(
                ".carousel__arrows--right"
              );
              arrowRight.click();
              break;

            default:
              console.log("NOT A ARROW DUMB ADD HAHA");
              console.log(e);
              break;
          }
        });

        break;

      default:
        break;
    }

    dialog.style.display = "flex";
    dialog.setAttribute("open", "");
    body.style.cssText =
      "height: 100vh; overflow-y: hidden; padding: 0 17px 0 0;";
  }

  const triggerModal = document.querySelectorAll(".triggerModal");
  for (let j = 0; j < triggerModal.length; j += 1) {
    triggerModal[j].addEventListener("click", (e) => openModal(e));
  }
}

export default handleModal;
