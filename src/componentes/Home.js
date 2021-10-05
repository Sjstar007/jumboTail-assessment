import React, { useState, useEffect } from 'react';
import { Container, Col, Form } from 'react-bootstrap';
import './home.css';

export default function Home() {
  const [stockData, setStockData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [trigerTable, setTrigerTable] = useState(null);
  // const [debounceTimeout, setDebounceTimeout] = useState(0);
  const fetchStockData = async () => {
    try {
      var response = {};
      var errored = false;
      response = await (
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
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
      stockData.filter(stocks =>
        stocks.type.toUpperCase().includes(search.toUpperCase())
      )
    );
  };
  const getStockTable = stock => {
    return <></>;
  };
  useEffect(() => {
    getStockData();
  }, []);

  return (
    <>
      <Container>
        <Col lg={12}>
          <Form.Control type="text" placeholder="Search..." onChange={search} />
          {filteredData.length ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>{filteredData.map(stock => getStockTable(stock))}</tbody>
            </table>
          ) : null}
        </Col>
      </Container>
    </>
  );
}
