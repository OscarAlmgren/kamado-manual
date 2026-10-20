// All text och data för manualen. Redigera här – komponenterna behöver inte ändras.

export type FoodKind =
  | 'beef' | 'pork' | 'ribs' | 'chicken' | 'drumstick' | 'turkey' | 'fish' | 'lamb' | 'ham' | 'burger' | 'sausage'
  | 'veg' | 'pizza' | 'bread'

export type Food = { name: string; sv: string; time: string; kind: FoodKind }

export type Mode = {
  id: 'slow' | 'grill' | 'hot' | 'sear' | 'extreme'
  /** 'manual' = ur manualens tabell. 'general' = allmänt riktvärde som manualen inte anger. */
  source: 'manual' | 'general'
  label: string
  sv: string
  range: [number, number]
  /** Hur öppet övre lufthålet är (0–1). Uppskattat från manualens ritade nivåer. */
  topOpen: number
  /** Hur öppet nedre lufthålet är (0–1). Uppskattat från manualens ritade nivåer. */
  bottomOpen: number
  summary: string
  foods: Food[]
}

export const TEMP_MIN = 100
export const TEMP_MAX = 430 // termometerns skalslut, 800 °F ≈ 427 °C

export const modes: Mode[] = [
  {
    id: 'slow',
    source: 'manual',
    label: 'Slow Cook / Smoke',
    sv: 'Lågtemperatur & rökning',
    range: [110, 135],
    topOpen: 0.15,
    bottomOpen: 0.15,
    summary: 'Låg och jämn värme i många timmar. Båda lufthålen nästan stängda.',
    foods: [
      { name: 'Beef Brisket', sv: 'Nötbrisket', time: '1 tim per kg', kind: 'beef' },
      { name: 'Pulled Pork', sv: 'Pulled pork', time: '1 tim per kg', kind: 'pork' },
      { name: 'Whole Chicken', sv: 'Hel kyckling', time: '3–4 tim', kind: 'chicken' },
      { name: 'Ribs', sv: 'Revbensspjäll', time: '3–5 tim', kind: 'ribs' },
      { name: 'Roasts', sv: 'Stekar', time: '9+ tim', kind: 'beef' },
    ],
  },
  {
    id: 'grill',
    source: 'manual',
    label: 'Grill / Roast',
    sv: 'Grillning & ugnsstekning',
    range: [160, 180],
    topOpen: 0.5,
    bottomOpen: 0.35,
    summary: 'Som en utomhusugn. Lufthålen halvöppna för stabil medelvärme.',
    foods: [
      { name: 'Fish', sv: 'Fisk', time: '15–20 min', kind: 'fish' },
      { name: 'Pork Tenderloin', sv: 'Fläskfilé', time: '15–30 min', kind: 'pork' },
      { name: 'Chicken Pieces', sv: 'Kycklingbitar', time: '30–45 min', kind: 'drumstick' },
      { name: 'Whole Chicken', sv: 'Hel kyckling', time: '1–1,5 tim', kind: 'chicken' },
      { name: 'Leg of lamb', sv: 'Lammlägg', time: '3–4 tim', kind: 'lamb' },
      { name: 'Turkey', sv: 'Kalkon', time: '2–4 tim', kind: 'turkey' },
      { name: 'Ham', sv: 'Skinka', time: '2–5 tim', kind: 'ham' },
    ],
  },
  {
    id: 'hot',
    source: 'general',
    label: 'Hot Grill',
    sv: 'Het grillning & rostning',
    range: [200, 250],
    topOpen: 0.75,
    bottomOpen: 0.65,
    summary: 'Mellan manualens Grill och Sear (termometerns Grilling-zon). Lufthålen mer öppna än vid Grill.',
    foods: [
      { name: 'Roasted vegetables', sv: 'Rostade grönsaker', time: '20–30 min', kind: 'veg' },
      { name: 'Roasted potatoes', sv: 'Rostad potatis', time: '40–60 min', kind: 'veg' },
      { name: 'Chicken wings', sv: 'Kycklingvingar', time: '30–40 min', kind: 'drumstick' },
      { name: 'Flatbread', sv: 'Flatbröd', time: '3–6 min', kind: 'bread' },
      { name: 'Pizza (stone)', sv: 'Pizza (pizzasten)', time: '8–12 min', kind: 'pizza' },
    ],
  },
  {
    id: 'sear',
    source: 'manual',
    label: 'Sear',
    sv: 'Bryning',
    range: [260, 370],
    topOpen: 1,
    bottomOpen: 0.9,
    summary: 'Maximal värme för snabb, vacker stekyta. Lufthålen så gott som helt öppna.',
    foods: [
      { name: 'Steak', sv: 'Biff', time: '5–8 min', kind: 'beef' },
      { name: 'Pork Chops', sv: 'Fläskkotletter', time: '6–10 min', kind: 'pork' },
      { name: 'Burgers', sv: 'Hamburgare', time: '6–10 min', kind: 'burger' },
      { name: 'Sausages', sv: 'Korv', time: '6–10 min', kind: 'sausage' },
    ],
  },
  {
    id: 'extreme',
    source: 'general',
    label: 'Extreme',
    sv: 'Över manualens tabell',
    range: [380, 430],
    topOpen: 1,
    bottomOpen: 1,
    summary: 'Över manualens 370 °C, upp till termometerns skalslut. Lufthålen helt öppna. Kort tid och full uppmärksamhet.',
    foods: [
      { name: 'Neapolitan-style pizza', sv: 'Pizza i napolitansk stil', time: '1–3 min', kind: 'pizza' },
      { name: 'Thick steak sear', sv: 'Tjock biff, hård bryning', time: '1–2 min per sida', kind: 'beef' },
      { name: 'Naan', sv: 'Naan / flatbröd', time: '1–2 min', kind: 'bread' },
    ],
  },
]

