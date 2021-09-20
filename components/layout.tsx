import Navbar from "../components/NavbarComponent";

const Layout = ({ children }) => {
  return (
    <div className="contenedor">
      <div className="separador">
        <div>
          <header>
            <Navbar></Navbar>
          </header>
          <main>{children}</main>
        </div>
        <footer /* className="fixed-bottom" */>
          <div className="footer">
            <span className="content-footer">2021</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
