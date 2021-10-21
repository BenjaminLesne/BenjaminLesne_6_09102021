import incrementLikeCount from "./components/handleLikeCount";
import handleSelectMenu from "./components/selectMenu";
import handleModal from "./components/modal";
import generateArticles from "./components/generateArticles";
import getDatas from "./components/getDatas";

window.onload = async function () {
  const data = await getDatas();
  let totalLikesValue = 0;
  const currentUrl = window.location.href;
  const paramString = currentUrl.split("?")[1];
  const queryString = new URLSearchParams(paramString);
  const id = queryString.get("id");

  handleSelectMenu(id);
  handleModal();
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

  generateArticles(data, 2, id).then(function () {
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
      if (data.photographers[l].id === parseInt(id, 10)) {
        document.querySelector(
          ".likes-and-price__price"
        ).innerText = `${data.photographers[l].price}€/jour`;
      }
    }
  });
};
