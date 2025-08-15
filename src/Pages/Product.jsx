import PageNav from "../Components/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.webp"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Worldwise is a morden travel companion that helps you track of every
            city you visit around the globe. It stores your journey, notes and
            memorable details while placing them on an interactive map.Whether
            you're frequent traveller, a digital nomad, or just love exploring,
            WorldWise makes your adventures easy to revisit and share. With a
            simple and intuitive interface, you can record the places you've
            been highlight experiences and plan the next destination all in one
            place.
          </p>
          <p>
            WorldWise es un compañero de viaje moderno que te ayuda a llevar un
            registro de cada ciudad que visitas en todo el mundo. Guarda tus
            viajes, notas y recuerdos más especiales, colocándolos en un mapa
            mundial interactivo. Ya seas un viajero frecuente, un nómada digital
            o simplemente alguien que ama explorar, WorldWise hace que tus
            aventuras sean fáciles de revivir y compartir. Con una interfaz
            sencilla e intuitiva, puedes registrar los lugares que has visitado,
            resaltar experiencias y planificar tu próximo destino, todo en un
            solo lugar.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Product;
