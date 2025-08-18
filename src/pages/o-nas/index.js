import Image from 'next/image';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import Opinions from '../../components/Opinions';
import aboutUsImage from '../../../public/images/about-us.jpg';
import denisImage from '../../../public/images/denis.jpg';
import angelikaImage from '../../../public/images/angelika.jpg';
import aniaImage from '../../../public/images/ania.jpg';
import dannyImage from '../../../public/images/danny.jpg';
import georgiaImage from '../../../public/images/georgia.jpg';
import lolitaImage from '../../../public/images/lolita.jpg';
import wiktorImage from '../../../public/images/wiktor.jpg';
import ResponsiveImage from '../../components/ResponsiveImage';

export default function AboutUs() {
    return (
        <>
            <PageHeader title="O nas" />
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="img-block">
                            <ResponsiveImage
                                src={aboutUsImage}
                                alt="Małgorzata Rudowska"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <h2 className="pb-3">Gosia</h2>
                        <p>Nazywam się Małgorzata Rudowska i jestem założycielką szkoły językowej rozmowni.pl</p>
                        <p>
                            Od dziecka uczyłam się angielskiego, ale mimo tego, jako młoda osoba bardzo wstydziłam się
                            mówić w tym języku. Pewnego dnia na swojej drodze spotkałam nauczyciela, który na zawsze
                            zmienił mój sposób patrzenia na komunikowanie się w języku obcym. Nasze lekcje nie wyglądały
                            jak typowe zajęcia w szkolnej ławce. Zamiast rozwiązywania niezliczonych testów i
                            przepisywania zdań z tablicy mój nauczyciel przede wszystkim zachęcał mnie do rozmowy.
                            Czytaliśmy ciekawe, różnorodne artykuły, które były później bazą do dyskusji. Wkrótce
                            przełamałam barierę językową i zaczęłam płynnie mówić po angielsku.
                        </p>
                        <p>
                            Postanowiłam, że tylko w ten sposób chcę się uczyć języka... a kilka lat później, że tak
                            chcę uczyć innych.
                        </p>
                        <p>
                            W szkole rozmowni.pl chcemy dać Ci narzędzia, stworzyć środowisko i atmosferę , gdzie
                            będziesz mógł się rozwijać. Nauczysz się, nie tylko płynnie mówić się po angielsku, ale
                            otworzysz się, będziesz wyrażać swoją opinię i prowadził ciekawe dyskusje. Będziemy przede
                            wszystkim ćwiczyć konwersacje, ale nie zaniedbamy również innych umiejętności językowych,
                            które są potrzebne aby Twój poziom systematycznie się podnosił. Z nauczycielem ustalisz
                            swoje cele i dążenia, które w połączeniu z Twoją motywacją i pracą zaprowadzą Cię do
                            upragnionej płynności w rozmowie po angielsku.
                        </p>
                        <p>Do zobaczenia na lekcji!</p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12 order-lg-2">
                        <div className="img-block">
                            <ResponsiveImage
                                src={denisImage}
                                alt="Denis"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-1">
                        <h2 className="pb-3">Denis</h2>
                        <p>👉 There are so many ways to tell the stories, but language – is one of the best.</p>
                        <p>
                            👉 Who doesn’t love telling stories? Talks over a cup of coffee, fiery debates, friendly
                            jokes and thought-provoking monologues, whatever you may choose, they carry a story behind
                            them—a story we want to tell.
                        </p>
                        <p>
                            👉 I was lucky enough to encounter great teachers who helped discover and fuel my passion
                            for languages. And for over eight years, I’ve been helping people overcome their barriers
                            and find the best means possible to express themselves in English, tell stories of their
                            own, and listen to others without any fear or insecurities. I base my classes on
                            communication rather than meticulous work with tests and grammar exercises. There is no
                            avoiding grammar, but why can’t it be interesting? When you learn things in context, it can.
                        </p>
                        <p>
                            The key to learning a language is love, passion and a pinch of dedication and work. Let’s
                            start telling your own story!!
                        </p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="img-block">
                            <ResponsiveImage
                                src={angelikaImage}
                                alt="Angelika"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-md-1">
                        <h3 className="pb-3">Angelika</h3>
                        <p>
                            Specjalizuję się w nauczaniu najmłodszych i młodzieży, od których nieustannie czerpię
                            ogromną dawkę dobrej energii i inspiracji.
                        </p>
                        <p>
                            Moja pasja do nauczania zrodziła się w szkołach walijskich, gdzie pracowałam jako asystent
                            nauczyciela pomagając dzieciom pochodzącym z polskojęzycznych rodzin. Od tego czasu
                            doświadczenie zdobywałam w wielu szkołach i przedszkolach dwujęzycznych, dlatego idea
                            wychowania dwujęzycznego jest mi bardzo bliska.
                        </p>
                        <p>
                            W związku z tym na lekcjach kładę nacisk przede wszystkim na rozmowę i poszerzanie
                            słownictwa. Lubię też wykorzystywać wiedzę i doświadczenie moich uczniów jako pretekst do
                            omawiania i ćwiczenia zagadnień gramatycznych, starając się przy tym wykorzenić utrwalone
                            błędy powtarzające się w łatwiejszych i nieco trudniejszych strukturach językowych.
                        </p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12 order-lg-2">
                        <div className="img-block">
                            <ResponsiveImage
                                src={aniaImage}
                                alt="Ania"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-1">
                        <h2 className="pb-3">Ania</h2>
                        <p>Hey guys 👋</p>
                        <p>
                            In my classes you can expect to have a lot of speaking and vocabulary practice around the
                            topics that are matched up to your personal needs. I mainly work with adults who have
                            already mastered English to a certain degree and wish to bring their language skills to a
                            higher level. I do Business classes as well as General English, or we can have a bit of both
                            if you wish.
                        </p>
                        <p>
                            I’ve worked and lived in London for the last 14 years and I have gained experience in a
                            variety of work environments, including teaching ESOL in London-based Colleges.
                        </p>
                        <p>I’m happy to share my language experience with you in an easy-going and encouraging way😉</p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12 order-lg-1">
                        <div className="img-block">
                            <ResponsiveImage
                                src={georgiaImage}
                                alt="Georgia"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-2">
                        <h2 className="pb-3">Georgia</h2>
                        <p>Hi everyone! My name is Georgia and I come from London.</p>
                        <p>
                            I’ve been working abroad as a teacher since I graduated from university 7 years ago and I’ve
                            loved every minute! I spent 3 and a half years in China, teaching 5 to 7 year olds through
                            inquiry-based International Baccalaureate programme. Then I continued my adventure onto
                            Spain where I’ve been teaching Cambridge English to a range of different ages and levels,
                            from young children to adults, from beginners to advanced! These last 3 years have made me
                            realise that I love teaching teenagers and adults the most because we never run out of
                            interesting topics to talk about!
                        </p>
                        <p>
                            I’m CELTA-qualified, enthusiastic and nothing makes me happier than helping others achieve
                            their language learning goals. What’s more, I’m a second language learner myself so can
                            empathise with how challenging it can be!
                        </p>
                        <p>
                            Besides studying Spanish in my free time, I also enjoy crocheting, reading books and eating
                            good food!
                        </p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12 order-lg-2">
                        <div className="img-block">
                            <ResponsiveImage
                                src={wiktorImage}
                                alt="Wiktor"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-1">
                        <h2 className="pb-3">Wiktor</h2>
                        <p>
                            Angielski przyszedł do mnie sam, dość naturalnie: zaczęło się od oglądania kreskówek w wieku
                            3 lat, zajęć w przedszkolu, a następnie w szkole podstawowej i poza szkołą. Potem wyjazdy do
                            Anglii oraz Kanady, studia w Trójmieście.
                        </p>

                        <p>
                            W nauczaniu uwielbiam kontakt z ludźmi i obserwację jak progresują, wspólne osiąganie celów.
                            Największą przyjemność czerpię z nauki osób dorosłych, szczególnie zawodowo związanych z IT
                            i biznesem ze względu na ich potrzeby i międzynarodowy charakter pracy.
                        </p>

                        <p>
                            Jestem spokojnym, cierpliwym i wyluzowanym nauczycielem nastawionym na konwersacje i naukę
                            języka użytkowego, codziennego, praktycznego. Lubię skupiać się na słownictwie, precyzyjnym
                            wyrażaniu siebie, a następnie na gramatyce.
                        </p>

                        <p>Zajawki? Enologia i koszykówka w wolnym czasie + wyjazdy na wystawy z naszym psem :)</p>
                    </div>
                </div>
            </Section>
            <Opinions />
        </>
    );
}
