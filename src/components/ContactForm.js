import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import styles from './ContactForm.module.scss';

const sendForm = async (data) =>
  fetch('/api/send-contact-form-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export default function ContactForm() {
  const [isSent, setSent] = useState(false);
  const [isSentError, setSentError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const trackClick = useClickTracking();

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha('sendForm');
    if (token) {
      setLoading(true);
      setSent(false);
      setSentError(false);

      try {
        const res = await sendForm(data);
        if (res.ok) {
          setSent(true);
          trackClick(events.CONTACT_SEND_FORM);
          reset();
        } else {
          setSentError(true);
        }
      } catch (_error) {
        setSentError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="contact__form form-row"
      onSubmit={handleSubmit(onSubmit)}
      id="contactForm"
    >
      {isSent && (
        <div className="col-lg-12 col-12">
          <div
            className="alert alert-success contact__msg form-group"
            role="alert"
          >
            Dziękujemy za kontakt! Twoja wiadomość została pomyślnie wysłana!
          </div>
        </div>
      )}
      {isSentError && (
        <div className="col-lg-12 col-12">
          <div
            className="alert alert-danger contact__msg form-group"
            role="alert"
          >
            Coś poszło nie tak - nie można wysłać wiadomości. Skontaktuj się
            telefonicznie.
          </div>
        </div>
      )}

      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Imię i nazwisko"
                {...register('name', { required: true })}
              />
              {errors.name?.type === 'required' && (
                <div className={styles.error}>Imię i nazwisko są wymagane</div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Numer telefonu"
                {...register('phone', { required: true })}
              />
              {errors.phone?.type === 'required' && (
                <div className={styles.error}>Numer telefonu jest wymagany</div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
                {...register('email', { required: true })}
              />
              {errors.email?.type === 'required' && (
                <div className={styles.error}>Email jest wymagany</div>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                name="subject"
                id="subject"
                className="form-control"
                placeholder="Temat"
                {...register('subject', { required: true })}
              />
              {errors.subject?.type === 'required' && (
                <div className={styles.error}>Temat jest wymagany</div>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                cols="30"
                rows="6"
                className="form-control"
                placeholder="Wiadomość"
                {...register('message', { required: true })}
              />
              {errors.message?.type === 'required' && (
                <div className={styles.error}>
                  Treść wiadomości jest wymagana
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="mt-4 text-end">
          <button className="btn btn-main" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Wysyłanie...
              </>
            ) : (
              <>
                Wyślij wiadomość
                <FontAwesomeIcon icon={faAngleRight} className="ms-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
