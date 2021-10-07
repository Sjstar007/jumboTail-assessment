import React, { useState, useEffect, Fragment } from 'react';
import { Container, Col, Form } from 'react-bootstrap';
import SymbolTable from './SymbolTable';
import StockPage from './StockPage';
import './home.css';

/**
 * @typedef {Object} responseStockData - This holds the Single stock response
 *
 * @typedef {Object} symbolResponse - This holds the symbol response
 */

/**
 * @function Home This functional component handles the symbol list and pass the stock data
 *
 * @property {singleStockData} stockData
 *    List of Data of Single Stock
 * @property {filteredData} filteredData
 *    List of all Stock Symbol
 */

export default function Home() {
  const [singleStockData, setSingleStockData] = useState();
  const [filteredData, setFilteredData] = useState(0);

  //This Function resturn the symbols that are searched by user
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

  // This function get the value from search input field and call the function fetchSymbolAPI
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

  // This function fetches the Stock Detail from the given api of alphavantage
  const fetchStockData = async a => {
    var responseStockData = {};
    responseStockData = await (
      await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${a}&apikey=40XSVEGMM4AF2O88`
      )
    ).json();
    return responseStockData;
  };

  // This function handles the click event of symbols to get there detaiil
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
