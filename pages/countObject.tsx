import axios from "axios";
import { useState } from "react";
import { Button, Image, Table, Spinner } from "react-bootstrap";
import Layout from "../components/layout";

const CountObject = () => {
  const [preview, setPreview] = useState("");
  const [picture, setPicture] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  const [imageInfo, setImageInfo] = useState({ keys: [], values: [] });
  const [count, setCount] = useState({ person: 0, car: 0 });
  const [loading, setLoading] = useState(false);

  console.log(process.env.NEXT_PUBLIC_COUNTOBJECT);

  const handleSubmit = async (e) => {
    setPreviewResult("");
    e.preventDefault();
    if (preview.length === 0) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("file", picture);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const url = `${process.env.NEXT_PUBLIC_COUNTOBJECT}/upload`;
    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      console.log("http://" + response.data.draw_url);

      setPreviewResult("http://" + response.data.draw_url);
      //setImageInfo(response.data.image_info);

      const keys = Object.keys(response.data.image_info);
      const values = Object.values(response.data.image_info);

      console.log(keys);
      console.log(values);

      setImageInfo({ keys: keys, values: values });

      setCount({
        person: response.data.Total_person,
        car: response.data.Total_car,
      });
      console.log(response.data.image_info);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" onSubmit={handleSubmit}>
              <h2>Image</h2>
              <div className="foto">
                {preview.length > 0 && (
                  <div>
                    <Image
                      src={preview}
                      alt="Count Photo"
                      className="imagen"
                    ></Image>
                  </div>
                )}
              </div>
              <div className="input">
                <input
                  type="file"
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                    setPicture(e.target.files[0]);
                    setPreviewResult("");
                  }}
                />
              </div>

              <Button className="boton" type="submit">
                {loading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    aria-hidden="true"
                    size="sm"
                  />
                ) : (
                  "Count Objects"
                )}
              </Button>
            </form>
          </div>
          <div className="item">
            {/* {preview.length > 0 && (
              <Image src={preview} alt="Count Photo"></Image>
            )} */}
            <div className="centrar">
              <h2>Result</h2>
              <div className="foto">
                {previewResult.length > 0 && (
                  <div>
                    <Image
                      src={previewResult}
                      alt="Result Photo"
                      className="imagen"
                    ></Image>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {previewResult.length > 0 && (
          <div className="resultado">
            <h2>Resultado</h2>
            <div>
              {count.person > 0 && <h3>Total person: {count.person}</h3>}
              {count.car > 0 && <h3>Total car: {count.car}</h3>}
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Objeto detectado</th>
                  <th>Porcentaje coincidencia</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr> */}

                {imageInfo.keys.map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{imageInfo.keys[index]}</td>
                    <td>{imageInfo.values[index][1] * 100}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default CountObject;
