<script lang="ts">
  import { tv } from "tailwind-variants";
  import FlowLayout from "./_FlowLayout.svelte";
  import Cluster from "./_Cluster.svelte";
  import Bubble from "./_Bubble.svelte";
  import Arrow from "./_Arrow.svelte";
  import Feature from "./_Feature.svelte";
  import OutTrigger from "./_OutTrigger.svelte";
  import IconArrowDown from "~icons/ic/round-keyboard-double-arrow-down";

  let orientation = $state<"vertical" | "horizontal">("vertical");
  const isVertical = $derived(orientation === "vertical");

  const container = tv({
    base: "relative flex bg-white",
    variants: {
      orientation: {
        horizontal: "h-screen flex-row items-stretch",
        vertical: "mx-auto w-(--cluster-inner-width) flex-col",
      },
    },
  });

  const CLUSTER_FIRST_ANCHOR = "--cluster-first";
  const CLUSTER_LAST_ANCHOR = "--cluster-last";

  const connectorStyle = $derived(
    orientation === "vertical"
      ? `left: calc(anchor(${CLUSTER_FIRST_ANCHOR} center) - 0.5px); top: anchor(${CLUSTER_FIRST_ANCHOR} center); bottom: anchor(${CLUSTER_LAST_ANCHOR} center); width: 1px;`
      : `top: calc(anchor(${CLUSTER_FIRST_ANCHOR} center) - 0.5px); left: anchor(${CLUSTER_FIRST_ANCHOR} center); right: anchor(${CLUSTER_LAST_ANCHOR} center); height: 1px;`,
  );
</script>

