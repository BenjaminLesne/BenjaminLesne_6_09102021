async function getDatas() {
  try {
    const response = await fetch(`./js/components/FishEyeData.json`);
    const json = await response.json();

    return json;
  } catch (err) {
    console.error(err);
    return false;
    // Handle errors here
  }
}

export default getDatas;
