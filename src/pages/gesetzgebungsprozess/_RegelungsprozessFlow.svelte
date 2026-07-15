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
    {orientation}
    anchorName={CLUSTER_FIRST_ANCHOR}
    title="Interessensermittlung"
  >
    <Bubble
      color="#BCA6DC"
      title="Arbeitsgruppenbildung"
      badge="Optional"
      size="md"
    ></Bubble>
    <Bubble
      color="#BCA6DC"
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster {orientation}>
    <Bubble color="#BCA6DC" title="Federführung" size="lg"
      >Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung der
      Regelung. Legist:in wird zugewiesen.</Bubble
    >
  </Cluster>

  <Cluster {orientation} title="Recherche">
    <Bubble color="#B3B7E0" title="Gesetzesumfeld" size="md">
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
    <Bubble
      color="#B3B7E0"
      title="Vorschläge von Verbänden"
      badge="Optional"
      size="sm"
    ></Bubble>
    <Bubble
      color="#B3B7E0"
      title="Erarbeiten von Eckpunkten"
      badge="Optional"
      size="md"
    >
      Je nach Komplexität wird ein Eckpunktepapier verfasst oder nicht.
    </Bubble>
    <Bubble color="#B3B7E0" title="Gutachten und Sachverständigenkommissionen"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Materialrecherche" size="md">
      Recherchiert Daten, die relevant für das Gesetz sind sowie das
      Gesetzesumfeld.
    </Bubble>
    <Bubble
      color="#B3B7E0"
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Ziel- und Wirkungsdefinition" size="sm"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Vorarbeit">
      Zieht Arbeit aus anderen Fach-Referaten über das Gesetzesthema zusammen.
    </Bubble>
  </Cluster>

  <Cluster {orientation} title="Referentenentwurf">
    <Bubble color="#ABD7F9" title="Frühzeitige Beteiligung" badge="Optional">
      Von Betroffenen und Vollzug und anderen Wissensträgern (z.B. Verbänden,
      Ländern, Kommunen, Wissenschaft)
    </Bubble>
    <Bubble color="#ABD7F9" title="Austausch">
      Austausch mit Netzwerk, Expert:innen, anderen Ministerien, ggf.
      Spiegelreferat
    </Bubble>
    <Bubble color="#ABD7F9" title="Vorblatt">
      <ul>
        <li>Problem und Ziel</li>
        <li>Lösung</li>
        <li>Alternativen</li>
        <li>Haushaltsausgaben ohne Erfüllungsaufwand</li>
        <li>Erfüllungsaufwand</li>
        <li>Weitere Kosten</li>
      </ul>
    </Bubble>
    <Bubble color="#ABD7F9" title="Rohentwurf">
      Schreibt ersten Entwurf mit Kommentarspalte. Allein oder mit ein oder
      mehreren weiteren Legist:innen zusammen.
    </Bubble>
    <Bubble
      color="#ABD7F9"
      title="Gesetzesfolgen werden besprochen"
      badge="Optional"
    ></Bubble>
  </Cluster>

  <Cluster {orientation} title="Hausentwurf">
    <Bubble color="#A0EBEE" title="Beteiligung der Referate" size="md">
      Bittet hausinterne Referate um Feedback.
    </Bubble>
    <Bubble color="#A0EBEE" title="Hausentwurf" size="sm">
      Ein mit den hausinternen Referaten abgeklärter Entwurf.
    </Bubble>
    <Bubble
      color="#A0EBEE"
      title="Frühkoordinierung / Vorhabenclearing Bundeskanzleramt"
      size="lg"
    ></Bubble>
  </Cluster>

  <Cluster {orientation} title="Ressortentwurf">
    <Bubble color="#9EDCD0" title="Gesetzesfolgenabschätzung" size="md">
      Beabsichtigte Wirkungen und unbeabsichtigte Nebenwirkungen
      (Haushaltsausgaben, Demographische Auswirkungen, Nachhaltigkeitsaspekte,
      Erfüllungsaufwand, Auswirkungen auf das Preisniveau)
    </Bubble>
    <Bubble color="#9EDCD0" title="Beteiligung Dritter" size="lg">
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
    <Bubble
      color="#9EDCD0"
      title="Weitere Abstimmungen & Stellungnahmen"
      size="xl"
    >
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
    <Bubble color="#9EDCD0" title="Ressortenwurf" size="md">
      Referententwurf wird angepasst und Regierungsentwurf vorbereitet
    </Bubble>
    <Bubble color="#9EDCD0" title="Politische Abstimmung" size="md">
      <p>Der Ressortentwurf wird bei Bedarf angepasst.</p>
      <ul>
        <li>Ressortabstimmung</li>
        <li>Koalitionsausschuss</li>
      </ul>
    </Bubble>
  </Cluster>

  <Cluster {orientation}>
    <Bubble color="#9EDCD0" title="Verbände informieren" size="md">
      Die betroffenen Verbände werden über den Ressortentwurf informiert.
    </Bubble>
  </Cluster>

  <Cluster {orientation} title="Kabinettvorlage">
    <Bubble color="#D2EDB9" title="Kabinettvorlage erstellen" size="lg">
      Die Kabinettvorlage beinhaltet neben dem Ressortentwurf weitere Dokumente,
      die benötigt werden um das Gesetz im Kabinett zu behandeln (Sprechzettel,
      Anschreiben, NKR Stellungnahme, Beteiligungen ...); geregelt durch GGO* §
      50.
    </Bubble>
    <Bubble color="#D2EDB9" title="Unterzeichnen der Kabinettvorlage" size="md">
      Die Kabinettvorlage wird unterzeichnet von Unterabteilungsleitung,
      Abteilungsleitung und Hausleitung (bzw. Staatssekretär:in in Vertretung)
    </Bubble>
    <Bubble
      color="#D2EDB9"
      title="Weiterleitung an das Bundeskanzleramt"
      size="md"
    >
      Fachreferat leitet die Kabinettvorlage an Bundeskanzleramts-Chef:in weiter
      (mind. 8 Tage vor der Kabinettsitzung). Einbindung Spiegel- &
      Kabinettreferat im Rahmen des Zeichnungs-vorgangs.
    </Bubble>
  </Cluster>

  <Cluster {orientation} title="Stellungnahme Bundesrat">
    <Bubble color="#D2EDB9" title="Weiterleitung an den Bundesrat" size="lg">
      Chef:in des Bundeskanzleramts setzt die Kabinettvorlage auf die Agenda der
      Kabinettsitzung. Leitet die Kabinettvorlage an den Bundesrat.
    </Bubble>
    <Bubble color="#D2EDB9" title="Stellungnahme" size="md">
      Der Bundesrat nimmt sich der Vorlage an und bezieht innerhalb von 6 Wochen
      Stellung dazu.
    </Bubble>
    <Bubble color="#D2EDB9" title="Weiterleitung an den Bundestag" size="md">
      Leitet Vorlage mit Stellungnahme und Gegenäußerung an den/die Präsident:in
      des Bundestages.
    </Bubble>
  </Cluster>

  <Cluster {orientation} title="Abstimmung im Bundestag">
    <Bubble color="#EBF5B3" title="Erste Lesung" size="md"></Bubble>
    <Bubble color="#EBF5B3" title="Ausschuss" size="lg">
      Regelung wird an den zuständigen Ausschuss geleitet, dort geprüft und
      bearbeitet. Im Ausschuss wird ein Bericht verfasst mit einer
      Beschlussempfehlung und dem Plenum vorgelegt.
    </Bubble>
  </Cluster>

  <Cluster {orientation}>
    <Bubble color="#EBF5B3" title="Zweite Lesung">
      Der Gesetzesentwurf wird mit dem Ausschussbericht und den
      Änderungsvorschlägen besprochen. Abstimmung und Einbringung von
      Änderungsanträgen.
    </Bubble>
  </Cluster>
  <Cluster {orientation}>
    <Bubble color="#EBF5B3" title="Dritte Lesung">
      Der Gesetzentwurf wird der <strong>Schlussabstimmung</strong> unterzogen.
    </Bubble>
  </Cluster>
  <Cluster {orientation}>
    <Bubble color="#EBF5B3" title="Abstimmung im Bundesrat" badge="Optional">
      Der Gesetzentwurf wird der Schlussabstimmung unterzogen.
    </Bubble>
  </Cluster>

  <Cluster {orientation} title="Verkündung">
    <Bubble color="#FFFBB5" title="Verkündung" size="md">
      Der Gesetzestext wird im Bundesgesetzblatt veröffentlicht. Die
      Kommentarspalte wird im Bundesanzeiger veröffentlicht.
    </Bubble>
    <Bubble color="#FFFBB5" title="Ausfertigung" size="md">
      Bundespräsident:in prüft und unterzeichnet das Gesetz.
    </Bubble>
    <Bubble color="#FFFBB5" title="Freigabe" size="md">
      Freigegeben vom Ministerium zur Veröffentlichung
    </Bubble>
    <Bubble color="#FFFBB5" title="Gegenzeichnung" size="md">
      Bundeskanzler:in zeichnet das Gesetz gegen.
    </Bubble>
    <Bubble
      color="#FFFBB5"
      title="Veröffentlichung Stellungnahme des NKR"
      badge="Optional"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster {orientation} title="Dokumentation">
    <Bubble
      color="#FDE99F"
      title="Übergabe der Regelung an die Dokumentationsstelle"
      size="md"
    ></Bubble>
    <Bubble color="#FDE99F" title="Dokumentation Gesetze" size="md">
      Metadaten werden hinzugefügt (z. B. Ministerium, amtliche Fundstelle,
      basiert auf EU-Verordnung, ...)
    </Bubble>
    <Bubble color="#FDE99F" title="Dokumentation Änderungsgesetze" size="lg">
      Änderungen werden einge-arbeitet. Metadaten werden hinzugefügt. (z. B.
      Ministerium, amtliche Fundstelle, basiert auf EU-Verordnung, ...)
    </Bubble>
  </Cluster>

  <Cluster {orientation}>
    <Bubble color="#FDE99F" title="Inkrafttreten" size="lg">
      <p>Die Regelung tritt in Kraft und wird veröffentlicht.</p>
      <ul>
        <li>Veröffentlichung auf gesetze-im-internet.de</li>
        <li>Gesetz und Metadaten werden im Dokstellenportal veröffentlicht.</li>
      </ul>
    </Bubble>
  </Cluster>

  <Cluster {orientation} anchorName={CLUSTER_LAST_ANCHOR} title="Vollzug">
    <Bubble color="#FAB5A8" title="Bildung von Arbeitsgruppen" size="md"
    ></Bubble>
    <Bubble color="#FAB5A8" title="Evaluation Änderungsbedarfe" size="md"
    ></Bubble>
    <Bubble color="#FAB5A8" title="..." size="md"></Bubble>
  </Cluster>
</div>
