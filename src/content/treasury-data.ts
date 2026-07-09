export interface TreasuryWord {
  id: number;
  urduScript: string;
  romanUrdu: string;
  englishExplanation: string;
  category: string;
}

export interface TreasuryCategory {
  name: string;
  theme: string;
  words: TreasuryWord[];
}

export const treasuryCategories: TreasuryCategory[] = [
  {
    name: "Ghazal-e-Husn-o-Ishq",
    theme: "Love, Beauty, Romance & Longing",
    words: [
      {
        id: 1,
        urduScript: "شفتگی",
        romanUrdu: "Sheftagi",
        englishExplanation:
          "A state of deep infatuation, intense fondness, or being completely enamored by someone's beauty.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 2,
        urduScript: "ورفتگی",
        romanUrdu: "Waraftagi",
        englishExplanation:
          "Complete, ecstatic self-forgetfulness and passionate absorption in the love of a beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 3,
        urduScript: "دل فریب",
        romanUrdu: "Dulfareeb",
        englishExplanation:
          "Heart-alluring; a beauty so captivating that it instantly wins over the observer's heart.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 4,
        urduScript: "رونائی",
        romanUrdu: "Raonai",
        englishExplanation:
          "Breathtaking grace, elegance, and eye-catching charm found in a person's appearance or movement.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 5,
        urduScript: "اشتیاق",
        romanUrdu: "Ishtiyaq",
        englishExplanation:
          "An intense, longing anticipation or an eager, passionate yearning to meet the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 6,
        urduScript: "ہجر",
        romanUrdu: "Hijr",
        englishExplanation:
          "The painful state of separation between lovers; the bittersweet period spent away from the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 7,
        urduScript: "وصال",
        romanUrdu: "Wisaal",
        englishExplanation:
          "The ultimate union or reunion of lovers after a long period of painful separation.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 8,
        urduScript: "سہر انگیز",
        romanUrdu: "Sehar Angez",
        englishExplanation:
          "Spellbinding or enchanting; possessing a magical charm that completely paralyzes the senses.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 9,
        urduScript: "تبانی",
        romanUrdu: "Tabani",
        englishExplanation:
          "Brilliant radiance, glowing splendor, or a blindingly beautiful luminescence.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 10,
        urduScript: "رشکِ قمر",
        romanUrdu: "Rashk-e-Qamar",
        englishExplanation:
          "An object of envy for the moon; used to describe a face so beautiful that even the moon is jealous of it.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 11,
        urduScript: "مہوٰ",
        romanUrdu: "Mahw",
        englishExplanation:
          "Fully absorbed, lost, or completely mesmerized by the sight or thought of the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 12,
        urduScript: "خمار",
        romanUrdu: "Khumaar",
        englishExplanation:
          "A pleasant, lingering intoxication or heavy-lidded daze caused by love or the beautiful eyes of the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 13,
        urduScript: "فسوں",
        romanUrdu: "Fasoon",
        englishExplanation: "An enchantment, sorcery, or a magical spell cast by a beautiful gaze.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 14,
        urduScript: "اضطراب",
        romanUrdu: "Iztirab",
        englishExplanation:
          "Intense restlessness, inner agitation, or the anxious fluttering of a heart waiting for love.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 15,
        urduScript: "نازِ عا نفرین",
        romanUrdu: "Naaz-e-Aanfreen",
        englishExplanation:
          "Praise-worthy elegance; a term of endearment for a beloved possessing unmatched delicate grace.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 16,
        urduScript: "ولیہانہ",
        romanUrdu: "Walihana",
        englishExplanation:
          "Passionate, madly enthusiastic, or an unrestrained, intense outpouring of love.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 17,
        urduScript: "تشنہ لب",
        romanUrdu: "Tishna-e-Lab",
        englishExplanation:
          "Literally thirsty-lipped; poetically used to describe a deep, unfulfilled longing for a glimpse or word from the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 18,
        urduScript: "غزالة",
        romanUrdu: "Ghazala",
        englishExplanation:
          "A beautiful, wild young deer; a classic poetic metaphor used to describe the beautiful, wide eyes of a woman.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 19,
        urduScript: "دلربا",
        romanUrdu: "Dilruba",
        englishExplanation:
          "Heart-stealer; a classic poetic title for a beloved who effortlessly captivates and takes away one's peace of mind.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 20,
        urduScript: "سوزِ عشق",
        romanUrdu: "Soz-e-Ishq",
        englishExplanation:
          "The burning internal fire or agonizing warmth of love that constantly cooks a lover's soul.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 21,
        urduScript: "تجلی",
        romanUrdu: "Tajalli",
        englishExplanation:
          "A sudden manifestation of divine or breathtaking light; the dazzling flash of a beloved's appearance.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 22,
        urduScript: "نازک مزاج",
        romanUrdu: "Nazuk Mizaj",
        englishExplanation:
          "Extremely delicate, sensitive, or refined in temperament; easily affected by the slightest change.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 23,
        urduScript: "فريفتہ",
        romanUrdu: "Fareftah",
        englishExplanation:
          "Enamored, charmed, or completely beguiled by a beautiful presence or speech.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 24,
        urduScript: "نگاہِ کرم",
        romanUrdu: "Nigah-e-Karam",
        englishExplanation:
          "A look of kindness, favor, or soft mercy cast by the beloved upon a pining lover.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 25,
        urduScript: "سرآپا",
        romanUrdu: "Sarapa",
        englishExplanation:
          "From head to toe; used in poetry to describe the entire, flawless physical form of the beloved.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 26,
        urduScript: "تمانہ",
        romanUrdu: "Tamanna",
        englishExplanation:
          "A deep-seated wish, profound desire, or a long-cherished hope kept alive in the heart.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 27,
        urduScript: "گیسو",
        romanUrdu: "Gesu",
        englishExplanation:
          "Long, beautiful tresses or locks of hair, often praised in poetry for casting a beautiful shadow.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 28,
        urduScript: "تبسم",
        romanUrdu: "Tabassum",
        englishExplanation:
          "A gentle, beautiful smile; a subtle expression of happiness that brightens the surroundings.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 29,
        urduScript: "عارِز",
        romanUrdu: "Aariz",
        englishExplanation:
          "The soft cheek of a beautiful person, often compared to roses or petals in Urdu poetry.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 30,
        urduScript: "شمعِ محفل",
        romanUrdu: "Shama-e-Mehfil",
        englishExplanation:
          "The candle or the center of attention of a gathering; used to describe a person whose presence illuminates the entire room.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
      {
        id: 31,
        urduScript: "ورفتہ",
        romanUrdu: "Waraftah",
        englishExplanation:
          "Distracted with love; completely wandering in mind due to intense romantic infatuation.",
        category: "Ghazal-e-Husn-o-Ishq",
      },
    ],
  },
  {
    name: "Aks-e-Malaal",
    theme: "Regret, Sorrow & Inner Melancholy",
    words: [
      {
        id: 32,
        urduScript: "ملال",
        romanUrdu: "Malaal",
        englishExplanation:
          "A heavy, lingering sense of sorrow mixed with unspoken regret over what could have been.",
        category: "Aks-e-Malaal",
      },
      {
        id: 33,
        urduScript: "کرب",
        romanUrdu: "Karb",
        englishExplanation:
          "A deep, agonizing mental anguish or existential distress that silently consumes the soul.",
        category: "Aks-e-Malaal",
      },
      {
        id: 34,
        urduScript: "رنجش",
        romanUrdu: "Ranjish",
        englishExplanation:
          "Bitterness, silent friction, or a lingering grievance that creates a painful emotional distance between friends or lovers.",
        category: "Aks-e-Malaal",
      },
      {
        id: 35,
        urduScript: "حسرت",
        romanUrdu: "Hasrat",
        englishExplanation:
          "A profound, unfulfilled desire or lifelong yearning for something that can never be attained.",
        category: "Aks-e-Malaal",
      },
      {
        id: 36,
        urduScript: "یاس",
        romanUrdu: "Yaas",
        englishExplanation:
          "Absolute despair, hopelessness, or the total fading away of the light of expectations.",
        category: "Aks-e-Malaal",
      },
      {
        id: 37,
        urduScript: "ہجرِ مسلسل",
        romanUrdu: "Hijr-e-Musalsal",
        englishExplanation:
          "A state of unending, continuous separation that feels like a slow, lifetime punishment.",
        category: "Aks-e-Malaal",
      },
      {
        id: 38,
        urduScript: "حیرمان",
        romanUrdu: "Hirman",
        englishExplanation:
          "The painful frustration and crushing disappointment born from the deprivation of one's deepest hopes.",
        category: "Aks-e-Malaal",
      },
      {
        id: 39,
        urduScript: "اندوہ",
        romanUrdu: "Andoh",
        englishExplanation:
          "Deep, suffocating sadness, anxiety, or heavy morning grief that darkens the mind.",
        category: "Aks-e-Malaal",
      },
      {
        id: 40,
        urduScript: "سوزِ درون",
        romanUrdu: "Soz-e-Daroon",
        englishExplanation:
          "The hidden, burning fire of silent heartbreak or inward sorrow within the soul.",
        category: "Aks-e-Malaal",
      },
      {
        id: 41,
        urduScript: "گریہ",
        romanUrdu: "Giriya",
        englishExplanation:
          "The act of weeping, lamenting, or bitter shedding of tears out of profound grief.",
        category: "Aks-e-Malaal",
      },
      {
        id: 42,
        urduScript: "پزمُردگی",
        romanUrdu: "Pazmurdagi",
        englishExplanation:
          "Witheredness, wilting of the spirit, or a deep emotional dullness and lack of life.",
        category: "Aks-e-Malaal",
      },
      {
        id: 43,
        urduScript: "وحشت",
        romanUrdu: "Wahshat",
        englishExplanation:
          "A wild, frantic dread, intense loneliness, or manic restlessness caused by isolation or a broken heart.",
        category: "Aks-e-Malaal",
      },
      {
        id: 44,
        urduScript: "سوز",
        romanUrdu: "Soz",
        englishExplanation:
          "The agonizing, burning warmth of pain embedded in a person's voice, song, or destiny.",
        category: "Aks-e-Malaal",
      },
      {
        id: 45,
        urduScript: "تیرا بختی",
        romanUrdu: "Teera Bakhti",
        englishExplanation:
          "Misfortune, dark destiny, or being cursed with an unlucky and painful path in life.",
        category: "Aks-e-Malaal",
      },
      {
        id: 46,
        urduScript: "عالم ناکی",
        romanUrdu: "Alam Naki",
        englishExplanation: "A tragic, sorrowful, or deeply heart-wrenching state of affairs.",
        category: "Aks-e-Malaal",
      },
      {
        id: 47,
        urduScript: "دردِ نہاں",
        romanUrdu: "Dard-e-Nihan",
        englishExplanation:
          "A secret, concealed, or unexpressed emotional wound that a person hides from the world.",
        category: "Aks-e-Malaal",
      },
      {
        id: 48,
        urduScript: "فغان",
        romanUrdu: "Fighan",
        englishExplanation:
          "A loud, agonizing cry of pain, lamentation, or a desperate scream against tyranny or heartbreak.",
        category: "Aks-e-Malaal",
      },
      {
        id: 49,
        urduScript: "حسرت زدہ",
        romanUrdu: "Hasrat Zadah",
        englishExplanation:
          "Crushed by unfulfilled desires; someone whose spirit is entirely worn down by chronic longing.",
        category: "Aks-e-Malaal",
      },
      {
        id: 50,
        urduScript: "شکستِ دل",
        romanUrdu: "Shikast-e-Dil",
        englishExplanation:
          "The literal and spiritual breaking of the heart; the absolute shattering of emotional trust.",
        category: "Aks-e-Malaal",
      },
      {
        id: 51,
        urduScript: "سوگواری",
        romanUrdu: "Sogwari",
        englishExplanation:
          "The state of mourning, wearing grief openly, or lamenting a massive loss.",
        category: "Aks-e-Malaal",
      },
      {
        id: 52,
        urduScript: "بےداد",
        romanUrdu: "Bedad",
        englishExplanation:
          "Injustice, tyranny, or the cruel indifference of fortune or a beloved that breaks the spirit.",
        category: "Aks-e-Malaal",
      },
      {
        id: 53,
        urduScript: "داغِ هجرت",
        romanUrdu: "Dagh-e-Hijrat",
        englishExplanation:
          "The permanent, painful scar left on the soul by forced separation, migration, or leaving one's home.",
        category: "Aks-e-Malaal",
      },
      {
        id: 54,
        urduScript: "ہذیاں",
        romanUrdu: "Haziyan",
        englishExplanation:
          "Delirium or the incoherent, frantic rambling of a mind driven mad by fever, shock, or severe grief.",
        category: "Aks-e-Malaal",
      },
      {
        id: 55,
        urduScript: "اضطرار",
        romanUrdu: "Iztiraar",
        englishExplanation:
          "Helplessness, desperation, or an extreme state of emotional compulsion where one loses control.",
        category: "Aks-e-Malaal",
      },
      {
        id: 56,
        urduScript: "مُلولِ خاطر",
        romanUrdu: "Malool-e-Khatir",
        englishExplanation:
          "Distressed in mind, heavy-hearted, or a soul deeply dejected by disappointment.",
        category: "Aks-e-Malaal",
      },
      {
        id: 57,
        urduScript: "کسک",
        romanUrdu: "Kasak",
        englishExplanation:
          "A subtle, sudden, and sharp ache that twinges in the heart when remembering a lost love or old memory.",
        category: "Aks-e-Malaal",
      },
      {
        id: 58,
        urduScript: "جگر سوزی",
        romanUrdu: "Jigar Soozi",
        englishExplanation:
          "Heart-burning agony; a torment so intense that it feels like it is physically burning through one's vitals.",
        category: "Aks-e-Malaal",
      },
      {
        id: 59,
        urduScript: "جفاِ مسلسل",
        romanUrdu: "Jafa-e-Musalsal",
        englishExplanation:
          "Unending tyranny, continuous cruelty, or the relentless coldness of fate.",
        category: "Aks-e-Malaal",
      },
      {
        id: 60,
        urduScript: "عالم ترازی",
        romanUrdu: "Alam Tarazi",
        englishExplanation:
          "The manifestation or weaving together of tragic events and immense grief over time.",
        category: "Aks-e-Malaal",
      },
      {
        id: 61,
        urduScript: "ویرانی",
        romanUrdu: "Weerani",
        englishExplanation:
          "Desolation, emptiness, or the vast, barren feeling inside a lonely heart.",
        category: "Aks-e-Malaal",
      },
      {
        id: 62,
        urduScript: "خستگی",
        romanUrdu: "Khastagi",
        englishExplanation:
          "Extreme exhaustion of the spirit, brokenness, or being entirely worn out by life's heavy trials.",
        category: "Aks-e-Malaal",
      },
    ],
  },
  {
    name: "Aafaq-o-Fitrat",
    theme: "Cosmic Elements, Nature & Mystical Wonders",
    words: [
      {
        id: 63,
        urduScript: "آفاق",
        romanUrdu: "Aafaq",
        englishExplanation:
          "The horizons, the boundless cosmos, or the furthest reaches of the visible universe.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 64,
        urduScript: "کہکشان",
        romanUrdu: "Kehkeshan",
        englishExplanation:
          "A breathtaking galaxy, a cosmic system of stars, or a brilliant celestial pathway in the night sky.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 65,
        urduScript: "شفق",
        romanUrdu: "Shafaq",
        englishExplanation:
          "The vibrant, glowing red and crimson light that paints the horizon immediately after sunset or before dawn.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 66,
        urduScript: "طلعہ",
        romanUrdu: "Tali'ah",
        englishExplanation:
          "The very first light of dawn breaking through the darkness, signaling a fresh awakening.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 67,
        urduScript: "فراحد",
        romanUrdu: "Farhaad",
        englishExplanation:
          "A poetic reference to the wild wilderness, uncultivated desert plains, or a rugged mountain expanse.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 68,
        urduScript: "سبزہ زار",
        romanUrdu: "Sabza-zaar",
        englishExplanation:
          "A vast, lush green meadow or an expansive field covered completely in fresh, dew-kissed grass.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 69,
        urduScript: "ہوائے نسیم",
        romanUrdu: "Hawa-e-Naseem",
        englishExplanation:
          "A gentle, refreshing morning breeze that carries a soothing, cooling energy through nature.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 70,
        urduScript: "سرسر",
        romanUrdu: "Sarsar",
        englishExplanation:
          "A fierce, cold, and howling winter wind that blows aggressively through barren landscapes.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 71,
        urduScript: "طلم",
        romanUrdu: "Talatum",
        englishExplanation:
          "The violent, crashing tossing of ocean waves; severe turbulence within a storm or body of water.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 72,
        urduScript: "قحط سالی",
        romanUrdu: "Qaht-saali",
        englishExplanation:
          "A severe, prolonged drought or famine that leaves the natural earth parched and barren.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 73,
        urduScript: "لالہ زار",
        romanUrdu: "Lala-zaar",
        englishExplanation:
          "A magnificent, blooming field of wild tulips or red poppies, used in literature to describe colorful natural beauty.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 74,
        urduScript: "آبشار",
        romanUrdu: "Aabshaar",
        englishExplanation:
          "A cascading waterfall flowing gracefully down rocks, symbolizing life and fluid motion in poetry.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 75,
        urduScript: "شبنم",
        romanUrdu: "Shabnam",
        englishExplanation:
          "Delicate morning dew drops that rest like tiny pearls on flower petals and leaves at daybreak.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 76,
        urduScript: "تیر",
        romanUrdu: "Tair",
        englishExplanation:
          "A high-flying bird or winged creature, used in elevated prose instead of the ordinary word parinda.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 77,
        urduScript: "موجِ سبا",
        romanUrdu: "Mauj-e-Saba",
        englishExplanation:
          "The cool, fragrant ripple of the spring breeze that softly awakens sleeping flowers.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 78,
        urduScript: "بادلِ باراں",
        romanUrdu: "Badal-e-Baaraan",
        englishExplanation:
          "A heavy, dark rain-bearing cloud that hangs low, bringing the promise of life to the parched earth.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 79,
        urduScript: "خاکسار",
        romanUrdu: "Khaak-saar",
        englishExplanation:
          "Made of the humble earth or dust; poetically used to describe the earthy essence of human existence.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 80,
        urduScript: "سہر گاہی",
        romanUrdu: "Sahar-gahi",
        englishExplanation:
          "Pertaining to the mystical, ultra-early hours of the morning before sunrise when the universe is completely still.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 81,
        urduScript: "گلستان",
        romanUrdu: "Gulistan",
        englishExplanation:
          "A meticulously cultivated rose garden or an orchard blooming in full, vibrant glory.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 82,
        urduScript: "قمر",
        romanUrdu: "Qamar",
        englishExplanation:
          "The moon, used explicitly in high-literary and cosmic descriptions rather than the common chand.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 83,
        urduScript: "انجم",
        romanUrdu: "Anjum",
        englishExplanation:
          "Plural for stars; a literary gathering of celestial bodies sparkling in the night sky.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 84,
        urduScript: "گرد باد",
        romanUrdu: "Gird-baad",
        englishExplanation:
          "A violent whirlwind, a dust storm, or a cyclone that twists through the desert plains.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 85,
        urduScript: "بحرِ بے کراں",
        romanUrdu: "Bahr-e-Be-karan",
        englishExplanation:
          "A shoreless, infinite ocean; poetically used to describe a vast, unfathomable expanse of water or emotion.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 86,
        urduScript: "طوفانِ نوح",
        romanUrdu: "Toofan-e-Nooh",
        englishExplanation:
          "A catastrophic, world-engulfing deluge or epic flood that reshapes the landscape.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 87,
        urduScript: "وادیِ ایمان",
        romanUrdu: "Wadi-e-Aiman",
        englishExplanation:
          "A peaceful, safe, and spiritually blessed valley; a place of tranquil, mystical sanctuary.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 88,
        urduScript: "خريف",
        romanUrdu: "Khareef",
        englishExplanation:
          "The beautiful autumn season, characterized by crisp air, harvesting, and the gentle falling of leaves.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 89,
        urduScript: "گلستان زاد",
        romanUrdu: "Gulistan-zaad",
        englishExplanation:
          "Born of the garden; something naturally elegant, pure, or nurtured by the finest elements of nature.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 90,
        urduScript: "چرخِ نیلی فام",
        romanUrdu: "Charkh-e-Neeli-faam",
        englishExplanation:
          "The azure, deep-blue canopy of the sky; a poetic way to address the overhead atmosphere.",
        category: "Aafaq-o-Fitrat",
      },
      {
        id: 91,
        urduScript: "ذرہِ خاک",
        romanUrdu: "Zarra-e-Khaak",
        englishExplanation:
          "A microscopic speck of dust; used to describe the beautiful insignificance of physical matter in the grand design of the cosmos.",
        category: "Aafaq-o-Fitrat",
      },
    ],
  },
  {
    name: "Tehzeeb-o-Khuloos",
    theme: "Cultural Values & Etiquette",
    words: [
      {
        id: 92,
        urduScript: "خلوصِ نیت",
        romanUrdu: "Khuloos-e-Niyat",
        englishExplanation:
          "Pure, unadulterated sincerity of intention; acting with a heart completely free of hidden motives.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 93,
        urduScript: "چشمِ ما روشن",
        romanUrdu: "Chashm-e-Ma Roshan",
        englishExplanation:
          "A beautiful phrase meaning the light of our eyes; used to welcome a highly respected, deeply missed guest.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 94,
        urduScript: "انکساری",
        romanUrdu: "Inkisari",
        englishExplanation:
          "Deep, noble humility and absolute selflessness; the virtue of keeping oneself humble despite possessing greatness.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 95,
        urduScript: "مروت",
        romanUrdu: "Murawwat",
        englishExplanation:
          "Politeness, consideration, or a generous standard of human kindness that stops a person from being harsh to others.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 96,
        urduScript: "وضع داری",
        romanUrdu: "Waza Daari",
        englishExplanation:
          "Maintaining old-school grace, loyalty, and traditional values in one's conduct regardless of changing times.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 97,
        urduScript: "بندہ پروری",
        romanUrdu: "Banda Parwari",
        englishExplanation:
          "Generous patronizing or hosting; a beautiful, polite way to thank someone for showing great kindness to an ordinary person.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 98,
        urduScript: "نورِ چشم",
        romanUrdu: "Noor-e-Chashm",
        englishExplanation:
          "The light of one's eyes; a highly affectionate cultural expression used for a beloved child or dear one.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 99,
        urduScript: "پاس داری",
        romanUrdu: "Paas Daari",
        englishExplanation:
          "Guarding a relationship with deep respect; honoring old promises, kinship ties, and mutual trust.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 100,
        urduScript: "فیضِ عام",
        romanUrdu: "Faiz-e-Aam",
        englishExplanation:
          "Universal benevolence or charity; a blessing or fountain of knowledge that is open and free to all of humanity.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 101,
        urduScript: "خاطر تواضع",
        romanUrdu: "Khatir Tawazu",
        englishExplanation:
          "The ultimate, warmest standard of traditional South Asian hospitality and entertaining guests with honor.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 102,
        urduScript: "مہر و وفا",
        romanUrdu: "Mehr-o-Wafa",
        englishExplanation:
          "Unconditional affection and lifelong fidelity; a compound term summarizing the peak of loyalty in human bonds.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 103,
        urduScript: "نیاز مندی",
        romanUrdu: "Niyaz Mandi",
        englishExplanation:
          "Humble submission or respectful devotion shown to a teacher, mentor, or elder.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 104,
        urduScript: "التماس",
        romanUrdu: "Iltimas",
        englishExplanation:
          "A highly polite, elegant, and formal request made in conversation or high-level writing.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 105,
        urduScript: "عالی ظرف",
        romanUrdu: "Aali Zarf",
        englishExplanation:
          "Highly broad-minded, generous, and magnanimous; someone who easily forgives others and possesses a large heart.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 106,
        urduScript: "چشمِ کرم",
        romanUrdu: "Chashm-e-Karam",
        englishExplanation:
          "A glance of deep favor, soft mercy, or kindness cast by a benefactor or beloved upon someone.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 107,
        urduScript: "جانِ عالم",
        romanUrdu: "Jaan-e-Aalam",
        englishExplanation:
          "The life of the world; a beautiful compound phrase used to address someone who is dearer to you than life itself.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 108,
        urduScript: "پاسِ وضاعت",
        romanUrdu: "Paas-e-Waza",
        englishExplanation:
          "Respect for one's own principles, honor, or traditional style of living.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 109,
        urduScript: "حسنِ اخلاق",
        romanUrdu: "Husn-e-Akhlaq",
        englishExplanation:
          "The absolute beauty of character; possessing highly refined mannerisms, kindness, and moral excellence.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 110,
        urduScript: "فیاضی",
        romanUrdu: "Fayyazi",
        englishExplanation:
          "Open-handed generosity or extreme liberality in giving gifts, help, or love to those in need.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 111,
        urduScript: "قدردانی",
        romanUrdu: "Qadar Daani",
        englishExplanation:
          "The profound art of recognizing, appreciating, and honoring the worth or talent of another person.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 112,
        urduScript: "ہمدردیِ خالص",
        romanUrdu: "Hamdardi-e-Khalis",
        englishExplanation:
          "Pure, unselfish empathy; deeply feeling and sharing the pain of another human being without pretense.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 113,
        urduScript: "شائستگی",
        romanUrdu: "Shaistagi",
        englishExplanation:
          "Polite gentleness, civility, and exquisite refinement in speech, posture, and daily conduct.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 114,
        urduScript: "دستِ شفقت",
        romanUrdu: "Dast-e-Shafqat",
        englishExplanation:
          "The hand of kind affection; usually used to describe the protective, loving care of an elder, parent, or mentor.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 115,
        urduScript: "تسلیم و رضا",
        romanUrdu: "Tasleem-o-Raza",
        englishExplanation:
          "Peaceful resignation and absolute contentment with the grand design of destiny or divine will.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 116,
        urduScript: "خلوصِ دل",
        romanUrdu: "Khuloos-e-Dil",
        englishExplanation:
          "Sincerity that springs straight from the depths of the heart, completely untainted by deceit.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 117,
        urduScript: "شرفِ نفس",
        romanUrdu: "Sharafat-e-Nafs",
        englishExplanation:
          "Innate nobility of the soul; a high standard of inner virtue that keeps a person righteous when no one is watching.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 118,
        urduScript: "شمعِ فیروزاں",
        romanUrdu: "Shama-e-Ferozan",
        englishExplanation:
          "A burning, radiant candle; culturally used to describe a guide, leader, or intellectual whose life illuminates the path for others.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 119,
        urduScript: "دعا گو",
        romanUrdu: "Dua-go",
        englishExplanation:
          "One who constantly wishes well or prays for your well-being; a deeply affectionate way to end letters or address someone.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 120,
        urduScript: "فیضِ نظر",
        romanUrdu: "Faizan-e-Nazar",
        englishExplanation:
          "The transforming blessing of a mentor's glance; wisdom acquired simply by being in the presence of an enlightened soul.",
        category: "Tehzeeb-o-Khuloos",
      },
      {
        id: 121,
        urduScript: "مونس و غم خوار",
        romanUrdu: "Moonis-o-Ghamkhaar",
        englishExplanation:
          "A true companion and sympathizer; someone who sits with you in your darkest hours and physically shares your sorrow.",
        category: "Tehzeeb-o-Khuloos",
      },
    ],
  },
  {
    name: "Tilism-e-Lafz",
    theme: "Rare Echoes, Untranslatable Jewels & Borrowed Roots",
    words: [
      {
        id: 122,
        urduScript: "طلسم",
        romanUrdu: "Tilism",
        englishExplanation:
          "A magical enchantment, a mysterious puzzle, or a fascinating supernatural spell that binds the mind.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 123,
        urduScript: "ادراک",
        romanUrdu: "Idraak",
        englishExplanation:
          "A sudden, profound inner realization or the sensory perception of an abstract truth.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 124,
        urduScript: "فردوس",
        romanUrdu: "Firdaus",
        englishExplanation:
          "A sublime, celestial garden or the highest paradise; poetically used to describe a place of ultimate peace and spiritual bliss.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 125,
        urduScript: "تفکر",
        romanUrdu: "Tafakkur",
        englishExplanation:
          "Deep, quiet contemplation or philosophical meditation over the mysteries of existence.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 126,
        urduScript: "یکسوئی",
        romanUrdu: "Yaksooi",
        englishExplanation:
          "Complete, undivided concentration or a state of single-minded focus where all external distractions vanish.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 127,
        urduScript: "فهم",
        romanUrdu: "Fahm",
        englishExplanation:
          "Innate intellect, sharp understanding, or the natural capacity to grasp complex, hidden meanings.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 128,
        urduScript: "ناگزیر",
        romanUrdu: "Na-guzeer",
        englishExplanation:
          "Entirely inevitable, absolute, or structurally unavoidable due to the laws of destiny or necessity.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 129,
        urduScript: "ہیولا",
        romanUrdu: "Hayoola",
        englishExplanation:
          "A vague, ghostly specter, a primal silhouette, or an unformed mental image of something.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 130,
        urduScript: "وجدان",
        romanUrdu: "Wijdan",
        englishExplanation:
          "Pure intuition, spiritual ecstasy, or an unlearned inner voice that instantly knows a deeper truth.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 131,
        urduScript: "نایاب",
        romanUrdu: "Nayab",
        englishExplanation:
          "Exceedingly rare, scarce, or a precious treasure that is nearly impossible to find in the ordinary world.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 132,
        urduScript: "فسوںِ سحر",
        romanUrdu: "Fasoon-e-Sehar",
        englishExplanation:
          "The magical sorcery or deep enchantment of the early dawn; used in literature to describe a spellbinding, almost supernatural atmosphere.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 133,
        urduScript: "پیرِ مغان",
        romanUrdu: "Peer-e-Mughan",
        englishExplanation:
          "The wise master of the tavern; a classic, deep Sufi and poetic metaphor representing a spiritual guide or mentor who reveals hidden truths.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 134,
        urduScript: "استدلال",
        romanUrdu: "Istadlal",
        englishExplanation:
          "Concrete reasoning, logical argumentation, or drawing a rational conclusion based on firm proofs.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 135,
        urduScript: "کثافت",
        romanUrdu: "Kasafat",
        englishExplanation:
          "Density, thickness, or spiritual impurity and heaviness that clouds the inner self.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 136,
        urduScript: "لطافت",
        romanUrdu: "Latafat",
        englishExplanation:
          "Exquisite delicacy, ethereal purity, or a sublime lightness of touch and spirit.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 137,
        urduScript: "منسوخ",
        romanUrdu: "Mansookh",
        englishExplanation:
          "Officially annulled, abolished, or permanently cancelled by a higher authority.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 138,
        urduScript: "تشریح",
        romanUrdu: "Tashreeh",
        englishExplanation:
          "A comprehensive, multi-layered explanation, anatomy, or a detailed breakdown of a concept.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 139,
        urduScript: "مصلحت",
        romanUrdu: "Maslahat",
        englishExplanation:
          "Prudent diplomacy, strategic wisdom, or doing what is practically necessary rather than emotionally driven.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 140,
        urduScript: "پسپائی",
        romanUrdu: "Paspai",
        englishExplanation:
          "A graceful, strategic retreat or a forced fallback; used in high literature to describe a soul quietly stepping back from a heavy conflict.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 141,
        urduScript: "سدرۃ المنتہیٰ",
        romanUrdu: "Sidrat-ul-Muntaha",
        englishExplanation:
          "The lote-tree of the furthest boundary; a profound cosmic and mystical term representing the absolute peak of knowledge or the final limit of creation.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 142,
        urduScript: "غبارِ خاطر",
        romanUrdu: "Gubar-e-Khatir",
        englishExplanation:
          "The lingering dust of dynamic sadness or a faint, unresolved heaviness sitting upon the heart.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 143,
        urduScript: "ووسواسہ",
        romanUrdu: "Waswasah",
        englishExplanation:
          "An intrusive, anxious doubt, or a quiet, creeping misgiving whispered by the mind.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 144,
        urduScript: "سرمدی",
        romanUrdu: "Sarmadi",
        englishExplanation:
          "Eternal, timeless, or a divine state of existence that has neither a beginning nor an end.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 145,
        urduScript: "شعور",
        romanUrdu: "Shaoor",
        englishExplanation:
          "Higher intellect, refined consciousness, or the deep self-awareness that governs civil behavior.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 146,
        urduScript: "سلسبیل",
        romanUrdu: "Salsabeel",
        englishExplanation:
          "A crystal-clear, sweet fountain of paradise; poetically used to describe speech, poetry, or a voice that flows with unmatched melody and purity.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 147,
        urduScript: "پیش خیمہ",
        romanUrdu: "Pesh-khema",
        englishExplanation:
          "A harbinger or an advanced sign; a beautiful literary term for a prelude or an event that indicates something grand is about to arrive.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 148,
        urduScript: "مکتوب",
        romanUrdu: "Maktoub",
        englishExplanation:
          "That which is written; a formal letter, an intellectual dispatch, or something etched by destiny.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 149,
        urduScript: "سہر ترازی",
        romanUrdu: "Sehar Tarazi",
        englishExplanation:
          "The rare art of weaving pure enchantment, magic, or fascination through the power of speech or text.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 150,
        urduScript: "ممنوع",
        romanUrdu: "Mumtane'",
        englishExplanation:
          "Highly forbidden, strictly prohibited, or logically impossible to manifest.",
        category: "Tilism-e-Lafz",
      },
      {
        id: 151,
        urduScript: "کھنا مشق",
        romanUrdu: "Kuhna-mashq",
        englishExplanation:
          "A highly veteran master or a deeply experienced expert who has spent a lifetime perfecting a specific craft.",
        category: "Tilism-e-Lafz",
      },
    ],
  },
];

export const allTreasuryWords: TreasuryWord[] = treasuryCategories.flatMap((c) => c.words);
