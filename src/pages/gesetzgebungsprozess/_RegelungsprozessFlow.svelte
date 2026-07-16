<script lang="ts">
  import { setContext } from "svelte";
  import { tv } from "tailwind-variants";
  import Bubble from "./_Bubble.svelte";
  import Cluster from "./_Cluster.svelte";
  import { BUBBLE_HIGHLIGHT_CONTEXT_NAME } from "./_bubbleHighlight";

  let {
    orientation = "vertical",
    highlighted = $bindable([]),
  }: {
    orientation?: "vertical" | "horizontal";
    /**
     * Titles of the bubbles to highlight. When empty, all bubbles show
     * their normal color; otherwise, every bubble not listed here is
     * grayscale-filtered. Bindable so callers can control it externally.
     */
    highlighted?: string[];
  } = $props();

  const isVertical = $derived(orientation === "vertical");

  // Exposed via context (rather than threaded through every `<Bubble>`
  // usage) so any descendant Bubble can reactively read the current
  // highlight list without every call site needing a `highlighted` prop.
  setContext(BUBBLE_HIGHLIGHT_CONTEXT_NAME, {
    get highlighted() {
      return highlighted;
    },
  });

  const container = tv({
    base: "relative flex",
    variants: {
      orientation: {
        horizontal: "h-900 flex-row items-stretch -space-x-48 px-32",
        vertical: "mx-auto w-1000 flex-col -space-y-48",
      },
    },
  });

  // Anchor names connecting the title dot of the first and last cluster, so
  // a single line can be drawn between them regardless of how many clusters
  // (and how much packed bubble content) sit in between.
  const CLUSTER_FIRST_ANCHOR = "--cluster-first";
  const CLUSTER_LAST_ANCHOR = "--cluster-last";

  const connectorStyle = $derived(
    orientation === "vertical"
      ? `left: calc(anchor(${CLUSTER_FIRST_ANCHOR} center) - 0.5px); top: anchor(${CLUSTER_FIRST_ANCHOR} center); bottom: anchor(${CLUSTER_LAST_ANCHOR} center); width: 1px;`
      : `top: calc(anchor(${CLUSTER_FIRST_ANCHOR} center) - 0.5px); left: anchor(${CLUSTER_FIRST_ANCHOR} center); right: anchor(${CLUSTER_LAST_ANCHOR} center); height: 1px;`,
  );
</script>

