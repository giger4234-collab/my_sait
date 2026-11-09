import { SpaceScene } from "@/scene/SpaceScene";
import { Icon } from "@/components/Icon";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.stage}><SpaceScene variant="field" /></div>
      <div className={styles.content + " container"}>
        <h1 id="hero-title">Идеи обретают<br /><span>новую форму.</span></h1>
        <div className={styles.bottom}>
          <p>Веб-дизайн, 3D и движение.<br />Цифровой опыт, который хочется исследовать.</p>
          <a href="#studio" className={styles.scroll}>Листай. Это только начало.<span><Icon name="down" /></span></a>
        </div>
      </div>
      <div className={styles.sideLabel} aria-hidden="true">DESIGN IN MOTION</div>
    </section>
  );
}
