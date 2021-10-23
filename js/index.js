import getDatas from "/components/getDatas.js";
import createPhotographer from "./components/createPhotographer.js";

window.onload = async function () {
  const element = document.querySelectorAll(".filter-tags__tag");
  const data = await getDatas();

  // passer au contenu/go back to content button
  const intersectionObserver = new IntersectionObserver(function (entries) {
    // if observed element is out of screen, show the anchor to go back to main content
    if (entries[0].intersectionRatio <= 0) {
      document.querySelector(".anchor-to-main-content").style.display =
        "initial";
    } else {
      document.querySelector(".anchor-to-main-content").style.display = "none";
    }
  });
  // start observing
  intersectionObserver.observe(document.querySelector(".header"));

  async function generateAllPhotographers(photographers) {
    // generate all photographers then store all promises in array
    const result = [];
    for (let i = 0; i < photographers.length; i += 1) {
      result.push(createPhotographer(photographers[i]));
    }
    // when all promises done, all element trigger the method generateProfileCard
    await Promise.all(result).then((value) => {
      const mainContent = document.getElementById("main-content"); // where we generate the content in the HTML
      mainContent.innerHTML = ""; // remove old content

      for (let i = 0; i < value.length; i += 1) {
        console.log(value[i]);
        value[i].generateCard("profile");
      }
    });
  }
  // watch tags on click filter main-content articles
  for (let k = 0; k < element.length; k += 1) {
    element[k].addEventListener("click", async function test(e) {
      const photographersFiltered = [];
      // look through all photographers[i]
      for (let i = 0; i < data.photographers.length; i += 1) {
        // go trough the photographers[i] tags, if same as tag cliked, filter the photographer
        for (let j = 0; j < data.photographers[i].tags.length; j += 1) {
          // remove # and lower case to compare tag clicked value to the data base values
          if (
            data.photographers[i].tags[j] ===
            e.explicitOriginalTarget.innerText.substring(1).toLowerCase()
          ) {
            photographersFiltered.push(data.photographers[i]);
          }
        }
      }

      generateAllPhotographers(photographersFiltered);
    });
  }

  generateAllPhotographers(data.photographers);
};
