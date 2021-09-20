import { useState } from "react";
import Layout from "../components/layout";
import { Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { getBase64 } from "../assets/utils/utils";

const Areas: React.FC = (): JSX.Element => {
  const [preview, setPreview] = useState("");
  const [preview2, setPreview2] = useState("");
  const [picture, setPicture] = useState<any>();
  const [picture2, setPicture2] = useState<any>();
  const [previewResult, setPreviewResult] = useState("");
  const [previewResult2, setPreviewResult2] = useState("");
  const [previewResult3, setPreviewResult3] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(picture);
    setPreviewResult("");
    setPreviewResult2("");
    setPreviewResult3("");

    if (preview.length == 0 && preview2.length == 0) {
      return;
    }

    setLoading(true);

    const imageBase641 = await getBase64(picture);
    const imageBase642 = await getBase64(picture2);

    //console.log(imageBase641);

    //console.log(imageBase641);

    const data = { image: imageBase641, image2: imageBase642 };
    //console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = process.env.NEXT_PUBLIC_AREA_IMAGE;
    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      setPreviewResult3("data:image/jpg;base64," + response.data);

      let one = process.env.NEXT_PUBLIC_AREA_FIRST;
      let two = process.env.NEXT_PUBLIC_AREA_SECOND;

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            //console.log(responseOne.data, responseTwo.data);
            setPreviewResult("data:image/jpg;base64," + responseOne.data);
            setPreviewResult2("data:image/jpg;base64," + responseTwo.data);
            // use/access the results
          })
        )
        .catch((errors) => {
          // react on errors.
          console.log(errors);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Layout>
        <div className="screen-contenedor padding">
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Image</h2>
              <div className="foto">
                {preview.length > 0 && (
                  <div>
                    <Image
                      src={preview}
                      alt="image Photo"
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
                    setPreviewResult2("");
                    setPreviewResult3("");
                  }}
                />
              </div>
              {/* <Button
                className="boton"
                type="submit"
                onClick={() => setTiresDetect("superior")}
              >
                Detectar
              </Button> */}
            </form>
          </div>
          <div className="item">
            <form className="centrar" /* onSubmit={handleSubmit} */>
              <h2>Image 2</h2>
              <div className="foto">
                {preview2.length > 0 && (
                  <div>
                    <Image
                      src={preview2}
                      alt="image Photo"
                      className="imagen"
                    ></Image>
                  </div>
                )}
              </div>
              <div className="input">
                <input
                  type="file"
                  onChange={(e) => {
                    setPreview2(URL.createObjectURL(e.target.files[0]));
                    setPicture2(e.target.files[0]);
                    setPreviewResult("");
                    setPreviewResult2("");
                    setPreviewResult3("");
                  }}
                />
              </div>
              {/*  <Button
                className="boton"
                type="submit"
                onClick={() => setTiresDetect("superior")}
              >
                Detectar
              </Button> */}
            </form>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="result">
          <Button type="submit" className="boton">
            {!loading ? (
              "Calculate"
            ) : (
              <Spinner
                animation="border"
                variant="light"
                aria-hidden="true"
                size="sm"
              />
            )}
          </Button>
        </form>

        {previewResult3 && previewResult && previewResult2 && (
          <>
            <div className="screen-contenedor padding">
              {/*  <h2>Result</h2> */}
              <div className="item">
                <form className="centrar" /* onSubmit={handleSubmit} */>
                  <h2>Image 1 (Left)</h2>
                  <div className="foto">
                    {previewResult.length > 0 && (
                      <div>
                        <Image
                          src={previewResult}
                          alt="image Photo"
                          className="imagen"
                        ></Image>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="item">
                <form className="centrar" /* onSubmit={handleSubmit} */>
                  <h2>Image 2 (Right)</h2>
                  <div className="foto">
                    {previewResult2.length > 0 && (
                      <div>
                        <Image
                          src={previewResult2}
                          alt="image Photo"
                          className="imagen"
                        ></Image>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="result">
              <div className="item">
                <div className="width display">
                  <h2>Image</h2>
                  <div className="foto width">
                    {previewResult3.length > 0 && (
                      <Image
                        src={previewResult3}
                        alt="image Photo"
                        className="imagen"
                      ></Image>
                    )}
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        )}
      </Layout>
    </div>
  );
};

export default Areas;
