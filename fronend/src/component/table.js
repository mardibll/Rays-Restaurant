import React from "react";

export default function Table({ item,checked,hanleCheck }) {
  return (
    <tbody >
      <tr>
        <th scope="row">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id={`flexCheckChecked_${item._id}`}
              checked={checked}
              onChange={() => hanleCheck(item._id)}
            />
          </div>
        </th>
        <td>{item.nama}</td>
        <td style={{ width: "60%" }}>
          {item.propinsi} {item.kabupaten} {item.kecamatan} {item.kelurahan}{" "}
          {item.detail}
        </td>
      </tr>
    </tbody>
  );
}
