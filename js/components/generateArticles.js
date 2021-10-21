import generateFilters from "./generateFilters";

async function generateArticles(myData, type, param) {
  const mainContent = document.getElementById("main-content"); // where we generate the content in the HTML
  mainContent.innerHTML = ""; // remove old content

  let contentHTML = ``;
  const data = myData;
  let photographerFullName;
  let id;

  // ridiculous function to prevent eslint from bothering me with no-loop-func error
  function addToContentHTML(e) {
    contentHTML += e;
  }

  switch (type) {
    case 1.1:
      data.photographers = param;
    // fall through
    case 1:
      {
        let filters = "";

        // loop through data.photographers
        for (let i = 0; i < data.photographers.length; i += 1) {
          filters = generateFilters(data.photographers[i].tags);
          filters.then(async (allFilters) => {
            addToContentHTML(`

            <article class="photographer">
              <a href="photographer-page.html?id=${data.photographers[i].id}">
                <figure class="photographer__top-content">
                  <img
                    src="images/Photographers_ID_Photos/${data.photographers[i].portrait}"
                    alt="${data.photographers[i].name} profile picture"
                    class="photographer__profile-picture"
                  />
        
                  <figcaption>
                    <h2 class="photographer__name" aria-hidden="true">${data.photographers[i].name}</h2>
                  </figcaption>
                </figure>
              </a>
              <p class="photographer__info" tabindex="0">
                <span
                  class="photographer__location"
                  aria-label="location: ${data.photographers[i].city}, ${data.photographers.country}"
                  >${data.photographers[i].city}, ${data.photographers[i].country}</span
                >
                <span
                  class="photographer__description"
                  aria-label="description: ${data.photographers[i].tagline}"
                  >${data.photographers[i].tagline}</span
                >
                <span class="photographer__price">${data.photographers[i].price}€/jour</span>
              </p>${allFilters}
            </article>
          
            `);
          });
        }
      }

      break;

    case 2:
      id = param;
      // look for photographerName based on his id found in the url params
      try {
        for (let i = 0; i < data.photographers.length; i += 1) {
          if (data.photographers[i].id === parseInt(id, 10)) {
            photographerFullName = data.photographers[i].name.split(" ");

            i = data.photographers.length;
          }
        }
        console.log(data.media);
        // loop through media array and display files with the same author id than the url params
        for (let j = 0; j < data.media.length; j += 1) {
          if (data.media[j].photographerId === parseInt(id, 10)) {
            let myArticle;

            if (data.media[j].image) {
              myArticle = `
             
          <article class="photographer photographer--picture-showcase">
            <figure
              class="
                photographer__top-content
                photographer__top-content--picture-showcase
              "
              >
                <img
                  src="images/${photographerFullName[0]}/${data.media[j].image}"
                  alt="${data.media[j].title}"
                  class="
                    photographer__profile-picture
                    photographer__profile-picture--picture-showcase
                    triggerModal
                  "
                />
                <figcaption
                class="
                  photographer__figcaption
                  photographer__figcaption--picture-showcase
                "
              >
                <h2
                  class="photographer__name photographer__name--picture-showcase"
                >
                ${data.media[j].title}
                </h2>
                <button
                  type="button"
                  class="like-count like-count--photographer-page ${data.media[j].id}"
                >
                  <i class="like-count__value ${data.media[j].id}"
                    >${data.media[j].likes}</i> <i class="fas fa-heart ${data.media[j].id}"></i
                  >
                </button>
              </figcaption>
            </figure>
          </article>
              `;
            } else {
              myArticle = `


            <article class="photographer photographer--picture-showcase">
            <div
              class="
                photographer__top-content
                photographer__top-content--picture-showcase
              "
              >
              <video
              controls
              class="
                photographer__profile-picture
                photographer__profile-picture--picture-showcase
                triggerModal
              "
              aria-labelledby="video${j}"
              >

                  <source src="images/${photographerFullName[0]}/${data.media[j].video}" type="video/mp4">
                

              </video>
              
              <div
                class="
                  photographer__figcaption
                  photographer__figcaption--picture-showcase
                "
              >
                <h2
                  class="photographer__name photographer__name--picture-showcase"
                  id="video${j}"
                >
                ${data.media[j].title}
                </h2>
                <button
                  type="button"
                  class="like-count like-count--photographer-page 342550"
                >
                  <i class="like-count__value ${data.media[j].id}"
                    >${data.media[j].likes} <i class="fas fa-heart"></i
                  ></i>
                </button>
              </div>
            </div>
          </article>
            `;
            }

            addToContentHTML(myArticle);
          }
        }
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      console.log("default case");
      break;
  }
  await Promise.all(contentHTML);
  mainContent.innerHTML += contentHTML;
}

export default generateArticles;