/**
 * Termometerns färgzoner (SMOKING / BAKING / GRILLING / SEARING), avlästa från fotot av urtavlan.
 * Gränserna är ungefärliga. Termometerns namn skiljer sig från manualens lägen:
 * manualens Grill / Roast (160–180 °C) ligger i termometerns Baking-zon.
 */
export const thermoZones = [
  { id: 'smoking', label: 'Smoking', sv: 'Rökning', from: TEMP_MIN, to: 130, color: '#bef264' },
  { id: 'baking', label: 'Baking', sv: 'Bakning', from: 130, to: 200, color: '#fbbf24' },
  { id: 'grilling', label: 'Grilling', sv: 'Grillning', from: 200, to: 265, color: '#fb7185' },
  { id: 'searing', label: 'Searing', sv: 'Bryning', from: 265, to: TEMP_MAX, color: '#dc2626' },
] as const

export type Part = {
  n: number
  en: string
  sv: string
  view: 'A' | 'B'
  desc: string
}

export const parts: Part[] = [
  { n: 1, en: 'Top vent', sv: 'Övre lufthål (solfjäder)', view: 'A', desc: 'Släpper ut rökgaser och styr draget genom grillen. Ju mer öppen, desto mer luft och högre temperatur. Det är här du finjusterar värmen.' },
  { n: 2, en: 'Thermometer', sv: 'Termometer', view: 'A', desc: 'Visar temperaturen inne i locket. Avläs den ofta och ändra lufthålen i små steg.' },
  { n: 3, en: 'Lid', sv: 'Lock', view: 'A', desc: 'Keramiskt lock som håller värmen inne. Öppna det försiktigt vid hög temperatur, se varningen om bakdrag.' },
  { n: 4, en: 'Bottom vent', sv: 'Nedre lufthål (skjutlucka)', view: 'A', desc: 'Styr hur mycket syre som når glöden. Det är din huvudreglering av temperaturen. Mer öppen ger mer eld.' },
  { n: 5, en: 'Cooking grid', sv: 'Grillgaller', view: 'B', desc: 'Tillagningsytan där maten ligger.' },
  { n: 6, en: 'Heat deflector', sv: 'Värmesköld', view: 'B', desc: 'Skärmar av den direkta värmen från glöden. Används för indirekt tillagning, långkok och rökning.' },
  { n: 7, en: 'Elevator', sv: 'Ställ (elevator)', view: 'B', desc: 'Ställ som bär värmeskölden och/eller gallret på rätt höjd i grillen.' },
  { n: 8, en: 'Fire ring', sv: 'Eldring', view: 'B', desc: 'Keramikring som omsluter glöden och skyddar eldlådan.' },
  { n: 9, en: 'Cast iron grate', sv: 'Gjutjärnsrost', view: 'B', desc: 'Rost med hål som bär kolen och låter luft komma underifrån medan askan faller ner.' },
  { n: 10, en: 'Fire box', sv: 'Eldlåda', view: 'B', desc: 'Keramisk låda som rymmer kolen och leder luften från nedre lufthålet upp genom glöden.' },
  { n: 11, en: 'Bamboo handle', sv: 'Bambuhandtag', view: 'A', desc: 'Handtag för att öppna och stänga locket. Bambun håller sig svalare, men använd ändå grillhandskar.' },
]

