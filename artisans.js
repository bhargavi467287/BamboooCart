// Bambookart - Artisans Directory & Heritage Information
// Highlighting the traditional Medara and bamboo-weaving families

const ARTISANS_DATA = [
  {
    id: "ramaiah",
    name: "Medara Ramaiah",
    nameTe: "మేదర రామయ్య",
    village: "Dowleswaram Village, Rajahmundry",
    villageTe: "ధవళేశ్వరం గ్రామం, రాజమండ్రి",
    district: "East Godavari, Andhra Pradesh",
    districtTe: "తూర్పు గోదావరి జిల్లా, ఆంధ్రప్రదేశ్",
    experience: "35 Years of Weaving Heritage",
    experienceTe: "35 సంవత్సరాల వెదురు అల్లిక అనుభవం",
    specialty: "Heavy Harvest Baskets (Gampa), Vegetable Baskets & Dining Trays",
    specialtyTe: "పెద్ద వెదురు గంపలు, కూరగాయల బుట్టలు మరియు డైనింగ్ ట్రేలు",
    image: "assets/images/artisan-ramaiah.svg",
    story: "Ramaiah belongs to the 4th generation of the traditional Medara community along the Godavari riverbanks. He splits native bamboo culms by hand using his family heirloom knife ('Katthi') into flexible ribbons with millimeter precision. Bambookart allows him to sell directly to homes without exploitative middlemen taking 70% cuts.",
    storyTe: "గోదావరి తీరంలో 4 తరాలుగా వెదురు అల్లిక చేస్తున్న సంప్రదాయ మేదర కుటుంబానికి చెందినవారు రామయ్య గారు. మధ్యవర్తుల దోపిడీ లేకుండా, బాంబూకార్ట్ ద్వారా తమ ఉత్పత్తులకు నేరుగా సరైన గిట్టుబాటు ధర లభిస్తోందని ఆయన సంతోషం వ్యక్తం చేస్తున్నారు.",
    productsCount: 3,
    quote: "Bamboo is alive. When you weave it with care, it will serve a household for a decade.",
    quoteTe: "వెదురులో ప్రాణముంది. ప్రేమతో అల్లితే దశాబ్దాల పాటు ఏ ఇబ్బందీ లేకుండా సేవ చేస్తుంది."
  },
  {
    id: "lakshmi",
    name: "P. Lakshmi Devi",
    nameTe: "పి. లక్ష్మీదేవి",
    village: "Gundlapalle, Madanapalle",
    villageTe: "గుండ్లపల్లె, మదనపల్లె",
    district: "Chittoor / Annamayya District, Andhra Pradesh",
    districtTe: "చిత్తూరు / అన్నమయ్య జిల్లా",
    experience: "28 Years of Precision Handcraft",
    experienceTe: "28 సంవత్సరాల హస్తకళా నైపుణ్యం",
    specialty: "Authentic Winnowing Baskets (Chattalu / Moram) & Pooja Platters",
    specialtyTe: "సాంప్రదాయ చేటలు (చట్టాలు) మరియు పూజా పళ్ళాలు",
    image: "assets/images/artisan-lakshmi.svg",
    story: "Lakshmi learned the intricate art of winnowing basket weaving from her grandmother. The Chattamu requires balanced tension so that the front lip stays completely flat while the raised U-shaped back catches light chaff when tossed into the breeze. She has trained 15 local women in her village to earn independent livelihood.",
    storyTe: "తన బామ్మ నుంచి చేటలు అల్లే పవిత్రమైన విద్యను నేర్చుకున్నారు లక్ష్మీదేవి. గ్రామాల్లోని మహిళలకు స్వయం ఉపాధి కల్పించడంలో ఆమె ఎంతో కృషి చేస్తున్నారు.",
    productsCount: 2,
    quote: "Every Chattamu I weave carries the blessings of Annapurna for the home it enters.",
    quoteTe: "నేను అల్లే ప్రతి చేటా ఆ ఇంటికి అన్నపూర్ణాదేవి అనుగ్రహాన్ని అందిస్తుంది."
  },
  {
    id: "subbarao",
    name: "K. Subba Rao",
    nameTe: "కె. సుబ్బారావు",
    village: "Ashoknagar, Narsampet",
    villageTe: "అశోక్‌నగర్, నర్సంపేట",
    district: "Warangal, Telangana",
    districtTe: "వరంగల్ జిల్లా, తెలంగాణ",
    experience: "30 Years in Bamboo Crafting",
    experienceTe: "30 సంవత్సరాల అనుభవం",
    specialty: "Fine Mesh Sieves (Jalledalu), Seasoned Bamboo Sticks & Organizers",
    specialtyTe: "సన్నని జల్లెడలు, సహజ వెదురు కర్రలు మరియు డెస్క్ పాత్రలు",
    image: "assets/images/artisan-subba-rao.svg",
    story: "Subba Rao is celebrated for his micro-thin bamboo splitting technique. He splits a single millimeter-thick bamboo strip into three whisper-thin reeds to weave zero-defect sieves for grain cleaning. He uses cold herbal water seasoning to naturally repel termites without artificial chemicals.",
    storyTe: "ఒక చిన్న వెదురు బద్దను అత్యంత సన్నగా చీల్చి నైపుణ్యంతో జల్లెడలు తయారు చేయడంలో సుబ్బారావు గారు నిపుణులు. రసాయనాలు లేకుండా సహజ పద్ధతుల్లో చెదలు పట్టకుండా శుద్ధి చేస్తారు.",
    productsCount: 4,
    quote: "True craftsmanship needs no synthetic glue or plastic. Nature has provided everything.",
    quoteTe: "నిజమైన చేతిపనికి ప్లాస్టిక్ లేదా కృత్రిమ రసాయనాలు అవసరం లేదు. ప్రకృతిలోనే అన్నీ ఉన్నాయి."
  },
  {
    id: "sarada",
    name: "Ch. Saradamma",
    nameTe: "సిహెచ్. శారదమ్మ",
    village: "Veeraghattam Road, Palakonda",
    villageTe: "వీరఘట్టం రోడ్డు, పాలకొండ",
    district: "Srikakulam / Manyam District, Andhra Pradesh",
    districtTe: "శ్రీకాకుళం / మన్యం జిల్లా",
    experience: "22 Years of Artisan Experience",
    experienceTe: "22 సంవత్సరాల కళా నైపుణ్యం",
    specialty: "Arched Fruit Baskets, Storage Containers & Chapati Warm Baskets",
    specialtyTe: "హ్యాండిల్ పండ్ల బుట్టలు, మూత నిల్వ బుట్టలు మరియు రోటీ బుట్టలు",
    image: "assets/images/artisan-sarada.svg",
    story: "Living close to the rich bamboo hills of the Eastern Ghats, Saradamma weaves supple golden bamboo into modern domestic kitchen utilities. Her covered storage baskets and bread/roti baskets are loved for preserving freshness naturally while replacing toxic plastic containers.",
    storyTe: "తూర్పు కనుమల వెదురుతో వంటగదికి అవసరమైన ఆరోగ్యకరమైన బుట్టలను రూపొందిస్తారు శారదమ్మ. ప్లాస్టిక్ కంటైనర్లకు ప్రత్యామ్నాయంగా సహజ జీవన విధానాన్ని ప్రోత్సహిస్తున్నారు.",
    productsCount: 3,
    quote: "Replacing plastic in our kitchens with bamboo brings good health to the buyer and food to our families.",
    quoteTe: "వంటగదిలో ప్లాస్టిక్ బదులు వెదురు వాడటం వల్ల కొనేవారికి ఆరోగ్యం, మా కుటుంబాలకు జీవనోపాధి లభిస్తాయి."
  }
];

