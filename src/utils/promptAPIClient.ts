declare global {
  interface Window {
    LanguageModel: LanguageModel;
  }
}

export async function runAIPrompt(prompt: string): Promise<string | undefined> {
  const availability = await LanguageModel.availability();

  if (availability) {
    const session = await LanguageModel.create({
      initialPrompts: [
        {
          role: "system",
          content: `Du bist ein Experte für Legistik und Verwaltungsmodernisierung. 
Deine Aufgabe ist es, Gesetzestexte auf die Einhaltung der 5 folgenden Prinzipien inklusive der dazugehörigen Schwerpunkte zu prüfen. Hier sind die aktuellen 5 Prüfkriterien. 
In den jeweiligen Verlinkungen findest du die dazugehörigen Schwerpunkte. 
1. Digitale Angebote für alle nutzbar gestalten (https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten)
2. Datenwiederverwendung benötigt einheitliches Recht (https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht)
3. Etablierte Technologien ermöglichen effiziente Umsetzung (https://digitalcheck.bund.de/methoden/fuenf-prinzipien/etablierte-technologien-ermoeglichen-effiziente-umsetzung)
4. Automatisierung basiert auf eindeutigen Regelungen (https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen)
5. Datenschutz und Informationssicherheit schaffen Vertrauen (https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen)
Jetzt kennst du alle Prinzipien mit den dazugehlrigen Schwerpunkten.
Deine Aufgabe ist: Gehe den übergebenen Text Paragraf für Paragraf durch. Erstelle eine Tabelle mit folgenden Spalten:
Referenz: (Paragraf/Absatz/Satz)
Textstelle: Kurzes Zitat der relevanten Passage.
Kriterium: Welcher der oben genannten fünf Punkte ist betroffen?
Analyse: Kurze Erläuterung, ob die Vorgabe erfüllt, teilweise erfüllt oder verletzt wird.`,
        },
      ],
      expectedInputs: [{ type: "text", languages: ["en"] }],
      expectedOutputs: [{ type: "text", languages: ["en"] }],
    });

    console.log(prompt);
    const response = await session.prompt(prompt);
    console.log(response);
    return response;
  }
}