export type CalloutKind = 'danger' | 'warning' | 'tip'

export type Step = string

export type Guide = {
  id: string
  title: string
  icon: 'flame' | 'thermo-low' | 'thermo-high' | 'smoke'
  intro?: string
  steps: Step[]
  callouts?: { kind: CalloutKind; title: string; text: string }[]
  /** Hoppa till temperatur i simulatorn */
  simulateTemp?: number
}

export const guides: Guide[] = [
  {
    id: 'ignition',
    title: 'Tändning & grundanvändning',
    icon: 'flame',
    intro: 'Så får du en säker och stabil glöd.',
    steps: [
      'Ställ grillen utomhus på ett plant, stabilt och obrännbart underlag. Lås hjulen.',
      'Kontrollera att eldlådan, gjutjärnsrosten och eldringen sitter rätt. Töm gammal aska.',
      'Fyll eldlådan med äkta träkol (klumpkol eller briketter). Lämna utrymme för luft att passera.',
      'Öppna övre och nedre lufthål helt.',
      'Lägg några hoprullade pappersbitar eller naturliga tändkuber bland kolen och tänd dem.',
      'Låt locket vara öppet 5–10 minuter tills de första kolen glöder. Stäng sedan locket.',
      'Låt temperaturen stiga och börja stänga lufthålen redan innan du når måltemperaturen. Kolen är trögare att kyla än att värma.',
    ],
    callouts: [
      { kind: 'danger', title: 'Använd ALDRIG tändvätska eller kemikalier', text: 'Tändvätska, bensin, sprit och andra kemikalier kan ge explosionsartade flammor och sätter sig i keramiken, så att smaken förstörs. Använd bara papper eller naturliga tändkuber.' },
      { kind: 'warning', title: 'Säkerhetsavstånd 2 meter', text: 'Håll minst 2 meter fritt till byggnader, staket, parasoller och allt som kan brinna. Använd aldrig grillen inomhus, i garage eller under tak.' },
    ],
  },
  {
    id: 'low',
    title: 'Lågtemperaturgrillning',
    icon: 'thermo-low',
    intro: 'Slow cook, 110–135 °C. Perfekt för brisket, pulled pork och revben.',
    simulateTemp: 120,
    steps: [
      'Tänd kolen enligt grundguiden och stäng locket.',
      'Sätt in värmeskölden för indirekt tillagning.',
      'Stäng övre lufthålet till nästan stängt och nedre lufthålet till en smal springa.',
      'Låt temperaturen stabilisera sig runt 110–135 °C i 15–20 minuter innan maten läggs på.',
      'Lägg maten på gallret, stäng locket och lämna den ifred. Varje öppning släpper ut värme.',
      'Justera i små steg och vänta 10–15 minuter mellan varje ändring.',
      'Kontrollera innertemperaturen med stektermometer, inte bara med klockan.',
    ],
    callouts: [
      { kind: 'tip', title: 'Stäng hellre för mycket än för lite', text: 'Börjar temperaturen sjunka kan du alltid öppna lufthålen en aning. Blir den för varm tar det lång tid att få ner den igen.' },
    ],
  },
  {
    id: 'high',
    title: 'Högtemperaturgrillning',
    icon: 'thermo-high',
    intro: 'Sear, 260–370 °C. Biff, burgare och kotletter på några minuter.',
    simulateTemp: 300,
    steps: [
      'Tänd kolen och öppna övre och nedre lufthål helt.',
      'Låt grillen värmas med stängt lock tills du når önskad temperatur, vanligen 260–370 °C.',
      'Ta bort värmeskölden så att maten får direkt värme.',
      'Lägg på maten och stäng locket. Följ tiderna i tabellen, t.ex. 5–8 minuter för biff.',
      'Vänd en gång. Ha grillhandskar på och använd långa verktyg.',
      'Stäng båda lufthålen helt när du är klar så att glöden slocknar.',
    ],
    callouts: [
      { kind: 'danger', title: 'Risk för bakdrag (backdraft) och flare-up', text: 'Vid hög temperatur kan ett snabbt öppnat lock ge en kraftig flamma. Glänta därför alltid försiktigt, se varningen längre ned.' },
    ],
  },
  {
    id: 'smoke',
    title: 'Rökning',
    icon: 'smoke',
    intro: 'Rökning görs på låg temperatur med rök från träflis eller träbitar.',
    simulateTemp: 120,
    steps: [
      'Blötlägg träflis eller träbitar enligt tipset nedan.',
      'Tänd kolen och låt dem glöda med öppet lock. Stäng sedan locket.',
      'Sätt in värmeskölden och stäng lufthålen så att temperaturen landar på 110–135 °C.',
      'Lägg träflisen direkt på glöden, eller en liten bit i taget.',
      'Lägg på maten när den första tunna blå röken kommer. Tjock vit rök ger bitter smak.',
      'Fyll på med lite träflis under första halvan av tillagningen. Maten tar mest rök tidigt.',
    ],
    callouts: [
      { kind: 'tip', title: 'Blötläggning av träflis', text: 'Träflis: blötlägg cirka 30 minuter. Större träbitar (chunks): cirka 1 timme. Låt rinna av så att flisen ryker i stället för att brinna. Torr flis ger mer kortvarig, hetare rök.' },
    ],
  },
]

