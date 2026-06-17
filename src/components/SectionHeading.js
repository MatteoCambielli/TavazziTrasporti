export const SectionHeading = ({ kicker, title, text, light = false }) => `
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-[#10B981] text-sm font-semibold uppercase tracking-widest">
      ${kicker}
    </span>
    <h2
      class="font-['Barlow_Condensed'] text-4xl md:text-5xl font-bold uppercase tracking-tight mt-3 mb-6 ${
        light ? "text-white" : "text-[#1B4D3E]"
      }"
    >
      ${title}
    </h2>
    ${text ? `<p class="${light ? "text-gray-200" : "text-gray-600"} text-lg leading-relaxed">${text}</p>` : ""}
  </div>
`;
