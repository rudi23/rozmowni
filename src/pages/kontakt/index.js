import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';
import ResponsiveImage from '../../components/ResponsiveImage';
import SectionHeading from '../../components/SectionHeading';
import Section from '../../components/Section';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
// import './index.css';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { decryptEmail } from '../../utils';
import contactImage from '../../../public/images/contact.png';

export default function Contact() {
  const router = useRouter();
  const trackClick = useClickTracking();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LefiSQcAAAAAOcESFE5YPnjSfDZUgnA0LNhZ3Jp"
      language="pl"
      scriptProps={{
        defer: true,
      }}
    >
      <PageHeader title="Kontakt" />
      <Section>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <SectionHeading
              heading="Czekamy na Ciebie"
              subheading="Jak dołączyć?"
            />

            <div className="join-content">
              <div className="join-text-block">
                <i className="bi bi-user-ID" />
                <h4>Śledź nas w social media</h4>
                <p>
                  Zapraszamy na nasze profile na{' '}
                  <a
                    href="https://www.facebook.com/Rozmownipl-141305311401481"
                    target="_blank"
                    onClick={() => trackClick(events.CONTACT_CLICK_FB_TEXT)}
                    rel="noreferrer"
                    title="Facebook profile page"
                  >
                    Facebooku
                  </a>
                  ,{' '}
                  <a
                    href="https://www.instagram.com/rozmowni.pl/"
                    target="_blank"
                    onClick={() => trackClick(events.CONTACT_CLICK_IG_TEXT)}
                    rel="noreferrer"
                    title="Instagram profile page"
                  >
                    Instagramie
                  </a>{' '}
                  oraz{' '}
                  <a
                    href="https://www.tiktok.com/@rozmowni.pl"
                    target="_blank"
                    onClick={() => trackClick(events.CONTACT_CLICK_TIKTOK_TEXT)}
                    rel="noreferrer"
                    title="TikTok profile page"
                  >
                    TikToku
                  </a>
                  .
                </p>
                <p>Dołącz do społeczności szkoły językowej rozmowni.pl</p>
              </div>

              <div className="join-text-block">
                <i className="bi bi-phone" />
                <h4>Skontaktuj się z nami</h4>
                <p>
                  Chętnie z Tobą porozmawiamy, odpowiadając na wszystkie Twoje
                  pytania.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="join-img img-block">
              <ResponsiveImage
                src={contactImage}
                alt="Małgorzata Rudowska z książką w rękach"
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center contact-info mt-5">
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="contact-item">
                  <p>Napisz do nas</p>
                  <h4>
                    <a
                      href="#"
                      onClick={(e) => {
                        decryptEmail('a29udGFrdEByb3ptb3duaS5wbA==');
                        trackClick(events.CONTACT_CLICK_EMAIL);
                        e.preventDefault();
                      }}
                    >
                      kontakt@rozmowni.pl
                    </a>
                  </h4>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="contact-item">
                  <p>Zadzwoń do nas</p>
                  <h4>
                    <a
                      href="tel:+48506262227"
                      onClick={() => trackClick(events.CONTACT_CLICK_PHONE)}
                    >
                      +48 506 262 227
                    </a>
                  </h4>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="contact-item">
                  <p>Adres</p>
                  <h4>
                    Witkowicka 68G/1
                    <br />
                    31-242 Kraków
                    <br />
                    NIP: 678-30-52-400
                  </h4>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="contact-item">
                  <p>Social media</p>
                  <ul className="list-inline contact-socials">
                    <li className="list-inline-item">
                      <a
                        href="https://www.facebook.com/Rozmownipl-141305311401481"
                        onClick={() => trackClick(events.CONTACT_CLICK_FB)}
                        target="_blank"
                        rel="noreferrer"
                        title="Facebook profile page"
                      >
                        {' '}
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.instagram.com/rozmowni.pl/"
                        onClick={() => trackClick(events.CONTACT_CLICK_IG)}
                        target="_blank"
                        rel="noreferrer"
                        title="Instagram profile page"
                      >
                        {' '}
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.tiktok.com/@rozmowni.pl"
                        onClick={() => trackClick(events.CONTACT_CLICK_TIKTOK)}
                        target="_blank"
                        rel="noreferrer"
                        title="TikTok profile page"
                      >
                        {' '}
                        <FontAwesomeIcon icon={faTiktok} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/ma%C5%82gorzata-rudowska-08a29a219/"
                        onClick={() =>
                          trackClick(events.CONTACT_CLICK_LINKEDIN)
                        }
                        target="_blank"
                        rel="noreferrer"
                        title="Linkedin profile page"
                      >
                        {' '}
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <p className="contact-item-header">
              Skontaktuj się z nami przez formularz kontaktowy
            </p>
            <ContactForm testParams={router.query} />
          </div>
        </div>
      </Section>
    </GoogleReCaptchaProvider>
  );
}
