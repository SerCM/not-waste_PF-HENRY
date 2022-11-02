import React from "react";
// import style from "./landing.module.css";
import './csslan.css'

// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import Footer from '../Footer/index'

// import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function LandingPage() {
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 0,
      down: location - 10,
    });
  };

  // const img =
  //   "https://img.freepik.com/fotos-premium/comida-italiana-ingredientes_1220-4676.jpg?w=5000";
  // const img2 =
  //   "https://img.freepik.com/foto-gratis/concepto-comida-sabrosa-carne-res-vista-superior-verduras_185193-74994.jpg?w=5000&t=st=1665986120~exp=1665986720~hmac=656d6d168a4d199700f7730e0c08f6202abb54ba30846d93c2bdc9dd1596fd21";
  // const img3 =
  //   "https://static.vecteezy.com/system/resources/previews/001/271/830/large_2x/baked-bread-on-illuminated-background-free-photo.jpg";
  // const imgIcon =
  //   "https://cdn.iconscout.com/icon/premium/png-256-thumb/vegetarian-food-1834409-1557027.png";
  // const imgcomunity =
  //   "https://img.freepik.com/vector-gratis/gente-trabajo-equipo-piezas-rompecabezas_24877-54950.jpg?w=740&t=st=1666535575~exp=1666536175~hmac=6cdc1b8bf3f29e5df21fdcff558d7f8547d742fc8c6d1c31500b82992df37a94";
  // const imgfaqs = 
  // "https://img.freepik.com/vector-gratis/dibujado-mano-gente-haciendo-preguntas-ilustracion_23-2148906555.jpg?w=996&t=st=1666537925~exp=1666538525~hmac=37ed79719c77117538eac1bf0a56d09311b5c6313a410cbaf719cc2854325ee3"
  return (
    // <main className={style.main}>
    //   <div>
    //     <nav className="navbar navbar-expand-md bg-ligth">
    //       <div className="container-fluid">
    //         <img src={imgIcon} alt="🥑" width="50px" />
    //         <div className="nav-link mx-4">
    //           <h3>Not Waste</h3>
    //         </div>
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#navbarSupportedContent"
    //           aria-controls="navbarSupportedContent"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <span className="navbar-toggler-icon bg-ligth"></span>
    //         </button>

    //         <div
    //           className="collapse navbar-collapse"
    //           id="navbarSupportedContent"
    //         >
    //           <Navbar className=" navbar-nav ms-auto px-5">
    //             <div className="vr bg-dark"></div>
    //             <Nav
    //               href="#inicio"
    //               className=" nav-link mx-4"
    //               onClick={handleClick}
    //             >
    //               <Link to="/home">INICIO</Link>
    //             </Nav>
    //             <div className="vr bg-dark"></div>
    //             <Nav
    //               className="nav-link mx-4 text-dark"
    //               href="#about"
    //               onClick={handleClick}
    //             >
    //               ABOUT
    //             </Nav>
    //             <div className="vr bg-dark"></div>
    //             <Nav
    //               href="#FAQ"
    //               onClick={handleClick}
    //               className=" text-dark mx-4"
    //             >
    //               FAQ's
    //             </Nav>
    //             <div className="vr bg-dark"></div>
    //             <Nav
    //               href="#nosotros"
    //               onClick={handleClick}
    //               className="nav-link text-dark mx-4"
    //             >
    //               NOSOTROS
    //             </Nav>
    //             <div className="vr bg-dark"></div>
    //             <Nav
    //               href="#contact"
    //               onClick={handleClick}
    //               className="nav-link text-dark mx-4"
    //             >
    //               CONTACTANOS
    //             </Nav>
    //             <div className="vr bg-dark"></div>
    //           </Navbar>
    //         </div>
    //       </div>
    //     </nav>
    //   </div>

    //   <Carousel>
    //     <Carousel.Item>
    //       <img
    //         className=" d-block w-100 "
    //         src={img}
    //         height="500px"
    //         alt="First slide"
    //       />

    //       <Carousel.Caption>
    //         {/* <h3 className={style.strD}>First slide label</h3>
    //       <h4 className={style.strD}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4> */}
    //       </Carousel.Caption>
    //     </Carousel.Item>

    //     <Carousel.Item>
    //       <img
    //         className="d-block w-100"
    //         src={img2}
    //         height="500px"
    //         alt="Second slide"
    //       />

    //       <Carousel.Caption>
    //         {/* <h3 className={style.strD}>Second slide label</h3>
    //       <h4 className={style.strD}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4> */}
    //       </Carousel.Caption>
    //     </Carousel.Item>

    //     <Carousel.Item>
    //       <img
    //         className="d-flex w-100"
    //         src={img3}
    //         height="500px"
    //         alt="Third slide"
    //       />

    //       <Carousel.Caption>
    //         {/* <h3 className={style.strD}>Third slide label</h3>
    //       <h4 className={style.strD}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h4> */}
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
    //   <div>
    //     <div className={style.cont} id="about">
    //       <div className={style.cont3}>
    //         <div className={style.center}>
    //           <h1 className={style.nav}>CANASTAS DE COMIDA SORPRESA</h1>
    //           <img
    //             alt="imgCanasta"
    //             src="https://alimentacionysalud.unam.mx/wp-content/uploads/2020/11/reducir-riesgo-1536x1024.jpg"
    //             className={style.imgRedonda}
    //           />
    //         </div>
    //         <div className={style.center}>
    //           <h1 className={style.nav}>COMPRA A UN PRECIO REDUCIDO</h1>
    //           <img
    //             alt="imgChanchito"
    //             src="https://cdn.icon-icons.com/icons2/516/PNG/512/coin_money_icon-icons.com_51091.png"
    //             className={style.imgRedonda}
    //           />
    //         </div>
    //         <div className={style.center}>
    //           <h1 className={style.nav}>CUIDA EL PLANETA</h1>
    //           <img
    //             alt="imgPlaneta"
    //             src="https://us.123rf.com/450wm/sudowoodo/sudowoodo1810/sudowoodo181000004/128176206-dibujo-de-planeta-tierra-con-cara-de-dibujos-animados-lindo-naturaleza-y-ecolog%C3%ADa-ilustraci%C3%B3n-de-art.jpg?ver=6"
    //             className={style.imgRedonda}
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className={style.cont} id="FAQ">
    //       <div className={style.cont2}>
    //         <h1>FAQ</h1>
    //         <p>
    //           ¡Una alivio para tu bolsillo y una buena acción para el planeta!
    //         </p>
    //         <p>
    //           Encontrá productos alimenticios a un precio{" "}
    //           <strong>reducido</strong> evitando desperdiciar exedentes de
    //           comida, comprando canastas de alimentos
    //         </p>
    //         <p>
    //           <strong>Que contiene una canasta?</strong> el contenido es
    //           sorpresa, pero no te preocupes, los proveedores se comprometen a
    //           respetar las normas de calidad de los mismos
    //         </p>
    //       </div>
    //     </div>

    //     <div className={style.cont} id="nosotros">
    //       <div className={style.cont2}>
    //         <h1>NOSOTROS</h1>
    //         <p>
    //           Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    //           enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //           nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    //           reprehenderit in voluptate velit esse cillum dolore eu fugiat
    //           nulla pariatur. Excepteur sint occaecat cupidatat non proident,
    //           sunt in culpa qui officia deserunt mollit anim id est laborum
    //         </p>
    //       </div>
    //     </div>

    //     <div className={style.contForm}>
    //       <div className={style.cont} id="contact">
    //         <h1 className={style.center}>CONTACTANOS</h1>
    //         <form>
    //           <div className={style.inputCont}>
    //             <input placeholder="" type="text"></input>
    //           </div>
    //           <div className={style.inputCont}>
    //             <input placeholder="" type="text"></input>
    //           </div>
    //           <div className={style.inputCont}>
    //             <input placeholder="" type="text"></input>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <div>
      <header className="headerPri">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* <img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/vegetarian-food-1834409-1557027.png' alt="🥑" width="100px" /> */}
            {/* <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#miLista" aria-controls="miLista" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="miLista">
              <ul className="navbar-nav">
                <li className="nav-item mb-2">
                  <a className="nav-link" id="btnnav" href="">Principios</a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link" id="btnnav" href="">Nosotros</a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link" id="btnnav" href="">Faq's</a>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>

        <div className="container">
          <div className="title font-weight-bold">
            VENDER TU EXCEDENTE<br /> NUNCA HABÍA SIDO TAN FÁCIL!<br />
            <button className="btn mt-4" id="btnInicio"><Link to="/home" className="text-decoration-none" id="inicioBtn">Inicio</Link></button>
          </div>
        </div>

      </header>
      <main>
        <div className="row text-white py-5" id='row-about'>
          <div className="container text-center">
            <div className="d-flex justify-content-center">
              <div className="col-md-8">
                <h1 className="h3titleimage">Nuestros principios</h1>
                <h5>Nuestros principios se basan en lo siguiente</h5>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <img
                  alt="imgCanasta"
                  src="https://alimentacionysalud.unam.mx/wp-content/uploads/2020/11/reducir-riesgo-1536x1024.jpg"
                  className="imgRedonda"
                />
                <h3 className="h3titleimage mt-4">Canasta de comida sorpresa</h3>
                <p>Adquirí paquetes de comida sorpresa.</p>
              </div>
              <div className="col">
                <img
                  alt="imgChanchito"
                  src="https://cdn.icon-icons.com/icons2/516/PNG/512/coin_money_icon-icons.com_51091.png"
                  className="imgRedonda"
                />
                <h3 className="h3titleimage mt-4">Comprá a un precio reducido</h3>
                <p>Aprovechá las oportunidades que se ofrecen.</p>
              </div>
              <div className="col">
                <img
                  alt="imgPlaneta"
                  src="https://us.123rf.com/450wm/sudowoodo/sudowoodo1810/sudowoodo181000004/128176206-dibujo-de-planeta-tierra-con-cara-de-dibujos-animados-lindo-naturaleza-y-ecolog%C3%ADa-ilustraci%C3%B3n-de-art.jpg?ver=6"
                  className="imgRedonda"
                />
                <h3 className="h3titleimage mt-4">Cuidá el planeta</h3>
                <p>Juntos evitemos el la generación de residuos.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row py-5" id="row-us">
          <div className="container">
            <div className="row">
              <div className="col-md-5 text-center">
                <img className="imgusRedonda" src='https://img.freepik.com/vector-gratis/gente-trabajo-equipo-piezas-rompecabezas_24877-54950.jpg?w=740&t=st=1666535575~exp=1666536175~hmac=6cdc1b8bf3f29e5df21fdcff558d7f8547d742fc8c6d1c31500b82992df37a94' alt="logous" />
              </div>
              <div className="col-md-6 mt-1 ms-2">
                <h1 className="fw-bold mb-2" id="titleUs">Sobre nosotros</h1>
                <h4 className="fw-bold mb-2" id="subtitleUs">Mas de 1/3 de la comida se desperdicia</h4>
                <h5 className="mb-4 fw-bold">y queremos cambiar eso...</h5>
                <div className="col-8">
                  <p className="textUs">Asegurar que toda la comida se come, no se tira.
                    Cada día, comida en perfecto estado acaba desperdiciada solo porque no se ha vendido a tiempo.
                    En Not Waste damos la oportunidad de comprar a muy buen precio packs sorpresa con toda esta
                    comida directamente de los negocios.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="row-phrase">
          <div className="container text-center">
            <h3 className="textphrase">“Comer es una necesidad, pero comer de forma inteligente es un arte”</h3>
            <h3 className="textphrase mt-4 fw-bold">-Francisco VI</h3>
          </div>
        </div>
        {/* <div className="row" id="row-faqs">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-md-5 text-center">
                <img className="imgfaqs" src="https://img.freepik.com/vector-gratis/dibujado-mano-gente-haciendo-preguntas-ilustracion_23-2148906555.jpg?w=996&t=st=1666537925~exp=1666538525~hmac=37ed79719c77117538eac1bf0a56d09311b5c6313a410cbaf719cc2854325ee3" alt="logofaqs" />
              </div>
              <div className="col-md-7 mt-4">
                <h1 className="fw-bold mb-3" id="titleUs">Faq's</h1>
                <p className="pfaqs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="pfaqs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
