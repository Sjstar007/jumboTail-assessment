import React, { useState, useEffect, Fragment } from 'react';
import { Container, Col, Form } from 'react-bootstrap';
import SymbolTable from './SymbolTable';
import StockPage from './StockPage';
import './home.css';

export default function Home() {
  const [singleStockData, setSingleStockData] = useState();
  const [filteredData, setFilteredData] = useState(0);

  const fetchStockData = async a => {
    var responseStockData = {};
    responseStockData = await (
      await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${a}&apikey=40XSVEGMM4AF2O88`
      )
    ).json();
    return responseStockData;
  };

  const fetchSymbolAPI = async searchKey => {
    let symbolResponse = {};
    try {
      symbolResponse = await (
        await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKey}&apikey=40XSVEGMM4AF2O88`
        )
      ).json();
    } catch (err) {
      console.log(err);
    }
    return symbolResponse;
  };

  const search = async event => {
    var searchKey = event.target.value;
    if (searchKey === ' ' || searchKey.length === 0) {
      console.log('Please Enter Somthing');
    } else {
      let response = await fetchSymbolAPI(searchKey);
      if (response) {
        setFilteredData(response['bestMatches']);
      }
    }
  };

  const handleStock = async getStock => {
    let response = await fetchStockData(getStock);
    if (response) {
      setSingleStockData(response);
    }
  };

  // useEffect(() => {
  //   getStockData();
  // }, []);

  return (
    <>
      <Container>
        <Col lg={12}>
          {singleStockData ? (
            <StockPage singleStockData={singleStockData} />
          ) : (
            <Fragment>
              <Form.Control
                type="text"
                placeholder="Search For Symbol..."
                onChange={search}
              />
              <SymbolTable
                filteredData={filteredData}
                handleStock={handleStock}
              />
            </Fragment>
          )}
        </Col>
      </Container>
    </>
  );
}
