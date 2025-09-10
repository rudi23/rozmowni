// Test data structure for English level assessment
export const testData = {
  adults: {
    title: 'Test dla dorosłych',
    questions: [
      {
        id: 1,
        question: 'Can I sit here?',
        options: [
          'Yes, you can',
          'Sorry, I did that.',
          "I don't like",
          "Isn't it?",
        ],
        correct: 0,
      },
      {
        id: 2,
        question: 'What time will you come home?',
        options: [
          "I'm very tired",
          "About seven o'clock.",
          "It's on the table",
          'Because I was late',
        ],
        correct: 1,
      },
      {
        id: 3,
        question: "I can't understand this email",
        options: [
          'Would you like some help?',
          "Don't you know",
          'I think it was',
          'It was awful',
        ],
        correct: 0,
      },
      {
        id: 4,
        question: "I'd like a table for two, please",
        options: [
          'What time is it?',
          'On the menu.',
          "Because it's rainy.",
          "I'll just see what's available.",
        ],
        correct: 3,
      },
      {
        id: 5,
        question: 'Shall we watch a movie tonight?',
        options: [
          'It was very interesting.',
          'Yes, very fast.',
          "I don't feel like it.",
          "It's on the table",
        ],
        correct: 2,
      },
      {
        id: 6,
        question: "The bag was ...... heavy that I couldn't lift it",
        options: ['very', 'too', 'so', 'such'],
        correct: 2,
      },
      {
        id: 7,
        question:
          'The manager promised to solve the issue ...... and for all so it never comes back again.',
        options: ['once', 'ever', 'first', 'last'],
        correct: 0,
      },
      {
        id: 8,
        question:
          "Don't put the glass with hot tea on the ...... of the table. It's dangerous.",
        options: ['border', 'frame', 'edge', 'frontier'],
        correct: 2,
      },
      {
        id: 9,
        question: "He didn't ...... to break the vase, it was an accident.",
        options: ['like', 'mean', 'think', 'guess'],
        correct: 1,
      },
      {
        id: 10,
        question: 'The teacher finished the lesson ...... a quick summary.',
        options: ['with', 'in', 'at', 'as'],
        correct: 0,
      },
      {
        id: 11,
        question: 'Would you mind ...... the music down a little?',
        options: ['going', 'to turn', 'turning', 'calm'],
        correct: 2,
      },
      {
        id: 12,
        question:
          'She is really looking forward ...... her friends this weekend.',
        options: ['to see', 'seeing', 'see', 'to seeing'],
        correct: 3,
      },
      {
        id: 13,
        question: '...... busy he is, he always answers her calls.',
        options: ['Although', 'However much', 'No matter how', 'Whatever'],
        correct: 2,
      },
      {
        id: 14,
        question:
          'It was just a week ago ...... they moved into their new house.',
        options: ['that', 'then', 'since', 'after'],
        correct: 0,
      },
      {
        id: 15,
        question:
          "I couldn't find the book in the store, but they ...... a copy for me.",
        options: ['booked', 'commanded', 'ordered', 'asked'],
        correct: 2,
      },
      {
        id: 16,
        question:
          'I was ...... to leave the office when my boss asked me a question.',
        options: ['thinking', 'planned', 'ready', 'about'],
        correct: 3,
      },
      {
        id: 17,
        question: 'He finished the project ...... two weeks ago',
        options: ['quite', 'almost', 'beyond', 'already'],
        correct: 1,
      },
      {
        id: 18,
        question:
          'After the plane has taken off and the seat belt sign is switched off, you may ...... your seat belt.',
        options: ['untie', 'unlock', 'unfasten', 'undress'],
        correct: 2,
      },
      {
        id: 19,
        question: 'Working abroad gave him the ...... to learn a new language.',
        options: ['opportunity', 'position', 'chance', 'place'],
        correct: 0,
      },
      {
        id: 20,
        question: 'The fire was quickly controlled and ...... harm was caused.',
        options: ['low', 'little', 'shallow', 'sharp'],
        correct: 1,
      },
      {
        id: 21,
        question: "I'd rather you ...... so loudly – the baby is sleeping",
        options: ["didn't speak", "don't speak", 'not speaking', "won't speak"],
        correct: 0,
      },
      {
        id: 22,
        question:
          "It's important to listen to both ...... before judging the situation.",
        options: ['features', 'sides', 'perspectives', 'shades'],
        correct: 1,
      },
      {
        id: 23,
        question: 'She is a ...... respected expert in her field.',
        options: ['greatly', 'strongly', 'readily', 'highly'],
        correct: 3,
      },
      {
        id: 24,
        question: 'He had to ...... his steps to find the missing wallet.',
        options: ['regress', 'resume', 'retrace', 'return'],
        correct: 2,
      },
      {
        id: 25,
        question:
          'There are several good restaurants in the ...... of the hotel.',
        options: ['vicinity', 'region', 'district', 'quarter'],
        correct: 0,
      },
    ],
    levels: [
      {
        min: 0,
        max: 7,
        level: 'A1',
        title: 'Poziom podstawowy',
        description:
          'Rozumiesz podstawowe wyrażenia codzienne i bardzo proste zdania. Potrafisz się przedstawić, zadawać podstawowe pytania o miejsce zamieszkania, ludzi których znasz i rzeczy które posiadasz.',
      },
      {
        min: 8,
        max: 12,
        level: 'A2',
        title: 'Poziom elementarny',
        description:
          'Rozumiesz zdania i często używane wyrażenia związane z podstawowymi dziedzinami życia. Potrafisz komunikować się w prostych, rutynowych sytuacjach wymagających prostej wymiany informacji.',
      },
      {
        min: 13,
        max: 17,
        level: 'B1',
        title: 'Poziom średniozaawansowany',
        description:
          'Rozumiesz główne punkty wypowiedzi na znane tematy spotykane w pracy, szkole, czasie wolnym. Potrafisz radzić sobie z większością sytuacji podczas podróży w krajach anglojęzycznych.',
      },
      {
        min: 18,
        max: 21,
        level: 'B2',
        title: 'Poziom średniozaawansowany wyższy',
        description:
          'Rozumiesz główne idee złożonych tekstów na tematy konkretne i abstrakcyjne. Potrafisz swobodnie rozmawiać z rodzimymi użytkownikami języka i tworzyć przejrzyste, szczegółowe teksty.',
      },
      {
        min: 22,
        max: 24,
        level: 'C1',
        title: 'Poziom zaawansowany',
        description:
          'Rozumiesz szeroką gamę wymagających, długich tekstów oraz dostrzegasz ukryte znaczenia. Wyrażasz się płynnie i spontanicznie, używasz języka skutecznie i elastycznie.',
      },
      {
        min: 25,
        max: 25,
        level: 'C2',
        title: 'Poziom biegły',
        description:
          'Z łatwością rozumiesz praktycznie wszystko co słyszysz lub czytasz. Potrafisz streszczać informacje z różnych źródeł i wyrażać się bardzo płynnie, precyzyjnie i subtelnie.',
      },
    ],
  },
  teens: {
    title: 'Test poziomujący dla młodzieży (11-16 lat)',
    questions: [
      {
        id: 1,
        question: 'There ... many students in our class.',
        options: ['are', 'is', 'have'],
        correct: 0,
      },
      {
        id: 2,
        question: '... a smartphone?',
        options: ['Do you have', 'Have you got', 'Does your sister got'],
        correct: 1,
      },
      {
        id: 3,
        question: 'He ... like horror movies.',
        options: ["don't", "doesn't", "isn't"],
        correct: 1,
      },
      {
        id: 4,
        question: "I'm not very ... at playing guitar.",
        options: ['good', 'able', 'keen'],
        correct: 0,
      },
      {
        id: 5,
        question: "We ... wear uniforms at school - it's optional.",
        options: ['have to', "couldn't", "don't have to"],
        correct: 2,
      },
      {
        id: 6,
        question: 'Can I get some money ... you for lunch? I forgot mine!',
        options: ['to', 'from', 'of'],
        correct: 1,
      },
      {
        id: 7,
        question: 'She can dance ... .',
        options: ['beautiful', 'nice', 'beautifully'],
        correct: 2,
      },
      {
        id: 8,
        question: 'Which subject is ... , math or science?',
        options: ['more difficult', 'the more difficult', 'difficulter'],
        correct: 0,
      },
      {
        id: 9,
        question: 'Shakespeare ... "Romeo and Juliet" in the 1590s.',
        options: ['writed', 'written', 'wrote'],
        correct: 2,
      },
      {
        id: 10,
        question: 'Is there ... at the door?',
        options: ['somebody', 'anybody', 'someone'],
        correct: 1,
      },
      {
        id: 11,
        question: 'I bought a sandwich and juice. ... sandwich was delicious!',
        options: ['A', 'The', '-'],
        correct: 1,
      },
      {
        id: 12,
        question: 'Even ... teenagers would enjoy that boring documentary!',
        options: ['patient', 'lazy', 'impatient'],
        correct: 0,
      },
      {
        id: 13,
        question: 'Has she ... her homework ... ?',
        options: ['finished/already', 'finish/already', 'finished/yet'],
        correct: 2,
      },
      {
        id: 14,
        question:
          "Tom has ... close friends at his new school. He's quite lonely.",
        options: ['few', 'a few', 'a little'],
        correct: 0,
      },
      {
        id: 15,
        question: 'What ... at 3 PM yesterday?',
        options: ['did you do', 'were you doing', 'you were doing'],
        correct: 1,
      },
      {
        id: 16,
        question: 'Taylor Swift ... many hit songs.',
        options: ['wrote', 'has written', 'was written'],
        correct: 1,
      },
      {
        id: 17,
        question: "Today's football practice was ... because of the storm.",
        options: ['called away', 'called off', 'laid off'],
        correct: 1,
      },
      {
        id: 18,
        question: 'She would travel the world if she ... enough money.',
        options: ['had', 'has', 'would have'],
        correct: 0,
      },
      {
        id: 19,
        question: 'By 2020 they ... three championship titles.',
        options: ['won', 'were won', 'had won'],
        correct: 2,
      },
      {
        id: 20,
        question: 'The school newsletter ... every month.',
        options: ['are published', 'publish', 'is published'],
        correct: 2,
      },
      {
        id: 21,
        question: 'Most teenagers enjoy ... video games in their free time.',
        options: ['to play', 'play', 'playing'],
        correct: 2,
      },
      {
        id: 22,
        question: 'If I ... you, I would study harder for the exam.',
        options: ['was', 'were', 'am'],
        correct: 1,
      },
      {
        id: 23,
        question: 'The movie was so boring that I ... asleep halfway through.',
        options: ['fell', 'felt', 'fall'],
        correct: 0,
      },
      {
        id: 24,
        question: "She's been learning French ... she was ten years old.",
        options: ['for', 'since', 'during'],
        correct: 1,
      },
      {
        id: 25,
        question:
          "... you help me with this project, I'd really appreciate it.",
        options: ['Should', 'Would', 'Could'],
        correct: 2,
      },
    ],
    levels: [
      {
        min: 0,
        max: 7,
        level: 'A1',
        title: 'Beginner',
        description:
          'Znasz podstawowe słowa i wyrażenia. Potrafisz się przedstawić i zadawać proste pytania o codzienne sprawy.',
      },
      {
        min: 8,
        max: 12,
        level: 'A2',
        title: 'Elementary',
        description:
          'Rozumiesz proste teksty i potrafisz rozmawiać o znanych tematach jak szkoła, hobby i rodzina.',
      },
      {
        min: 13,
        max: 17,
        level: 'B1',
        title: 'Pre-Intermediate',
        description:
          'Radzisz sobie z większością sytuacji codziennych. Potrafisz opowiadać o swoich planach i doświadczeniach.',
      },
      {
        min: 18,
        max: 21,
        level: 'B2',
        title: 'Intermediate',
        description:
          'Swobodnie rozmawiasz na różne tematy. Rozumiesz filmy, książki i artykuły bez większych problemów.',
      },
      {
        min: 22,
        max: 24,
        level: 'C1',
        title: 'Upper-Intermediate',
        description:
          'Bardzo dobrze władasz językiem. Możesz w przyszłości studiować w języku angielskim',
      },
      {
        min: 25,
        max: 25,
        level: 'C2',
        title: 'Advanced',
        description:
          'Świetnie! Rozumiesz prawie wszystko i wyrażasz się bardzo precyzyjnie.',
      },
    ],
  },
};

// Helper function to get level based on score
export const getLevel = (testScore, testType) => {
  const levels = testData[testType].levels;

  return levels.find(
    (level) => testScore >= level.min && testScore <= level.max,
  );
};
