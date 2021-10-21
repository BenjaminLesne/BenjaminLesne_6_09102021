async function generateFilters(filtersTags, additionalClass) {
  let filters = ``;

  for (let i = 0; i < filtersTags.length; i += 1) {
    const filter = `
      <a href="#" class="filter-tags__tag-wrapper"
      ><span
        class="filter-tags__tag"
        role="filter"
        aria-label="Tag: ${filtersTags[i]}"
        >#${filtersTags[i]}</span
      ></a
    >`;

    filters += filter;
  }

  const filtersHTML = `
      <nav class="filter-tags ${additionalClass}">
       ${filters}
      </nav>
        `;

  return filtersHTML;
}

export default generateFilters;
