import Image from 'next/image';
import lifelongLearningImage from '../../public/images/lifelong-learning.jpg';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ResponsiveImage from './ResponsiveImage';

export default function Idea() {
    return (
        <>
            <style jsx>{`
                .floating-image-idea {
                    float: right;
                    margin: 0 0 1.5rem 2rem;
                    max-width: 350px;
                    width: 45%;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                }

                @media (max-width: 767px) {
                    .floating-image-idea {
                        float: none;
                        margin: 1.5rem 0;
                        max-width: 100%;
                        width: 100%;
                    }
                }
            `}</style>
            <Section background="gray">
                <div className="row">
                    <div className="col-12">
                        <div style={{ position: 'relative' }}>
                            <SectionHeading heading="Dlaczego warto się uczyć?" subheading="Nasza filozofia" />

                            <div className="floating-image-idea">
                                <ResponsiveImage
                                    src={lifelongLearningImage}
                                    alt="Małgorzata Rudowska przy biurku"
                                    placeholder="blur"
                                    sizes="(min-width: 1200px) 350px, (min-width: 992px) 300px, (min-width: 768px) 250px, calc(100vw-30px)"
                                    quality="75"
                                />
                            </div>

                            <p>
                                Wierzymy, że nauka języka to przygoda na całe życie. W dzisiejszym świecie angielski
                                otwiera drzwi - do nowej pracy, ciekawych podróży czy fascynujących rozmów z ludźmi z
                                całego świata.
                            </p>

                            <p>
                                Rozmawiamy o tym, co naprawdę ważne - o marzeniach, planach, problemach, które wszyscy
                                znamy. Chcemy, żebyś potrafił swobodnie wyrazić siebie po angielsku i zrozumieć innych,
                                niezależnie skąd pochodzą.
                            </p>

                            <p>
                                Każda rozmowa to mała przygoda - nigdy nie wiesz, czego się dowiesz o sobie, o innych
                                czy o świecie. To właśnie uwielbiamy w nauczaniu języków.
                            </p>

                            <p className="mb-0">W naszej szkole językowej:</p>
                            <ul>
                                <li>chcemy Was poznać</li>
                                <li>chcemy Was uczyć i uczyć się od Was</li>
                                <li>chcemy być rozmowni</li>
                            </ul>

                            <p
                                style={{
                                    marginTop: '1.5rem',
                                    color: '#0f8d8c',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    background: 'rgba(15, 141, 140, 0.08)',
                                    padding: '16px 12px',
                                    borderRadius: '6px',
                                    borderLeft: '3px solid #0f8d8c',
                                }}
                            >
                                <strong>
                                    Dołącz do naszej społeczności i odkryj radość z nauki języka, która łączy ludzi z
                                    całego świata.
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
