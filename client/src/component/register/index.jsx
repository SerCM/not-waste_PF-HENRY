import { useState, useEffect } from "react";
import categories from "./categories";
import { v4 as uuidv4 } from "uuid";
import { validate } from "./auxiliary";
import { getCities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { postCustomer, postSeller } from "../../redux/actions";
import "../register/register.css";
import {registerSupplier, registerCustomer} from "./middleware";
import Cookies from "universal-cookie";

const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI

function Register(props) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const [input, setInput] = useState({
    supplier: false,
    email: props.email.toLowerCase(),
    name: props.name.toLowerCase(),
    imageurl: "",
    namesupplier: "",
    phone: "",
    image: {},
    adress: "",
    cities: [],
    cuit: "",
    category: "",
  });

  useEffect(() => {
    localStorage.setItem("formSeller", JSON.stringify(input));
  }, [input]);

  useEffect(() => {
    const storedValues = localStorage.getItem("formSeller");
    setInput(JSON.parse(storedValues));
  }, []);

  const [error, setError] = useState({});

  const changeState = function (e) {
    if (e.target.name !== "supplier" && e.target.name !== "image") {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    if (e.target.name === "supplier") {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
      setError({
        ...error,
        namesupplier: "Se requiere un nombre",
      });

      if (e.target.checked === false) {
      }
    }
  };

  const handleSelectCity = (e) => {
    if (!input.cities.length) {
      setError({
        ...error,
        cities: undefined,
      });
    }
    if (!input.cities.includes(e.target.value)) {
      setInput({
        ...input,
        cities: [e.target.value],
      });
    }
  };

  const option_categories = () => {
    return (
      categories &&
      categories.map((category) => (
        <option key={uuidv4()} value={category}>
          {category}
        </option>
      ))
    );
  };

  const changestateimage = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setInput({
      ...input,
      archivo: files,
    });
  };

  const reload = () => {
    window.location.assign(`${redirectUri}/home` );
  };

  const registrarproveedor = (e) => {
    e.preventDefault();
    if (!Object.keys(error).length) {
      registerSupplier(e, input);
      setTimeout(() => {
        reload();
      }, 3000);
      document.getElementById("buttonRegister").disabled = true;
      localStorage.removeItem("formSeller");
    } else {
      e.preventDefault();
      alert(
        "Hay campos incompletos o inválidos. Por favor revise su formulario, todos los campos son obligatorios."
      );
    }
  };
  // const registerSupplier = async (e) => {
  //   e.preventDefault()
  //   const name = input.namesupplier;
  //   let image = input.archivo
  //   const { phone, email, adress, cuit, category, cities } = input;
  //   if (!Object.keys(error).length) {
  //     const data = new FormData()
  //     data.append('file', image)
  //     data.append("upload_preset", "imagesnotwaste")
  //     const res = await fetch(
  //       "https://api.cloudinary.com/v1_1/sercm/image/upload",
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     )
  //     const url = await res.json()
  //     image = url.secure_url
  //     dispatch(
  //       postSeller({
  //         phone,
  //         email,
  //         adress,
  //         cuit,
  //         image,
  //         category,
  //         name,
  //         cities
  //       })
  //     )
  //   } else {
  //     e.preventDefault();
  //     alert(
  //       "Hay campos incompletos o inválidos. Por favor revise su formulario, todos los campos son obligatorios."
  //     );
  //   }
  // };

  const registerCustom = (e) => {
    e.preventDefault()
    const { name, email } = input;
    const cookies = new Cookies();
    cookies.set("customerName", `${input.name}`, { path: "/" });
    cookies.set("customerEmail", `${input.email}`, { path: "/" });
    registerCustomer(name, email);
    setTimeout(() => {
      reload();
    }, 3000);
    // console.log({ name, email });
  };

  const handleDeleteCity = (e) => {
    e.preventDefault();
    // console.log(e.target);
    if (input.cities.length === 1) {
      setError({
        ...error,
        cities: "Debe seleccionar al menos una ciudad!",
      });
    }
    setInput({
      ...input,
      cities: input.cities.filter((g) => g !== e.target.value),
    });
  };

  return (
    <>
      <form className="form-check form-switch my-3 mx-5" id="formDiv">
        <div className="text-center">
          <h1>¡COMPLETA TU REGISTRO!</h1>
        </div>

        <div className="input-group has-validation my-3 mx-5">
          <input
            className="form-check-input me-3"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            name="supplier"
            onClick={(e) => changeState(e)}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Soy proveedor
          </label>
        </div>

        <div className="input-group has-validation">
          <div className="form-floating is-invalid">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="floatingInputName"
              value={props.email}
            />
            <label htmlFor="floatingInputGroup2">Email</label>
          </div>
        </div>

        {!input.supplier ? (
          <>
            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="green"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="floatingInputName"
                  placeholder="Name"
                  value={props.name}
                />
                <label htmlFor="floatingInputGroup2">Nombre</label>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                value="registerCustomer"
                onClick={(e) => {
                  registerCustom(e);
                }}
              >
                Confirmar
              </button>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="m-0 row justify-content-center">
              <div className="col-auto p-5 text-center" id="contForm">
                <h5>Información requerida para ser proveedor de Not Waste</h5>

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="text"
                      className={
                        !error.namesupplier
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="Name"
                      name="namesupplier"
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">
                      Nombre del establecimiento
                    </label>
                    {error.namesupplier && (
                      <div className="invalid-feedback">
                        {error.namesupplier}
                      </div>
                    )}
                  </div>
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="file"
                      className={
                        !error.image
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputFormImage"
                      placeholder="imagen"
                      name="image"
                      required
                      onChange={(e) => changestateimage(e)}
                    />
                    {error.image && (
                      <div className="invalid-feedback">{error.image}</div>
                    )}
                  </div>
                </div>
                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="tel"
                      className={
                        !error.phone
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="phone"
                      name="phone"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">Número de teléfono</label>
                  </div>
                  {error.phone && (
                    <div className="invalid-feedback">{error.phone}</div>
                  )}
                </div>

                <br />

                {/* <div className="form-control ms-2"> */}
                <select
                  className="form-select ms-2"
                  aria-label="Default select example"
                  id="inputForm"
                  onChange={(e) => handleSelectCity(e)}
                  value=""
                >
                  <option selected>Seleccione su localidad</option>
                  {cities?.map((cities, i) => {
                    return (
                      <option key={i} value={cities.name}>
                        {cities.name}
                      </option>
                    );
                  })}
                </select>
                {/* </div> */}

                <div>
                  {input.cities?.map((ci, i) => (
                    <div key={i}>
                      <p>{ci}</p>
                      <button
                        value={ci}
                        name="cities"
                        onClick={(e) => handleDeleteCity(e)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="text"
                      className={
                        !error.adress
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="adress"
                      name="adress"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label>Dirección</label>
                    {error.adress && (
                      <div className="invalid-feedback">{error.adress}</div>
                    )}
                  </div>
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="tel"
                      className={
                        !error.cuit
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="cuit"
                      name="cuit"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">CUIT</label>
                  </div>
                  {error.cuit && (
                    <div className="invalid-feedback">{error.cuit}</div>
                  )}
                  {error.category && (
                    <div className="invalid-feedback">{error.category}</div>
                  )}
                </div>

                <br />

                {/* <div className="form-control ms-2"> */}
                <select
                  className="form-select form-select-lg ms-2"
                  name="category"
                  id="inputForm"
                  aria-label=".form-select-lg example"
                  onChange={(e) => changeState(e)}
                  value={input.category}
                >
                  <option value="">Seleccione su categoría</option>
                  {option_categories()}
                </select>
                {/* </div> */}

                <div className="col-12">
                  <button
                    id="buttonRegister"
                    className="btn btn-primary"
                    type="submit"
                    value="register"
                    onClick={(e) => {
                      registrarproveedor(e);
                    }}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
      {/* {console.log(VerifyProfile("Miguel@gmail.com"))} */}
    </>
  );
}

export default Register;
