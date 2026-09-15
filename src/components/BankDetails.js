import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './BankDetails.module.scss';

const ACCOUNT_NUMBER = '71 1050 1445 1000 0092 1658 8112';

export default function BankDetails() {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }
    const timer = setTimeout(() => setCopied(false), 2500);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/\s/g, ''));
      setCopied(true);
    } catch {
      // Clipboard access can be refused; the number stays selectable by hand.
      setCopied(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Dane do przelewu</h2>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Odbiorca</dt>
          <dd>Rozmowni.pl</dd>
        </div>
        <div className={styles.row}>
          <dt>Adres</dt>
          <dd>ul. Witkowicka 68G/1, 31-242 Kraków</dd>
        </div>
        <div className={styles.row}>
          <dt>Numer rachunku</dt>
          <dd className={styles.account}>
            <span className={styles.accountNumber}>{ACCOUNT_NUMBER}</span>
            <button type="button" className={styles.copy} onClick={onCopy}>
              <FontAwesomeIcon
                icon={isCopied ? faCheck : faCopy}
                aria-hidden="true"
              />
              {isCopied ? 'Skopiowano' : 'Kopiuj'}
            </button>
          </dd>
        </div>
      </dl>

      <p className={styles.note}>
        W tytule wpłaty prosimy wpisać imię i nazwisko ucznia oraz nazwę wpłaty,
        np. „Jan Kowalski – kurs konwersacji”.
      </p>
    </div>
  );
}
