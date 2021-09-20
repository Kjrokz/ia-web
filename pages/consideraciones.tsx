import Layout from "../components/layout";

const Consideraciones = () => {
  return (
    <div>
      <Layout>
        <div className="padding">
          <h1>Area Image:</h1>
          <div className="padding bold">
            <p>- Conseguir fotografias (Drone, satélite, etc)</p>
            <p>- Altura donde se realiza la captura</p>
            <p>- Estimación de área respecto altura</p>
            <p>- Identificar elementos</p>
          </div>
        </div>
        <div className="padding">
          <h1>Volume Truck:</h1>
          <div className="padding bold">
            <p>- Área delimitadora madera</p>
            <p>- Largo camión</p>
            <p>- Ancho camión</p>
            <p>- Distancia fotografía</p>
            <p>- Resolución fotografía</p>
            <p>- Cámara estática vs Cámara (persona)</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Consideraciones;
