import React, { useEffect, useState } from "react";
import { apiProduct, tags } from "../../servicesApi/product";
import styles from "./style.module.css";
import Plecholder from "../../component/plecholder";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/action/productAction";
import { addTroli } from "../../redux/action/actionTroli";
import { createAction } from "../../constants/action-tyoe";

export default function Home() {
  const dispatch = useDispatch();
  const selectors = useSelector((state) => state);
  const tokenAuth = selectors.authtoken.token;
  const searchItem = selectors.search.submittedTerm;
  const filter = selectors.filterByCategory.data;
  const product = selectors.products.product;
  const [productTags, setproductTags] = useState([]);
  const [dataProduct, setdataProduct] = useState([]);
  const [dafaultProduct, setdafaultProduct] = useState([]);
  const [placShow, setplacShow] = useState(true);
  const [statustags, setstatustags] = useState(null);
  const [statuscategory, setstatuscategory] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setplacShow(false);
    }, 2000);
    dispatch(fetchProducts());
    tagsProduct();
  }, [dispatch]);
  useEffect(() => {
    filtersSearch();
  }, [searchItem, dafaultProduct]);
  useEffect(() => {
    setdafaultProduct(product);
  }, [product, dataProduct]);
  useEffect(() => {
    filterByCategory();
  }, [dafaultProduct, filter]);

  const filtersSearch = () => {
    if (searchItem === "") {
      setdataProduct(dafaultProduct);
    } else {
      setstatustags(null);
      const filteredData = dafaultProduct?.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setdataProduct(filteredData);
      const data = filteredData.map((i) => i.tags);
      const arrayUtama = [].concat(...data);
      const arrayUnik = arrayUtama?.filter((elem, index, self) => {
        return index === self.findIndex((e) => e.name === elem.name);
      });
      setproductTags(arrayUnik);
    }
  };
  const tagsProduct = async () => {
    const respon = await tags();
    setproductTags(respon.data);
  };

  const filterByCategory = async () => {
    if (filter === "Kategori") {
      setstatustags(null);
      setdataProduct(dafaultProduct);
    } else {
      console.log(filter,"DARI");
      setstatustags(null);
      const filteredData = dafaultProduct.filter(
        (product) => product.category.name === filter
      );
      setdataProduct(filteredData);
      const data = filteredData?.map((i) => i.tags);
      const arryTags = [].concat(...data);
      const arrayUnik = arryTags?.filter((elem, index, self) => {
        return index === self.findIndex((e) => e.name === elem.name);
      });
      setproductTags(arrayUnik);
    }
  };

  const filterTags = (item) => {
    const promoItems = dafaultProduct.filter((x) => {
      const tags = x.tags;
      return tags.some(
        (tag) => tag?.name?.toLowerCase() === item?.toLowerCase()
      );
    });
    setdataProduct(promoItems);
  };
  const CretaeTroli = async (Id_Product) => {
    const data = {
      items: [{ product: { _id: Id_Product }, qty: 1 }],
    };
    dispatch(addTroli(tokenAuth, data));
  };
  return (
    <div style={{ margin: "40px 120px" }}>
      <h4>Home</h4>
      <div className={styles.contentTags}>
        <h5>Tags:</h5>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {productTags.map((is, ix) => {
            console.log(is);
            return (
              <div key={ix}>
                <button
                  className={styles.itemTags}
                  style={{
                    margin: "0px 5px",
                    backgroundColor: is._id === statustags ? "orange" : "",
                  }}
                  onClick={() => {
                    filterTags(is?.name, ix);
                    setstatustags(is._id);
                  }}
                >
                  <i
                    className="bi bi-tag-fill"
                    style={{ fontSize: 12, color: "white" }}
                  />
                  <p key={ix} className={styles.tagsName}>
                    {is?.name}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row row-cols- row-cols-md-5 g-5 ">
        {dataProduct.map((item, index) => {
          return (
            <div key={index} className="col">
              {placShow ? (
                <Plecholder />
              ) : (
                <div className="card h-100">
                  <img
                    src={item?.picture}
                    className="card-img-top"
                    alt="..."
                    style={{ height: 180 }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item?.name}</h5>
                    <p className="card-text">{item?.descripsi}</p>
                    <h6>{item?.category.name}</h6>
                    <div style={{ display: "flex", paddingTop: 5 }}>
                      {item?.tags.map((i, z) => {
                        return (
                          <div
                            key={z}
                            className={styles.itemTags}
                            style={{
                              backgroundColor:
                                i._id === statustags ? "orange" : "",
                            }}
                          >
                            <i
                              className="bi bi-tag-fill"
                              style={{
                                fontSize: 10,
                                color: "white",
                              }}
                            />
                            <p className={styles.tagsName}>{i.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <h6 style={{ marginTop: 5 }}>Rp: {item?.price}</h6>
                  </div>
                  <div
                    className="card-footer"
                    style={{ border: "none", background: "none" }}
                  >
                    <button
                      className={styles.btnTroli}
                      onClick={() => CretaeTroli(item._id)}
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
