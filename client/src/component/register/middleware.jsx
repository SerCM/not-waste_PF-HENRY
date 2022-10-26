import { useDispatch } from "react-redux";
import { postCustomer, postSeller } from "../../redux/actions";
import Cookies from "universal-cookie";

const dispatch = useDispatch;

const registerSupplier = async (e, input, error) => {
  const name = input.namesupplier;
  let image = input.archivo;
  const { phone, email, adress, cuit, category, cities } = input;
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "imagesnotwaste");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/sercm/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const url = await res.json();
  image = url.secure_url;

  const cookies = new Cookies();

  cookies.set("sellerName", `${input.namesupplier}`, { path: "/" });
  cookies.set("sellerEmail", `${input.email}`, { path: "/" });
  cookies.set("sellerPhone", `${input.phone}`, { path: "/" });
  cookies.set("sellersdress", `${input.adress}`, { path: "/" });
  cookies.set("sellerCategory", `${input.category}`, { path: "/" });
  cookies.set("sellerCuit", `${input.cuit}`, { path: "/" });
  cookies.set("sellerCities", `${input.cities}`, { path: "/" });
  // window.location.href = "./perfilSeller";
  dispatch(
    postSeller({
      phone,
      email,
      adress,
      cuit,
      image,
      category,
      name,
      cities,
    })
  );
};

const registerCustomer = async (name, email) => {
  dispatch(postCustomer({ name, email }));
}

export {registerCustomer, registerSupplier}
