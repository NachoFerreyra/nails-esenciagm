import Gallery from "../Gallery/Gallery";
import studioLogo from "@/assets/logo/logo.jpg";
import { studioInfo } from "@/data/studioInfo";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import styles from "./NailsCard.module.scss";

const WhatsAppIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28" />
  </svg>
);

const MapsIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const NailsCard = () => {
  const whatsappUrl = buildWhatsAppLink(
    studioInfo.phone,
    studioInfo.whatsappMessage,
  );

  return (
    <section className={styles.card} aria-labelledby="studio-title">
      <div className={styles["card__content"]}>
        <div className={styles["card__header"]}>
          <div className={styles["card__header-info"]}>
            <span className={styles["card__kicker"]}>{studioInfo.kicker}</span>
            <div className={styles["card__heading"]}>
              <h1 id="studio-title" className={styles["card__title"]}>
                {studioInfo.name}
              </h1>
              <p className={styles["card__phrase"]}>{studioInfo.phrase}</p>
            </div>
          </div>
          <img
            src={studioLogo}
            alt="Logo Nails EsenciaGM"
            className={styles["card__logo"]}
          />
        </div>

        {/* Sección de detalles y acciones integradas */}
        <div className={styles["card__details"]}>
          <div className={styles["card__hours"]}>
            <span className={styles["card__detail-label"]}>Horarios</span>
            <p className={styles["card__detail-value"]}>{studioInfo.hours}</p>
          </div>

          <div className={styles["card__actions"]}>
            <a
              className={`${styles["card__button"]} ${styles["card__button--primary"]}`}
              href={whatsappUrl}
            >
              <WhatsAppIcon />
              <span>Reservar por WhatsApp</span>
            </a>
            <a
              className={styles["card__button"]}
              href={studioInfo.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapsIcon />
              <span>Google Maps</span>
            </a>
            <a
              className={styles["card__button"]}
              href={studioInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>

          <div className={styles["card__details-map"]}>
            <span className={styles["card__detail-label"]}>Dirección</span>
            <p className={styles["card__detail-value"]}>{studioInfo.address}</p>
            <iframe
              src={studioInfo.mapsEmbed}
              className={styles["card__map"]}
              title="Ubicación de Nails EsenciaGM"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        {/* Sección de trabajos: filtros y galería de imágenes */}
        <Gallery />

        <footer className={styles["card__footer"]}>
          Por qué toda ocasión merece unas uñas hermosas.
        </footer>
      </div>
    </section>
  );
};

export default NailsCard;
