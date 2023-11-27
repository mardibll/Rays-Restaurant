import React, { useEffect, useState } from "react";
import Input from "../../component/input";
import {
  addAddress,
  address,
  kabupaten,
  kecamatan,
  kelurahan,
  propinsi,
  removeAddress,
} from "../../servicesApi/address";
import styles from "./style.module.css";
export default function Address() {
  const [token, settoken] = useState(localStorage.getItem("TOKEN"));

  const [active, setactive] = useState(false);
  const [Address, setAddress] = useState([]);
  const [dataProvinsi, setdataProvinsi] = useState([]);
  const [datakabupaten, setdatakabupaten] = useState([]);
  const [datakecamatan, setdatakecamatan] = useState([]);
  const [datakelurahan, setdatakelurahan] = useState([]);
  const [createAddress, setcreateAddress] = useState({
    nama: "",
    kelurahan: "",
    kecamatan: "",
    kabupaten: "",
    propinsi: "",
    detail: "",
  });
  useEffect(() => {
    getAddress();
    provinsi();
  }, [createAddress]);
  const hanleChange = (e) => {
    const { name, value } = e.target;
    setcreateAddress((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const ADDAddress = async (e) => {
    setcreateAddress("");
    e.preventDefault();
    try {
      await addAddress(token, createAddress);
      setactive(false);
    } catch (error) {
      console.log(error);
    }
    getAddress();
  };
  const ADD = () => {
    setactive(true);
  };
  const getAddress = async () => {
    try {
      const respon = await address(token);
      setAddress(respon.data.data);
    } catch (error) {}
  };
  const deletedAddress = async (id_address) => {
    try {
      await removeAddress(token, id_address);
      getAddress();
    } catch (error) {}
  };
  const provinsi = async () => {
    const res = await propinsi();
    setdataProvinsi(res.data);
  };
  const kabupatenKota = async (id) => {
    const respon = await kabupaten(id);

    setdatakabupaten(respon.data);
  };
  const subdistrict = async (id_distrik) => {
    const ren = await kecamatan(id_distrik);
    setdatakecamatan(ren.data);
  };
  const village = async (id_lurah) => {
    const r = await kelurahan(id_lurah);
    setdatakelurahan(r.data);
  };

  const handleSelectChange = (event, target) => {
    const selectedValue = event.target.value;
    const updatedAddress = { ...createAddress };
    if (selectedValue != "Provinsi" && target === "target propinsi") {
      const selectedProvinsiData = dataProvinsi.find(
        (data) => data.id === selectedValue
      );
      updatedAddress.propinsi = selectedProvinsiData.name.toLowerCase();
      setdatakabupaten([0]);
      setdatakecamatan([0]);
      setdatakelurahan([0]);
      kabupatenKota(selectedValue);
    } else if (selectedValue != "Kabupaten" && target === "target kabupaten") {
      const selectedkabupatenData = datakabupaten.find(
        (data) => data.id === selectedValue
      );
      updatedAddress.kabupaten = selectedkabupatenData.name.toLowerCase();
      setdatakecamatan([0]);
      setdatakelurahan([0]);
      subdistrict(selectedValue);
    } else if (selectedValue != "kecamatan" && target === "target kecamatan") {
      const selectedkecamatanData = datakecamatan.find(
        (data) => data.id === selectedValue
      );
      updatedAddress.kecamatan = selectedkecamatanData.name.toLowerCase();
      setdatakelurahan([0]);
      village(selectedValue);
    } else if (selectedValue != "kelurahan" && target === "target kelurahan") {
      const selectedkelurahanData = datakelurahan.find(
        (data) => data.id === selectedValue
      );
      updatedAddress.kelurahan = selectedkelurahanData.name.toLowerCase();
    }
    setcreateAddress(updatedAddress);
  };
  return (
    <div>
      {active ? (
        false
      ) : (
        <>
          <button className={styles.btnAddress} onClick={ADD}>
            Tambah Alamat
          </button>
          <div className="" style={{}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th />
                </tr>
              </thead>
              {Address.map((item, index) => {
                return (
                  <tbody key={index} style={{ width: "100%" }}>
                    <tr>
                      <td scope="row">{item.nama}</td>
                      <td style={{ width: "50%" }}>
                        {item.propinsi}, {item.kabupaten}, {item.kecamatan},{""}
                        {item.kelurahan} {item.detail}
                      </td>
                      <td style={{ textAlign: "end", verticalAlign: "middle" }}>
                        <button onClick={() => deletedAddress(item._id)}>
                          <i
                            className="bi bi-trash3-fill"
                            style={{ color: "red", fontSize: 18 }}
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </>
      )}
      {active && (
        <div
          className="input-group"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <div style={{ width: "48%" }}>
            <div>
              <label>Nama</label>
              <Input
                onChange={hanleChange}
                name={"nama"}
                value={createAddress.nama}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <label>Detail</label>
              <div className="form-floating">
                <textarea
                  onChange={hanleChange}
                  name={"detail"}
                  value={createAddress.detail}
                  style={{ width: "100%", height: 182 }}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                ></textarea>
              </div>
            </div>
          </div>
          <div style={{ width: "48%" }}>
            <div style={{}}>
              <label>Propinsi</label>
              <select
                className="form-select"
                onChange={(e) => handleSelectChange(e, "target propinsi")}
              >
                <option selected>Provinsi</option>
                {dataProvinsi.map((i, x) => {
                  return (
                    <option key={x} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ marginTop: 15 }}>
              <label>Kabupaten</label>
              <select
                className="form-select"
                onChange={(e) => handleSelectChange(e, "target kabupaten")}
              >
                <option selected>Kabupaten</option>
                {datakabupaten.map((i, x) => {
                  return (
                    <option key={x} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ marginTop: 15 }}>
              <label>Kecamatan</label>
              <select
                className="form-select"
                onChange={(e) => handleSelectChange(e, "target kecamatan")}
              >
                <option selected>kecamatan</option>
                {datakecamatan.map((i, x) => {
                  return (
                    <option key={x} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ marginTop: 15 }}>
              <label>Kelurahan</label>
              <select
                className="form-select"
                onChange={(e) => handleSelectChange(e, "target kelurahan")}
              >
                <option selected>kelurahan</option>
                {datakelurahan.map((i, x) => {
                  return (
                    <option key={x} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={styles.btnAddress}
            style={{ width: "100%", marginTop: 20 }}
            onClick={ADDAddress}
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  );
}
