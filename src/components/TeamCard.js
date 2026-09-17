import { useState } from 'react';
import cx from 'classnames';
import ResponsiveImage from './ResponsiveImage';
import styles from './TeamCard.module.scss';

// Seven stacked photo-and-text sections made the page over nine screens long.
// Each teacher is a card now, with the rest of the bio behind a toggle.
export default function TeamCard({ name, image, tags, bio }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <li className={styles.card}>
      <div className={styles.portrait}>
        <ResponsiveImage
          src={image}
          alt={name}
          placeholder="blur"
          sizes="(min-width: 992px) 360px, (min-width: 768px) 50vw, 100vw"
          quality="75"
          style={{ height: '100%', maxWidth: '100%' }}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>

        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.bio}>
          {/* Every paragraph is rendered so the bio is indexable; the
              toggle only hides the rest. */}
          {bio.map((text, index) => (
            <p
              key={text}
              hidden={!isOpen && index > 0}
              className={cx({ [styles.clamp]: !isOpen && index === 0 })}
            >
              {text}
            </p>
          ))}
        </div>

        {bio.length > 1 && (
          <button
            type="button"
            className={styles.more}
            aria-expanded={isOpen}
            onClick={() => setOpen((wasOpen) => !wasOpen)}
          >
            {isOpen ? 'Zwiń' : 'Czytaj więcej'}
          </button>
        )}
      </div>
    </li>
  );
}
