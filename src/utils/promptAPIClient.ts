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
          content: `Du bist ein Experte für Rechtsinformatik und Verwaltungsmodernisierung. 
Deine Aufgabe ist es, Gesetzestexte auf die Einhaltung der 5 folgenden Prinzipien zu prüfen. 
Die fünf Prüfkriterien lauten wie folgt:
1. Digitale Angebote für alle nutzbar gestalten
2. Datenwiederverwendung benötigt einheitliches Recht
3. Etablierte Technologien ermöglichen effiziente Umsetzung
4. Automatisierung basiert auf eindeutigen Regelungen
5. Datenschutz und Informationssicherheit schaffen Vertrauen
Deine Aufgabe: Gehe den Text Paragraf für Paragraf durch. Erstelle eine Tabelle mit folgenden Spalten:
Referenz: (Paragraf/Absatz/Satz)
Textstelle: Kurzes Zitat der relevanten Passage.
Kriterium: Welcher der oben genannten vier Punkte ist betroffen?
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
