import Image from 'next/image';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import Opinions from '../../components/Opinions';
import aboutUsImage from '../../../public/images/about-us.jpg';
import denisImage from '../../../public/images/denis.jpg';
import angelikaImage from '../../../public/images/angelika.jpg';
import aniaImage from '../../../public/images/ania.jpg';

export default function AboutUs() {
    return (
        <>
            <PageHeader title="O nas" />
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="img-block">
                            <Image
                                src={aboutUsImage}
                                alt="Małgorzata Rudowska"
                                placeholder="blur"
                                layout="responsive"
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
                            <Image
                                src={denisImage}
                                alt="Denis"
                                placeholder="blur"
                                layout="responsive"
                                sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-1">
                        <h2 className="pb-3">Denis</h2>
                        <p>
                            🙋‍♂️ Poznajcie naszego nauczyciela Dennisa, który od ośmiu lat prowadzi zajęcia z języka
                            angielskiego. Jego kursanci to głównie osoby dorosłe, pracownicy firm, którzy używają języka
                            angielskiego na co dzień.
                        </p>

                        <p>
                            🤗 Zobaczcie jak Dennis opowiada o swoim podejściu do nauczania i napiszcie do nas
                            wiadomość, jeśli chcecie dołączyć do jego grupy.
                        </p>

                        <p>
                            👉 There are so many ways to tell the stories, but language – is one of the best.
                            <br />
                            I have always been fascinated with the ingenuity of the ways people can interact with each
                            other. Insignificant gestures, a wave of a hand or even a passing shadow of a smile; all of
                            these are masterful means of communicating with each other without saying a word.
                            <br />
                            But it’s a language that can pave a path from one stranger to another.
                        </p>

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
                        <p>See you soon.</p>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="img-block">
                            <Image
                                src={angelikaImage}
                                alt="Angelika"
                                placeholder="blur"
                                layout="responsive"
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
                            <Image
                                src={aniaImage}
                                alt="Ania"
                                placeholder="blur"
                                layout="responsive"
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
            <Opinions />
        </>
    );
}
