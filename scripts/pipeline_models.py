"""Shared Pydantic models for the legal pipeline."""

from typing import Literal

from pydantic import BaseModel, Field


class NormParagraph(BaseModel):
    law_abbrev: str
    source: str = Field(pattern="^(gesetze-im-internet|eurlex)$")
    reference: str
    text: str
    url: str
    paragraph_id: str


class RegistryEntry(BaseModel):
    abbrev: str
    source: str = Field(pattern="^(gesetze-im-internet|eurlex)$")
    name: str
    jurabk: str | None = None
    kurzue: str | None = None
    ausfertigung_datum: str | None = None
    norm_count: int | None = None
    celex: str | None = None
    gii_slug: str | None = None
    gii_xml_zip_url: str | None = None
    url: str


NormAdressat = Literal[
    "Bürgerinnen und Bürger",
    "Wirtschaft",
    "Öffentliche Verwaltung",
]

ArtDerVorgabe = Literal[
    "Informationspflicht",
    "Handlungspflicht",
    "Unterlassungspflicht",
    "Duldungs-/Mitwirkungspflicht",
]

Pflichtstaerke = Literal["muss", "soll"]

OBLIGATION_CSV_COLUMNS = [
    "norm",
    "referenz",
    "vorgabe_zusammenfassung",
    "zitat",
    "art_der_vorgabe",
    "pflichtstaerke",
    "sprachlicher_indikator",
    "normadressat_kategorie",
    "normadressat_text",
    "quelle",
]


class Obligation(BaseModel):
    referenz: str
    art_der_vorgabe: ArtDerVorgabe
    pflichtstaerke: Pflichtstaerke
    normadressat_kategorie: list[NormAdressat]
    normadressat_text: str
    zitat: str
    vorgabe_zusammenfassung: str
    sprachlicher_indikator: str
    konfidenz: float = Field(ge=0.0, le=1.0)


class ObligationExtraction(BaseModel):
    obligations: list[Obligation]
