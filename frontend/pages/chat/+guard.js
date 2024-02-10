export { guard };

import { render } from "vike/abort";

async function guard(pageContext) {
  console.log("Page context");
}
