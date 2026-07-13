import ImageSlider from "../ImageSlider/ImageSlider";
import { studioInfo } from "@/data/studioInfo";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import styles from "./NailsCard.module.scss";

const NailsCard = () => {
  const whatsappUrl = buildWhatsAppLink(
    studioInfo.phone,
    studioInfo.whatsappMessage,
  );

  return (
    <section className={styles.card} aria-labelledby="studio-title">
      <div className={styles["card__content"]}>
        <span className={styles["card__kicker"]}>{studioInfo.kicker}</span>

        <div className={styles["card__heading"]}>
          <h1 id="studio-title" className={styles["card__title"]}>
            {studioInfo.name}
          </h1>
          <p className={styles["card__phrase"]}>{studioInfo.phrase}</p>
        </div>

        <ul className={styles["card__services"]} aria-label="Servicios">
          {studioInfo.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <dl className={styles["card__details"]}>
          <div>
            <dt>Horarios</dt>
            <dd>{studioInfo.hours}</dd>
          </div>
          <div className={styles["card__details-map"]}>
            <dt>Dirección</dt>
            <dd>{studioInfo.address}</dd>
            <iframe
              src={studioInfo.mapsEmbed}
              className={styles["card__map"]}
              title="Ubicación de Nails EsenciaGM"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </dl>

        <div className={styles["card__actions"]}>
          <a
            className={`${styles["card__button"]} ${styles["card__button--primary"]}`}
            href={whatsappUrl}
          >
            Reservar por WhatsApp
          </a>
          <a
            className={styles["card__button"]}
            href={studioInfo.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Google Maps
          </a>
          <a
            className={styles["card__button"]}
            href={studioInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>

        <footer className={styles["card__footer"]}>
          Por qué toda ocasión merece unas uñas hermosas.
        </footer>
      </div>

      <div className={styles["card__media"]}>
        <ImageSlider />
      </div>
    </section>
  );
};

export default NailsCard;