<FlowLayout {orientation}>
  <div class={container({ orientation })}>
    <OutTrigger>
      <div class="py-lg mx-auto max-w-200 flex flex-col items-center gap-8">
        Scrollen Sie zum Starten
        <IconArrowDown class="block" />
      </div>
    </OutTrigger>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute bg-black m-0"
      style={connectorStyle}
    ></div>

    <div
      class={`flex items-center xl:gap-24 justify-center ${isVertical ? "" : "flex-col pl-40"}`}
    >
      <Bubble
        color="#E6E6E6"
        title="Initiative des Bundestages"
        className="max-lg:hidden"
      ></Bubble>
      <Cluster color="#D59FDE" {orientation} offset={0} fitContent>
        <Bubble color="#D59FDE" title="Aus der Mitte der Regierung"></Bubble>
      </Cluster>
      <Bubble
        color="#E6E6E6"
        title="Initiative des Bundesrates"
        className="max-lg:hidden"
      ></Bubble>
    </div>

    <Arrow {orientation} size={40} color="#D59FDE" />

    <Cluster
      color="#BCA6DC"
      {orientation}
      offset={0}
      anchorName={CLUSTER_FIRST_ANCHOR}
      title="Interessensermittlung"
    >
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald die Zuständigkeit nach der Geschäftsverteilung der
          Bundesregierung feststeht, beginnt das federführende Ressort mit der
          Koordination und der inhaltlichen Arbeit. Parallel bilden sich erste
          Arbeitsgruppen und der Austausch mit den Ländern und Kommunen beginnt.
        </p>
      {/snippet}

      <Bubble title="Arbeits&shy;gruppen&shy;bildung" optional></Bubble>
      <Bubble title="Workshops mit Ländern und Kommunen" optional></Bubble>
    </Cluster>

    <Arrow {orientation} color="#BCA6DC" highlightGroup="Interessensermittlung">
      Übergabe an das Fachreferat
    </Arrow>

    <Cluster
      color="#BCA6DC"
      {orientation}
      offset={0}
      highlightGroup="Interessensermittlung"
    >
      <Bubble title="Federführung">
        Ein Fachreferat übernimmt die Verantwortung für die Weiterentwicklung
        der Regelung. Legist:in wird zugewiesen.
      </Bubble>
    </Cluster>

    <Cluster color="#B3B7E0" {orientation} title="Recherche" offset={0}>
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald der Bedarf für eine neue Regelung feststeht, analysiert das
          federführende Referat das genaue Problem und legt klare Ziele fest.
          Parallel dazu wird das rechtliche und fachliche Umfeld recherchiert.
          So wird frühzeitig ermittelt, welche weiteren Ressorts und externen
          Stakeholder in die Arbeit eingebunden werden müssen.
        </p>
        <h3>Wie könnte diese Phase in Zukunft aussehen?</h3>

        <div class="mt-24 space-y-24">
          <Feature tag="Prozess">
            <p class="mb-0">
              <strong>Ein geführter Prozess</strong> unterstützt Sie Schritt für Schritt
              dabei, Ihr Regelungsvorhaben von Anfang an strukturiert aufzusetzen.
            </p>
            {#snippet details()}
              <p>
                So können Sie das eigentliche Problem präzise durchdenken,
                Wirkungsziele festlegen und alle relevanten Akteure frühzeitig
                einbinden. Informationen dokumentieren Sie an einer zentralen
                Stelle.
              </p>
              <p>
                <strong>So arbeiten wir daran:</strong> Wir entwickeln gemeinsam mit
                Ihnen ein praxistaugliches Rahmenwerk. Es soll die frühe Erarbeitungsphase
                strukturieren und Sie dabei unterstützen, Notwendigkeit und Alternativen
                einer Regelung fundiert abzuwägen.
              </p>
            {/snippet}
          </Feature>
          <Feature tag="Checks">
            <p class="mb-0">
              <strong>Verschiedene Checks und Arbeitshilfen</strong> sind konsolidiert
              und direkt in Ihren Arbeitsablauf eingebunden.
            </p>
            {#snippet details()}
              <p>
                So berücksichtigen Sie automatisch notwendige Anforderungen wie
                den
                <a href="https://digitalcheck.bund.de/">Digitalcheck</a>.
              </p>
              <p>
                <strong>So arbeiten wir daran:</strong> Wir reduzieren die Vielzahl
                bestehender Leitfäden und bündeln diese Schritt für Schritt an einem
                zentralen Ort.
              </p>
            {/snippet}
          </Feature>
          <Feature tag="KI">
            <p class="mb-0">
              <strong>Künstliche Intelligenz</strong> nimmt Ihnen zeitintensive Arbeit
              bei der Recherche, Strukturierung und Zusammenstellung von Informationen
              ab.
            </p>
            {#snippet details()}
              <p>
                So finden und ordnen Sie relevante Inhalte deutlich schneller.
              </p>
              <p>
                <strong>So arbeiten wir daran:</strong> Wir testen einen
                Prototypen, mit dem Sie Pflichten im Bestandsrecht schnell
                identifizieren und strukturiert analysieren können. Einen ersten
                Einblick erhalten Sie
                <a
                  href="https://digitalservicebund.github.io/zfl-website/previews/prototyp/pflichten/werkzeuge/pflichten/"
                  >hier</a
                >.
              </p>
            {/snippet}
          </Feature>
        </div>
      {/snippet}

      <Bubble title="Gesetzes&shy;umfeld" size="sm" tags={["KI"]}>
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
      <Bubble title="Vorschläge von Verbänden" optional size="sm"></Bubble>
      <Bubble
        title="Erarbeiten von Eckpunkten"
        optional
        size="md"
        tags={["Prozess"]}
      >
        Je nach Komplexität wird ein Eckpunktepapier verfasst oder nicht.
      </Bubble>
      <Bubble title="Gutachten und Sach&shy;verständigen&shy;kommissionen"
      ></Bubble>
      <Bubble title="Material&shy;recherche" size="sm" tags={["Checks"]}>
        Recherchiert Daten, die relevant für das Gesetz sind sowie das
        Gesetzesumfeld.
      </Bubble>
      <Bubble
        title="Workshops mit Ländern und Kommunen"
        optional
        tags={["Checks"]}
        size="lg"
      ></Bubble>
      <Bubble
        title="Ziel- und Wirkungs&shy;definition"
        size="md"
        tags={["Prozess", "Checks"]}
      ></Bubble>
      <Bubble title="Vorarbeit" size="sm" tags={["Prozess"]}>
        Zieht Arbeit aus anderen Fach-Referaten über das Gesetzesthema zusammen.
      </Bubble>
    </Cluster>

    <Cluster color="#ABD7F9" {orientation} title="Referentenentwurf">
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald die Recherche abgeschlossen ist, erarbeitet das zuständige
          Ressort den konkreten Rohentwurf und das dazugehörige Vorblatt.
          Parallel dazu startet der fachliche Austausch, wobei optional schon
          jetzt eine frühzeitige Beteiligung stattfinden und erste
          Gesetzesfolgen besprochen werden können, um den Entwurf frühzeitig zu
          schärfen.
        </p>
      {/snippet}

      <Bubble title="Frühzeitige Beteiligung" optional>
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
      <Bubble title="Gesetzesfolgen werden besprochen" optional></Bubble>
    </Cluster>

    <Cluster color="#A0EBEE" {orientation} title="Hausentwurf & Ressortentwurf">
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald der erste Rohentwurf steht, holt das federführende Referat
          hausinternes Feedback ein und übergibt den Hausentwurf zur
          Frühkoordinierung an das Bundeskanzleramt. Parallel dazu starten die
          politischen Abstimmungen, Berichterstattergespräche und die
          Gesetzesfolgenabschätzung. So werden rechtzeitig externe
          Stellungnahmen von weiteren Ressorts sowie Prüfstellen (wie dem NKR)
          eingeholt und der Entwurf strukturiert zum Ressortentwurf
          weiterentwickelt.
        </p>
        <p>
          Abschließend informiert das Ressort die betroffenen Verbände und
          bereitet die finale Fassung als Regierungsentwurf vor.
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

    <Cluster
      color="#9EDCD0"
      {orientation}
      highlightGroup="Hausentwurf & Ressortentwurf"
    >
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

    <Cluster
      color="#9EDCD0"
      {orientation}
      highlightGroup="Hausentwurf & Ressortentwurf"
    >
      <Bubble title="Verbände informieren" size="md">
        Die betroffenen Verbände werden über den Ressortentwurf informiert.
      </Bubble>
    </Cluster>

    <Cluster color="#D2EDB9" {orientation} title="Kabinettvorlage">
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald die Abstimmungen zum Ressortentwurf abgeschlossen sind, wird
          die offizielle Kabinettvorlage erstellt und durch die Leitung des
          Hauses unterzeichnet. Anschließend erfolgt die Weiterleitung an das
          Bundeskanzleramt, womit der Gesetzentwurf formell an die politische
          Ebene übergeben wird und aus ihm durch Beschluss der Bundesregierung
          ein Regierungsentwurf entsteht.
        </p>
      {/snippet}

      <Bubble title="Kabinett&shy;vorlage erstellen" size="md">
        Die Kabinettvorlage beinhaltet neben dem Ressortentwurf weitere
        Dokumente, die benötigt werden um das Gesetz im Kabinett zu behandeln
        (Sprechzettel, Anschreiben, NKR Stellungnahme, Beteiligungen ...);
        geregelt durch GGO* § 50.
      </Bubble>
      <Bubble title="Unterzeichnen der Kabinett&shy;vorlage" size="md">
        Die Kabinettvorlage wird unterzeichnet von Unterabteilungsleitung,
        Abteilungsleitung und Hausleitung (bzw. Staatssekretär:in in Vertretung)
      </Bubble>
    </Cluster>

    <Cluster
      color="#D2EDB9"
      {orientation}
      offset={0}
      highlightGroup="Kabinettvorlage"
    >
      <Bubble title="Weiterleitung an das Bundes&shy;kanzleramt" size="md">
        Fachreferat leitet die Kabinettvorlage an Bundeskanzleramts-Chef:in
        weiter (mind. 8 Tage vor der Kabinettsitzung). Einbindung Spiegel- &
        Kabinettreferat im Rahmen des Zeichnungs-vorgangs.
      </Bubble>
    </Cluster>

    <Arrow {orientation} color="#D2EDB9" highlightGroup="Kabinettvorlage">
      Übergabe an die politische Ebene
    </Arrow>

    <Cluster color="#D2EDB9" {orientation} offset={0} title="Verabschiedung">
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Nachdem die Bundesregierung den Entwurf an die gesetzgebenden Organe
          übergeben hat, durchläuft das Vorhaben das eigentliche
          parlamentarische Verfahren. Es beginnt in der Regel mit der
          Stellungnahme des Bundesrates, führt über die intensive Beratung und
          finale Abstimmung im Bundestag und endet schließlich mit der formellen
          Verkündung des Gesetzes im Bundesgesetzblatt.
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
        Leitet Vorlage mit Stellungnahme und Gegenäußerung an den/die Präsident:in
        des Bundestages.
      </Bubble>
    </Cluster>

    <Cluster color="#EBF5B3" {orientation} highlightGroup="Verabschiedung">
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

    <Cluster color="#FFFBB5" {orientation} highlightGroup="Verabschiedung">
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
      {#snippet sidebar()}
        <h2>Was passiert hier?</h2>
        <p>
          Sobald das Gesetz im Bundesgesetzblatt verkündet wurde, schließen sich
          die abschließende Dokumentation und das offizielle Inkrafttreten der
          neuen Regelungen an. Damit verlässt das Gesetz den eigentlichen
          Gesetzgebungsprozess und geht in den Vollzug über, wo die Regelungen
          von den zuständigen Behörden der Länder und des Bundes in der Praxis
          angewendet und umgesetzt werden.
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
          <li>
            Gesetz und Metadaten werden im Dokstellenportal veröffentlicht.
          </li>
        </ul>
      </Bubble>
    </Cluster>

    <Cluster
      color="#FAB5A8"
      {orientation}
      className={isVertical ? "max-lg:pb-[50vh]" : "pr-40"}
      highlightGroup="Nach der Verkündung"
    >
      <Bubble title="Vollzug">
        <ul>
          <li>Bildung von Arbeitsgruppen</li>
          <li>Evaluation Änderungsdbedarfe</li>
          <li>...</li>
        </ul>
      </Bubble>
    </Cluster>

    <OutTrigger />
  </div>
</FlowLayout>
