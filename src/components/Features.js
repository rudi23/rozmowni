import styles from './Features.module.scss';

export default function Features() {
  return (
    <section className={`feature-2 ${styles.featuresSection}`}>
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-3 col-md-6">
            <div className="feature-item feature-style-2">
              <div className="feature-icon">
                <i className="bi bi-chat-bubble-single" />
              </div>
              <div className="feature-text">
                <h4>Konwersacje</h4>
                <p>Rozwój osobisty, psychologia, relacje i wiedza o świecie</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-item feature-style-2">
              <div className="feature-icon">
                <i className="bi bi-article" />
              </div>
              <div className="feature-text">
                <h4>Ciekawe zajęcia</h4>
                <p>
                  Dyskusje o kontrowersyjnych tematach, które rozwijają
                  krytyczne myślenie
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-item feature-style-2">
              <div className="feature-icon">
                <i className="bi bi-headset" />
              </div>
              <div className="feature-text">
                <h4>Nauczanie on-line</h4>
                <p>
                  Zajęcia zdalne z dowolnego miejsca przez Zoom lub Google Meet
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-item feature-style-2">
              <div className="feature-icon">
                <i className="bi bi-rocket2" />
              </div>
              <div className="feature-text">
                <h4>Szybkie efekty</h4>
                <p>Skuteczne metody, które szybko przełożysz na praktykę</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
