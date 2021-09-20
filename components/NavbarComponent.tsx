import {
  Navbar,
  Container,
  Nav,
  Image,
  Dropdown,
  NavDropdown,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import Logo from "../public/static/images/logo.png";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";

const NavbarComponent = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <Image src={Logo.src} width={200} height={50} className="image" />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto nav">
            <Link href="/">
              <span
                className={`nav-link ${
                  router.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </span>
            </Link>

            {/* <Link href="/tires">
              <span
                className={`nav-link ${
                  router.pathname === "/tires" ? "active" : ""
                }`}
              >
                Tires
              </span>
            </Link> */}

            <NavDropdown id="nav-dropdown-webcam" title="Webcam">
              <div
                className={`${
                  router.pathname === "/facial" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/facial">
                    <span>Facial</span>
                  </Link>
                </NavDropdown.Item>
              </div>
              <div
                className={`${
                  router.pathname === "/eyes" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/eyes">
                    <span className="link">Eyes</span>
                  </Link>
                </NavDropdown.Item>
              </div>
              <div
                className={`${
                  router.pathname === "/direction" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/direction">
                    <span className="link">Direction</span>
                  </Link>
                </NavDropdown.Item>
              </div>
              <div
                className={`${
                  router.pathname === "/webcam" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/webcam">
                    <span className="link">Fatiga</span>
                  </Link>
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <NavDropdown id="nav-dropdown-tires" title="Tires">
              <div
                className={`${
                  router.pathname === "/tiresDesgaste" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/tiresDesgaste">
                    <span className="link">Desgaste superior</span>
                  </Link>
                </NavDropdown.Item>
              </div>
              <div
                className={`${
                  router.pathname === "/tiresCorteLateral"
                    ? "activeDropdown"
                    : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/tiresCorteLateral">
                    <span className="link">Corte lateral</span>
                  </Link>
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <NavDropdown id="nav-dropdown-tires" title="Security">
              <div
                className={`${
                  router.pathname === "/helmet" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/helmet">
                    <span className="link">Helmet</span>
                  </Link>
                </NavDropdown.Item>
              </div>
              <div
                className={`${
                  router.pathname === "/antiparra" ? "activeDropdown" : ""
                }`}
              >
                <NavDropdown.Item>
                  <Link href="/antiparra">
                    <span className="link">Antiparra</span>
                  </Link>
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <Link href="/countObject">
              <span
                className={`nav-link ${
                  router.pathname === "/countObject" ? "active" : ""
                }`}
              >
                Count Object
              </span>
            </Link>

            <Link href="/trackingObject">
              <span
                className={`nav-link ${
                  router.pathname === "/trackingObject" ? "active" : ""
                }`}
              >
                Tracking Objects
              </span>
            </Link>

            <Link href="/areas">
              <span
                className={`nav-link ${
                  router.pathname === "/areas" ? "active" : ""
                }`}
              >
                Area images
              </span>
            </Link>
            <Link href="/truck">
              <span
                className={`nav-link ${
                  router.pathname === "/truck" ? "active" : ""
                }`}
              >
                Volume Truck
              </span>
            </Link>
            {/* <Link href="/consideraciones">
              <span
                className={`nav-link ${
                  router.pathname === "/consideraciones" ? "active" : ""
                }`}
              >
                Consideraciones
              </span>
            </Link> */}
          </Nav>
          {/* <Button className="responsive">1</Button> */}
          <BiMenu
            className="responsive"
            fill="white"
            width={100}
            height={100}
            onClick={() => {}}
          />
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
