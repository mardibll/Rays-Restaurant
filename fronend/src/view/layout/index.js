import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./layout.css";
import { useDispatch, useSelector } from "react-redux";
import { setSubmittedTerm } from "../../redux/action/searchAction";
import {
  categoryFilter,
  fetchKategori,
} from "../../redux/action/categoryAction";
export default function Layout({ children }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const selectors = useSelector((state) => state);
  const authToken = selectors.authtoken.token;
  const qtyTroli = selectors.troli.qty;
  const categori = selectors.categori.data;
  const filterCayegory = selectors.filterByCategory.data;
  const [search, setsearch] = useState("");
  const [active, setactive] = useState(true);
  useEffect(() => {
    dispatch(fetchKategori());
  }, [dispatch, qtyTroli, authToken]);
  useEffect(() => {
    itemCard();
  }, [categori]);
  const itemCard = () => {
    if (qtyTroli <= 0 || authToken === null || qtyTroli === "undefined") {
      setactive(false);
    } else {
      setactive(true);
    }
  };

  const filterMenu = (filterKategori) => {
    dispatch(categoryFilter(filterKategori));
    navigation("/");
  };

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setsearch("");
    navigation("/");
    dispatch(setSubmittedTerm(search));
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-primary"
        style={{ padding: "2px 80px" }}
      >
        <Container fluid>
          <Navbar.Brand
            style={{
              color: "white",
              fontSize: 20,
              paddingRight: 20,
              fontFamily: "Poppins",
            }}
            href="/"
          >
            Ray’s Restaurant
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ color: "white" }}>
              <NavDropdown
                className="custom-nav-dropdown"
                title={filterCayegory}
                id="collapsible-nav-dropdown"
              >
                {categori?.map((i, x) => {
                  return (
                    <NavDropdown.Item
                      key={x}
                      onClick={() => filterMenu(i.name)}
                    >
                      {i.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <form
              onSubmit={handleSearchSubmit}
              style={{ width: "70%", marginRight: 40 }}
            >
              <div className="d-flex">
                <input
                  type="search"
                  placeholder="Search"
                  className="me-2 form-control"
                  aria-label="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ color: "white", border: "1px solid grey" }}
                >
                  Search
                </button>
              </div>
            </form>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link
              href={authToken ? "/Troli" : "/Login"}
              style={{ marginRight: 15, display: "flex" }}
            >
              <i
                className="bi bi-cart-fill"
                style={{ color: "white", fontSize: 22 }}
              />

              {active && (
                <p
                  style={{
                    position: "absolute",
                    borderRadius: 100,
                    backgroundColor: "red",
                    padding: "0px 5px",
                    fontSize: 9,
                    color: "white",
                    marginLeft: 12,
                  }}
                >
                  {qtyTroli}
                </p>
              )}
            </Nav.Link>
            <Nav.Link href={authToken ? "/Account" : "/Login"}>
              <i
                className="bi bi-person-circle"
                style={{ color: "white", fontSize: 22 }}
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
