import { Header } from "./Header.js";
import { Hero } from "./Hero.js";
import { About } from "./About.js";
import { Services } from "./Services.js";
import { Fleet } from "./Fleet.js";
import { WhyUs } from "./WhyUs.js";
import { Contact } from "./Contact.js";
import { Footer } from "./Footer.js";

export const App = () => `
  <div class="min-h-screen" data-testid="homepage">
    ${Header()}
    <main>
      ${Hero()}
      ${About()}
      ${Services()}
      ${Fleet()}
      ${WhyUs()}
      ${Contact()}
    </main>
    ${Footer()}
    <div
      data-toast
      class="hidden fixed top-4 right-4 z-[100] bg-[#111827] text-white px-6 py-4 shadow-xl max-w-sm"
      role="status"
    ></div>
  </div>
`;