// Bamboo handcrafting process steps for storytelling
const CRAFTING_STEPS = [
  {
    step: "01",
    title: "Eco-Harvesting",
    titleTe: "సహజ వెదురు సేకరణ",
    desc: "Only 3-4 year mature bamboo culms are harvested sustainably, leaving root rhizomes intact to regenerate naturally.",
    descTe: "3-4 సంవత్సరాల వయసున్న పరిపక్వ వెదురును మాత్రమే సేకరిస్తారు. వేర్లు భూమిలోనే ఉండి మళ్ళీ కొత్త మొక్కలు మొలుస్తాయి."
  },
  {
    step: "02",
    title: "Sun-Curing & Seasoning",
    titleTe: "ఎండబెట్టడం & శుద్ధి",
    desc: "Stalks are soaked in fresh water and air-cured under natural sunlight to remove sap and ensure lifetime durability against pests.",
    descTe: "చెదలు పట్టకుండా సహజ నీటిలో నానబెట్టి, సూర్యరశ్మిలో క్రమపద్ధతిలో ఆరబెడతారు."
  },
  {
    step: "03",
    title: "Hand Splitting (Cheelatam)",
    titleTe: "చేతితో బద్దలు చీల్చడం",
    desc: "Artisans use traditional heirloom curved knives to split poles into whisper-thin, smooth ribbons of equal thickness.",
    descTe: "సాంప్రదాయ కత్తులతో సన్నని, సమానమైన వెదురు బద్దలుగా సునాయాసంగా చీలుస్తారు."
  },
  {
    step: "04",
    title: "Master Hand-Weaving",
    titleTe: "చేతితో నైపుణ్య అల్లిక",
    desc: "Warp and weft interlocking techniques passed down through generations create tight, sturdy, enduring utility forms.",
    descTe: "తరతరాలుగా సంక్రమించిన పద్ధతుల్లో రసాయన రహితంగా గట్టిగా, అందంగా అల్లుతారు."
  }
];
