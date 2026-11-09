import { MotionController } from "@/animations/MotionController";
import { Icon } from "@/components/Icon";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/sections/Hero";
import { JourneySections } from "@/sections/JourneySections";

export default function HomePage() {
  return <>
    <SiteHeader />
    <main id="main" tabIndex={-1}><Hero /><JourneySections /></main>
    <footer className="site-footer container" id="sources">
      <div className="footer-top">
        <div><a className="footer-brand" href="#home" aria-label="ОРБИТА — к началу">ОРБИТА</a><p className="footer-note">Веб студия. Дизайн в движении.<br /><a href="https://t.me/webdiz3d" target="_blank" rel="noopener noreferrer">@webdiz3d</a></p></div>
        <a className="back-top" href="#home">К началу<Icon name="up" /></a>
      </div>
      <div className="footer-bottom">
        <p>Авторские 3D-эксперименты.<br />Визуализации художественные.</p>
        <p>Материалы атласа: <a href="https://science.nasa.gov/solar-system/" target="_blank" rel="noopener noreferrer">NASA Science</a><br />Текстуры: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">Solar System Scope</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a><br />Текстуры уменьшены и конвертированы в WebP.</p>
        <p>Форма. Движение. Пространство.<br />Масштабы планет условные.</p>
      </div>
    </footer>
    <MotionController />
  </>;
}
