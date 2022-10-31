import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCities,
  getDiet,
  getSellers,
  getProduct,
} from "../../redux/actions";
import CarouselSeller from "../CarouselSeller";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Filters from "../Filters/Filters";
import "../Home/Home.css";
import Message from "../Message";
// import { v4 as uuidv4 } from "uuid";
import { Button } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';

function Home() {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.seller);
  // const queryParams = useSelector((state) => state.queryParams);
  const errorMessage = useSelector((state) => state.errorMessage);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getSellers());
    dispatch(getProduct());
    dispatch(getDiet());
  }, [dispatch]);


  function handleCleanFilters(e) {
    e.preventDefault();
    window.location.reload();
  }

  let vendedoresconpost = []

  sellers?.map((seller) => {
    if (seller.products.find((p) => p.posts.length > 0)) vendedoresconpost.push(seller);
  })

  // return <CarouselSeller key={seller.id}, seller={seller}/>
  return (
    <div>
      <NavBar isSearchVisible />
      {errorMessage ? (
        <div className="mx-4">
          <Button variant="light" onClick={e => handleCleanFilters(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span className="mx-2 align-items-center">Limpiar filtros</span>
          </Button>
          <Message className="d-flex " message={errorMessage} type="error" />
        </div>
      ) : (
        <div className="container-fluid my-3">
          <Filters />

          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                  {vendedoresconpost.length ? vendedoresconpost.slice(0, 3).map(seller => {
                    return <CarouselSeller seller={seller} />
                  }) : (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )
                  }
                </div>
              </div>
            </div>

            {vendedoresconpost.slice(3, 6).length && <>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                    Mostrar mas
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div class="accordion-body">
                    {vendedoresconpost.length > 3 && vendedoresconpost.slice(3, 6).map(seller => {
                      return <CarouselSeller seller={seller} />
                    })}
                  </div>
                </div>
              </div>

              {vendedoresconpost.slice(6).length &&
                <div class="accordion-item">
                  <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo123" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                      Mostrar todos
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseTwo123" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div class="accordion-body">
                      {vendedoresconpost.length > 6 && vendedoresconpost.slice(6).map(seller => {
                        return <CarouselSeller seller={seller} />
                      })}
                    </div>
                  </div>
                </div>
              }</>}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
