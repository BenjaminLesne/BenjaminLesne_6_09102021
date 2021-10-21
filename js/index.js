import getDatas from "./components/getDatas";
import generateArticles from "./components/generateArticles";

window.onload = async function () {
  // passer au contenu button
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

  // watch click on tags to filter main-content

  const element = document.querySelectorAll(".filter-tags__tag");
  const data = await getDatas();

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
      generateArticles(data, 1.1, photographersFiltered);
    });
  }

  generateArticles(data, 1);
};
