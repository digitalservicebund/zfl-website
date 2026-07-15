<script lang="ts">
  import { tv } from "tailwind-variants";
  import Bubble from "./_Bubble.svelte";
  import Cluster from "./_Cluster.svelte";

  let {
    orientation = "vertical",
  }: {
    orientation?: "vertical" | "horizontal";
  } = $props();

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

  <Cluster
    color="#BCA6DC"
    {orientation}
    anchorName={CLUSTER_FIRST_ANCHOR}
    title="Interessensermittlung"
  >
    <Bubble title="Arbeitsgruppenbildung" badge="Optional" size="md"></Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster color="#BCA6DC" {orientation}>
    <Bubble title="Federführung" size="lg"
      >Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung der
      Regelung. Legist:in wird zugewiesen.</Bubble
    >
  </Cluster>

  <Cluster color="#B3B7E0" {orientation} title="Recherche">
    <Bubble title="Gesetzesumfeld" size="md">
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
    <Bubble title="Vorschläge von Verbänden" badge="Optional" size="sm"
    ></Bubble>
    <Bubble title="Erarbeiten von Eckpunkten" badge="Optional" size="md">
      Je nach Komplexität wird ein Eckpunktepapier verfasst oder nicht.
    </Bubble>
    <Bubble title="Gutachten und Sachverständigenkommissionen"></Bubble>
    <Bubble title="Materialrecherche" size="md">
      Recherchiert Daten, die relevant für das Gesetz sind sowie das
      Gesetzesumfeld.
    </Bubble>
    <Bubble
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
    <Bubble title="Ziel- und Wirkungsdefinition" size="sm"></Bubble>
    <Bubble title="Vorarbeit">
      Zieht Arbeit aus anderen Fach-Referaten über das Gesetzesthema zusammen.
    </Bubble>
  </Cluster>

  <Cluster color="#ABD7F9" {orientation} title="Referentenentwurf">
    <Bubble title="Frühzeitige Beteiligung" badge="Optional">
      Von Betroffenen und Vollzug und anderen Wissensträgern (z.B. Verbänden,
      Ländern, Kommunen, Wissenschaft)
    </Bubble>
    <Bubble title="Austausch">
      Austausch mit Netzwerk, Expert:innen, anderen Ministerien, ggf.
      Spiegelreferat
    </Bubble>
    <Bubble title="Vorblatt">
      <ul>
        <li>Problem und Ziel</li>
        <li>Lösung</li>
        <li>Alternativen</li>
        <li>Haushaltsausgaben ohne Erfüllungsaufwand</li>
        <li>Erfüllungsaufwand</li>
        <li>Weitere Kosten</li>
      </ul>
    </Bubble>
    <Bubble title="Rohentwurf">
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
    <Bubble title="Gesetzesfolgenabschätzung" size="md">
      Beabsichtigte Wirkungen und unbeabsichtigte Nebenwirkungen
      (Haushaltsausgaben, Demographische Auswirkungen, Nachhaltigkeitsaspekte,
      Erfüllungsaufwand, Auswirkungen auf das Preisniveau)
    </Bubble>
    <Bubble title="Beteiligung Dritter" size="lg">
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
    <Bubble title="Weitere Abstimmungen & Stellungnahmen" size="xl">
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
    <Bubble title="Ressortenwurf" size="md">
      Referententwurf wird angepasst und Regierungsentwurf vorbereitet
    </Bubble>
    <Bubble title="Politische Abstimmung" size="md">
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
    <Bubble title="Kabinettvorlage erstellen" size="lg">
      Die Kabinettvorlage beinhaltet neben dem Ressortentwurf weitere Dokumente,
      die benötigt werden um das Gesetz im Kabinett zu behandeln (Sprechzettel,
      Anschreiben, NKR Stellungnahme, Beteiligungen ...); geregelt durch GGO* §
      50.
    </Bubble>
    <Bubble title="Unterzeichnen der Kabinettvorlage" size="md">
      Die Kabinettvorlage wird unterzeichnet von Unterabteilungsleitung,
      Abteilungsleitung und Hausleitung (bzw. Staatssekretär:in in Vertretung)
    </Bubble>
    <Bubble title="Weiterleitung an das Bundeskanzleramt" size="md">
      Fachreferat leitet die Kabinettvorlage an Bundeskanzleramts-Chef:in weiter
      (mind. 8 Tage vor der Kabinettsitzung). Einbindung Spiegel- &
      Kabinettreferat im Rahmen des Zeichnungs-vorgangs.
    </Bubble>
  </Cluster>

  <Cluster color="#D2EDB9" {orientation} title="Stellungnahme Bundesrat">
    <Bubble title="Weiterleitung an den Bundesrat" size="lg">
      Chef:in des Bundeskanzleramts setzt die Kabinettvorlage auf die Agenda der
      Kabinettsitzung. Leitet die Kabinettvorlage an den Bundesrat.
    </Bubble>
    <Bubble title="Stellungnahme" size="md">
      Der Bundesrat nimmt sich der Vorlage an und bezieht innerhalb von 6 Wochen
      Stellung dazu.
    </Bubble>
    <Bubble title="Weiterleitung an den Bundestag" size="md">
      Leitet Vorlage mit Stellungnahme und Gegenäußerung an den/die Präsident:in
      des Bundestages.
    </Bubble>
  </Cluster>

  <Cluster color="#EBF5B3" {orientation} title="Abstimmung im Bundestag">
    <Bubble title="Erste Lesung" size="md"></Bubble>
    <Bubble title="Ausschuss" size="lg">
      Regelung wird an den zuständigen Ausschuss geleitet, dort geprüft und
      bearbeitet. Im Ausschuss wird ein Bericht verfasst mit einer
      Beschlussempfehlung und dem Plenum vorgelegt.
    </Bubble>
  </Cluster>

  <Cluster color="#EBF5B3" {orientation}>
    <Bubble title="Zweite Lesung">
      Der Gesetzesentwurf wird mit dem Ausschussbericht und den
      Änderungsvorschlägen besprochen. Abstimmung und Einbringung von
      Änderungsanträgen.
    </Bubble>
  </Cluster>
  <Cluster color="#EBF5B3" {orientation}>
    <Bubble title="Dritte Lesung">
      Der Gesetzentwurf wird der <strong>Schlussabstimmung</strong> unterzogen.
    </Bubble>
  </Cluster>
  <Cluster color="#EBF5B3" {orientation}>
    <Bubble title="Abstimmung im Bundesrat" badge="Optional">
      Der Gesetzentwurf wird der Schlussabstimmung unterzogen.
    </Bubble>
  </Cluster>

  <Cluster color="#FFFBB5" {orientation} title="Verkündung">
    <Bubble title="Verkündung" size="md">
      Der Gesetzestext wird im Bundesgesetzblatt veröffentlicht. Die
      Kommentarspalte wird im Bundesanzeiger veröffentlicht.
    </Bubble>
    <Bubble title="Ausfertigung" size="md">
      Bundespräsident:in prüft und unterzeichnet das Gesetz.
    </Bubble>
    <Bubble title="Freigabe" size="md">
      Freigegeben vom Ministerium zur Veröffentlichung
    </Bubble>
    <Bubble title="Gegenzeichnung" size="md">
      Bundeskanzler:in zeichnet das Gesetz gegen.
    </Bubble>
    <Bubble
      title="Veröffentlichung Stellungnahme des NKR"
      badge="Optional"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster color="#FDE99F" {orientation} title="Dokumentation">
    <Bubble title="Übergabe der Regelung an die Dokumentationsstelle" size="md"
    ></Bubble>
    <Bubble title="Dokumentation Gesetze" size="md">
      Metadaten werden hinzugefügt (z. B. Ministerium, amtliche Fundstelle,
      basiert auf EU-Verordnung, ...)
    </Bubble>
    <Bubble title="Dokumentation Änderungsgesetze" size="lg">
      Änderungen werden einge-arbeitet. Metadaten werden hinzugefügt. (z. B.
      Ministerium, amtliche Fundstelle, basiert auf EU-Verordnung, ...)
    </Bubble>
  </Cluster>

  <Cluster color="#FDE99F" {orientation}>
    <Bubble title="Inkrafttreten" size="lg">
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
    anchorName={CLUSTER_LAST_ANCHOR}
    title="Vollzug"
  >
    <Bubble title="Bildung von Arbeitsgruppen" size="md"></Bubble>
    <Bubble title="Evaluation Änderungsbedarfe" size="md"></Bubble>
    <Bubble title="..." size="md"></Bubble>
  </Cluster>
</div>
