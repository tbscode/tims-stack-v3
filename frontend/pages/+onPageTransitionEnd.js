export { onPageTransitionEnd };

async function onPageTransitionEnd(pageContext) {
  console.log("Page transition end");
  console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
  try {
    document
      .getElementById("transitionContainer")
      .classList.remove("page-is-transitioning");
  } catch (e) {}
  try {
    document
      .getElementById("chatView")
      ?.classList.remove("page-is-transitioning");
  } catch (e) {}
  try {
    document
      .getElementById("listViewProfile")
      ?.classList.remove("page-is-transitioning");
  } catch (e) {}
}
