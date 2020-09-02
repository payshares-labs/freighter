import { browser } from "webextension-polyfill-ts";

import { popupMessageListener } from "./messageListener/popupMessageListener";
import { lyraApiMessageListener } from "./messageListener/lyraApiMessageListener";

export const initMessageListener = () => {
  // returning true is very important in these message listeners. It tells the listener that the callback
  // could possibly be async, so keep the channel open til we send a reponse.

  browser.runtime.onMessage.addListener(
    (request, sender) =>
      new Promise((resolve) => {
        lyraApiMessageListener(request, sender, resolve);
        popupMessageListener(request, sender, resolve);
      }),
  );
};
