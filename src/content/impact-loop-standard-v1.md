# The Impact Loop Standard™
## Official Specification — Version 1.0

*A shared method for turning frontline observations into measurable, auditable impact data.*

*Published by Impact Loop. This document is the canonical reference for the Standard. It is self-contained: a reader needs nothing else to understand or implement it.*

---

## 0. What this document is

The Impact Loop Standard is an open, documented methodology for measuring human development and program impact. It defines:

- a **taxonomy** of what is measured (development pillars and growth indicators),
- a **data model** for how observations are captured (the Pillar Moment),
- a **scoring engine** for turning observations into comparable numbers,
- **validity safeguards** that make those numbers defensible,
- **aggregation rules** for rolling data up from one person to a whole funder portfolio,
- and the **governance** (versioning, status flags, validation roadmap) that makes it a standard rather than a one-off formula.

The scoring formula is published deliberately. The value of the Standard is in the shared taxonomy, the accumulated benchmark data, the trust it earns, and the workflow — not in keeping a calculation secret.

**Executive summary.** Most organizations can describe the lives they change but cannot prove it; the evidence lives in staff memory and scattered notes. The Standard fixes this by capturing development as a continuous stream of fifteen-second, staff-rated observations, each tied to a defined growth construct. It scores each construct 0–100 with a transparent, honesty-weighted formula, reports how much evidence backs every number, and cross-checks staff against participants' own self-assessment — while every figure remains traceable to a dated, named observation. The result is impact data that organizations can stand behind and funders can trust.

---

## 1. Purpose & principles

### 1.1 The problem
Activity is easy to count (attendance, sessions, "heads in beds"). Transformation is not. Soft outcomes — confidence, resilience, belonging, purpose — are real but hard to measure, so they are usually captured once a year from memory, which is anecdote with a date attached. Funders increasingly require evidence of outcomes, not activity.

### 1.2 Design principles
1. **Measurement must run on data the frontline will actually produce.** If capturing a meaningful observation takes more than ~15 seconds, it will not happen consistently. Everything else (scoring, aggregation, reporting) is computation the system performs, not work it demands of staff.
2. **Humans judge; the system only weights.** Staff assign every rating. The system never invents a score. This preserves construct validity and keeps the data auditable.
3. **Honesty over optimism.** Setbacks and neutral moments are captured and counted. A system that can only go up cannot be trusted.
4. **Every number traces to evidence.** No figure may exist without a dated, named, quotable observation behind it.
5. **Comparability through a shared, versioned taxonomy.** Two organizations on the same taxonomy version produce data that can be compared and benchmarked.
6. **Status is always explicit.** Data is labeled live, preview, or illustrative so measured evidence is never confused with illustrative mapping.

### 1.3 Lineage
The Standard draws on established evaluation practice — measuring "soft outcomes" and "distance travelled" (how far a person moves on a developmental dimension over time) — and on time-decay weighting common in analytics. Its contribution is making continuous, in-the-moment capture light enough to sustain, and packaging the whole as a comparable, governed standard.

---

## 2. The taxonomy (what is measured)

### 2.1 Pillars and indicators
The default taxonomy defines five **development pillars**, each a construct, operationalized by observable **growth indicators**:

| Pillar | Definition | Growth indicators |
|---|---|---|
| **Identity** | A grounded sense of self and self-worth. | Self-awareness · Confidence · Personal integrity |
| **Character** | Inner qualities that hold under pressure. | Integrity · Accountability · Resilience |
| **Relationships** | The capacity to connect and navigate others well. | Communication · Trust · Healthy conflict |
| **Service** | Orientation toward others and the group. | Empathy · Initiative · Teamwork |
| **Purpose** | Direction, aspiration, and agency. | Goal-setting · Understanding gifts & talents |

Each pillar is assigned a stable display colour for charts (Identity violet, Character blue, Relationships teal, Service orange, Purpose gold), but colour is presentation, not data.

