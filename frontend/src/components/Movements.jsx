import { useEffect, useState } from "react";
import "../style/Movements.css";

function Movements() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movements/1/2025/2")
      .then((res) => res.json())
      .then((data) => {
        data.length > 0 ? setMovements(data) : setMovements([]);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <td>Data</td>
          <td>Descrizione</td>
          <td>Categoria</td>
          <td>Importo</td>
        </tr>
      </thead>
      <tbody>
        {movements.length > 0 ? (
          movements.map((movement, index) => {
            console.log(movement);
            return (
              <tr key={index}>
                <td>{movement.date}</td>
                <td>{movement.description}</td>
                <td>{movement.category}</td>
                <td className="amount">{"€" + movement.amount.toFixed(2)}</td>
              </tr>
            );
          })
        ) : (
          <tr className="empty">
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Movements;
