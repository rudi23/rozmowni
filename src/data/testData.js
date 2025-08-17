// Test data structure for English level assessment
export const testData = {
    adults: {
        title: 'Test dla dorosłych',
        questions: [
            {
                id: 1,
                question: 'Where should I meet you tomorrow?',
                options: [
                    "I'll let you know later.",
                    'That sounds perfect.',
                    'At the coffee shop on Main Street.',
                    'Yes, I can come.',
                ],
                correct: 2,
            },
            {
                id: 2,
                question: 'What time does the store open?',
                options: ['It was very busy.', "At nine o'clock.", "I think it's closed.", 'Near the bank.'],
                correct: 1,
            },
            {
                id: 3,
                question: 'I need help with my homework.',
                options: ['What subject is it?', 'When is it due?', "That's too bad.", "I don't think so."],
                correct: 0,
            },
            {
                id: 4,
                question: 'Could you reserve a table for four people?',
                options: [
                    'What time would you prefer?',
                    'The food is excellent.',
                    'How much does it cost?',
                    "We're fully booked.",
                ],
                correct: 0,
            },
            {
                id: 5,
                question: 'Would you like to join us for dinner?',
                options: ['Where are you going?', 'That would be lovely.', "I'm not hungry.", "It's getting late."],
                correct: 1,
            },
            {
                id: 6,
                question: 'The weather was ...... cold that we decided to stay inside.',
                options: ['very', 'so', 'too', 'such'],
                correct: 1,
            },
            {
                id: 7,
                question: 'We need to finish this project ...... or never.',
                options: ['soon', 'now', 'today', 'immediately'],
                correct: 1,
            },
            {
                id: 8,
                question: "Please don't leave your bag on the ...... of the stairs - it's dangerous.",
                options: ['top', 'side', 'edge', 'corner'],
                correct: 2,
            },
            {
                id: 9,
                question: "I didn't ...... to be rude when I interrupted you.",
                options: ['want', 'mean', 'try', 'plan'],
                correct: 1,
            },
            {
                id: 10,
                question: 'The presentation began ...... an introduction to the company.',
                options: ['with', 'by', 'for', 'from'],
                correct: 0,
            },
            {
                id: 11,
                question: 'Would you mind ...... me your pen for a moment?',
                options: ['lending', 'borrowing', 'giving', 'taking'],
                correct: 0,
            },
            {
                id: 12,
                question: 'We were hoping ...... the new museum during our visit.',
                options: ['visiting', 'to visiting', 'to visit', 'visit'],
                correct: 2,
            },
            {
                id: 13,
                question: '...... busy Sarah gets at work, she never forgets to call her mother.',
                options: ['However', 'Although', 'Whatever', 'Despite'],
                correct: 0,
            },
            {
                id: 14,
                question: 'It was exactly two weeks ago ...... I moved to this apartment.',
                options: ['when', 'that', 'since', 'then'],
                correct: 1,
            },
            {
                id: 15,
                question:
                    "The restaurant didn't have the wine we wanted, but they've ...... a bottle from their supplier.",
                options: ['requested', 'ordered', 'demanded', 'required'],
                correct: 1,
            },
            {
                id: 16,
                question: 'Do you have a moment to chat now or are you ...... to go out?',
                options: ['about', 'ready', 'planning', 'going'],
                correct: 0,
            },
            {
                id: 17,
                question: 'They moved to this neighborhood ...... six months ago.',
                options: ['nearly', 'already', 'quite', 'still'],
                correct: 0,
            },
            {
                id: 18,
                question: 'Once you board the train, you can ...... your seatbelt if you wish.',
                options: ['remove', 'unfasten', 'unlock', 'untie'],
                correct: 1,
            },
            {
                id: 19,
                question: 'She quit her previous job because she had no ...... for promotion.',
                options: ['chance', 'opportunity', 'occasion', 'possibility'],
                correct: 1,
            },
            {
                id: 20,
                question: 'Fortunately, it was only a minor accident and ...... harm was done.',
                options: ['little', 'few', 'small', 'less'],
                correct: 0,
            },
            {
                id: 21,
                question: "I'd rather you ...... to him what happened at the conference.",
                options: ['would explain', 'explained', 'will explain', 'to explain'],
                correct: 1,
            },
            {
                id: 22,
                question: 'The committee examined all ...... of the proposal before making their decision.',
                options: ['aspects', 'parts', 'sections', 'pieces'],
                correct: 0,
            },
        ],
        levels: [
            {
                min: 0,
                max: 6,
                level: 'A1',
                title: 'Poziom podstawowy',
                description:
                    'Rozumiesz podstawowe wyrażenia codzienne i bardzo proste zdania. Potrafisz się przedstawić, zadawać podstawowe pytania o miejsce zamieszkania, ludzi których znasz i rzeczy które posiadasz.',
            },
            {
                min: 7,
                max: 10,
                level: 'A2',
                title: 'Poziom elementarny',
                description:
                    'Rozumiesz zdania i często używane wyrażenia związane z podstawowymi dziedzinami życia. Potrafisz komunikować się w prostych, rutynowych sytuacjach wymagających prostej wymiany informacji.',
            },
            {
                min: 11,
                max: 14,
                level: 'B1',
                title: 'Poziom średniozaawansowany',
                description:
                    'Rozumiesz główne punkty wypowiedzi na znane tematy spotykane w pracy, szkole, czasie wolnym. Potrafisz radzić sobie z większością sytuacji podczas podróży w krajach anglojęzycznych.',
            },
            {
                min: 15,
                max: 17,
                level: 'B2',
                title: 'Poziom średniozaawansowany wyższy',
                description:
                    'Rozumiesz główne idee złożonych tekstów na tematy konkretne i abstrakcyjne. Potrafisz swobodnie rozmawiać z rodzimymi użytkownikami języka i tworzyć przejrzyste, szczegółowe teksty.',
            },
            {
                min: 18,
                max: 20,
                level: 'C1',
                title: 'Poziom zaawansowany',
                description:
                    'Rozumiesz szeroką gamę wymagających, długich tekstów oraz dostrzegasz ukryte znaczenia. Wyrażasz się płynnie i spontanicznie, używasz języka skutecznie i elastycznie.',
            },
            {
                min: 21,
                max: 22,
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
                question: "Tom has ... close friends at his new school. He's quite lonely.",
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
                question: "... you help me with this project, I'd really appreciate it.",
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
                description: 'Bardzo dobrze władasz językiem. Możesz w przyszłości studiować w języku angielskim',
            },
            {
                min: 25,
                max: 25,
                level: 'C2',
                title: 'Advanced',
                description: 'Świetnie! Rozumiesz prawie wszystko i wyrażasz się bardzo precyzyjnie.',
            },
        ],
    },
};

// Helper function to get level based on score
export const getLevel = (testScore, testType) => {
    const levels = testData[testType].levels;

    return levels.find((level) => testScore >= level.min && testScore <= level.max);
};
