import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./gallery.module.scss";
import acc from "../../assets/images/acc.jpeg";
import groupama from "../../assets/images/groupama.jpeg";
import maincare from "../../assets/images/maincare.jpeg";
import mdm from "../../assets/images/mdm-1.png";
import decath from "../../assets/images/Decath-tech.png";
import GIE from "../../assets/images/GIE-iris.png";
import iadvize from "../../assets/images/iadvize.png";

const handleDragStart = (e) => e.preventDefault();
const items = [acc, groupama, maincare, mdm, decath, GIE, iadvize].map(
  (src) => (
    <img
      src={src}
      onDragStart={handleDragStart}
      role="presentation"
      alt="logo"
    />
  )
);
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
function Gallery() {
  return (
    <section className={styles.carousel}>
      <h2 className="my-30 d-flex justify-content-center align-items-center">
        Ces Entreprises nous ont fait confiance
      </h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        animationDuration={2000}
        infinite
      />
    </section>
  );
}

export default Gallery;
