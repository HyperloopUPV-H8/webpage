import { Link } from "react-router-dom";
import style from "./style.module.scss";

interface JobOpeningProps {
  jobOpening: any;
}

export default function JobOpening({ jobOpening }: JobOpeningProps) {
  const { fields } = jobOpening;

  const slug =
    fields.slug ||
    fields.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <div className={style["job-opening"]}>
      <Link to={`/join/${slug}`} className={style["job-opening__link"]}>
        <div className={style["job-opening__header-container"]}>
          <div className={style["job-opening__header"]}>
            {fields.icon && (
              <img
                src={`https:${fields.icon.fields.file.url}`}
                alt={fields.icon.fields.title}
                className={style["job-opening__icon"]}
              />
            )}
            <h3 className={style["job-opening__title"]}>{fields.title}</h3>
          </div>
          <p className={style["job-opening__short-description"]}>
            {fields.shortDescription}
          </p>
        </div>
      </Link>

      <div className={style["job-opening__actions"]}>
        <Link
          to={`/join/${slug}`}
          className={style["job-opening__view-button"]}
        >
          View Details
        </Link>
        {fields.formLink && (
          <a
            href={fields.formLink}
            className={style["job-opening__apply-button"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
}