### 2.2 Configurability
An adopting organization MAY:
- adopt the default taxonomy unchanged (recommended for comparability),
- rename pillars or indicators to its own language,
- map the pillars to an existing theory of change or outcomes framework,
- or define a different pillar set for a different domain (e.g., newcomer settlement, mental health, employment).

Any deviation from the default is recorded as a **taxonomy profile** with its own identifier and version. Comparability and benchmarking apply **within** a taxonomy profile + version, not across incompatible ones.

---

## 3. The data model — the Pillar Moment

The atomic unit of the Standard is the **Pillar Moment**: one observation, about one participant, by one staff member, at one time.

### 3.1 Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique identifier. |
| `participantId` | string | yes | The person observed. Enables scores to follow them across programs. |
| `staffId` | string | yes | Who logged it. Enables accountability and inter-rater checks. |
| `programId` | string | yes | Program/context of the observation. |
| `pillarId` | enum | yes | One of the taxonomy's pillars. |
| `indicators` | string[] | optional | One or more growth indicators for that pillar. |
| `rating` | integer 1–5 | yes | Strength of the moment. 1 = small step, 5 = breakthrough. Human-assigned. |
| `direction` | enum | yes | `growth` · `neutral` · `setback`. |
| `note` | string | optional* | The human story. Often dictated by voice. *Strongly recommended; required for a moment to back a reported figure.* |
| `timestamp` | datetime | yes | When the moment occurred / was logged. Powers recency and point-in-time recomputation. |
| `taxonomyProfile` | string | yes | Which taxonomy profile + version this moment uses. |

### 3.2 The capture protocol ("three taps + talk")
A valid Pillar Moment is captured in roughly this flow:
1. Select the participant.
2. Select the pillar.
3. Set the rating (1–5), tag indicator(s), and set the direction.
4. Add the note — by voice (transcribed) or text.

Direction is assigned by the observing staff member based on whether the moment showed forward movement (`growth`), a holding observation (`neutral`), or a regression (`setback`).

### 3.3 The cardinal rule
A reported number MUST be reducible to the set of Pillar Moments that produced it, each with its note, staff, and date. If a figure cannot be drilled down to observations, it is not Standard-compliant.

---

## 4. The scoring engine

### 4.1 Pillar Score
For a given participant and pillar, computed **as of** a reference date `T`:

```
PillarScore(0–100) = ( Σ (effectiveRating_i · weight_i) / Σ weight_i ) × 20

where, for each moment i (on or before T) in that pillar:
  weight_i          = directionWeight_i × recencyWeight_i
  directionWeight_i = 1.0  if direction = growth
                      0.5  if direction = neutral
                      1.0  if direction = setback
  effectiveRating_i = rating_i  if direction ∈ {growth, neutral}
                      1         if direction = setback   (full weight, rating forced to 1)
  recencyWeight_i   = 0.5 ^ ( daysBetween(timestamp_i, T) / 30 )   // 30-day half-life
```

The weighted average of effective ratings (a 1–5 quantity) is scaled to 0–100 by multiplying by 20.

### 4.2 Why these choices
- **Direction** lets the system weight *meaning*. Neutral observations dampen rather than inflate; setbacks pull the score down honestly instead of being hidden.
- **Recency (30-day half-life)** keeps a score current: a moment today counts about twice one from a month ago, four times one from two months ago. Scores describe who the participant is *now*.

### 4.3 Worked example
A participant's **Service** pillar, scored as of today, with five logged moments:

| # | Days ago | Rating | Direction | Effective rating | Recency `0.5^(d/30)` | Weight | Rating × weight |
|---|---|---|---|---|---|---|---|
| 1 | 0 | 5 | Growth | 5 | 1.000 | 1.000 | 5.000 |
| 2 | 10 | 4 | Growth | 4 | 0.794 | 0.794 | 3.176 |
| 3 | 25 | 4 | Growth | 4 | 0.561 | 0.561 | 2.244 |
| 4 | 50 | 2 | Setback | 1 | 0.315 | 0.315 | 0.315 |
| 5 | 80 | 3 | Neutral | 3 | 0.157 | 0.079 | 0.236 |

