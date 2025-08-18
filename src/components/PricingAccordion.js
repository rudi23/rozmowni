import { useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './PricingAccordion.module.scss';

export default function Accordion({ id = 'accordion', cards }) {
    const [collapsedTab, setCollapsedTab] = useState();

    const onClick = (id) => {
        if (collapsedTab === id) {
            setCollapsedTab();
        } else {
            setCollapsedTab(id);
        }
    };

    function renderCard({ id, parentId, items, title, price, priceInfo }) {
        return (
            <div className={cx('card', styles.card)} key={id}>
                <div className={cx('card-header', styles.cardHeader)} id={`heading-${id}`}>
                    <button
                        className="w-100 text-start"
                        type="button"
                        onClick={() => onClick(id)}
                        aria-expanded={collapsedTab === id}
                        aria-controls={`collapse-${id}`}
                    >
                        <h4>
                            {title}
                            <span className={styles.pricing}>
                                <span className={styles.price}>{price}</span>
                                {priceInfo && (
                                    <>
                                        {' '}
                                        <span className={styles.priceInfo}>{priceInfo}</span>
                                    </>
                                )}
                            </span>
                            <span className={cx('fa-plus2', styles.plusIcon)}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                            <span className={cx('fa-plus2', styles.minusIcon)}>
                                <FontAwesomeIcon icon={faChevronUp} />
                            </span>
                        </h4>
                    </button>
                </div>

                <div
                    id={`collapse-${id}`}
                    className={collapsedTab === id ? 'collapse show' : 'collapse'}
                    aria-labelledby={`heading-${id}`}
                    data-parent={`#${parentId}`}
                >
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
        );
    }

    return (
        <div className={styles.root}>
            <div className="accordion" id={id}>
                {cards.map((card) => renderCard({ ...card, parentId: id }))}
            </div>
        </div>
    );
}