export const backdraft = {
  title: 'Varning: bakdrag (backdraft) och flare-up',
  text: 'Vid höga temperaturer kan en plötslig tillströmning av syre ge en kraftig flamma som slår ut ur grillen. Öppna aldrig locket snabbt och helt.',
  steps: [
    'Glänta på locket 2–5 cm och håll det där i några sekunder så att syret kommer in successivt (burping).',
    'Håll ansikte, armar och hår borta från öppningen och använd grillhandskar.',
    'Öppna först sedan helt.',
    'Efter en lång stängd tillagning är risken högst, eftersom glöden då är het men syrefattig.',
  ],
}

export const cleaning = {
  title: 'Rengöring',
  items: [
    'Självrengöring: kör grillen på cirka 260 °C i 30 minuter. Matrester brinner då bort.',
    'Töm askan när grillen har svalnat helt.',
    'Rengör gallret med grillborste.',
  ],
  warning: 'Använd aldrig vatten inuti keramiken. Keramiken suger upp fukt, som kan ge sprickor när den värms. Torka av utsidan med en fuktig trasa och låt den torka.',
}

export const crazing = {
  title: 'Krackelering (crazing)',
  headline: 'Normalt – inte ett garantifall',
  summary: 'Fina hårsprickor i glasyren på keramiken.',
  facts: [
    'Crazing skiljer sig från en spricka: den kan inte kännas på ytan (utom med ett fingernagel).',
    'Den syns tydligare när ytan är dammig eller förstorad.',
    'Den påverkar varken prestanda eller livslängd, och kan därför inte göras gällande som ett garantiärende.',
    'Processen gör i praktiken enheten tåligare.',
  ],
}

export const storage = {
  title: 'Förvaring',
  items: [
    { title: 'Regnskydd', text: 'Använd ett passande skydd när grillen inte används. Vänta tills den har svalnat helt innan du lägger på det.' },
    { title: 'Vinterförvaring', text: 'Förvara helst torrt och under tak. Fukt som fryser i keramiken kan ge skador. Töm askan och kol som kan ta fukt.' },
    { title: 'Lås hjulen', text: 'Lås alltid hjulen när grillen står still, särskilt vid tändning, tillagning och i sluttande mark.' },
  ],
}

export type SpecRow = { label: string; value: string }
export type SpecModel = { title: string; subtitle: string; rows: SpecRow[] }

export const specModels: SpecModel[] = [
  {
    title: 'Teknisk data',
    subtitle: 'Exempel: Kamado 21,5″',
    rows: [
      { label: 'Storlek', value: '21,5 tum' },
      { label: 'Vikt', value: '73 kg' },
      { label: 'Tillagningsyta', value: 'Ø 46 cm' },
      { label: 'Max temperatur', value: '1000 °C' },
      { label: 'Termometerns skala', value: 'upp till ≈ 425 °C (800 °F)' },
    ],
  },
]
