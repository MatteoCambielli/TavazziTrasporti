import { Locations } from "./Locations.js";
import { Header } from "./Header.js";
import { Hero } from "./Hero.js";
import { About } from "./About.js";
import { Services } from "./Services.js";
import { Fleet } from "./Fleet.js";
import { WhyUs } from "./WhyUs.js";
import { Contact } from "./Contact.js";
import { Footer } from "./Footer.js";

import { Legal, NotFound } from "./Legal.js";

export const App = (path = "/") => `
  <div class="min-h-screen" data-testid="homepage">
    <a class="skip-link" href="#main-content">Vai al contenuto</a>
    ${Header()}
    <main id="main-content" tabindex="-1">
      ${
        path === "/dove-siamo"
          ? Locations()
          : path === "/privacy" || path === "/cookie-policy"
            ? Legal(path)
            : path !== "/"
              ? NotFound()
              : `
      ${Hero()}
      ${About()}
      ${Services()}
      ${Fleet()}
      ${WhyUs()}
      ${Contact()}`
      }
    </main>
    ${Footer()}
  </div>
`;
