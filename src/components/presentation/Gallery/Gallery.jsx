import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { studioCategories } from "@/data/studioInfo";
import styles from "./Gallery.module.scss";

// Detección y carga automática de imágenes en src/assets/gallery/
const galleryModules = import.meta.glob(
  "/src/assets/gallery/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, import: "default" }
);

// Mapeo estático de las imágenes detectadas a objetos con categoría y ruta
const ALL_GALLERY_IMAGES = Object.entries(galleryModules).map(([filePath, src]) => {
  // Extrae la categoría desde la carpeta contenedora: /src/assets/gallery/<categoria>/<archivo>
  const match = filePath.match(/\/gallery\/([^/]+)\//);
  let category = match ? match[1].toLowerCase().replace(/\s+/g, "-") : "otros";

  // Normalizaciones para robustez ante variantes de nombres
  if (category === "semi") category = "semipermanente";
  if (category === "softgel") category = "soft-gel";
  if (category === "kapping") category = "kapping-gel";

  const filename = filePath.split("/").pop() || "";

  return {
    id: filePath,
    src,
    category,
    filename,
  };
});

// Mapa rápido id -> label para atributos alt accesibles
const categoryLabels = Object.fromEntries(
  studioCategories.map((c) => [c.id, c.label])
);

const Gallery = () => {
  // Inicialmente ninguna categoría seleccionada (no se muestra nada por defecto)
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Manejo de clic en categoría: si ya está activa, se deselecciona (toggle)
  const handleCategoryClick = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredImages = useMemo(() => {
    if (!activeCategory) {
      return [];
    }
    if (activeCategory === "all") {
      return ALL_GALLERY_IMAGES;
    }
    return ALL_GALLERY_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  // Manejo de tecla Escape y bloqueo completo de scroll de la página al abrir vista previa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      const prevBodyOverflow = document.body.style.overflow;
      const prevBodyTouchAction = document.body.style.touchAction;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = prevBodyOverflow;
        document.body.style.touchAction = prevBodyTouchAction;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [selectedImage]);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className={styles.gallery} aria-label="Galería de trabajos">
      {/* Barra de filtros / pills */}
      <div
        className={styles["gallery__filters"]}
        role="toolbar"
        aria-label="Filtrar trabajos por servicio"
      >
        {studioCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              className={`${styles["gallery__filter-btn"]} ${
                isActive ? styles["gallery__filter-btn--active"] : ""
              }`}
              aria-pressed={isActive}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Grilla de imágenes si hay categoría activa */}
      {activeCategory && (
        <div
          key={activeCategory}
          className={styles["gallery__grid"]}
          role="region"
          aria-live="polite"
        >
          {filteredImages.map((image, index) => {
            const serviceLabel = categoryLabels[image.category] || "Manicura";
            return (
              <figure
                key={image.id}
                className={styles["gallery__item"]}
                onClick={() => {
                  setSelectedImage(image);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Ver imagen completa de ${serviceLabel} - Trabajo ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(image);
                  }
                }}
              >
                <img
                  src={image.src}
                  alt={`Diseño de ${serviceLabel} - Trabajo ${index + 1}`}
                  loading="lazy"
                  className={styles["gallery__image"]}
                />
              </figure>
            );
          })}
        </div>
      )}

      {/* Modal de vista previa / lightbox montado directamente en document.body */}
      {selectedImage &&
        createPortal(
          <div
            className={styles["gallery__modal"]}
            onClick={handleCloseModal}
            onTouchMove={(e) => e.preventDefault()}
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa ampliada de imagen"
          >
            <button
              type="button"
              className={styles["gallery__modal-close"]}
              onClick={handleCloseModal}
              aria-label="Cerrar vista previa"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div
              className={styles["gallery__modal-container"]}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt="Vista previa completa de diseño de uñas"
                className={styles["gallery__modal-image"]}
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Gallery;
