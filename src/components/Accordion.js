import { useEffect, useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Accordion.module.scss';

export default function Accordion({
  id = 'accordion',
  cards,
  openFirstOnDesktop = false,
}) {
  const [collapsedTab, setCollapsedTab] = useState();

  // Opened after mount, not during render: on a phone the first panel would
  // push everything below it off the screen, and the server has no width.
  useEffect(() => {
    if (!openFirstOnDesktop || !cards.length) {
      return;
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      setCollapsedTab(cards[0].id);
    }
  }, [openFirstOnDesktop, cards]);

  const onClick = (id) => {
    if (collapsedTab === id) {
      setCollapsedTab();
    } else {
      setCollapsedTab(id);
    }
  };

  function renderCard({ id, items, title, content }) {
    return (
      <div className={cx('card', styles.card)} key={id}>
        <div
          className={cx('card-header', styles.cardHeader)}
          id={`heading-${id}`}
        >
          <button
            className="w-100 text-start"
            type="button"
            onClick={() => onClick(id)}
            aria-expanded={collapsedTab === id}
            aria-controls={`collapse-${id}`}
          >
            <h4>
              {title}
              <span
                className={cx(styles.chevronIcon, {
                  [styles.expanded]: collapsedTab === id,
                })}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </h4>
          </button>
        </div>

        {/* A grid row that animates from 0fr to 1fr, so the panel closes the
            same way it opens. Bootstrap's .collapse only ever hid it. */}
        <div
          id={`collapse-${id}`}
          className={cx(styles.panel, {
            [styles.panelOpen]: collapsedTab === id,
          })}
          aria-labelledby={`heading-${id}`}
        >
          <div className={styles.panelInner}>
            {content && <div className={styles.content}>{content}</div>}
            {items &&
              items.map((item) => (
                <div className={styles.item} key={item}>
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className="accordion" id={id}>
        {cards.map(renderCard)}
      </div>
    </div>
  );
}
