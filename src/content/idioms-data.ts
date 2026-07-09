export interface Idiom {
  id: number;
  urduScript: string;
  romanUrdu: string;
  literalTranslation: string;
  meaning: string;
  story: string;
}

export const idiomsData: Idiom[] = [
  {
    id: 1,
    urduScript: "الٹا چور کوتوال کو ڈانٹے",
    romanUrdu: "Ulta chor kotwal ko daante",
    literalTranslation: "The thief scolds the police chief in reverse.",
    meaning:
      "Used when a guilty person aggressively blames an innocent person or an authority figure to hide their own wrongdoing.",
    story:
      "This idiom stems from the historical administrative setup of the Mughal Empire and early British India. The Kotwal was the chief of police for a city or fort, possessing immense legal authority to maintain law and order. In traditional folklore, a brazen thief was caught red-handed but immediately began shouting and accusing the Kotwal of negligence and corruption to confuse the gathering crowd. It reflects the ancient urban social dynamics, the high status of the Kotwal, and the timeless human tactic of using offense as the best defense.",
  },
  {
    id: 2,
    urduScript: "بھینس کے آگے بین بجانا",
    romanUrdu: "Bhaans ke aage been bajana",
    literalTranslation: "Playing a flute in front of a water buffalo.",
    meaning:
      "Wasting time, wisdom, or advice on someone who completely lacks the capacity to understand or appreciate it.",
    story:
      "Rooted deeply in rural agrarian life, this idiom relies on basic animal behavior observation. The Been is a traditional wind instrument played by snake charmers to evoke a sharp, mesmerizing response. However, when played in front of a heavy, indifferent water buffalo, the animal simply continues chewing its cud, entirely unmoved by the melody. Villagers used this vivid imagery to mock the pointlessness of explaining sophisticated ideas to a completely ignorant person.",
  },
  {
    id: 3,
    urduScript: "اوباش کا تکیہ، اللہ ہو",
    romanUrdu: "Obash ka takiya, Allah Hoo",
    literalTranslation: "A rogue's ultimate pillow is the chant of Allah Hoo.",
    meaning:
      "Used when a notoriously mischievous person suddenly adopts a highly religious persona to escape trouble or gain respect.",
    story:
      "In historical South Asian towns, Obash referred to local street thugs, gamblers, or ruffians. When these individuals grew old, lost their physical power, or faced severe legal tracking, they would often retreat to a local Sufi shrine. They would sit quietly, close their eyes, and constantly chant Allah Hoo to blend in. The community quickly realized that this sudden spiritual transformation was often a survival tactic rather than genuine repentance.",
  },
  {
    id: 4,
    urduScript: "چراغ تلے اندھیرا",
    romanUrdu: "Chiragh tale andhera",
    literalTranslation: "Darkness right beneath the lamp.",
    meaning:
      "A situation where an influential, wise, or powerful person fails to guide or provide for those closest to them.",
    story:
      "Before modern electricity, homes and streets were illuminated by a Chiragh—a small, traditional clay oil lamp with a cotton wick. Because of the physical design of the clay base, the flame cast light outward into the room but always left a dark, unlit shadow directly underneath its own structure. This everyday household observation became a social metaphor for a scholar whose own children are uneducated, or a ruler whose own neighborhood lives in poverty.",
  },
  {
    id: 5,
    urduScript: "ایک پنٹھ دو کاج",
    romanUrdu: "Ek panth do kaaj",
    literalTranslation: "One journey, two tasks.",
    meaning:
      "Achieving two distinct objectives from a single action or effort (similar to killing two birds with one stone).",
    story:
      "This idiom comes from ancient trade practices and village life. Panth means a long, difficult foot journey, and Kaaj means a specific chore or business task. In old times, traveling between villages was dangerous and exhausting due to bad roads and bandits. Therefore, people would wait for weeks until they had multiple reasons to travel—such as selling wheat at the central market and visiting a relative for a marriage alliance on the same route.",
  },
  {
    id: 6,
    urduScript: "ابلّو کا بلا، سر پر چڑھا",
    romanUrdu: "Abloo ka billa, sar par charha",
    literalTranslation: "Abloo's pet cat climbed onto the head.",
    meaning:
      "Giving so much freedom or leniency to an inferior or a child that they lose all respect and behave insolently.",
    story:
      "This idiom reflects old household structures and pet-keeping customs. Abloo represents a typical, overly soft-hearted master or servant in a grand household. He loved his pet cat so much that he never disciplined it, letting it jump onto dinner tables and eventually climb onto people's shoulders and heads. In traditional, highly structured South Asian societies where hierarchy and manners were strictly enforced, a pet or subordinate overstepping boundaries was a sign of failed discipline.",
  },
  {
    id: 7,
    urduScript: "آسمان سے گرا، کھجور میں اٹکا",
    romanUrdu: "Aasman se gira, khajoor mein atka",
    literalTranslation: "Fell from the sky, got stuck in a date palm tree.",
    meaning:
      "Escaping from one major disaster only to immediately find yourself trapped in another difficult problem.",
    story:
      "This idiom draws beautifully from the geography and agriculture of the region. The date palm tree grows incredibly tall, features a rough, thorny trunk, and has stiff, sharp fronds at the very top. Folklore tells of a person miraculously surviving a terrifying fall from the sky, only to land directly into the dense, thorny canopy of a date palm. They are saved from hitting the ground but are now painfully trapped high up in the air.",
  },
  {
    id: 8,
    urduScript: "نسیانِ نواب، حافظہ خراب",
    romanUrdu: "Nisyan-e-Nawab, hafiza kharab",
    literalTranslation: "The Nawab's forgetfulness means everyone's memory must be ruined.",
    meaning:
      "When a powerful ruler or boss makes a mistake or forgets something, subordinates must pretend it was their own fault to save the leader's ego.",
    story:
      "This idiom highlights the absolute sycophancy required in the princely states of India governed by wealthy Nawabs. The elite Nawabs lived highly pampered lives and hated being corrected. If a Nawab forgot a promise or misremembered a historical fact, no courtier dared to correct him. Instead, the royal servants would immediately claim that their own memory was faulty, or change reality to match the Nawab's mistake.",
  },
  {
    id: 9,
    urduScript: "دھوئی رسی، سانپ بن گئی",
    romanUrdu: "Dhoi rassi, saanp ban gayi",
    literalTranslation: "A washed rope turned into a snake.",
    meaning:
      "A completely harmless, minor issue that gets blown out of proportion due to suspicion, gossip, or overthinking.",
    story:
      "In old, unlit rural homes, ropes made of jute or coir were commonly left coiled on the floor. At night, or in the dim light of dusk, a wet or freshly washed rope would glisten and catch the eye. Due to a deep-seated fear of venomous snakes in agricultural villages, a family member would mistake the wet rope for a moving cobra, cause a massive panic, wake up the entire neighborhood, and bring sticks to kill it.",
  },
  {
    id: 10,
    urduScript: "ٹکے سیر بھاجی، ٹکے سیر کھاجا",
    romanUrdu: "Takey ser bhaaji, takey ser khaaja",
    literalTranslation: "A taka for a ser of vegetables, a taka for a ser of premium sweets.",
    meaning:
      "A chaotic and unjust system where good and bad, or valuable and worthless things, are treated exactly the same.",
    story:
      "This idiom preserves ancient Indian economics and measurements. A Taka was a low-value copper coin, and a Ser was an old unit of weight (roughly 1 kg). In a well-regulated traditional market, cheap vegetables and expensive pastries had vastly different prices. Folklore tells of a foolish king whose kingdom lacked any economic regulation, causing everything to be sold at the exact same flat rate.",
  },
  {
    id: 11,
    urduScript: "رسی جل گئی پر بل نہیں گیا",
    romanUrdu: "Rassi jal gayi par bal nahi gaya",
    literalTranslation: "The rope burned to ashes, but its twists remained.",
    meaning:
      "Used for someone who has lost all their wealth, power, or status but still holds onto their old arrogance and pride.",
    story:
      "Traditional ropes were made of tightly twisted jute or coir fibers. When a thick jute rope catches fire and burns completely down to ash, the physical shape of the ash on the ground remarkably retains the exact, visible spiral twists of the original rope. One gust of wind can scatter it instantly, yet it looks solid. Society adopted this to describe bankrupt elites who still speak with ancestral arrogance.",
  },
  {
    id: 12,
    urduScript: "نانی خانی کا فاتحہ، جیتی پور کا نذرانہ",
    romanUrdu: "Nani khani ka fatiha, Jeetipur ka nazrana",
    literalTranslation: "Prayers for a grandmother in one village, offerings sent to Jeetipur.",
    meaning:
      "Doing something completely irrelevant to the actual situation, or sending rewards to the wrong place.",
    story:
      "In traditional South Asian Muslim culture, when an elder passed away, family members would hold a Fatiha and distribute free food to the local poor in that specific village. This idiom mocks a disorganized family that held a prayer for a grandmother in their home village but sent the free food and charity to a completely unrelated town named Jeetipur.",
  },
  {
    id: 13,
    urduScript: "نو سو چوہے کھا کے بلی حج کو چلی",
    romanUrdu: "Nau sau choohe kha kar billi haj ko chali",
    literalTranslation: "After eating nine hundred mice, the cat is going on a pilgrimage.",
    meaning:
      "A hypocrite who spends a lifetime committing sins and then suddenly pretends to be deeply pious to wash away their bad reputation.",
    story:
      "Combining old animal fables with religious traditions, this idiom uses the ultimate symbolic number for excess: nine hundred. In old times, traveling for a pilgrimage was a massive, life-altering spiritual journey. The imagery of a predatory cat suddenly putting on the clothes of a peaceful pilgrim after devastating the local rodent population was used by villagers to laugh at corrupt merchants who tried to buy a clean social standing through sudden religious displays.",
  },
  {
    id: 14,
    urduScript: "چور کی داڑھی میں تنکا",
    romanUrdu: "Chor ki daarhi mein tinka",
    literalTranslation: "A straw in the thief's beard.",
    meaning:
      "A guilty person inadvertently gives themselves away through their own nervous behavior or paranoia.",
    story:
      "This idiom comes from a famous historical courtroom folk tale, often attributed to the wit of Birbal in Emperor Akbar's court. A wealthy merchant's jewels were stolen, and it was clear an internal servant did it. The clever judge gathered all suspects and announced, The real thief has a piece of straw stuck in his beard! The actual thief, consumed by instant panic, immediately reached up to feel and brush his own beard, singling himself out to the entire court.",
  },
  {
    id: 15,
    urduScript: "بات کا بتنگڑ بنانا",
    romanUrdu: "Baat ka batangarh banana",
    literalTranslation: "Turning a simple word into a massive fortress.",
    meaning:
      "Exaggerating a tiny, insignificant comment or minor issue into a massive, dramatic dispute.",
    story:
      "This idiom plays on old architectural terminology. A Batangarh combines Baat (speech) with Garh (a massive mud or stone fort). In close-knit, crowded traditional village mohallas, gossip traveled instantly. A single, misunderstood comment spoken over a shared water well could be twisted by neighbors until it became a defensive, hostile situation—metaphorically building a fortress out of thin air.",
  },
  {
    id: 16,
    urduScript: "چڑیوں کی موت، گوانڈھیوں کا ہاسا",
    romanUrdu: "Chirriyon ki maut, gwaandhiyon ka haasa",
    literalTranslation: "The death of the sparrows is amusement for the neighbors.",
    meaning:
      "A situation where one person is going through a genuine tragedy, while others find it trivial or amusing.",
    story:
      "In agricultural villages, heavy rains, intense summer heat, or crop harvesting would sometimes cause hundreds of fragile local sparrows to die or lose their nests. For the sensitive observer, it was a tragedy of nature. However, rowdy neighbors or children would often gather to watch the chaos, laugh, and play with the fallen birds. The idiom reflects a sobering critique of human apathy toward the vulnerable.",
  },
  {
    id: 17,
    urduScript: "کانجی ہاؤس کا بیل",
    romanUrdu: "Kanji house ka bail",
    literalTranslation: "A bull from the cattle pound.",
    meaning:
      "A person who is stubborn, completely undisciplined, wild, and refuses to follow any social rules.",
    story:
      "During the British Raj, municipalities set up Kanji Houses—government-run impound facilities for stray, destructive, or ownerless livestock. If a farmer's bull broke loose, destroyed a neighbor's crops, and wandered the streets, the police locked it in the Kanji House. These animals became notoriously aggressive and unmanageable due to confinement. Calling someone a Kanji House bull was a specific urban insult for an unruly troublemaker.",
  },
  {
    id: 18,
    urduScript: "دھوبی کا کتا، نہ گھر کا نہ گھاٹ کا",
    romanUrdu: "Dhobi ka kutta, na ghar ka na ghaat ka",
    literalTranslation:
      "The washerman's dog belongs neither to the house nor to the washing riverbank.",
    meaning:
      "Someone who tries to belong to two different places or sides, but ends up accepted by neither, losing their identity completely.",
    story:
      "This idiom centers entirely around the ancient caste occupation of the Dhobi (washerman). A Dhobi spent his mornings walking back and forth between his home and the riverbank stone platform to wash clothes. His loyal dog would anxiously run back and forth behind him all day. Because the dog was always moving in between, it never guarded the house properly, nor did it have a purpose at the riverbank.",
  },
  {
    id: 19,
    urduScript: "تیل دیکھو، تیل کی دھار دیکھو",
    romanUrdu: "Tail dekho, tail ki dhaar dekho",
    literalTranslation: "Watch the oil, and watch the stream of the pouring oil.",
    meaning:
      "Wait patiently, observe carefully, and see how a situation unfolds before making a final decision or judgment.",
    story:
      "This idiom originates from the traditional trade of the Teli (oil-presser). In old bazaars, mustard or sesame oil was pressed manually and poured from large clay vats into customer bottles. Experienced buyers knew that pure, high-quality oil flowed in a perfectly steady, unbroken, and viscous stream, while adulterated oil splattered or changed consistency. Wise elders used this marketplace practice as a metaphor for life: do not rush to conclusions when a crisis hits.",
  },
  {
    id: 20,
    urduScript: "اندھے کی لاٹھی، وہی سہارا",
    romanUrdu: "Andhay ki laathi, wahi sahaara",
    literalTranslation: "A blind man's staff is his only support.",
    meaning: "The one thing you depend on completely — without it, you are helpless.",
    story:
      "In old South Asian towns, blind beggars would navigate narrow bazaar streets using a long bamboo staff, tapping the ground ahead to feel for obstacles, steps, or open drains. The staff became an extension of their body — without it, they could not move safely. Villages respected these travelers and never removed a blind person's staff as a prank, knowing it meant their total helplessness. The idiom is used to describe anything that someone absolutely cannot do without.",
  },
];
