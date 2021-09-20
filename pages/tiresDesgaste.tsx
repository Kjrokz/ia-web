import axios from "axios";
import { useState } from "react";
import { Button, Image, Table, Spinner } from "react-bootstrap";
import Layout from "../components/layout";

const Tires = () => {
  const [preview, setPreview] = useState("");
  const [picture, setPicture] = useState<any>();
  const [picture2, setPicture2] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  const [previewResult2, setPreviewResult2] = useState("");
  const [imageInfo, setImageInfo] = useState({ keys: [], values: [] });
  const [tiresDetect, setTiresDetect] = useState("");
  const [loading, setLoading] = useState(false);

  //console.log(process.env.NEXT_PUBLIC_TIRES);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (preview.length === 0) {
      return;
    }
    setPreviewResult("");
    setLoading(true);
    let data: FormData;

    if (tiresDetect === "superior") {
      data = new FormData();
      data.append("file", picture);
    } else if (tiresDetect === "lateral") {
      data = new FormData();
      data.append("file", picture2);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let url: string;
    if (tiresDetect === "superior") {
      url = `${process.env.NEXT_PUBLIC_TIRES}/upload`;
    } else if (tiresDetect === "lateral") {
      url = `${process.env.NEXT_PUBLIC_TIRES}/upload2`;
    }

    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      console.log("http://" + response.data.draw_url);

      if (tiresDetect === "superior") {
        setPreviewResult("http://" + response.data.draw_url);
      } else if (tiresDetect === "lateral") {
        setPreviewResult2("http://" + response.data.draw_url);
      }

      //setImageInfo(response.data.image_info);
      console.log(response.data.image_info);
      const keys = Object.keys(response.data.image_info);
      const values = Object.values(response.data.image_info);

      console.log(keys);
      console.log(values);

      setImageInfo({ keys: keys, values: values });
      setTiresDetect("");
      console.log(previewResult);
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
              <h2>Desgaste Superior</h2>
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
              <Button
                className="boton"
                type="submit"
                onClick={() => setTiresDetect("superior")}
              >
                {loading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    aria-hidden="true"
                    size="sm"
                  />
                ) : (
                  "Detectar"
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
        {previewResult && (
          <div>
            <div className="resultado">
              <h2>Resultado</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Objeto detectado</th>
                    <th>Porcentaje coincidencia</th>
                  </tr>
                </thead>
                <tbody>
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
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Tires;
