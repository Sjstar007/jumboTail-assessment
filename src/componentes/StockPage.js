import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './home.css';
export default function StockPage({ singleStockData }) {
  let sign = Math.sign(singleStockData['Global Quote']['09. change']);
  return (
    <Row>
      <Col lg={6} md={6} xs={12}>
        <h1>{singleStockData['Global Quote']['01. symbol']}</h1>
        <h3 className={sign == -1 ? 'red' : 'green'}>
          <i
            className={
              sign == -1
                ? 'bi bi-caret-down-fill red'
                : 'bi bi-caret-up-fill green'
            }
          ></i>
          {singleStockData['Global Quote']['05. price']}{' '}
          <span className="fallngain">
            {singleStockData['Global Quote']['10. change percent']}
          </span>
        </h3>
      </Col>
      <Col lg={6} md={6} xs={12}>
        <Table border="1" cellpadding="1" cellspacing="1">
          <thead>
            <tr>
              <th>Detail</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Volume</td>
              <td>{singleStockData['Global Quote']['06. volume']}</td>
            </tr>
            <tr>
              <td>Last Trading Day</td>
              <td>
                {singleStockData['Global Quote']['07. latest trading day']}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
