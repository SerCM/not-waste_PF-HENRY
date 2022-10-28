import axios from "axios";

const urlAPI = process.env.REACT_APP_API || "http://localhost:3001" ;


export function getSellers(queryParams) {
  let url = new URL(`${urlAPI}/seller`);
  if (queryParams?.city) {
    url.searchParams.append("city", queryParams?.city);
  }

  if (queryParams?.category) {
    url.searchParams.append("category", queryParams?.category);
  }
  if (queryParams?.price) {
    url.searchParams.append("price", queryParams?.price);
  }
  if (queryParams?.description) {
    url.searchParams.append("description", queryParams?.description);
  }
  if (queryParams?.diet) {
    url.searchParams.append("diet", queryParams?.diet);
  }

  if (queryParams?.sortBy) {
    url.searchParams.append("sortBy", queryParams?.sortBy);
  }

  if (queryParams?.email) {
    url.searchParams.append("email", queryParams?.email);
  }

  return async function (dispatch) {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();

      dispatch({ type: "GET_SELLER", payload: json, query: queryParams });
    } else {
      dispatch({
        type: "REQUEST_ERROR",
        payload: "La búsqueda no arrojó resultados",
      });
    }
  };
}

export function getCities() {
  return async function (dispatch) {
    try {
      const cities = await axios.get(`${urlAPI}/city`);
      dispatch({
        type: "GET_CITIES",
        payload: cities.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function reviewOrder(id, review) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${urlAPI}/${id}`, review);
      dispatch({
        type: "PUT_ORDER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      const price = await axios.get(`${urlAPI}/product`);
      dispatch({
        type: "GET_PRODUCT",
        payload: price.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function prodDetail(id) {
  return async function (dispatch) {
    try {
      let detailProduct = await await axios.get(
        `${urlAPI}/product/${id}`
      );
      detailProduct = detailProduct.data[0];
      dispatch({
        type: "PROD_DETAIL",
        payload: detailProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiet() {
  return async function (dispatch) {
    try {
      const diet = await axios.get(`${urlAPI}/diets`);
      dispatch({
        type: "GET_DIET",
        payload: diet.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCustomer(email) {
  let url = `${urlAPI}/customer`;
  if (email) {
    url = `${urlAPI}/customer?email=${email}`;
  }

  return async function (dispatch) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: "GET_CUSTOMER",
        payload: json,
      });
    } else {
      dispatch({
        type: "REQUEST_ERROR",
        payload: "La búsqueda no arrojó resultados",
      });
    }
  };
}

export function postCustomer(data) {
  return fetch(`${urlAPI}/customer`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

export function postSeller(data) {
  return fetch(`${urlAPI}/seller`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

export const filterByCity = (payload) => {
  return {
    type: "FILTER_BY_CITY",
    payload,
  };
};

export const postProduct = (payload) => {
  return async () => {
    let json = await axios.post(`${urlAPI}/product`, payload);
    return json;
  };
};

export function postPay(price, postId) {
  return fetch(`${urlAPI}/create_preference`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(price, postId), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      return { id: response.id, redirect: response.psgina_a_redireccionar };
      /* window.location.replace(response.psgina_a_redireccionar); */
    });
}

export function postOrder(input) {
  return async function (dispatch) {
    try {
      const act = await axios.post(`${urlAPI}/order`, input);
      console.log("🚀 ~ file: index.js ~ line 206 ~ act", act)
      dispatch({
        type: "POST_ORDER",
        payload: act.data,
        orders: act.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrders(customerId) {
  let url = `${urlAPI}/order`;
  if (customerId) {
    url = `${urlAPI}/customer?customerId=${customerId}`;
  }

  return async function (dispatch) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: "GET_ORDERS",
        payload: json,
      });
    } else {
      dispatch({
        type: "REQUEST_ERROR",
        payload: "La búsqueda no arrojó resultados",
      });
    }
  };
}

export function addCart(payload) {
  return {
    type: "ADD_CART",
    payload,
  };
}

export function postPost(data) {
  return fetch(`${urlAPI}/post`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => console.log("Success:", response))
    .catch((error) => console.error("Error:", error));
}

export function deleteProduct(data) {
  return fetch(`${urlAPI}/product/${data}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", response);
    })
    .catch((error) => console.error("Error:", error));
}

export function disableProduct(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/product/disable/${id}`);
    return res;
  };
}

export function restoreProduct(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/product/restore/${id}`);
    return res;
  };
}

export function getpost(id) {
  fetch(`${urlAPI}/post/?id=${id}`)
    .then((res) => res.json())
    .then((response) => console.log("Success:", response))
    .catch((error) => console.error("Error:", error));
}
export function postDetail(id) {
  return async function (dispatch) {
    try {
      let postDetail = await axios.get(`${urlAPI}/post/${id}`);
      postDetail = postDetail.data;
      dispatch({
        type: "POST_DETAIL",
        payload: postDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postGet() {
  return async function (dispatch) {
    try {
      let getPost = await axios.get(`${urlAPI}/post`);
      dispatch({
        type: "GET_POSTEO",
        payload: getPost.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function modifyPost(id, input) {
  return async function (dispatch) {
    const response = await axios.put(`${urlAPI}/post/${id}`, input);
    if (response.ok) {
      const json = await response.data();
      dispatch({ type: "MODIFY_POST", payload: json });
    } else {
      dispatch({
        type: "REQUEST_ERROR",
        payload: "There are no post with that ID",
      });
    }
  };
}

export function putOrder(id, state) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `${urlAPI}/order/${id}`,
        state
      );
      dispatch({
        type: "PUT_ORDER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderDetail(id) {
  return async function (dispatch) {
    try {
      let detailOrder = await axios.get(`${urlAPI}/order/${id}`);
      detailOrder = detailOrder.data[0];
      dispatch({
        type: "ORDER_DETAIL",
        payload: detailOrder,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function actualizarOrden(id, state) {
  return fetch(`${urlAPI}/order/${id}`, {
    method: "PUT",
    body: JSON.stringify(state), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", response);
    })
    .catch((error) => console.error("Error:", error));
}

export function getManagers() {
  let url = `${urlAPI}/manager`;

  return async function (dispatch) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: "GET_MANAGERS",
        payload: json,
      });
    } else {
      dispatch({
        type: "REQUEST_ERROR",
        payload: "La búsqueda no arrojó resultados",
      });
    }
  };
}

export function disableSeller(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/seller/disable/${id}`);
    return res;
  };
}

export function restoreSeller(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/seller/restore/${id}`);
    return res;
  };
}

export function disableForcePost(id) {
  return async function () {
    const res = await axios.put(
      `${urlAPI}/post/disableForce/${id}`
    );
    return res;
  };
}

export function disablePost(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/post/disable/${id}`);
    return res;
  };
}

export function restorePost(id) {
  return async function () {
    const res = await axios.put(`${urlAPI}/post/restore/${id}`);
    return res;
  };
}
