import generateFilters from "./generateFilters";

async function createPhotographer(photographerDatas, mediaDatas) {
  // returned object looks like this
  // {
  //   name: photographerDatas.name,
  //   id: photographerDatas.id,
  //   city: photographerDatas.city,
  //   country: photographerDatas.country,
  //   tags: photographerDatas.tags,
  //   tagline: photographerDatas.tagline,
  //   price: photographerDatas.price,
  //   portrait: photographerDatas.portrait,
  //   generateCard,
  // }

  async function generateInfoBlock(ShouldWeTriggerHandleModal) {
    const photographerInfoBlock = document.querySelector(
      ".photographer--photographer-page"
    ); // where we generate the content in the HTML
    let filters = "";
    filters = generateFilters(
      photographerDatas.tags,
      "filter-tags--photographer-page"
    );
    filters.then(async (allFilters) => {
      photographerInfoBlock.innerHTML = `
        <a href="photographer-page?id=243.html">
        <div
          class="
            photographer__top-content
            photographer__top-content--photographer-page
          "
        >
          <img
            src="images/Photographers_ID_Photos/${photographerDatas.portrait}"
            alt="${photographerDatas.name} profile picture"
            class="
              photographer__profile-picture
              photographer__profile-picture--photographer-page
            "
          />
        </div>
      </a>
      <div class="photographer__btn-wrapper">
        <button
          class="btn btn--photographer-page btn-and-link triggerModal"
          aria-label="contact me"
        >
          Contactez-moi
        </button>
      </div>
      <div class="photographer__text-block">
        <h2
          class="photographer__name photographer__name--photographer-page"
          aria-hidden="true"
        >
          ${photographerDatas.name}
        </h2>
        <p
          class="photographer__info photographer__info--photographer-page"
          tabindex="0"
        >
          <span
            class="photographer__location"
            aria-label="location: London, undefined"
            >${photographerDatas.city}, ${photographerDatas.country}</span
          >
          <span
            class="
              photographer__description
              photographer__description--photographer-page
            "
            aria-label="description: Voir le beau dans le quotidien"
            >Voir le beau dans le quotidien</span
          >
          <span
            class="photographer__price photographer__price--photographer-page"
            >${photographerDatas.price}€/jour</span
          >
        </p>
        ${allFilters}
      </div>
    `;
    });

    return ShouldWeTriggerHandleModal("oui");
  }

  async function generateCard(type, sortBy) {
    let photographerFullName;
    const mainContent = document.getElementById("main-content"); // where we generate the content in the HTML
    mainContent.innerHTML = ""; // remove old content

    // type profile = photographers profiles article on homepage | type media = photographers medias article on photographer-page
    switch (type) {
      case "profile":
        {
          let filters = "";
          filters = generateFilters(photographerDatas.tags);
          filters.then(async (allFilters) => {
            mainContent.innerHTML += `
    
            <article class="photographer">
              <a href="photographer-page.html?id=${photographerDatas.id}">
                <figure class="photographer__top-content">
                  <img
                    src="images/Photographers_ID_Photos/${photographerDatas.portrait}"
                    alt="${photographerDatas.name} profile picture"
                    class="photographer__profile-picture"
                  />
        
                  <figcaption>
                    <h2 class="photographer__name" aria-hidden="true">${photographerDatas.name}</h2>
                  </figcaption>
                </figure>
              </a>
              <p class="photographer__info" tabindex="0">
                <span
                  class="photographer__location"
                  aria-label="location: ${photographerDatas.city}, ${photographerDatas.country}"
                  >${photographerDatas.city}, ${photographerDatas.country}</span
                >
                <span
                  class="photographer__description"
                  aria-label="description: ${photographerDatas.tagline}"
                  >${photographerDatas.tagline}</span
                >
                <span class="photographer__price">${photographerDatas.price}€/jour</span>
              </p>${allFilters}
            </article>
          
            `;
          });
        }
        break;
      // =================case media below==================================================================================================

      case "media":
        // sort media, the default value is sorted by popularity
        switch (sortBy) {
          case "Date":
            mediaDatas.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });

            break;
          case "Titre":
            mediaDatas.sort(function (a, b) {
              return a.title.localeCompare(b.title);
            });

            break;

          default:
            mediaDatas.sort(function (a, b) {
              return b.likes - a.likes;
            });
            break;
        }

        try {
          // the name is part of a needed file path
          photographerFullName = photographerDatas.name.split(" ");

          // loop through media array and display files
          for (let j = 0; j < mediaDatas.length; j += 1) {
            if (mediaDatas[j].image) {
              // its a image
              mainContent.innerHTML += `
             
                      <article class="photographer photographer--picture-showcase">
                        <figure
                          class="
                            photographer__top-content
                            photographer__top-content--picture-showcase
                          "
                          >
                            <img
                              src="images/${photographerFullName[0]}/${mediaDatas[j].image}"
                              alt="${mediaDatas[j].title}"
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
                            ${mediaDatas[j].title}
                            </h2>
                            <button
                              type="button"
                              class="like-count like-count--photographer-page ${mediaDatas[j].id}"
                            >
                              <i class="like-count__value ${mediaDatas[j].id}"
                                >${mediaDatas[j].likes}</i> <i class="fas fa-heart ${mediaDatas[j].id}"></i
                              >
                            </button>
                          </figcaption>
                        </figure>
                      </article>
              `;
            } else {
              // it means its a video
              mainContent.innerHTML += `


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

                              <source src="images/${photographerFullName[0]}/${mediaDatas[j].video}" type="video/mp4">
                            

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
                            ${mediaDatas[j].title}
                            </h2>
                            <button
                              type="button"
                              class="like-count like-count--photographer-page 342550"
                            >
                              <i class="like-count__value ${mediaDatas[j].id}"
                                >${mediaDatas[j].likes} <i class="fas fa-heart"></i
                              ></i>
                            </button>
                          </div>
                        </div>
                      </article>
            `;
            }
          }
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        console.log("default switch haha");
        break;
    }
  }

  // construct photographer object
  return {
    name: photographerDatas.name,
    id: photographerDatas.id,
    city: photographerDatas.city,
    country: photographerDatas.country,
    tags: photographerDatas.tags,
    tagline: photographerDatas.tagline,
    price: photographerDatas.price,
    portrait: photographerDatas.portrait,
    generateCard,
    generateInfoBlock,
  };
}

export default createPhotographer;
