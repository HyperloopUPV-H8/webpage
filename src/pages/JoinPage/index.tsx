import { useTranslation } from "react-i18next";
import style from "./style.module.scss";
import { getJobOpenings } from "../../contentful.ts";
import { useState, useEffect } from "react";
import JobOpening from "../../components/JobOpening";

export default function JoinPage() {
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState<string>("all");
  const [subgroups, setSubgroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        setLoading(true);
        const data = await getJobOpenings();

        // Extract unique subgroups
        const uniqueSubgroups = data.reduce((acc: any[], jobOpening: any) => {
          const subgroup = jobOpening.fields.subgroup;
          if (
            subgroup &&
            !acc.find((s) => s.fields.name === subgroup.fields.name)
          ) {
            acc.push(subgroup);
          }
          return acc;
        }, []);

        setJobOpenings(data);
        setSubgroups(uniqueSubgroups);
        setError(null);
      } catch (err) {
        console.error("Error fetching job openings:", err);
        setError("Failed to load job openings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  // Filter job openings by selected subgroup
  const filteredJobOpenings =
    selectedSubgroup === "all"
      ? jobOpenings
      : jobOpenings.filter(
          (job) => job.fields.subgroup?.fields?.name === selectedSubgroup
        );

  // Group filtered job openings by subgroup
  const groupedJobOpenings = filteredJobOpenings.reduce(
    (acc: any, jobOpening: any) => {
      const subgroupName =
        jobOpening.fields.subgroup?.fields?.name || "Uncategorized";
      if (!acc[subgroupName]) {
        acc[subgroupName] = {
          subgroup: jobOpening.fields.subgroup,
          jobs: [],
        };
      }
      acc[subgroupName].jobs.push(jobOpening);
      return acc;
    },
    {}
  );

  const { t } = useTranslation("join");

  return (
    <>
      <div className={`${style["partners__section"]} ${style["section-1"]}`}>
        <div id={style["partners__dossier"]}>
          <div className={style["partners__dossier__background"]}>
            <h1 className={style["partners__dossier__title"]}>
              {t("we-are-waiting-for-you")}
            </h1>
            <p style={{ color: "white", textAlign: "left" }}>{t("text-1")}</p>
            <p style={{ color: "white", textAlign: "left" }}>
              <strong>{t("text-2")}</strong>
            </p>

            {loading && (
              <div className={style["loading-state"]}>
                <p>Loading job openings...</p>
              </div>
            )}

            {error && (
              <div className={style["error-state"]}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && jobOpenings.length === 0 && (
              <div className={style["empty-state"]}>
                <p>
                  No job openings available at the moment. Please check back
                  later!
                </p>
              </div>
            )}


            <div className={style["apply-button-container"]}>
              <a
                href={'https://forms.gle/8uohgm8iK1X5TYot6'}
                className={style["job-opening__apply-button"]}
                target="_blank"
              >
                Inscribirse
              </a>
            </div>

            {!loading && !error && jobOpenings.length > 0 && (
              <>
                <div className={style["subgroup-filter"]}>
                  <div className={style["filter-buttons"]}>
                    <button
                      className={`${style["filter-button"]} ${
                        selectedSubgroup === "all" ? style["active"] : ""
                      }`}
                      onClick={() => setSelectedSubgroup("all")}
                    >
                      Todas las posiciones
                    </button>
                    {subgroups.map((subgroup, index) => (
                      <button
                        key={index}
                        className={`${style["filter-button"]} ${
                          selectedSubgroup === subgroup.fields.name
                            ? style["active"]
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSubgroup(subgroup.fields.name)
                        }
                      >
                        {subgroup.fields.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={style["job-openings-container"]}>
                  {Object.entries(groupedJobOpenings).map(
                    ([subgroupName, group]: [string, any]) => (
                      <div
                        key={subgroupName}
                        className={style["subgroup-section"]}
                      >
                        <div className={style["subgroup-header"]}>
                          <h2 className={style["subgroup-title"]}>
                            {group.subgroup?.fields?.name || subgroupName}
                          </h2>
                          {group.subgroup?.fields?.description && (
                            <p className={style["subgroup-description"]}>
                              {group.subgroup.fields.description}
                            </p>
                          )}
                        </div>

                        <div className={style["job-openings-list"]}>
                          {group.jobs.map((jobOpening: any, index: number) => (
                            <JobOpening key={index} jobOpening={jobOpening} />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
