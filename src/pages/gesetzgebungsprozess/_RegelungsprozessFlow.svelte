<script lang="ts">
  import Bubble from "./_Bubble.svelte";
  import Cluster from "./_Cluster.svelte";
</script>

<div class={`mx-auto flex max-w-5xl flex-col items-center -space-y-48`}>
  <Cluster title="Interessensermittlung">
    <Bubble
      color="#BCA6DC"
      title="Arbeitsgruppenbildung"
      badge="Optional"
      size="md">Platzhaltertext</Bubble
    >
    <Bubble
      color="#BCA6DC"
      title="Workshops mit Ländern und Kommunen"
      badge="Optional"
      size="md">Platzhaltertext</Bubble
    >
  </Cluster>

  <Cluster>
    <Bubble color="#BCA6DC" title="Federführung" size="lg"
      >Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung der
      Regelung. Legist:in wird zugewiesen.</Bubble
    >
  </Cluster>

  <Cluster title="Recherche">
    <Bubble color="#B3B7E0" title="Gesetzesumfeld" size="lg">
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
    <Bubble color="#B3B7E0" title="Vorschläge von Verbänden" size="sm"></Bubble>
    <Bubble color="#B3B7E0" title="Erarbeiten von Eckpunkten" size="md"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Gutachten und Sachverständigenkommissionen"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Materialrecherche" size="md"></Bubble>
    <Bubble color="#B3B7E0" title="Workshops mit Ländern und Kommunen" size="sm"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Ziel- und Wirkungsdefinition" size="sm"
    ></Bubble>
    <Bubble color="#B3B7E0" title="Vorarbeit"></Bubble>
  </Cluster>

  <Cluster title="Referentenentwurf">
    <Bubble color="#ABD7F9" title="Frühzeitige Beteiligung"></Bubble>
    <Bubble color="#ABD7F9" title="Austausch"></Bubble>
    <Bubble color="#ABD7F9" title="Vorblatt"></Bubble>
    <Bubble color="#ABD7F9" title="Rohentwurf"></Bubble>
    <Bubble color="#ABD7F9" title="Gesetzesfolgen werden besprochen"></Bubble>
  </Cluster>

  <Cluster title="Hausentwurf">
    <Bubble color="#A0EBEE" title="Beteiligung der Referate" size="md"></Bubble>
    <Bubble color="#A0EBEE" title="Hausentwurf" size="sm"></Bubble>
    <Bubble
      color="#A0EBEE"
      title="Frühkoordinierung / Vorhabenclearing Bundeskanzleramt"
      size="lg"
    ></Bubble>
  </Cluster>

  <Cluster title="Ressortentwurf">
    <Bubble color="#9EDCD0" title="Gesetzesfolgenabschätzung" size="md"
    ></Bubble>
    <Bubble color="#9EDCD0" title="Beteiligung Dritter" size="lg"></Bubble>
    <Bubble
      color="#9EDCD0"
      title="Weitere Abstimmungen & Stellungnahmen"
      size="xl"
    ></Bubble>
    <Bubble color="#9EDCD0" title="Ressortenwurf" size="md"></Bubble>
    <Bubble color="#9EDCD0" title="Politische Abstimmung" size="md"></Bubble>
  </Cluster>

  <Cluster>
    <Bubble color="#9EDCD0" title="Verbände informieren" size="md"></Bubble>
  </Cluster>

  <Cluster title="Kabinettvorlage">
    <Bubble color="#D2EDB9" title="Kabinettvorlage erstellen" size="lg"
    ></Bubble>
    <Bubble color="#D2EDB9" title="Unterzeichnen der Kabinettvorlage" size="md"
    ></Bubble>
    <Bubble
      color="#D2EDB9"
      title="Weiterleitung an das Bundeskanzleramt"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster title="Stellungnahme Bundesrat">
    <Bubble color="#D2EDB9" title="Weiterleitung an den Bundesrat" size="lg"
    ></Bubble>
    <Bubble color="#D2EDB9" title="Stellungnahme" size="md"></Bubble>
    <Bubble color="#D2EDB9" title="Weiterleitung an den Bundestag" size="md"
    ></Bubble>
  </Cluster>

  <Cluster title="Abstimmung im Bundestag">
    <Bubble color="#EBF5B3" title="Erste Lesung" size="md"></Bubble>
    <Bubble color="#EBF5B3" title="Ausschuss" size="lg">
      Regelung wird an den zuständigen Ausschuss geleitet, dort geprüft und
      bearbeitet. Im Ausschuss wird ein Bericht verfasst mit einer
      Beschlussempfehlung und dem Plenum vorgelegt.
    </Bubble>
  </Cluster>

  <Cluster>
    <Bubble color="#EBF5B3" title="Zweite Lesung"></Bubble>
  </Cluster>
  <Cluster>
    <Bubble color="#EBF5B3" title="Dritte Lesung"></Bubble>
  </Cluster>
  <Cluster>
    <Bubble color="#EBF5B3" title="Abstimmung im Bundesrat" badge="Optional"
    ></Bubble>
  </Cluster>

  <Cluster title="Verkündung">
    <Bubble color="#FFFBB5" title="Verkündung" size="md"></Bubble>
    <Bubble color="#FFFBB5" title="Ausfertigung" size="md"></Bubble>
    <Bubble color="#FFFBB5" title="Freigabe" size="md"></Bubble>
    <Bubble color="#FFFBB5" title="Gegenzeichnung" size="md"></Bubble>
    <Bubble
      color="#FFFBB5"
      title="Veröffentlichung Stellungnahme des NKR"
      size="md"
    ></Bubble>
  </Cluster>

  <Cluster title="Dokumentation">
    <Bubble
      color="#FDE99F"
      title="Übergabe der Regelung an die Dokumentationsstelle"
      size="md"
    ></Bubble>
    <Bubble color="#FDE99F" title="Dokumentation Gesetze" size="md"></Bubble>
    <Bubble color="#FDE99F" title="Dokumentation Änderungsgesetze" size="lg"
    ></Bubble>
  </Cluster>

  <Cluster>
    <Bubble color="#FDE99F" title="Inkrafttreten" size="lg">
      <p>Die Regelung tritt in Kraft und wird veröffentlicht.</p>
      <ul>
        <li>Veröffentlichung auf gesetze-im-internet.de</li>
        <li>Gesetz und Metadaten werden im Dokstellenportal veröffentlicht.</li>
      </ul>
    </Bubble>
  </Cluster>

  <Cluster title="Vollzug">
    <Bubble color="#FAB5A8" title="Bildung von Arbeitsgruppen" size="md"
    ></Bubble>
    <Bubble color="#FAB5A8" title="Evaluation Änderungsbedarfe" size="md"
    ></Bubble>
    <Bubble color="#FAB5A8" title="..." size="md"></Bubble>
  </Cluster>
</div>
