import { Icon } from "@/components/Icon";
import { SpaceScene } from "@/scene/SpaceScene";
import { PlanetExplorer } from "./PlanetExplorer";
import { ScrollExperience } from "./ScrollExperience";
import styles from "./JourneySections.module.css";

export function JourneySections() {
  return <>
    <section className={styles.studio + " container"} id="studio" aria-labelledby="studio-title">
      <div className={styles.studioHeading}>
        <h2 id="studio-title" data-reveal>За пределами<br />обычного<span>.</span></h2>
        <p className={styles.discipline}>ДИЗАЙН<br />3D<br />РАЗРАБОТКА</p>
      </div>
      <div className={styles.studioBottom}>
        <svg className={styles.studioMark} viewBox="0 0 160 160" fill="none" aria-hidden="true">
          <ellipse cx="80" cy="80" rx="70" ry="29" stroke="currentColor" strokeWidth="1.5" transform="rotate(-40 80 80)" />
          <ellipse cx="80" cy="80" rx="70" ry="29" stroke="currentColor" strokeWidth="1.5" transform="rotate(40 80 80)" />
          <circle cx="80" cy="80" r="23" fill="currentColor" />
        </svg>
        <div>
          <p className={styles.lead}>Веб студия, где идея получает форму, характер и движение.</p>
          <p className={styles.body}>Выразительная типографика, объёмная графика и живые взаимодействия складываются в одну историю. Здесь её можно не только увидеть, но и исследовать.</p>
          <a className="text-link" href="#experience">Почувствовать в движении<Icon name="down" /></a>
        </div>
      </div>
    </section>

    <ScrollExperience />

    <section className={styles.experiments + " container"} id="experiments" aria-labelledby="experiments-title">
      <div className={styles.experimentHeading}>
        <h2 id="experiments-title" data-reveal>Чуть больше<br /><span>воображения.</span></h2>
        <p>Визуальные эксперименты студии.<br />У каждой формы — свой ритм.<br />У каждого движения — свой характер.</p>
      </div>
      <article className={styles.study}>
        <div className={styles.studyVisual}><SpaceScene variant="ribbon" label="Эксперимент / непрерывная петля" /></div>
        <div className={styles.studyCaption}><h3>Непрерывность</h3><p>Переплетённые линии. Красный лак. Живой свет.</p><span>ФОРМА / МАТЕРИАЛ / СВЕТ</span></div>
      </article>
      <article className={styles.study + " " + styles.offsetStudy}>
        <div className={styles.studyVisual}><SpaceScene variant="orbit" label="Эксперимент / равновесие" /></div>
        <div className={styles.studyCaption}><h3>Притяжение</h3><p>Орбиты, паузы и точка равновесия.</p><span>ПРОСТРАНСТВО / РИТМ</span></div>
      </article>
    </section>

    <section className={styles.interlude} aria-label="Дизайн, движение, впечатление">
      <div className={styles.marquee} aria-hidden="true"><span>ДИЗАЙН. ДВИЖЕНИЕ. ВПЕЧАТЛЕНИЕ.&nbsp;</span><span>ДИЗАЙН. ДВИЖЕНИЕ. ВПЕЧАТЛЕНИЕ.&nbsp;</span></div>
      <p>Листай дальше. Впереди — ещё три мира.</p><Icon name="down" />
    </section>

    <PlanetExplorer />

    <section className={styles.process + " container"} id="process" aria-labelledby="process-title">
      <div className={styles.processIntro}>
        <h2 id="process-title" data-reveal>От импульса —<br />к целой истории.</h2>
        <p>Каждая деталь работает на общую идею. От первого разговора до последнего движения на странице.</p>
      </div>
      <ol className={styles.processList}>
        {[
          ["Понять", "Начинаем с задачи: для кого сайт, что он должен рассказать и какое действие сделать понятным."],
          ["Придумать", "Ищем характер. Собираем композицию, визуальный язык и сценарий взаимодействия."],
          ["Оживить", "Соединяем дизайн, 3D и разработку. Настраиваем движение, которое поддерживает историю."],
          ["Отточить", "Проверяем на разных экранах, упрощаем лишнее и готовим сайт к публикации."],
        ].map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}
      </ol>
    </section>

    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.contactTop}><span>Давай начнём с разговора</span><Icon name="telegram" /></div>
        <h2 id="contact-title" data-reveal>Есть идея?<br />Придадим ей<br /><em>форму.</em></h2>
        <a className={styles.contactLink} href="https://t.me/webdiz3d" target="_blank" rel="noopener noreferrer"><span>@webdiz3d</span><span className={styles.contactArrow}><Icon name="arrow" /></span></a>
        <p className={styles.contactNote}>Написать в Telegram</p>
      </div>
    </section>
  </>;
}