- Σ (rating × weight) = **10.97**
- Σ weight = **2.749**
- Weighted average effective rating = 10.97 / 2.749 = **3.99 / 5**
- **PillarScore = 3.99 × 20 ≈ 80 / 100**

The recent breakthrough dominates; the older setback still pulls down but is fading; the neutral barely registers. The score reflects current reality.

### 4.4 Growth Rate
```
GrowthRate = PillarScore(asOf = today) − PillarScore(asOf = today − 91 days)
```
A 91-day (one quarter) look-back. In the example, if the score one quarter ago was 56, the Growth Rate is **+24 points**. This is the headline funder-facing figure, and it expands into the exact moments behind it.

### 4.5 Confidence tier
Based on the count `n` of observations backing a pillar:
- `n < 3` → **Emerging picture**
- `3 ≤ n ≤ 9` → **Developing**
- `n ≥ 10` → **Strong evidence**

The tier accompanies every score so a reader knows how much evidence supports it.

### 4.6 Overall / composite views
A participant's overall growth is the average of available pillar Growth Rates. A pillar with no observations yields no score (not zero) and is shown as "no data," never as a low score.

---

## 5. Validity & safeguards

The Standard is designed to survive funder scrutiny. Four mechanisms:

1. **Construct validity / no black box.** Staff translate a real, observed behaviour into a rating against a defined indicator. The system only categorizes and weights. Numbers stay grounded in observation.
2. **Statistical honesty via confidence tiers.** A plain-language proxy for sample size prevents thin data from being over-read.
3. **Triangulation via self-evaluation.** Participants rate themselves on the same pillars each reporting period. Agreement strengthens confidence; divergence flags a number for scrutiny and seeds a coaching conversation.
4. **Inter-rater reliability (enabled by design).** Because every moment is attributed to a named staff member, organizations can check whether different staff rate similar behaviours similarly, and recalibrate. This is the basis of formal validation (see §9).

---

## 6. Aggregation layers

The same Pillar Moments compose upward without losing the audit trail:

| Level | What it shows |
|---|---|
| **Participant** | Five pillar scores → a radar "growth shape," with the prior period ghosted behind. |
| **Program** | Average growth across its participants; which programs move which pillars. |
| **Organization** | Org-wide pillar averages, % of participants showing measurable growth, most-grown pillar — the funder dashboard. |
| **Funder portfolio** | Comparable outcomes across every grantee on the same taxonomy profile + version. |
| **Network** | Benchmarks and norms across all organizations: percentiles, medians ("your +24 vs. the network median +12"). The compounding asset. |

Each level is an aggregation of the same atomic moments; any figure at any level still drills down to dated, named observations.

---

## 7. Reporting outputs

### 7.1 The Impact Report
The canonical output pairs numbers with evidence:
- header (organization, program, reporting period);
- headline stats (participants, observations, % showing growth);
- growth-by-pillar table (prior period / current / change);
- **three** highest-signal, anonymized sample observations in staff's own words (first-initial only);
- a footer noting that every metric is auditable to individual dated observations.

Reports are exportable (e.g., print-to-PDF) on demand and are suitable for parents and funders.

### 7.2 Living reports
Because the data is continuous, a report can be a *living* page that updates as moments accrue, rather than a static end-of-year PDF.

---

## 8. Data integrity — the status rule

Every Standard data object carries an explicit **status**:

- **`live`** — real, measured Pillar Moment data from the Standard software.
- **`preview`** — real but early/partial (small samples); treat as provisional.
- **`illustrative`** — NOT measured. A mapping of existing qualitative outcomes onto the pillars to demonstrate what measured data would look like. MUST be visibly labeled wherever shown.

Presenting `illustrative` data as `live` is a violation of the Standard. The credibility of the entire system depends on this distinction being honored in every report, page, and post.

