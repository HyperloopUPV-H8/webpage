import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getJobOpeningBySlug } from "../../contentful";
import style from "./style.module.scss";

export default function JobOpeningDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [jobOpening, setJobOpening] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobOpening = async () => {
      if (!slug) return;

      try {
        const data = await getJobOpeningBySlug(slug);
        setJobOpening(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching opening:", err);
        setError("Failed to load opening. Please try again later.");
      }
    };

    fetchJobOpening();
  }, [slug]);

  if (error || !jobOpening) {
    return (
      <div className={style["detail-page"]}>
        <div className={style["error-state"]}>
          <h1>Position Not Found</h1>
          <p>{error || "The requested position could not be found."}</p>
          <Link to="/join" className={style["back-button"]}>
            ← Back to Openings
          </Link>
        </div>
      </div>
    );
  }

  const { fields } = jobOpening;

  return (
    <div className={style["detail-page"]}>
      <div className={style["detail-container"]}>
        <nav className={style["breadcrumb"]}>
          <Link to="/join">Openings</Link>
          {fields.subgroup && (
            <>
              <span className={style["breadcrumb-separator"]}>›</span>
              <span>{fields.subgroup.fields.name}</span>
            </>
          )}
          <span className={style["breadcrumb-separator"]}>›</span>
          <span className={style["current-page"]}>{fields.title}</span>
        </nav>

        <header className={style["detail-header"]}>
          {fields.icon && (
            <img
              src={`https:${fields.icon.fields.file.url}`}
              alt={fields.icon.fields.title}
              className={style["detail-icon"]}
            />
          )}
          <div className={style["header-content"]}>
            <h1 className={style["detail-title"]}>{fields.title}</h1>
            {fields.subgroup && (
              <div className={style["subgroup-badge"]}>
                <span>{fields.subgroup.fields.name}</span>
              </div>
            )}
          </div>
        </header>
        <p className={style["short-description"]}>{fields.shortDescription}</p>

        <main className={style["detail-content"]}>
          <div className={style["full-description"]}>
            {fields.fullDescription &&
              documentToReactComponents(fields.fullDescription)}
          </div>

          <div className={style["action-buttons"]}>
            {fields.formLink && (
              <a
                href={fields.formLink}
                className={style["apply-button"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inscribirse
              </a>
            )}
            <Link to="/join" className={style["back-button-secondary"]}>
              Ver Otros Puestos
            </Link>
          </div>
        </main>
      </div>
      {fields.imagesCarousel && fields.imagesCarousel.length > 0 && (
        <section className={style["images-section"]}>
          <div className={style["images-grid"]}>
            {fields.imagesCarousel.map((image: any, index: number) => (
              <img
                key={index}
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title}
                className={style["gallery-image"]}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
