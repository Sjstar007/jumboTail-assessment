import React from 'react';
import { Form } from 'react-bootstrap';
import './home.css';

export default function SymbolTable({ filteredData, handleStock }) {
  const getStockTable = stock => {
    return (
      <>
        <tr className="trow">
          <td onClick={() => handleStock(stock['1. symbol'])}>
            {stock['1. symbol']}
          </td>
        </tr>
      </>
    );
  };
  return (
    <>
      {filteredData.length && (
        <table border="1" className="table">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{filteredData.map(stock => getStockTable(stock))}</tbody>
        </table>
      )}
    </>
  );
}