---

## 9. Governance — what makes it a standard

A formula is a calculation; a standard is a calculation plus governance:

- **Versioned taxonomy & spec.** This document is v1.0. Changes are versioned; data records the taxonomy profile + version they used, so historical comparability is preserved.
- **Published scoring rules.** Open and auditable (this document, §4).
- **Status governance.** The live/preview/illustrative rule (§8).
- **Benchmark governance.** Defined rules for how network norms are computed, anonymized, and shared.
- **Certification (roadmap).** A mark — "Measured on the Impact Loop Standard v1.x" — that signals adherence.

### 9.1 Validation roadmap
To move from "documented method" to "validated standard":
1. **Inter-rater reliability** studies from pilot data (do staff rate consistently?).
2. **Construct review** — an evaluation or academic partner reviews the pillar/indicator constructs.
3. **Predictive checks** — do growth scores correlate with downstream outcomes (e.g., school engagement, employment)?
4. **Independent methodology review** and publication.

Validation is itself part of the moat: it is the hardest element for a competitor to replicate, and it is what converts funder trust into a durable credential.

---

## 10. Privacy & ethics

The Standard handles developmental data about real people, often minors. Compliant implementations:
- collect informed consent (guardian consent for minors);
- apply least-access by default (staff see only participants in their own programs);
- encrypt sensitive data at rest and maintain an audit log;
- anonymize observations used in outward-facing reports (first-initial only);
- prefer appropriate data residency and follow applicable privacy law (e.g., PIPEDA in Canada).
The purpose of measurement is to make real transformation visible and fundable — never to surveil or reduce people to numbers.

---

## 11. Glossary

- **Pillar** — a development construct being measured (e.g., Identity).
- **Indicator** — an observable behaviour operationalizing a pillar.
- **Pillar Moment** — one staff observation; the atomic data unit.
- **Direction** — whether a moment showed growth, was neutral, or was a setback.
- **PillarScore** — a 0–100 score for one pillar, as of a date.
- **Growth Rate** — change in a PillarScore vs. one quarter prior.
- **Confidence tier** — Emerging / Developing / Strong evidence, by observation count.
- **Taxonomy profile** — a named, versioned configuration of pillars and indicators.
- **Status** — live / preview / illustrative data integrity flag.
- **Impact Report** — the canonical numbers-plus-stories output.

---

## 12. FAQ

**Isn't a weighted average too simple to be "impact measurement"?**
The math is intentionally simple and transparent. Sophistication that can't be audited is a liability in funder reporting. The rigor is in the data discipline (every number traces to a named observation), the honesty weighting, the confidence tiers, and the validation roadmap — not in opaque complexity.

**Why publish the formula if it's your product?**
Because the formula isn't the moat. Publishing it spreads the standard. The defensible assets are the shared taxonomy, the benchmark data, funder trust, and being the system of record.

**Can staff game it?**
Setbacks reduce scores with full weight; confidence tiers reward consistency over volume; the self-evaluation cross-check and named audit trail expose manufactured patterns. Honesty is structurally rewarded, and inter-rater checks catch drift.

**Does it only work for youth programs?**
No. The engine is domain-agnostic. A different taxonomy profile (different pillars/indicators) lets newcomer settlement, mental health, employment, or women's empowerment programs use the same machinery.

**Is the data scientifically validated?**
Not yet — and the Standard says so explicitly. §9.1 is the path to validation. Overclaiming would violate the honesty principle the whole method depends on.

---

## 13. Version

- **v1.0** — Initial public specification. Five-pillar default taxonomy; direction + 30-day-half-life recency weighting; 91-day Growth Rate; confidence tiers; self-evaluation cross-check; status governance; validation roadmap.

*© Impact Loop. "The Impact Loop Standard" and "Pillar Moment" are claimed as trademarks of Impact Loop. The methodology described here may be referenced and discussed freely; implementation, certification, and use of the marks are available under licence. Contact: impactloop.ca.*
