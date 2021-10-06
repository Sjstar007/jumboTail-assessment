import React, { useState, useEffect } from 'react';
import { Container, Col, Form } from 'react-bootstrap';
import { stockSymbolMockData } from '../mockSymbolData';
import './home.css';

export default function Home() {
  const [mockStockData, setMockStockData] = useState(stockSymbolMockData);
  const [stockData, setStockData] = useState();
  const [filteredData, setFilteredData] = useState(0);
  const [trigerTable, setTrigerTable] = useState(0);
  // const [debounceTimeout, setDebounceTimeout] = useState(0);
  const fetchStockData = async () => {
    try {
      var response = {};
      var errored = false;
      let symbol = trigerTable;
      response = await (
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=40XSVEGMM4AF2O88`
        )
      ).json();
    } catch (err) {
      errored = true;
    }
    return response;
  };

  const getStockData = async () => {
    let response = await fetchStockData();
    if (response) {
      setStockData(response);
    }
  };

  const search = event => {
    var search = event.target.value;
    setFilteredData(
      mockStockData.filter(stocks =>
        stocks.toUpperCase().includes(search.toUpperCase())
      )
    );
    console.log(filteredData);
  };
  const handleStock = getStock => {
    setTrigerTable(getStock);
  };
  const getStockTable = stock => {
    return (
      <>
        <tr>
          <td onClick={() => handleStock(stock)}>{stock}</td>
        </tr>
      </>
    );
  };
  useEffect(() => {
    getStockData();
    console.log(trigerTable);
  }, []);

  return (
    <>
      <Container>
        <Col lg={12}>
          <Form.Control type="text" placeholder="Search..." onChange={search} />

          {filteredData.length && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>{filteredData.map(stock => getStockTable(stock))}</tbody>
            </table>
          )}
        </Col>
      </Container>
    </>
  );
}
