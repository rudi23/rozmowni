import Link from 'next/link';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import Opinions from '../../components/Opinions';
import TeamCard from '../../components/TeamCard';
import TrustPoints from '../../components/TrustPoints';
import SectionHeading from '../../components/SectionHeading';
import ResponsiveImage from '../../components/ResponsiveImage';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import aboutUsImage from '../../../public/images/about-us.jpg';
import denisImage from '../../../public/images/denis.jpg';
import angelikaImage from '../../../public/images/angelika.jpg';
import aniaImage from '../../../public/images/ania.jpg';
import georgiaImage from '../../../public/images/georgia.jpg';
import wiktorImage from '../../../public/images/wiktor.jpg';
import weronikaImage from '../../../public/images/weronika.jpg';
import styles from './index.module.scss';

const team = [
  {
    name: 'Denis',
    image: denisImage,
    tags: ['Konwersacje', 'Dorośli'],
    bio: [
      'There are so many ways to tell the stories, but language is one of the best. Who doesn’t love telling stories? Talks over a cup of coffee, fiery debates, friendly jokes and thought-provoking monologues, whatever you may choose, they carry a story behind them — a story we want to tell.',
      'I was lucky enough to encounter great teachers who helped discover and fuel my passion for languages. And for over eight years, I’ve been helping people overcome their barriers and find the best means possible to express themselves in English, tell stories of their own, and listen to others without any fear or insecurities. I base my classes on communication rather than meticulous work with tests and grammar exercises. There is no avoiding grammar, but why can’t it be interesting? When you learn things in context, it can.',
      'The key to learning a language is love, passion and a pinch of dedication and work. Let’s start telling your own story!',
    ],
  },
  {
    name: 'Angelika',
    image: angelikaImage,
    tags: ['Dzieci i młodzież', 'Dwujęzyczność'],
    bio: [
      'Specjalizuję się w nauczaniu najmłodszych i młodzieży, od których nieustannie czerpię ogromną dawkę dobrej energii i inspiracji.',
      'Moja pasja do nauczania zrodziła się w szkołach walijskich, gdzie pracowałam jako asystent nauczyciela pomagając dzieciom pochodzącym z polskojęzycznych rodzin. Od tego czasu doświadczenie zdobywałam w wielu szkołach i przedszkolach dwujęzycznych, dlatego idea wychowania dwujęzycznego jest mi bardzo bliska.',
      'W związku z tym na lekcjach kładę nacisk przede wszystkim na rozmowę i poszerzanie słownictwa. Lubię też wykorzystywać wiedzę i doświadczenie moich uczniów jako pretekst do omawiania i ćwiczenia zagadnień gramatycznych, starając się przy tym wykorzenić utrwalone błędy powtarzające się w łatwiejszych i nieco trudniejszych strukturach językowych.',
    ],
  },
  {
    name: 'Ania',
    image: aniaImage,
    tags: ['Dorośli', 'Business English', 'General English'],
    bio: [
      'In my classes you can expect to have a lot of speaking and vocabulary practice around the topics that are matched up to your personal needs. I mainly work with adults who have already mastered English to a certain degree and wish to bring their language skills to a higher level. I do Business classes as well as General English, or we can have a bit of both if you wish.',
      'I’ve worked and lived in London for the last 14 years and I have gained experience in a variety of work environments, including teaching ESOL in London-based Colleges.',
      'I’m happy to share my language experience with you in an easy-going and encouraging way.',
    ],
  },
  {
    name: 'Georgia',
    image: georgiaImage,
    tags: ['Native speaker', 'Cambridge English', 'Młodzież i dorośli'],
    bio: [
      'Hi everyone! My name is Georgia and I come from London. I’ve been working abroad as a teacher since I graduated from university 7 years ago and I’ve loved every minute!',
      'I spent 3 and a half years in China, teaching 5 to 7 year olds through the inquiry-based International Baccalaureate programme. Then I continued my adventure onto Spain where I’ve been teaching Cambridge English to a range of different ages and levels, from young children to adults, from beginners to advanced! These last 3 years have made me realise that I love teaching teenagers and adults the most because we never run out of interesting topics to talk about!',
      'I’m CELTA-qualified, enthusiastic and nothing makes me happier than helping others achieve their language learning goals. What’s more, I’m a second language learner myself so can empathise with how challenging it can be!',
      'Besides studying Spanish in my free time, I also enjoy crocheting, reading books and eating good food!',
    ],
  },
  {
    name: 'Wiktor',
    image: wiktorImage,
    tags: ['Dorośli', 'Business English', 'IT'],
    bio: [
      'Angielski przyszedł do mnie sam, dość naturalnie: zaczęło się od oglądania kreskówek w wieku 3 lat, zajęć w przedszkolu, a następnie w szkole podstawowej i poza szkołą. Potem wyjazdy do Anglii oraz Kanady, studia w Trójmieście.',
      'W nauczaniu uwielbiam kontakt z ludźmi i obserwację jak progresują, wspólne osiąganie celów. Największą przyjemność czerpię z nauki osób dorosłych, szczególnie zawodowo związanych z IT i biznesem ze względu na ich potrzeby i międzynarodowy charakter pracy.',
      'Jestem spokojnym, cierpliwym i wyluzowanym nauczycielem nastawionym na konwersacje i naukę języka użytkowego, codziennego, praktycznego. Lubię skupiać się na słownictwie, precyzyjnym wyrażaniu siebie, a następnie na gramatyce.',
      'Zajawki? Enologia i koszykówka w wolnym czasie oraz wyjazdy na wystawy z naszym psem.',
    ],
  },
  {
    name: 'Weronika',
    image: weronikaImage,
    tags: ['Dzieci i młodzież', 'Konwersacje'],
    bio: [
      'Moja sympatia do języka angielskiego zaczęła się już w dzieciństwie, kiedy to bardzo ciekawiło mnie, co mówią aktorzy grający w anglojęzycznych bajkach na moim ulubionym kanale Disney Channel. Uwielbiałam także sprawdzać, o czym śpiewają zagraniczni piosenkarze.',
      'Z kolei później pojawiły się u mnie silne chęci nauczania innych, co musiał dzielnie znosić mój młodszy brat, który jednocześnie był moim pierwszym uczniem. Paręnaście lat później ukończyłam anglistykę wraz z modułem nauczycielskim i zajęłam się nauczaniem innych w szkole publicznej i szkole językowej.',
      'Obecnie studiuję psychologię, co bardzo pomaga mi w dopasowywaniu metod nauczania oraz form motywacji do indywidualnych potrzeb ucznia.',
      'Prywatnie bardzo często przekonuję się, jak pomocna jest znajomość języka angielskiego do rozwijania własnych zainteresowań: gotowanie, czytanie książek i artykułów psychologicznych, podróżowanie. Bardzo lubię też spędzać czas na spacerach z moim psem. Jej obecność przypomina mi o cierpliwości i radości z drobnych sukcesów – wartości, które staram się przenosić także na swoje zajęcia.',
    ],
  },
];