<div class={container({ orientation })}>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute bg-black m-0"
    style={connectorStyle}
  ></div>

  <div
    class={`flex items-center justify-center ${isVertical ? "mb-100" : "flex-col mr-100"}`}
  >
    <Bubble
      color="#E6E6E6"
      title="Initiative des Bundestages"
      className="w-full h-full m-48"
    >
      {#snippet body()}
        <p class="text-4xl font-bold">24&nbsp;%</p>
      {/snippet}
    </Bubble>
    <Cluster color="#D59FDE" offset={0}>
      <Bubble title="Aus der Mitte der Regierung">
        {#snippet body()}
          <p class="text-4xl font-bold">60&nbsp;%</p>
        {/snippet}
      </Bubble>
    </Cluster>
    <Bubble
      color="#E6E6E6"
      title="Initiative des Bundesrates"
      className="w-full h-full m-48"
    >
      {#snippet body()}
        <p class="text-4xl font-bold">16&nbsp;%</p>
      {/snippet}
    </Bubble>
  </div>

  <Cluster
    color="#BCA6DC"
    {orientation}
    anchorName={CLUSTER_FIRST_ANCHOR}
    title="Interessensermittlung"
  >
    <Bubble title="Arbeits&shy;gruppen&shy;bildung" badge="Optional" size="md"
    ></Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster color="#BCA6DC" {orientation}>
    <Bubble title="Federführung" size="md"
      >Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung der
      Regelung. Legist:in wird zugewiesen.</Bubble
    >
  </Cluster>

  <Cluster color="#B3B7E0" {orientation} title="Recherche">
    <Bubble title="Gesetzes&shy;umfeld" size="sm">
      <p>Wovon wird die Regelung beeinflusst?</p>
      <ul>
        <li>
          Kontrolle aktiver und passiver Verweisungen innerhalb des
          Gesetzgebungsverfahrends
        </li>
        <li>Kontrolle der verwendeten Rechtsbegriffe</li>
        <li>Auffinden von kollidierenden Rechtsvorschriften</li>
        <li>Feststellung der aktuellen Rechtslage</li>
      </ul>
    </Bubble>
    <Bubble title="Vorschläge von Verbänden" badge="Optional" size="md"
    ></Bubble>
    <Bubble title="Erarbeiten von Eckpunkten" badge="Optional" size="md">
      Je nach Komplexität wird ein Eckpunktepapier verfasst oder nicht.
    </Bubble>
    <Bubble title="Gutachten und Sach&shy;verständigen&shy;kommissionen"
    ></Bubble>
    <Bubble title="Material&shy;recherche" size="sm">
      Recherchiert Daten, die relevant für das Gesetz sind sowie das
      Gesetzesumfeld.
    </Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
    <Bubble title="Ziel- und Wirkungs&shy;definition" size="sm"></Bubble>
    <Bubble title="Vorarbeit" size="sm">
      Zieht Arbeit aus anderen Fach-Referaten über das Gesetzesthema zusammen.
    </Bubble>
  </Cluster>

  <Cluster color="#ABD7F9" {orientation} title="Referentenentwurf">
    <Bubble title="Frühzeitige Beteiligung" badge="Optional">
      Von Betroffenen und Vollzug und anderen Wissensträgern (z.B. Verbänden,
      Ländern, Kommunen, Wissenschaft)
    </Bubble>
    <Bubble title="Austausch" size="sm">
      Austausch mit Netzwerk, Expert:innen, anderen Ministerien, ggf.
      Spiegelreferat
    </Bubble>
    <Bubble title="Vorblatt" size="sm">
      <ul>
        <li>Problem und Ziel</li>
        <li>Lösung</li>
        <li>Alternativen</li>
        <li>Haushaltsausgaben ohne Erfüllungsaufwand</li>
        <li>Erfüllungsaufwand</li>
        <li>Weitere Kosten</li>
      </ul>
    </Bubble>
    <Bubble title="Rohentwurf" size="sm">
      Schreibt ersten Entwurf mit Kommentarspalte. Allein oder mit ein oder
      mehreren weiteren Legist:innen zusammen.
    </Bubble>
    <Bubble title="Gesetzesfolgen werden besprochen" badge="Optional"></Bubble>
  </Cluster>

  <Cluster color="#A0EBEE" {orientation} title="Hausentwurf">
    <Bubble title="Beteiligung der Referate" size="md">
      Bittet hausinterne Referate um Feedback.
    </Bubble>
    <Bubble title="Hausentwurf" size="sm">
      Ein mit den hausinternen Referaten abgeklärter Entwurf.
    </Bubble>
    <Bubble
      title="Frühkoordinierung / Vorhabenclearing Bundeskanzleramt"
      size="lg"
    ></Bubble>
  </Cluster>

  <Cluster color="#9EDCD0" {orientation} title="Ressortentwurf">
    <Bubble title="Gesetzes&shy;folgen&shy;abschätzung" size="md">
      Beabsichtigte Wirkungen und unbeabsichtigte Nebenwirkungen
      (Haushaltsausgaben, Demographische Auswirkungen, Nachhaltigkeitsaspekte,
      Erfüllungsaufwand, Auswirkungen auf das Preisniveau)
    </Bubble>
    <Bubble title="Beteiligung Dritter" size="sm">
      <p>
        Einholung externer Expertise bspw. über Stellungnahmen, Anhörungen,
        Fachgespräche, Workshops
      </p>
      <ul>
        <li>Länder,</li>
        <li>kommunale Spitzenverbänden,</li>
        <li>Fachkreise,</li>
        <li>Verbände</li>
      </ul>
    </Bubble>
    <Bubble title="Weitere Abstimmungen & Stellung&shy;nahmen" size="md">
      <p>
        Es werden Stellungnahmen zum Hausentwurf eingeholt. Der Ressortentwurf
        wird bei Bedarf angepasst.
      </p>
      <ul>
        <li>Betroffene Ressorts</li>
        <li>Bundesinnenministerium</li>
        <li>Bundesjustizministerium</li>
        <li>Normenkontrollrat</li>
      </ul>
    </Bubble>
    <Bubble title="Ressort&shy;entwurf" size="sm">
      Referententwurf wird angepasst und Regierungsentwurf vorbereitet
    </Bubble>
    <Bubble title="Politische Abstimmung" size="sm">
      <p>Der Ressortentwurf wird bei Bedarf angepasst.</p>
      <ul>
        <li>Ressortabstimmung</li>
        <li>Koalitionsausschuss</li>
      </ul>
    </Bubble>
  </Cluster>

  <Cluster color="#9EDCD0" {orientation}>
    <Bubble title="Verbände informieren" size="md">
      Die betroffenen Verbände werden über den Ressortentwurf informiert.
    </Bubble>
  </Cluster>

  <Cluster color="#D2EDB9" {orientation} title="Kabinettvorlage">
    <Bubble title="Kabinett&shy;vorlage erstellen" size="sm">
      Die Kabinettvorlage beinhaltet neben dem Ressortentwurf weitere Dokumente,
      die benötigt werden um das Gesetz im Kabinett zu behandeln (Sprechzettel,
      Anschreiben, NKR Stellungnahme, Beteiligungen ...); geregelt durch GGO* §
      50.
    </Bubble>
    <Bubble title="Unterzeichnen der Kabinett&shy;vorlage" size="md">
      Die Kabinettvorlage wird unterzeichnet von Unterabteilungsleitung,
      Abteilungsleitung und Hausleitung (bzw. Staatssekretär:in in Vertretung)
    </Bubble>
  </Cluster>

  <Cluster color="#D2EDB9" {orientation}>
    <Bubble title="Weiterleitung an das Bundes&shy;kanzleramt" size="md">
      Fachreferat leitet die Kabinettvorlage an Bundeskanzleramts-Chef:in weiter
      (mind. 8 Tage vor der Kabinettsitzung). Einbindung Spiegel- &
      Kabinettreferat im Rahmen des Zeichnungs-vorgangs.
    </Bubble>
  </Cluster>

  <Cluster color="#D2EDB9" {orientation} title="Verabschiedung des Gesetzes">
    <Bubble title="Stellungnahme Bundesrat">
      <h3>Weiterleitung an den Bundesrat</h3>
      <p>
        Chef:in des Bundeskanzleramts setzt die Kabinettvorlage auf die Agenda
        der Kabinettsitzung. Leitet die Kabinettvorlage an den Bundesrat.
      </p>
      <h3>Stellungnahme</h3>
      <p>
        Der Bundesrat nimmt sich der Vorlage an und bezieht innerhalb von 6
        Wochen Stellung dazu.
      </p>
      <h3>Weiterleitung an den Bundestag</h3>
      Leitet Vorlage mit Stellungnahme und Gegenäußerung an den/die Präsident:in des
      Bundestages.
    </Bubble>
  </Cluster>

  <Cluster color="#EBF5B3" {orientation}>
    <Bubble title="Abstimmung im Bundestag">
      <h3>Ausschuss</h3>
      <p>
        Regelung wird an den zuständigen Ausschuss geleitet, dort geprüft und
        bearbeitet. Im Ausschuss wird ein Bericht verfasst mit einer
        Beschlussempfehlung und dem Plenum vorgelegt.
      </p>
      <h3>Erste Lesung</h3>
      <h3>Zweite Lesung</h3>
      <p>
        Der Gesetzesentwurf wird mit dem Ausschussbericht und den
        Änderungsvorschlägen besprochen. Abstimmung und Einbringung von
        Änderungsanträgen.
      </p>
      <h3>Dritte Lesung</h3>
      <p>
        Der Gesetzentwurf wird der <strong>Schlussabstimmung</strong> unterzogen.
      </p>
      <h3>Abstimmung im Bundesrat (optional)</h3>
    </Bubble>
  </Cluster>

  <Cluster color="#FFFBB5" {orientation}>
    <Bubble title="Verkündung">
      <h3>Verkündung</h3>
      <p>
        Der Gesetzestext wird im Bundesgesetzblatt veröffentlicht. Die
        Kommentarspalte wird im Bundesanzeiger veröffentlicht.
      </p>
      <h3>Ausfertigung</h3>
      <p>Bundespräsident:in prüft und unterzeichnet das Gesetz.</p>
      <h3>Freigabe</h3>
      <p>Freigegeben vom Ministerium zur Veröffentlichung</p>
      <h3>Gegenzeichnung</h3>
      <p>Bundeskanzler:in zeichnet das Gesetz gegen.</p>
      <h3>Veröffentlichung Stellungnahme des NKR (optional)</h3>
    </Bubble>
  </Cluster>

  <Cluster
    color="#FDE99F"
    {orientation}
    title="Nach der Verkündung"
    anchorName={CLUSTER_LAST_ANCHOR}
  >
    <Bubble title="Dokumentation & Inkrafttreten">
      <h3>Übergabe der Regelung an die Dokumentations&shy;stelle</h3>
      <h3>Dokumentation Gesetze</h3>
      <p>
        Metadaten werden hinzugefügt (z. B. Ministerium, amtliche Fundstelle,
        basiert auf EU-Verordnung, ...)
      </p>
      <h3>Dokumentation Änderungsgesetze</h3>
      <p>
        Änderungen werden eingearbeitet. Metadaten werden hinzugefügt (z. B.
        Ministerium, amtliche Fundstelle, basiert auf EU-Verordnung, ...)
      </p>
      <h3>Inkrafttreten</h3>
      <p>Die Regelung tritt in Kraft und wird veröffentlicht.</p>
      <ul>
        <li>Veröffentlichung auf gesetze-im-internet.de</li>
        <li>Gesetz und Metadaten werden im Dokstellenportal veröffentlicht.</li>
      </ul>
    </Bubble>
  </Cluster>

  <Cluster color="#FAB5A8" {orientation}>
    <Bubble title="Vollzug">
      <ul>
        <li>Bildung von Arbeitsgruppen</li>
        <li>Evaluation Änderungsdbedarfe</li>
        <li>...</li>
      </ul>
    </Bubble>
  </Cluster>
</div>
