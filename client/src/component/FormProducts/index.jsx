import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../NavBar/index";
import Footer from "../Footer/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { getDiet, postProduct } from "../../redux/actions";
import { validate } from "../FormProducts/validate";
import VerifyProfile from "../VerifyProfile";
import AuthProfile from "../AuthProfile";
import "./FormProducts.css";
import { Link } from "react-router-dom";

function FormProduct() {
  const [error, setError] = useState({});

  let log = AuthProfile("profile");
  let db = VerifyProfile(log.email);
  const diets = useSelector((state) => state.diet);

  function getFormValues() {
    const storedValues = localStorage.getItem("formProducts");
    if (!storedValues)
      return {
        name: "",
        price: "",
        realValue: "",
        image: "",
        description: "",
        stock: 1,
        diets: [],
        sellerId: db.id,
      };
    return JSON.parse(storedValues);
  }

  const dispatch = useDispatch();
  const [input, setInput] = useState(getFormValues());

  useEffect(() => {
    localStorage.setItem("formProducts", JSON.stringify(input));
  }, [input]);

  useEffect(() => {
    dispatch(getDiet());
    dispatch(postProduct());
  }, [dispatch]);

  function handleInput(e) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(validate(input));
    if (!Object.keys(error).length && input.diets.length) {
      alert("Producto añadido con exito");
      let imageObj = input.image;
      const data = new FormData();
      data.append("file", imageObj);
      data.append("upload_preset", "imagesnotwaste");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/sercm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const url = await res.json();
      imageObj = url.secure_url;
      const inputMod = {
        ...input,
        image: imageObj,
      };
      console.log(inputMod, "INPUTMOD");
      dispatch(postProduct(inputMod));
      localStorage.removeItem("formProducts");
      setInput({
        name: "",
        price: "",
        realValue: "",
        image: "",
        description: "",
        stock: 1,
        diets: [],
        sellerId: db.id,
      });
    } else {
      console.log(error);
    }
  }

  function handleSelectDiet(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((d) => d !== e.target.value),
    });
  }

  const changeStateImage = (e) => {
    const files = e.target.files[0];
    //console.log(files);
    setInput({
      ...input,
      image: files,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="m-2 row justify-content-center">
        <Form className="col-auto px-5 py-2 text-center" id="formId">
          <h1>¡Cargá tu producto!</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              name="name"
              value={input.name}
              type="text"
              placeholder="Nombre"
              id="inputss"
              onChange={(e) => handleInput(e)}
            />
            {error.name && <p>{error.name}</p>}

            <Form.Label></Form.Label>
            <Form.Control
              name="price"
              value={input.price}
              type="number"
              placeholder="Precio"
              id="inputss"
              onChange={(e) => handleInput(e)}
            />
            {error.price && <p>{error.price}</p>}

            <Form.Label></Form.Label>
            <Form.Control
              name="realValue"
              value={input.realValue}
              type="number"
              placeholder="Valor Real"
              id="inputss"
              onChange={(e) => handleInput(e)}
            />
            {error.realValue && <p>{error.realValue}</p>}

            <Form.Label></Form.Label>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={input.description}
                name="description"
                id="inputss"
                onChange={(e) => handleInput(e)}
                placeholder="Descripción"
              />
            </Form.Group>
            {error.description && <p>{error.description}</p>}

            <Form.Label></Form.Label>
            <Form.Control
              name="image"
              type="file"
              placeholder="Imagen del producto"
              id="inputss"
              onChange={(e) => changeStateImage(e)}
            />
            {error.image && <p>{error.image}</p>}

            <Form.Label></Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="inputss"
              onChange={(e) => handleSelectDiet(e)}
            >
              <option>Seleccione una dieta</option>
              {diets?.map((e, i) => {
                return (
                  <option value={e.name} key={i}>
                    {e.name}
                  </option>
                );
              })}
            </Form.Select>
            <div>
              {input.diets?.map((diet, i) => (
                <div key={i}>
                  <p>{diet}</p>
                  <button value={diet} onClick={(e) => handleDelete(e)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </Form.Group>
          <div className="">
            <Button type="submit" className="bg-light mx-5">
              <Link to="/home" className="text-decoration-none">
                Volver
              </Link>
            </Button>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mx-5"
            >
              Crear Producto
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default FormProduct;
