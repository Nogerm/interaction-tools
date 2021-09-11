import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { TransactionsTable } from "../components/Tables";
import firebase from 'firebase';
import HPlatform, { HMap, HMapMarker } from "react-here-map";

// Firebase Config
const config = {
  apiKey: "AIzaSyDqYPv1nS5Gs5BZfXTk3iXQbsXP3m2eAn8",
  authDomain: "soteria-map.firebaseapp.com",
  databaseURL: "https://soteria-map-default-rtdb.firebaseio.com",
  projectId: "soteria-map",
  storageBucket: "soteria-map.appspot.com",
  messagingSenderId: "417792025757",
  appId: "1:417792025757:web:17616765085ee5ed046074",
  measurementId: "G-WXPJKBHHXM"
};

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.database();

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

export default () => {

  const [points, setPoints] = useState([
    { lat: 52.5309825, lng: 13.3845921 },
    { lat: 52.5311923, lng: 13.3853495 },
    { lat: 52.5313532, lng: 13.3861756 },
    { lat: 52.5315142, lng: 13.3872163 },
    { lat: 52.5316215, lng: 13.3885574 },
    { lat: 52.5320399, lng: 13.3925807 },
    { lat: 52.5321472, lng: 13.3935785 },
  ]);

  const [lastPos, setLastPos] = useState(
    { lat: 20.1309825, lng: 120.5845921 }
  );

  const [mapZoom, setMapZoom] = useState(5);

  useEffect(() => {
    db.ref('geo').get().then(data => {
      const dataObj = data.toJSON();
      console.log("get geo location from firebase ok " + JSON.stringify(dataObj));
      updateLastPos(dataObj.lat, dataObj.long, 10)
    }).catch(error => {
      console.log("get geo location from firebase error " + error);
    });
  }, []);

  useEffect(() => {
    console.log("last pos change " + JSON.stringify(lastPos));
  }, [lastPos]);

  useEffect(() => {
    console.log("zoom change " + mapZoom);
  }, [mapZoom]);

  const updateLastPos = function (lat, lng, zoom) {
    setMapZoom(zoom);
    const newPos = {
      lat: lat,
      lng: lng
    }
    setLastPos(newPos);
  }

  const zoomIn = function () {
    setMapZoom(mapZoom + 1);
  }

  const zoomOut = function () {
    setMapZoom(mapZoom - 1);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb>
          <h4>即時位置</h4>
          <p className="mb-0">標註最近出現的位置</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <HPlatform
        app_id="1W1r00I57rNQwKKCRno8"
        //app_code="YOUR_APP_CODE"
        apikey={"GIsY09c5FM2IjH9z205WcQtWanVNEtyHi6JLODM-KpA"}
        //useCIT
        useHTTPS
        interactive
        includeUI
      //includePlaces
      >
        <HMap
          style={{
            height: "640px",
            width: "1024px",
          }}
          mapOptions={{
            center: lastPos,
            zoom: mapZoom,
            //pixelRatio: window.devicePixelRatio || 1
          }}
        >
          <HMapMarker coords={lastPos} icon={icon} />
        </HMap>
      </HPlatform>
      <ButtonGroup>
        <Button variant="outline-primary" size="sm" onClick={zoomIn}>Zoom in</Button>
        <Button variant="outline-primary" size="sm" onClick={zoomOut}>Zoom out</Button>
      </ButtonGroup>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <TransactionsTable />
    </>
  );
};
