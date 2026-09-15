import lifelongLearningImage from '../../public/images/lifelong-learning.jpg';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ResponsiveImage from './ResponsiveImage';
import styles from './Idea.module.scss';

export default function Idea() {
  return (
    <Section background="gray">
      <div className="row">
        <div className="col-12">
          <div className={styles.root}>
            <SectionHeading
              heading="Dlaczego warto się uczyć?"
              subheading="Nasza filozofia"
            />

            <div className={styles.floatingImage}>
              <ResponsiveImage
                src={lifelongLearningImage}
                alt="Małgorzata Rudowska przy biurku"
                placeholder="blur"
                sizes="(min-width: 1200px) 350px, (min-width: 992px) 300px, (min-width: 768px) 250px, calc(100vw-30px)"
                quality="75"
              />
            </div>

            <p>
              Wierzymy, że nauka języka to przygoda na całe życie. W dzisiejszym
              świecie angielski otwiera drzwi - do nowej pracy, ciekawych
              podróży czy fascynujących rozmów z ludźmi z całego świata.
            </p>

            <p>
              Rozmawiamy o tym, co naprawdę ważne - o marzeniach, planach,
              problemach, które wszyscy znamy. Chcemy, żebyś potrafił swobodnie
              wyrazić siebie po angielsku i zrozumieć innych, niezależnie skąd
              pochodzą.
            </p>

            <p>
              Każda rozmowa to mała przygoda - nigdy nie wiesz, czego się
              dowiesz o sobie, o innych czy o świecie. To właśnie uwielbiamy w
              nauczaniu języków.
            </p>

            <p className="mb-0">W naszej szkole językowej:</p>
            <ul>
              <li>chcemy Was poznać</li>
              <li>chcemy Was uczyć i uczyć się od Was</li>
              <li>chcemy być rozmowni</li>
            </ul>

            <p className={styles.closing}>
              <strong>
                Dołącz do naszej społeczności i odkryj radość z nauki języka,
                która łączy ludzi z całego świata.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
