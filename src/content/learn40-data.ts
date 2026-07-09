export interface LearnWord {
  id: number;
  romanUrdu: string;
  english: string;
  exampleSentence: string;
}

export interface LearnDay {
  day: number;
  title: string;
  phase: string;
  words: LearnWord[];
}

export interface LearnPhase {
  phase: number;
  title: string;
  dayRange: string;
  days: LearnDay[];
}

export const learn40Data: LearnPhase[] = [
  {
    phase: 1,
    title: "Foundations",
    dayRange: "1-10",
    days: [
      {
        day: 1,
        title: "Greetings",
        phase: "Foundations",
        words: [
          {
            id: 1,
            romanUrdu: "Assalam-o-Alaikum",
            english: "Hello (peace be upon you)",
            exampleSentence: "Assalam-o-Alaikum, kaise hain aap?",
          },
          {
            id: 2,
            romanUrdu: "Walaikum Assalam",
            english: "Reply to hello",
            exampleSentence: "Walaikum Assalam, main theek hoon.",
          },
          {
            id: 3,
            romanUrdu: "Kaise hain?",
            english: "How are you? (formal)",
            exampleSentence: "Aap kaise hain?",
          },
          {
            id: 4,
            romanUrdu: "Theek hoon",
            english: "I am fine",
            exampleSentence: "Main theek hoon, shukriya.",
          },
          {
            id: 5,
            romanUrdu: "Shukriya",
            english: "Thank you",
            exampleSentence: "Shukriya, aap bohat acche hain.",
          },
        ],
      },
      {
        day: 2,
        title: 'Pronouns & "To Be"',
        phase: "Foundations",
        words: [
          {
            id: 6,
            romanUrdu: "Main",
            english: "I",
            exampleSentence: "Main theek hoon.",
          },
          {
            id: 7,
            romanUrdu: "Tum",
            english: "You (informal)",
            exampleSentence: "Tum kaise ho?",
          },
          {
            id: 8,
            romanUrdu: "Aap",
            english: "You (formal/respectful)",
            exampleSentence: "Aap kaise hain?",
          },
          {
            id: 9,
            romanUrdu: "Woh",
            english: "He/She/It",
            exampleSentence: "Woh acha hai.",
          },
          {
            id: 10,
            romanUrdu: "Hum",
            english: "We",
            exampleSentence: "Hum theek hain.",
          },
        ],
      },
      {
        day: 3,
        title: "Numbers 1–10",
        phase: "Foundations",
        words: [
          {
            id: 11,
            romanUrdu: "Aik",
            english: "One",
            exampleSentence: "",
          },
          {
            id: 12,
            romanUrdu: "Do",
            english: "Two",
            exampleSentence: "",
          },
          {
            id: 13,
            romanUrdu: "Teen",
            english: "Three",
            exampleSentence: "",
          },
          {
            id: 14,
            romanUrdu: "Chaar",
            english: "Four",
            exampleSentence: "",
          },
          {
            id: 15,
            romanUrdu: "Paanch",
            english: "Five",
            exampleSentence: "",
          },
          {
            id: 16,
            romanUrdu: "Chhay",
            english: "Six",
            exampleSentence: "",
          },
          {
            id: 17,
            romanUrdu: "Saat",
            english: "Seven",
            exampleSentence: "",
          },
          {
            id: 18,
            romanUrdu: "Aath",
            english: "Eight",
            exampleSentence: "",
          },
          {
            id: 19,
            romanUrdu: "Nau",
            english: "Nine",
            exampleSentence: "",
          },
          {
            id: 20,
            romanUrdu: "Dus",
            english: "Ten",
            exampleSentence: "",
          },
        ],
      },
      {
        day: 4,
        title: "Politeness Words",
        phase: "Foundations",
        words: [
          {
            id: 21,
            romanUrdu: "Haan",
            english: "Yes",
            exampleSentence: "Haan, main theek hoon.",
          },
          {
            id: 22,
            romanUrdu: "Nahi",
            english: "No",
            exampleSentence: "Nahi, main theek nahi hoon.",
          },
          {
            id: 23,
            romanUrdu: "Meherbani",
            english: "Please",
            exampleSentence: "Meherbani, ek minute.",
          },
          {
            id: 24,
            romanUrdu: "Maaf kijiye",
            english: "Sorry/Excuse me",
            exampleSentence: "Maaf kijiye, main late hoon.",
          },
          {
            id: 25,
            romanUrdu: "Koi baat nahi",
            english: "No problem",
            exampleSentence: "Koi baat nahi, sab theek hai.",
          },
        ],
      },
      {
        day: 6,
        title: "Question Words",
        phase: "Foundations",
        words: [
          {
            id: 26,
            romanUrdu: "Kya",
            english: "What",
            exampleSentence: "Yeh kya hai?",
          },
          {
            id: 27,
            romanUrdu: "Kaun",
            english: "Who",
            exampleSentence: "Woh kaun hai?",
          },
          {
            id: 28,
            romanUrdu: "Kahan",
            english: "Where",
            exampleSentence: "Aap kahan hain?",
          },
          {
            id: 29,
            romanUrdu: "Kab",
            english: "When",
            exampleSentence: "Kab aayenge aap?",
          },
          {
            id: 30,
            romanUrdu: "Kyun",
            english: "Why",
            exampleSentence: "Kyun nahi?",
          },
        ],
      },
      {
        day: 7,
        title: "Common Nouns",
        phase: "Foundations",
        words: [
          {
            id: 31,
            romanUrdu: "Ghar",
            english: "House",
            exampleSentence: "Yeh mera ghar hai.",
          },
          {
            id: 32,
            romanUrdu: "Pani",
            english: "Water",
            exampleSentence: "Mujhe pani chahiye. (preview of Day 21 pattern)",
          },
          {
            id: 33,
            romanUrdu: "Khana",
            english: "Food",
            exampleSentence: "Khana acha hai.",
          },
          {
            id: 34,
            romanUrdu: "Dost",
            english: "Friend",
            exampleSentence: "Woh mera dost hai.",
          },
          {
            id: 35,
            romanUrdu: "Kitaab",
            english: "Book",
            exampleSentence: "Yeh kitaab acchi hai.",
          },
        ],
      },
      {
        day: 8,
        title: "Adjectives",
        phase: "Foundations",
        words: [
          {
            id: 36,
            romanUrdu: "Acha",
            english: "Good",
            exampleSentence: "Yeh acha hai.",
          },
          {
            id: 37,
            romanUrdu: "Bura",
            english: "Bad",
            exampleSentence: "Yeh bura hai.",
          },
          {
            id: 38,
            romanUrdu: "Bara",
            english: "Big",
            exampleSentence: "Ghar bara hai.",
          },
          {
            id: 39,
            romanUrdu: "Chota",
            english: "Small",
            exampleSentence: "Kitaab chota hai.",
          },
          {
            id: 40,
            romanUrdu: "Naya",
            english: "New",
            exampleSentence: "Yeh naya dost hai.",
          },
        ],
      },
      {
        day: 9,
        title: "Numbers 11–20 + Colors",
        phase: "Foundations",
        words: [
          {
            id: 41,
            romanUrdu: "Gyarah",
            english: "11",
            exampleSentence: "",
          },
          {
            id: 42,
            romanUrdu: "Barah",
            english: "12",
            exampleSentence: "",
          },
          {
            id: 43,
            romanUrdu: "Pandrah",
            english: "15",
            exampleSentence: "",
          },
          {
            id: 44,
            romanUrdu: "Bees",
            english: "20",
            exampleSentence: "",
          },
          {
            id: 45,
            romanUrdu: "Laal",
            english: "Red",
            exampleSentence: "",
          },
          {
            id: 46,
            romanUrdu: "Neela",
            english: "Blue",
            exampleSentence: "",
          },
          {
            id: 47,
            romanUrdu: "Sabz",
            english: "Green",
            exampleSentence: "",
          },
          {
            id: 48,
            romanUrdu: "Kaala",
            english: "Black",
            exampleSentence: "",
          },
          {
            id: 49,
            romanUrdu: "Safed",
            english: "White",
            exampleSentence: "",
          },
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Survival",
    dayRange: "11-20",
    days: [
      {
        day: 11,
        title: "Family Words",
        phase: "Survival",
        words: [
          {
            id: 50,
            romanUrdu: "Ammi",
            english: "Mother",
            exampleSentence: "Yeh meri Ammi hai.",
          },
          {
            id: 51,
            romanUrdu: "Abbu",
            english: "Father",
            exampleSentence: "Yeh mera Abbu hai.",
          },
          {
            id: 52,
            romanUrdu: "Bhai",
            english: "Brother",
            exampleSentence: "Mera bhai bara hai.",
          },
          {
            id: 53,
            romanUrdu: "Behan",
            english: "Sister",
            exampleSentence: "Meri behan chota hai.",
          },
          {
            id: 54,
            romanUrdu: "Beta/Beti",
            english: "Son/Daughter",
            exampleSentence: "Woh unka beta hai.",
          },
        ],
      },
      {
        day: 12,
        title: 'Possession ("Mere paas")',
        phase: "Survival",
        words: [
          {
            id: 55,
            romanUrdu: "Tera/Teri",
            english: "Your (informal)",
            exampleSentence: "Yeh tera ghar hai.",
          },
          {
            id: 56,
            romanUrdu: "Uska/Uski",
            english: "His/Her",
            exampleSentence: "Yeh uska dost hai.",
          },
          {
            id: 57,
            romanUrdu: "Mere paas",
            english: "I have (lit. near me)",
            exampleSentence: "Mere paas ek kitaab hai.",
          },
          {
            id: 58,
            romanUrdu: "Hamara/Hamari",
            english: "Our",
            exampleSentence: "Yeh hamara ghar hai.",
          },
          {
            id: 59,
            romanUrdu: "Unka/Unki",
            english: "Their",
            exampleSentence: "Yeh unka beta hai.",
          },
        ],
      },
      {
        day: 13,
        title: "House & Rooms",
        phase: "Survival",
        words: [
          {
            id: 60,
            romanUrdu: "Kamra",
            english: "Room",
            exampleSentence: "Yeh mera kamra hai.",
          },
          {
            id: 61,
            romanUrdu: "Rasoi",
            english: "Kitchen",
            exampleSentence: "Ammi rasoi mein hain.",
          },
          {
            id: 62,
            romanUrdu: "Bathroom",
            english: "Bathroom",
            exampleSentence: "Bathroom kahan hai?",
          },
          {
            id: 63,
            romanUrdu: "Chhat",
            english: "Roof/Terrace",
            exampleSentence: "Hum chhat par baithte hain.",
          },
          {
            id: 64,
            romanUrdu: "Darwaza",
            english: "Door",
            exampleSentence: "Darwaza band karo.",
          },
        ],
      },
      {
        day: 14,
        title: "Days of the Week",
        phase: "Survival",
        words: [
          {
            id: 65,
            romanUrdu: "Peer",
            english: "Monday",
            exampleSentence: "",
          },
          {
            id: 66,
            romanUrdu: "Mangal",
            english: "Tuesday",
            exampleSentence: "",
          },
          {
            id: 67,
            romanUrdu: "Budh",
            english: "Wednesday",
            exampleSentence: "",
          },
          {
            id: 68,
            romanUrdu: "Jumeraat",
            english: "Thursday",
            exampleSentence: "",
          },
          {
            id: 69,
            romanUrdu: "Jumma",
            english: "Friday",
            exampleSentence: "",
          },
          {
            id: 70,
            romanUrdu: "Hafta",
            english: "Saturday",
            exampleSentence: "",
          },
          {
            id: 71,
            romanUrdu: "Itwaar",
            english: "Sunday",
            exampleSentence: "",
          },
        ],
      },
      {
        day: 16,
        title: "Daily Routine Verbs (Present Tense)",
        phase: "Survival",
        words: [
          {
            id: 72,
            romanUrdu: "Uthna → Uthta/Uthti hoon",
            english: "To wake up → I wake up",
            exampleSentence: "Main subah uthta hoon. (m) / uthti hoon (f)",
          },
          {
            id: 73,
            romanUrdu: "Khana → Khata/Khati hoon",
            english: "To eat → I eat",
            exampleSentence: "Main khana khata hoon.",
          },
          {
            id: 74,
            romanUrdu: "Sona → Sota/Soti hoon",
            english: "To sleep → I sleep",
            exampleSentence: "Main raat ko sota hoon.",
          },
          {
            id: 75,
            romanUrdu: "Jaana → Jata/Jati hoon",
            english: "To go → I go",
            exampleSentence: "Main school jata hoon.",
          },
          {
            id: 76,
            romanUrdu: "Karna → Karta/Karti hoon",
            english: "To do → I do",
            exampleSentence: "Main kaam karta hoon.",
          },
        ],
      },
      {
        day: 17,
        title: "Time Vocabulary",
        phase: "Survival",
        words: [
          {
            id: 77,
            romanUrdu: "Waqt",
            english: "Time",
            exampleSentence: "Kya waqt hua hai?",
          },
          {
            id: 78,
            romanUrdu: "Ghanta",
            english: "Hour",
            exampleSentence: "Ek ghanta baad.",
          },
          {
            id: 79,
            romanUrdu: "Minute",
            english: "Minute",
            exampleSentence: "Do minute ruko.",
          },
          {
            id: 80,
            romanUrdu: "Subah",
            english: "Morning",
            exampleSentence: "Subah bakhair.",
          },
          {
            id: 81,
            romanUrdu: "Shaam",
            english: "Evening",
            exampleSentence: "Shaam ko milte hain.",
          },
        ],
      },
      {
        day: 18,
        title: "More Routine Verbs",
        phase: "Survival",
        words: [
          {
            id: 82,
            romanUrdu: "Parhna → Parhta/Parhti hoon",
            english: "To study/read",
            exampleSentence: "Main kitaab parhta hoon.",
          },
          {
            id: 83,
            romanUrdu: "Likhna → Likhta/Likhti hoon",
            english: "To write",
            exampleSentence: "Main letter likhta hoon.",
          },
          {
            id: 84,
            romanUrdu: "Khelna → Khelta/Khelti hoon",
            english: "To play",
            exampleSentence: "Hum khelte hain.",
          },
          {
            id: 85,
            romanUrdu: "Dekhna → Dekhta/Dekhti hoon",
            english: "To watch/see",
            exampleSentence: "Main TV dekhta hoon.",
          },
          {
            id: 86,
            romanUrdu: "Sunna → Sunta/Sunti hoon",
            english: "To listen",
            exampleSentence: "Main gaana sunta hoon.",
          },
        ],
      },
      {
        day: 19,
        title: "Sequencing Routine",
        phase: "Survival",
        words: [
          {
            id: 87,
            romanUrdu: "Phir",
            english: "Then",
            exampleSentence: "Main uthta hoon, phir khana khata hoon.",
          },
          {
            id: 88,
            romanUrdu: "Uske baad",
            english: "After that",
            exampleSentence: "Uske baad main school jata hoon.",
          },
          {
            id: 89,
            romanUrdu: "Sab se pehle",
            english: "First of all",
            exampleSentence: "Sab se pehle main uthta hoon.",
          },
          {
            id: 90,
            romanUrdu: "Akhir mein",
            english: "Finally",
            exampleSentence: "Akhir mein main sota hoon.",
          },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Social",
    dayRange: "21-30",
    days: [
      {
        day: 21,
        title: "Food & Drink",
        phase: "Social",
        words: [
          {
            id: 91,
            romanUrdu: "Roti",
            english: "Bread",
            exampleSentence: "Mujhe roti chahiye.",
          },
          {
            id: 92,
            romanUrdu: "Chawal",
            english: "Rice",
            exampleSentence: "Chawal acha hai.",
          },
          {
            id: 93,
            romanUrdu: "Chai",
            english: "Tea",
            exampleSentence: "Mujhe chai chahiye.",
          },
          {
            id: 94,
            romanUrdu: "Doodh",
            english: "Milk",
            exampleSentence: "Bachon ko doodh chahiye.",
          },
          {
            id: 95,
            romanUrdu: "Sabzi",
            english: "Vegetable",
            exampleSentence: "Sabzi taza hai.",
          },
        ],
      },
      {
        day: 22,
        title: "Market & Shopping",
        phase: "Social",
        words: [
          {
            id: 96,
            romanUrdu: "Dukaan",
            english: "Shop",
            exampleSentence: "Yeh dukaan bari hai.",
          },
          {
            id: 97,
            romanUrdu: "Paisa",
            english: "Money",
            exampleSentence: "Mere paas paisa nahi hai.",
          },
          {
            id: 98,
            romanUrdu: "Sasta",
            english: "Cheap",
            exampleSentence: "Yeh sasta hai.",
          },
          {
            id: 99,
            romanUrdu: "Mehnga",
            english: "Expensive",
            exampleSentence: "Yeh bohat mehnga hai.",
          },
          {
            id: 100,
            romanUrdu: "Bill",
            english: "Bill",
            exampleSentence: "Bill kitna hai?",
          },
        ],
      },
      {
        day: 23,
        title: "Numbers 20–100 (by tens)",
        phase: "Social",
        words: [
          {
            id: 101,
            romanUrdu: "Bees",
            english: "20",
            exampleSentence: "",
          },
          {
            id: 102,
            romanUrdu: "Tees",
            english: "30",
            exampleSentence: "",
          },
          {
            id: 103,
            romanUrdu: "Chalees",
            english: "40",
            exampleSentence: "",
          },
          {
            id: 104,
            romanUrdu: "Pachas",
            english: "50",
            exampleSentence: "",
          },
          {
            id: 105,
            romanUrdu: "Saath",
            english: "60",
            exampleSentence: "",
          },
          {
            id: 106,
            romanUrdu: "Sattar",
            english: "70",
            exampleSentence: "",
          },
          {
            id: 107,
            romanUrdu: "Assi",
            english: "80",
            exampleSentence: "",
          },
          {
            id: 108,
            romanUrdu: "Nabbay",
            english: "90",
            exampleSentence: "",
          },
          {
            id: 109,
            romanUrdu: "Sau",
            english: "100",
            exampleSentence: "",
          },
        ],
      },
      {
        day: 24,
        title: "Restaurant Phrases",
        phase: "Social",
        words: [
          {
            id: 110,
            romanUrdu: "Menu",
            english: "Menu",
            exampleSentence: "Menu dikhayen.",
          },
          {
            id: 111,
            romanUrdu: "Order",
            english: "Order",
            exampleSentence: "Main order karna chahta hoon.",
          },
          {
            id: 112,
            romanUrdu: "Pasand",
            english: "Like/preference",
            exampleSentence: "Mujhe yeh pasand hai.",
          },
          {
            id: 113,
            romanUrdu: "Naapasand",
            english: "Dislike",
            exampleSentence: "Mujhe yeh naapasand hai.",
          },
          {
            id: 114,
            romanUrdu: "Bhook",
            english: "Hunger",
            exampleSentence: "Mujhe bhook hai.",
          },
        ],
      },
      {
        day: 26,
        title: "Directions",
        phase: "Social",
        words: [
          {
            id: 115,
            romanUrdu: "Seedha",
            english: "Straight",
            exampleSentence: "Seedha jayen.",
          },
          {
            id: 116,
            romanUrdu: "Bayen",
            english: "Left",
            exampleSentence: "Bayen mudein.",
          },
          {
            id: 117,
            romanUrdu: "Dayen",
            english: "Right",
            exampleSentence: "Dayen mudein.",
          },
          {
            id: 118,
            romanUrdu: "Pass",
            english: "Near",
            exampleSentence: "Yeh school ke pass hai.",
          },
          {
            id: 119,
            romanUrdu: "Door",
            english: "Far",
            exampleSentence: "Yeh bohat door hai.",
          },
        ],
      },
      {
        day: 27,
        title: "Places",
        phase: "Social",
        words: [
          {
            id: 120,
            romanUrdu: "Bazaar",
            english: "Market",
            exampleSentence: "Bazaar kahan hai?",
          },
          {
            id: 121,
            romanUrdu: "Station",
            english: "Station",
            exampleSentence: "Station door hai.",
          },
          {
            id: 122,
            romanUrdu: "Hospital",
            english: "Hospital",
            exampleSentence: "Hospital pass hai.",
          },
          {
            id: 123,
            romanUrdu: "Masjid",
            english: "Mosque",
            exampleSentence: "Masjid seedha hai.",
          },
          {
            id: 124,
            romanUrdu: "School",
            english: "School",
            exampleSentence: "School kahan hai?",
          },
        ],
      },
      {
        day: 28,
        title: "Past Tense Basics",
        phase: "Social",
        words: [
          {
            id: 125,
            romanUrdu: "Tha (m) / Thi (f)",
            english: "Was",
            exampleSentence: "Main school mein tha.",
          },
          {
            id: 126,
            romanUrdu: "Thay",
            english: "Were (plural)",
            exampleSentence: "Hum bazaar mein thay.",
          },
          {
            id: 127,
            romanUrdu: "Gaya (m) / Gayi (f)",
            english: "Went",
            exampleSentence: "Main school gaya.",
          },
          {
            id: 128,
            romanUrdu: "Aaya (m) / Aayi (f)",
            english: "Came",
            exampleSentence: "Woh ghar aaya.",
          },
        ],
      },
      {
        day: 29,
        title: "Needs & Emergencies",
        phase: "Social",
        words: [
          {
            id: 129,
            romanUrdu: "Madad",
            english: "Help",
            exampleSentence: "Mujhe madad chahiye.",
          },
          {
            id: 130,
            romanUrdu: "Bimaar",
            english: "Sick",
            exampleSentence: "Main bimaar hoon.",
          },
          {
            id: 131,
            romanUrdu: "Dard",
            english: "Pain",
            exampleSentence: "Mujhe sar mein dard hai.",
          },
          {
            id: 132,
            romanUrdu: "Doctor",
            english: "Doctor",
            exampleSentence: "Mujhe doctor chahiye.",
          },
          {
            id: 133,
            romanUrdu: "Dawai",
            english: "Medicine",
            exampleSentence: "Mujhe dawai chahiye.",
          },
        ],
      },
    ],
  },
  {
    phase: 4,
    title: "Advanced",
    dayRange: "31-40",
    days: [
      {
        day: 31,
        title: "Opinions",
        phase: "Advanced",
        words: [
          {
            id: 134,
            romanUrdu: "Pasand hai",
            english: "Like (reinforced from Day 24)",
            exampleSentence: "Mujhe yeh gaana pasand hai.",
          },
          {
            id: 135,
            romanUrdu: "Acha lagta hai",
            english: "Feels/seems good",
            exampleSentence: "Mujhe yahan acha lagta hai.",
          },
          {
            id: 136,
            romanUrdu: "Mushkil",
            english: "Difficult",
            exampleSentence: "Urdu seekhna mushkil hai.",
          },
          {
            id: 137,
            romanUrdu: "Aasan",
            english: "Easy",
            exampleSentence: "Yeh sawaal aasan hai.",
          },
          {
            id: 138,
            romanUrdu: "Lagta hai",
            english: "Seems/feels",
            exampleSentence: "Mujhe lagta hai woh theek hai.",
          },
        ],
      },
      {
        day: 32,
        title: "Future Tense",
        phase: "Advanced",
        words: [
          {
            id: 139,
            romanUrdu: "Ga (m)",
            english: "Will (male subject)",
            exampleSentence: "Main jaaonga.",
          },
          {
            id: 140,
            romanUrdu: "Gi (f)",
            english: "Will (female subject)",
            exampleSentence: "Main jaaongi.",
          },
          {
            id: 141,
            romanUrdu: "Ge",
            english: "Will (plural)",
            exampleSentence: "Hum jayenge.",
          },
          {
            id: 142,
            romanUrdu: "Karoonga/Karoongi",
            english: "Will do",
            exampleSentence: "Main kaam karoonga.",
          },
        ],
      },
      {
        day: 33,
        title: "Plans & Weekend Talk",
        phase: "Advanced",
        words: [
          {
            id: 143,
            romanUrdu: "Kal",
            english: "Tomorrow/Yesterday (context-dependent)",
            exampleSentence: "Kal milte hain.",
          },
          {
            id: 144,
            romanUrdu: "Agle hafte",
            english: "Next week",
            exampleSentence: "Agle hafte party hai.",
          },
          {
            id: 145,
            romanUrdu: "Plan",
            english: "Plan",
            exampleSentence: "Mera plan hai ghar jana.",
          },
          {
            id: 146,
            romanUrdu: "Mulaqat",
            english: "Meeting",
            exampleSentence: "Mulaqat kab hai?",
          },
        ],
      },
      {
        day: 34,
        title: "Connectors",
        phase: "Advanced",
        words: [
          {
            id: 147,
            romanUrdu: "Aur",
            english: "And",
            exampleSentence: "Main aur mera dost.",
          },
          {
            id: 148,
            romanUrdu: "Lekin",
            english: "But",
            exampleSentence: "Acha hai, lekin mehnga hai.",
          },
          {
            id: 149,
            romanUrdu: "Kyunki",
            english: "Because",
            exampleSentence: "Main khush hoon kyunki aaj Jumma hai.",
          },
          {
            id: 150,
            romanUrdu: "Isliye",
            english: "So/therefore",
            exampleSentence: "Mujhe bhook hai, isliye main khana khaonga.",
          },
        ],
      },
      {
        day: 36,
        title: "Feelings",
        phase: "Advanced",
        words: [
          {
            id: 151,
            romanUrdu: "Khush",
            english: "Happy",
            exampleSentence: "Main khush hoon.",
          },
          {
            id: 152,
            romanUrdu: "Udaas",
            english: "Sad",
            exampleSentence: "Woh udaas hai.",
          },
          {
            id: 153,
            romanUrdu: "Pareshan",
            english: "Worried/Troubled",
            exampleSentence: "Main pareshan hoon.",
          },
          {
            id: 154,
            romanUrdu: "Hairaan",
            english: "Surprised",
            exampleSentence: "Main hairaan hoon!",
          },
          {
            id: 155,
            romanUrdu: "Thaka",
            english: "Tired",
            exampleSentence: "Main thaka hoon.",
          },
        ],
      },
      {
        day: 37,
        title: "Weather & Small Talk",
        phase: "Advanced",
        words: [
          {
            id: 156,
            romanUrdu: "Garmi",
            english: "Heat",
            exampleSentence: "Aaj bohat garmi hai.",
          },
          {
            id: 157,
            romanUrdu: "Sardi",
            english: "Cold",
            exampleSentence: "Sardi shuru ho gayi hai.",
          },
          {
            id: 158,
            romanUrdu: "Baarish",
            english: "Rain",
            exampleSentence: "Baarish ho rahi hai.",
          },
          {
            id: 159,
            romanUrdu: "Mausam",
            english: "Weather",
            exampleSentence: "Mausam acha hai.",
          },
        ],
      },
    ],
  },
];
