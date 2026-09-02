<script lang="ts">
  import FlowLayout from "./_FlowLayout.svelte";
  import Section from "./_Section.svelte";
  import Cluster from "./_Cluster.svelte";
  import Bubble from "./_Bubble.svelte";
  import Arrow from "./_Arrow.svelte";
  import Feature from "./_Feature.svelte";
  import HideSidebarTrigger from "./_HideSidebarTrigger.svelte";
  import IconArrowDown from "~icons/ic/round-keyboard-double-arrow-down";
  import { werkzeuge } from "@/config/routes";

  const CLUSTER_FIRST_ANCHOR = "--cluster-first";
  const CLUSTER_LAST_ANCHOR = "--cluster-last";
</script>

<FlowLayout>
  <HideSidebarTrigger>
    <div
      class="py-lg mx-auto max-w-200 flex flex-col items-center gap-8"
      aria-hidden="true"
    >
      Scrollen Sie zum Starten
      <IconArrowDown class="block" />
    </div>
  </HideSidebarTrigger>

  <div
    aria-hidden="true"
    class="pointer-events-none absolute bg-black m-0 w-1 max-sm:hidden"
    style={`left: calc(anchor(${CLUSTER_FIRST_ANCHOR} center) - 0.5px); top: anchor(${CLUSTER_FIRST_ANCHOR} center); bottom: anchor(${CLUSTER_LAST_ANCHOR} center)`}
  ></div>

  <div
    role="group"
    aria-label="Startpunkte: Initiative des Bundestages, Aus der Mitte der Regierung, Initiative des Bundesrates"
    class="flex items-center gap-8 xl:gap-24 justify-center"
  >
    <Bubble
      color="#E6E6E6"
      title="Initiative des Bundestages"
      className="max-sm:hidden"
    />
    <Cluster color="#D59FDE" offset={0} sizes={["md"]}>
      <Bubble title="Aus der Mitte der Regierung" />
    </Cluster>
    <Bubble
      color="#E6E6E6"
      title="Initiative des Bundesrates"
      className="max-sm:hidden"
    />
  </div>

  <Arrow />

  <Section
    title="Interessensermittlung"
    anchorName={CLUSTER_FIRST_ANCHOR}
    color="#BCA6DC"
  >
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Sobald die Zuständigkeit nach der Geschäftsverteilung der
        Bundesregierung feststeht, beginnt das federführende Ressort mit der
        Koordination und der inhaltlichen Arbeit. Parallel bilden sich erste
        Arbeitsgruppen und der Austausch mit den Ländern und Kommunen beginnt.
      </p>
    {/snippet}

    <Cluster
      color="#BCA6DC"
      offset={0}
      sizes={["md", "md"]}
      ariaLabel="Schritte in dieser Phase: Arbeitsgruppenbildung, Workshops mit Ländern und Kommunen"
    >
      <Bubble title="Arbeits&shy;gruppen&shy;bildung" />
      <Bubble title="Workshops mit Ländern und Kommunen" />
    </Cluster>

    <Arrow>Übergabe an das Fachreferat</Arrow>

    <Cluster
      color="#BCA6DC"
      offset={0}
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Federführung"
    >
      <Bubble title="Federführung" />
    </Cluster>
  </Section>

  <Section title="Frühphase: Konzeption" color="#B3B7E0">
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Wenn der Bedarf für eine neue Regelung feststeht, analysiert das
        federführende Referat das genaue Problem und legt klare Ziele fest.
        Parallel dazu wird das rechtliche und fachliche Umfeld beleuchtet und
        bereits frühzeitig die Umsetzungsperspektive eingenommen. Auf dieser
        Basis lässt sich rechtzeitig ermitteln, welche weiteren Ressorts und
        externen Stakeholder in den Prozess einzubinden sind.
      </p>
      <h4>Wie könnte diese Phase in Zukunft aussehen?</h4>

      <div class="mt-24 space-y-24">
        <Feature tag="Prozess">
          <strong>Ein geführter Prozess</strong> unterstützt Sie Schritt für
          Schritt dabei, Ihr Regelungsvorhaben von Anfang an strukturiert
          aufzusetzen.
          {#snippet details()}
            <p>
              So können Sie das eigentliche Problem präzise durchdenken,
              Wirkziele festlegen und alle relevanten Akteure frühzeitig
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
          <strong>Verschiedene Checks und Arbeitshilfen</strong> sind
          konsolidiert und direkt in Ihren Arbeitsablauf eingebunden.
          {#snippet details()}
            <p>So berücksichtigen Sie automatisch notwendige Anforderungen.</p>
            <p>
              <strong>So arbeiten wir daran:</strong> Wir evaluieren bestehende
              <a href={werkzeuge.path}>Leitfäden</a>
              und bündeln diese später Schritt für Schritt an einem zentralen Ort.
            </p>
          {/snippet}
        </Feature>
        <Feature tag="KI">
          <strong>Künstliche Intelligenz</strong> nimmt Ihnen zeitintensive
          Arbeit bei der Recherche, Strukturierung und Zusammenstellung von
          Informationen ab.
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

    <Cluster
      color="#B3B7E0"
      offset={0}
      sizes={["lg", "md", "sm", "sm", "md", "sm", "md", "sm"]}
      ariaLabel="Schritte in dieser Phase: Workshops mit Ländern und Kommunen, Erarbeiten von Eckpunkten, Vorschläge von externen Akteuren, Gesetzesumfeld, Gutachten und Sachverständigenkommissionen, Materialrecherche, Ziel- und Wirkungsdefinition, Vorarbeit"
    >
      <Bubble
        title="Workshops mit Ländern und Kommunen"
        tags={["Checks"]}
        size="lg"
      />
      <Bubble title="Erarbeiten von Eckpunkten" size="md" tags={["Prozess"]} />
      <Bubble title="Vorschläge von externen Akteuren" size="sm" />
      <Bubble title="Gesetzes&shy;umfeld" size="sm" tags={["KI"]} />
      <Bubble title="Gutachten und Sach&shy;verständigen&shy;kommissionen" />
      <Bubble title="Material&shy;recherche" size="sm" tags={["Checks"]} />
      <Bubble
        title="Ziel- und Wirkungs&shy;definition"
        size="md"
        tags={["Prozess", "Checks"]}
      />
      <Bubble title="Vorarbeit" size="sm" tags={["Prozess"]} />
    </Cluster>
  </Section>

  <Section title="Frühphase: Erster Textentwurf" color="#ABD7F9" overlap>
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Sobald die Recherche abgeschlossen ist, erarbeitet das zuständige
        Ressort den konkreten Rohentwurf und das dazugehörige Vorblatt. Parallel
        dazu startet der fachliche Austausch, wobei optional schon jetzt eine
        frühzeitige Beteiligung stattfinden und erste Gesetzesfolgen besprochen
        werden können, um den Entwurf frühzeitig zu schärfen.
      </p>
    {/snippet}

    <Cluster
      color="#ABD7F9"
      sizes={["sm", "sm", "sm", "sm", "sm"]}
      ariaLabel="Schritte in dieser Phase: Frühzeitige Beteiligung, Austausch, Vorblatt, Erster Textentwurf, Gesetzesfolgen besprechen"
    >
      <Bubble title="Gesetzesfolgen besprechen" size="sm" />
      <Bubble title="Austausch" size="sm" />
      <Bubble title="Vorblatt" size="sm" />
      <Bubble title="Erster Textentwurf" size="sm" />
      <Bubble
        title="Frühzeitige Beteiligung"
        size="sm"
        color="linear-gradient(180deg, #B3B7E0, #ABD7F9)"
      />
    </Cluster>
  </Section>

  <Section title="Referentenentwurf & Ressortabstimmung" color="#A0EBEE">
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Der erste Rohentwurf ist fertig. Das federführende Referat holt nun
        hausinternes Feedback ein und übergibt anschließend den Hausentwurf zur
        Frühkoordinierung an das Bundeskanzleramt. Parallel dazu starten die
        politischen Abstimmungen, Bericht&shy;erstatter&shy;gespräche und die
        finale Gesetzesfolgen&shy;abschätzung. So werden rechtzeitig externe
        Stellungnahmen von weiteren Ressorts sowie Prüfstellen (wie dem NKR)
        eingeholt und der Entwurf strukturiert zum Ressortentwurf
        weiterentwickelt.
      </p>
      <p>
        Abschließend informiert das Ressort die betroffenen Verbände und
        bereitet die finale Fassung als Regierungsentwurf vor.
      </p>
    {/snippet}

    <Cluster
      color="#A0EBEE"
      sizes={["sm", "sm", "lg"]}
      ariaLabel="Schritte in dieser Phase: Beteiligung der Referate, Referentenentwurf, Frühkoordinierung/ Vorhabenclearing Bundeskanzleramt"
    >
      <Bubble title="Beteiligung der Referate" size="sm" />
      <Bubble title="Referenten&shy;entwurf" size="sm" />
      <Bubble
        title="Frühkoordinierung/ Vorhabenclearing Bundeskanzleramt"
        size="lg"
      />
    </Cluster>

    <Cluster
      color="#9EDCD0"
      sizes={["md", "sm", "md", "sm", "sm"]}
      ariaLabel="Schritte in dieser Phase: Gesetzesfolgenabschätzung, Beteiligung Dritter, Weitere Abstimmungen & Stellungnahmen, Regierungsentwurf, Politische Abstimmung"
    >
      <Bubble title="Finale Gesetzes&shy;folgen&shy;abschätzung" size="md" />
      <Bubble title="Beteiligung Dritter" size="sm" />
      <Bubble title="Weitere Abstimmungen & Stellung&shy;nahmen" size="md" />
      <Bubble title="Regierungs&shy;entwurf" size="sm" />
      <Bubble title="Politische Abstimmung" size="sm" />
    </Cluster>

    <Cluster
      color="#9EDCD0"
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Verbände informieren"
    >
      <Bubble title="Verbände informieren" size="md" />
    </Cluster>
  </Section>

  <Section title="Kabinettvorlage" color="#D2EDB9">
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Sobald die Abstimmungen zum Ressortentwurf abgeschlossen sind, wird die
        offizielle Kabinettvorlage erstellt und durch die Leitung des Hauses
        unterzeichnet. Anschließend erfolgt die Weiterleitung an das
        Bundeskanzleramt, womit der Gesetzentwurf formell an die politische
        Ebene übergeben wird und aus ihm durch Beschluss der Bundesregierung ein
        Regierungsentwurf entsteht.
      </p>
    {/snippet}

    <Cluster
      color="#D2EDB9"
      sizes={["md", "md"]}
      ariaLabel="Schritte in dieser Phase: Kabinettvorlage erstellen, Unterzeichnen der Kabinettvorlage"
    >
      <Bubble title="Kabinett&shy;vorlage erstellen" size="md" />
      <Bubble title="Unterzeichnen der Kabinett&shy;vorlage" size="md" />
    </Cluster>

    <Cluster
      color="#D2EDB9"
      offset={0}
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Weiterleitung an das Bundeskanzleramt"
    >
      <Bubble title="Weiterleitung an das Bundes&shy;kanzleramt" size="md" />
    </Cluster>
  </Section>

  <Arrow>Übergabe an die politische Ebene</Arrow>

  <Section title="Verabschiedung" color="#EBF5B3">
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Wenn die Bundesregierung den Entwurf an die gesetzgebenden Organe
        übergeben hat, durchläuft das Vorhaben das eigentliche parlamentarische
        Verfahren. Es beginnt in der Regel mit der Stellungnahme des
        Bundesrates, führt über die intensive Beratung und finale Abstimmung im
        Bundestag und endet schließlich mit der formellen Verkündung des
        Gesetzes im Bundesgesetzblatt.
      </p>
    {/snippet}

    <Cluster
      color="#EBF5B3"
      offset={0}
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Stellungnahme Bundesrat"
    >
      <Bubble title="Stellungnahme Bundesrat" color="#D2EDB9" />
    </Cluster>

    <Cluster
      color="#EBF5B3"
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Abstimmung im Bundestag"
    >
      <Bubble title="Abstimmung im Bundestag" />
    </Cluster>

    <Cluster
      color="#FFFBB5"
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Verkündung"
    >
      <Bubble title="Verkündung" />
    </Cluster>
  </Section>

  <Section
    title="Nach der Verkündung"
    anchorName={CLUSTER_LAST_ANCHOR}
    color="#FDE99F"
  >
    {#snippet sidebar()}
      <h3>Was passiert hier?</h3>
      <p>
        Das Gesetz wird im Bundesgesetzblatt verkündet. Danach schließen sich
        die abschließende Dokumentation und das offizielle Inkrafttreten der
        neuen Regelungen an. Damit verlässt das Gesetz den eigentlichen
        Gesetzgebungsprozess und geht in den Vollzug über, wo die Regelungen von
        den zuständigen Behörden der Länder und des Bundes in der Praxis
        angewendet und umgesetzt werden.
      </p>
    {/snippet}

    <Cluster
      color="#FDE99F"
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Dokumentation & Inkrafttreten"
    >
      <Bubble title="Dokumentation & Inkrafttreten" />
    </Cluster>

    <Cluster
      color="#FAB5A8"
      className="max-lg:pb-[50vh]"
      sizes={["md"]}
      ariaLabel="Schritte in dieser Phase: Vollzug"
    >
      <Bubble title="Vollzug" />
    </Cluster>
  </Section>

  <HideSidebarTrigger />
</FlowLayout>
