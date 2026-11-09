"use client";
import { useState } from "react";
import { planets } from "@/content/site";
import { assetPath } from "@/content/assets";
import { Icon } from "@/components/Icon";
import styles from "./PlanetExplorer.module.css";
export function PlanetExplorer() {
  const [selected, setSelected] = useState(0);
  const planet = planets[selected];
  return (
    <section
      className={styles.section + " container"}
      id="solar-system"
      aria-labelledby="planets-title"
    >
      <div className={styles.heading}>
        <div>

          <h2 id="planets-title">
            Три мира.
            <br />
            <span>Три истории.</span>
          </h2>
        </div>
        <p>
          Один космический адрес —<br />
          совершенно разные характеры.
          <br />
          Выбери планету и сравни.
        </p>
      </div>
      <div className={styles.choices} role="group" aria-label="Выбор планеты">
        {planets.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={index === selected}
            aria-controls="planet-description"
            onClick={() => setSelected(index)}
          >
            <span className={styles.choiceNumber}>0{index + 1}</span>
            {item.name}
            <span className={styles.arrow} aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </button>
        ))}
      </div>
      <div className={styles.panel} data-planet={planet.id}>
        <div className={styles.visual} aria-hidden="true">
          <span className={styles.planetName}>{planet.english}</span>
          <div
            className={
              styles.globe + (planet.id === "saturn" ? " " + styles.saturn : "")
            }
          >
            <img
              src={assetPath(planet.texture)}
              width={1536}
              height={768}
              loading="lazy"
              decoding="async"
              alt=""
              className={styles.texture}
            />
          </div>
          {planet.id === "saturn" && <div className={styles.rings} />}
          <span className={styles.visualLabel}>
            ИЛЛЮСТРАЦИЯ / УСЛОВНЫЙ МАСШТАБ
          </span>
        </div>
        <div
          className={styles.detail}
          id="planet-description"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className={styles.type}>
            {planet.order} ОТ СОЛНЦА <span>—</span> {planet.type}
          </p>
          <h3>
            {planet.headline.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p className={styles.description}>{planet.description}</p>
          <dl className={styles.facts}>
            <div>
              <dt>{planet.unit}</dt>
              <dd>{planet.year}</dd>
            </div>
            <div>
              <dt>среднее расстояние от Солнца</dt>
              <dd>{planet.distance}</dd>
            </div>
          </dl>
          <p className={styles.note}>
            1 а.е. — среднее расстояние от Земли до Солнца. Значения округлены.
          </p>
          <a
            className="text-link"
            href={planet.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Факты о планете на NASA Science <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
