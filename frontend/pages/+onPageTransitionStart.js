export { onPageTransitionStart };

async function onPageTransitionStart(pageContext) {
  console.log("Page transition start");
  console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
  try {
    document
      .getElementById("transitionContainer")
      .classList.add("page-is-transitioning");
  } catch (e) {}
  try {
    document.getElementById("chatView")?.classList.add("page-is-transitioning");
  } catch (e) {}
  try {
    document
      .getElementById("listViewProfile")
      ?.classList.add("page-is-transitioning");
  } catch (e) {}
}
