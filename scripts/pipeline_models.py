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


class Obligation(BaseModel):
    referenz: str
    art_der_vorgabe: ArtDerVorgabe
    pflichtstaerke: Pflichtstaerke
    normadressaten: list[NormAdressat]
    normadressat_text: str
    zitat: str
    handlung: str
    bestandteile: list[str] = Field(default_factory=list)
    sprachlicher_indikator: str
    konfidenz: float = Field(ge=0.0, le=1.0)


class ObligationExtraction(BaseModel):
    obligations: list[Obligation]
