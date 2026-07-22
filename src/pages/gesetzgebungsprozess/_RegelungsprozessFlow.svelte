<script lang="ts">
  import { setContext } from "svelte";
  import { tv } from "tailwind-variants";
  import Bubble from "./_Bubble.svelte";
  import Cluster from "./_Cluster.svelte";
  import Arrow from "./_Arrow.svelte";
  import { BUBBLE_HIGHLIGHT_CONTEXT_NAME } from "./_bubbleHighlight";
  import { begleitungen } from "@/config/routes";

  let {
    orientation = "vertical",
    highlighted = $bindable([]),
  }: {
    orientation?: "vertical" | "horizontal";
    /**
     * Tags of the bubbles to highlight (matched against each Bubble's
     * `tags` prop). When empty, all bubbles show their normal color;
     * otherwise, every bubble whose tags don't intersect this list is
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
    base: "relative flex bg-white [--dark-bg:#F0F0F0]",
    variants: {
      orientation: {
        horizontal: "h-screen flex-row items-stretch",
        vertical: "mx-auto w-screen flex-col",
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
    class={`flex items-center justify-center ${isVertical ? "pt-40" : "flex-col pl-40"}`}
  >
    <Bubble color="#E6E6E6" title="Initiative des Bundestages" className="m-48">
      {#snippet body()}
        <p class="text-4xl font-bold">24&nbsp;%</p>
      {/snippet}
    </Bubble>
    <Cluster color="#D59FDE" {orientation} offset={0} fitContent>
      <Bubble color="#D59FDE" title="Aus der Mitte der Regierung">
        {#snippet body()}
          <p class="text-4xl font-bold">60&nbsp;%</p>
        {/snippet}
      </Bubble>
    </Cluster>
    <Bubble color="#E6E6E6" title="Initiative des Bundesrates" className="m-48">
      {#snippet body()}
        <p class="text-4xl font-bold">16&nbsp;%</p>
      {/snippet}
    </Bubble>
  </div>

  <Arrow {orientation} size={40} />

  <Cluster
    color="#BCA6DC"
    {orientation}
    offset={0}
    anchorName={CLUSTER_FIRST_ANCHOR}
    title="Interessensermittlung"
  >
    {#snippet sidebar()}
      <h2>Was tun?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

    <Bubble
      title="Arbeits&shy;gruppen&shy;bildung"
      optional
      tags={["Frühphase"]}
    ></Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      optional
      tags={["Frühphase"]}
    ></Bubble>
  </Cluster>

  <Arrow {orientation}>Übergabe an das Fachreferat</Arrow>

  <Cluster color="#BCA6DC" {orientation} offset={0}>
    <Bubble title="Federführung" tags={["Frühphase"]}>
      Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung der
      Regelung. Legist:in wird zugewiesen.
    </Bubble>
  </Cluster>

  <Cluster color="#B3B7E0" {orientation} offset={0} title="Recherche">
    {#snippet sidebar()}
      <h2>Wie sieht die Frühphase in der Recherchephase aus?</h2>
      <p>
        In dieser Phase bereiten Sie neue Regelungen vor. Sie prüfen genau,
        welches Problem gelöst werden muss und legen fest, was die Regelung
        bewirken soll. Außerdem binden Sie frühzeitig alle Beteiligten ein.
        Dadurch schaffen Sie eine gute Grundlage für die weitere Arbeit.
      </p>
      <h3>Was ist neu?</h3>
      <ol>
        <li>
          <strong>Geführter Prozess:</strong> Ein digitales Werkzeug führt Sie Schritt
          für Schritt durch den Prozess. Sie müssen Informationen nicht mehr in vielen
          verschiedenen Dokumenten ausfüllen.
        </li>
        <li>
          <strong>Tools:</strong> Künstliche Intelligenz unterstützt Sie bei der Recherche.
          So finden und ordnen Sie wichtige Informationen deutlich schneller.
        </li>
      </ol>
      <h3>Welche Vorhaben sind geeignet?</h3>
      <p>
        Die neue Frühphase ist für alle Vorhaben geeignet, bei denen Legistinnen
        und Legisten einen tatsächlichen Handlungsspielraum haben.
      </p>
      <h3>Wo sparen Sie Zeit?</h3>
      <p>
        Die digitale Unterstützung nimmt Ihnen bei der Recherche Arbeit ab.
        Zudem erstellt das System aus Ihren gesammelten Eingaben automatisch
        wichtige Dokumente für die weitere Planung Ihres Vorhabens.
      </p>
    {/snippet}

    <Bubble title="Gesetzes&shy;umfeld" size="sm" tags={["Frühphase"]}>
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
    <Bubble title="Vorschläge von Verbänden" optional tags={["Frühphase"]}
    ></Bubble>
    <Bubble title="Erarbeiten von Eckpunkten" optional tags={["Frühphase"]}>
      Je nach Komplexität wird ein Eckpunktepapier verfasst oder nicht.
    </Bubble>
    <Bubble
      title="Gutachten und Sach&shy;verständigen&shy;kommissionen"
      tags={["Frühphase"]}
    ></Bubble>
    <Bubble title="Material&shy;recherche" size="sm" tags={["Frühphase"]}>
      Recherchiert Daten, die relevant für das Gesetz sind sowie das
      Gesetzesumfeld.
    </Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      optional
      tags={["Frühphase"]}
    ></Bubble>
    <Bubble
      title="Ziel- und Wirkungs&shy;definition"
      size="sm"
      tags={["Frühphase"]}
    ></Bubble>
    <Bubble title="Vorarbeit" size="sm" tags={["Frühphase"]}>
      Zieht Arbeit aus anderen Fach-Referaten über das Gesetzesthema zusammen.
    </Bubble>
  </Cluster>

  <Cluster color="#ABD7F9" {orientation} title="Referentenentwurf">
    {#snippet sidebar()}
      <h2>Was kommt hier?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

    <Bubble title="Frühzeitige Beteiligung" optional tags={["Frühphase"]}>
      Von Betroffenen und Vollzug und anderen Wissensträgern (z.B. Verbänden,
      Ländern, Kommunen, Wissenschaft)
    </Bubble>
    <Bubble title="Austausch" size="sm" tags={["Frühphase"]}>
      Austausch mit Netzwerk, Expert:innen, anderen Ministerien, ggf.
      Spiegelreferat
    </Bubble>
    <Bubble title="Vorblatt" size="sm" tags={["Frühphase"]}>
      <ul>
        <li>Problem und Ziel</li>
        <li>Lösung</li>
        <li>Alternativen</li>
        <li>Haushaltsausgaben ohne Erfüllungsaufwand</li>
        <li>Erfüllungsaufwand</li>
        <li>Weitere Kosten</li>
      </ul>
    </Bubble>
    <Bubble title="Rohentwurf" size="sm" tags={["Frühphase"]}>
      Schreibt ersten Entwurf mit Kommentarspalte. Allein oder mit ein oder
      mehreren weiteren Legist:innen zusammen.
    </Bubble>
    <Bubble
      title="Gesetzesfolgen werden besprochen"
      optional
      tags={["Frühphase"]}
    ></Bubble>
  </Cluster>

  <Cluster color="#A0EBEE" {orientation} title="Hausentwurf">
    {#snippet sidebar()}
      <h2>Kommt hier noch was?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

    <Bubble title="Beteiligung der Referate" size="sm">
      Bittet hausinterne Referate um Feedback.
    </Bubble>
    <Bubble title="Hausentwurf erstellen" size="sm">
      Ein mit den hausinternen Referaten abgeklärter Entwurf.
    </Bubble>
    <Bubble
      title="Frühkoordinierung / Vorhabenclearing Bundeskanzleramt"
      size="lg"
    ></Bubble>
  </Cluster>

  <Cluster color="#9EDCD0" {orientation} title="Ressortentwurf">
    {#snippet sidebar()}
      <h2>Und hier?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

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
    {#snippet sidebar()}
      <h2>Fast geschafft!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

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

  <Cluster color="#D2EDB9" {orientation} offset={0}>
    <Bubble title="Weiterleitung an das Bundes&shy;kanzleramt" size="md">
      Fachreferat leitet die Kabinettvorlage an Bundeskanzleramts-Chef:in weiter
      (mind. 8 Tage vor der Kabinettsitzung). Einbindung Spiegel- &
      Kabinettreferat im Rahmen des Zeichnungs-vorgangs.
    </Bubble>
  </Cluster>

  <Arrow {orientation} className="bg-(--dark-bg)"
    >Übergabe an die politische Ebene</Arrow
  >

  <Cluster
    color="#D2EDB9"
    {orientation}
    offset={0}
    title="Verabschiedung"
    className="bg-(--dark-bg)"
  >
    {#snippet sidebar()}
      <h2>Nur noch flott durchs Parlament ...</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

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

  <Cluster color="#EBF5B3" {orientation} className="bg-(--dark-bg)">
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

  <Cluster color="#FFFBB5" {orientation} className="bg-(--dark-bg)">
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
    className="bg-(--dark-bg)"
  >
    {#snippet sidebar()}
      <h2>Tadaa!!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    {/snippet}

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

  <Cluster
    color="#FAB5A8"
    {orientation}
    className={`bg-(--dark-bg) ${isVertical ? "pb-80" : "pr-40"}`}
  >
    <Bubble title="Vollzug">
      <ul>
        <li>Bildung von Arbeitsgruppen</li>
        <li>Evaluation Änderungsdbedarfe</li>
        <li>...</li>
      </ul>
    </Bubble>
  </Cluster>
</div>