export default function AboutUs() {
  const trackClick = useClickTracking();

  return (
    <>
      <PageHeader
        title="O nas"
        lede="Poznaj nauczycieli, którzy poprowadzą Twoje lekcje, i sposób, w jaki uczymy."
      />

      <Section>
        <div className={styles.founder}>
          <div className={styles.founderImage}>
            <ResponsiveImage
              src={aboutUsImage}
              alt="Małgorzata Rudowska"
              placeholder="blur"
              sizes="(min-width: 992px) 460px, 100vw"
              quality="75"
              style={{ height: '100%', maxWidth: '100%' }}
            />
          </div>

          <div className={styles.founderText}>
            <SectionHeading subheading="Założycielka" heading="Gosia" />
            <p>
              Nazywam się Małgorzata Rudowska i jestem założycielką szkoły
              językowej rozmowni.pl
            </p>
            <p>
              Od dziecka uczyłam się angielskiego, ale mimo tego, jako młoda
              osoba bardzo wstydziłam się mówić w tym języku. Pewnego dnia na
              swojej drodze spotkałam nauczyciela, który na zawsze zmienił mój
              sposób patrzenia na komunikowanie się w języku obcym. Nasze lekcje
              nie wyglądały jak typowe zajęcia w szkolnej ławce. Zamiast
              rozwiązywania niezliczonych testów i przepisywania zdań z tablicy
              mój nauczyciel przede wszystkim zachęcał mnie do rozmowy.
              Czytaliśmy ciekawe, różnorodne artykuły, które były później bazą
              do dyskusji. Wkrótce przełamałam barierę językową i zaczęłam
              płynnie mówić po angielsku.
            </p>
            <p>
              Postanowiłam, że tylko w ten sposób chcę się uczyć języka... a
              kilka lat później, że tak chcę uczyć innych.
            </p>
            <p>
              W szkole rozmowni.pl chcemy dać Ci narzędzia, stworzyć środowisko
              i atmosferę, gdzie będziesz mógł się rozwijać. Nauczysz się nie
              tylko płynnie mówić po angielsku, ale otworzysz się, będziesz
              wyrażać swoją opinię i prowadzić ciekawe dyskusje. Będziemy przede
              wszystkim ćwiczyć konwersacje, ale nie zaniedbamy również innych
              umiejętności językowych, które są potrzebne, aby Twój poziom
              systematycznie się podnosił. Z nauczycielem ustalisz swoje cele i
              dążenia, które w połączeniu z Twoją motywacją i pracą zaprowadzą
              Cię do upragnionej płynności w rozmowie po angielsku.
            </p>
            <p className="mb-0">Do zobaczenia na lekcji!</p>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <SectionHeading subheading="Zespół" heading="Nasi nauczyciele" />
        <ul className={styles.team}>
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </ul>
      </Section>

      <Section>
        <div className={styles.cta}>
          <h2 className={styles.ctaHeading}>Poznaj nas na lekcji próbnej</h2>
          <p className={styles.ctaText}>
            Zrób bezpłatny test poziomujący, a zaprosimy Cię na 30-minutową
            lekcję online z lektorem dobranym do Twojego poziomu i celów.
          </p>
          <Link
            href={routeMap[routeNames.TEST]}
            className={`btn btn-main ${styles.ctaButton}`}
            onClick={() => trackClick(events.ABOUT_CLICK_TEST)}
          >
            Zrób bezpłatny test
          </Link>
          <TrustPoints
            align="center"
            className={styles.ctaTrust}
            items={['Bez opłat', 'Bez zobowiązań']}
          />
        </div>
      </Section>

      <Opinions />
    </>
  );
}
