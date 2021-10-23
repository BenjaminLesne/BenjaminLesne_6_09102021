import incrementLikeCount from "./components/handleLikeCount.js";
import handleSelectMenu from "./components/selectMenu.js";
import handleModal from "./components/modal.js";
import getDatas from "./components/getDatas.js";
import createPhotographer from "./components/createPhotographer.js";

window.onload = async function () {
  let photographerDatas;
  let totalLikesValue = 0;
  const data = await getDatas();
  const mediaDatas = [];

  const currentUrl = window.location.href;
  const paramString = currentUrl.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const id = parseInt(queryString.get("id"), 10);

  // get media datas of a photographer based on the url id param
  for (let i = 0; i < data.media.length; i += 1) {
    if (data.media[i].photographerId === id) {
      mediaDatas.push(data.media[i]);
    }
  }
  // get photographer datas based on the url id param
  for (let i = 0; i < data.photographers.length; i += 1) {
    if (data.photographers[i].id === id) {
      photographerDatas = data.photographers[i];

      i = data.photographers.length;
    }
  }

  // create a photographer object
  const photographer = await createPhotographer(photographerDatas, mediaDatas);

  async function handleIncrementation(e) {
    const elementClassName = e.explicitOriginalTarget.classList;
    const pictureId = elementClassName[elementClassName.length - 1];
    const infos = incrementLikeCount(data, pictureId);

    infos.then((info) => {
      data.media[info.index].likes = info.likes;

      // change the likes value displayed
      document.getElementsByClassName(
        `like-count__value ${pictureId}`
      )[0].innerText = data.media[info.index].likes;

      totalLikesValue += 1;
      document.querySelector(".likes-and-price__total-likes-value").innerText =
        totalLikesValue;
    });
  }

  const generateMediaCards = photographer.generateCard("media");

  generateMediaCards.then(function () {
    const elements = document.querySelectorAll(".like-count");

    for (let i = 0; i < elements.length; i += 1) {
      // on click increment likes value of the picture
      elements[i].addEventListener("click", (e) => handleIncrementation(e));

      // generate total likes before any interaction done by the user
      totalLikesValue += parseInt(elements[i].firstElementChild.innerText, 10);
      document.querySelector(".likes-and-price__total-likes-value").innerText =
        totalLikesValue;
    }

    for (let l = 0; l < data.photographers.length; l += 1) {
      if (data.photographers[l].id === id) {
        document.querySelector(
          ".likes-and-price__price"
        ).innerText = `${data.photographers[l].price}€/jour`;
      }
    }
  });

  const testou = new Promise((ShouldWeTriggerHandleModal) =>
    photographer.generateInfoBlock(ShouldWeTriggerHandleModal)
  );

  testou.then(() => handleModal());
  console.log(testou);

  handleSelectMenu(id, photographerDatas, mediaDatas);
};
