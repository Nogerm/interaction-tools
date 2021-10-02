import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Image, Modal, Table } from '@themesberg/react-bootstrap';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default () => {

    const [showIntro, setShowIntro] = useState(false);
    const [day, setDay] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [resultContent, setResultContent] = useState(<tr></tr>);
    const [gameStarted, setGameStarted] = useState(false);

    const dayCost = [
        10,
        20,
        50,
        80,
        100,
        120,
        150,
        200,
        300,
        500,
        1000,
        5000,
        10000,
        20000,
        50000,
        100000,
        500000,
        1000000,
        5000000
    ];

    useEffect(() => {
        console.log('day update')
        updateTable();
    }, [day])

    useEffect(() => {
        console.log('players update')
        updateTable();
    }, [players])

    const reset = function () {
        setShowIntro(false);
        setDay(0);
        setPlayerName("");
        setPlayers([]);
        setResultContent(<tr></tr>);
        setGameStarted(false);
    }

    const newDay = function () {
        console.log("current day: " + day + " ,next day: " + (day + 1));
        setDay((day + 1));

        //pay
        let tempPlayers = players.map(x => x);
        tempPlayers.forEach(player => {
            if (player.end) {
                player.todayDealed = false;
                return player;
            } else {
                player.money += 100;
                player.todayDealed = false;
                return player;
            }
        });
        setPlayers(tempPlayers);
    }

    const showModal = function () {
        setShowIntro(true);
    }

    const hideModal = function () {
        setShowIntro(false);
    }

    const inputChange = function (e) {
        setPlayerName(e.target.value);
    }

    const createPlayers = function () {
        console.log(playerName);
        const playsArray = playerName.split(" ");
        let allPlayers = [];
        playsArray.forEach(pName => {
            allPlayers.push({
                name: pName,
                money: 100,
                end: false,
                todayDealed: false,
            })
        });
        setPlayers(allPlayers);
        setGameStarted(true);
    }

    const updateUser = function (index, pay) {
        let tempPlayers = players.map(x => x);
        if (pay) {
            // pay
            const newObjPay = {
                name: tempPlayers[index].name,
                money: tempPlayers[index].money - dayCost[day],
                end: false,
                todayDealed: true,
            };
            tempPlayers.splice(index, 1, newObjPay);
        } else {
            // dont, pay
            const newObjDontPay = {
                name: tempPlayers[index].name,
                money: tempPlayers[index].money,
                end: true,
                todayDealed: true,
            };
            tempPlayers.splice(index, 1, newObjDontPay);
        }
        setPlayers(tempPlayers);
    }

    const updateTable = function () {
        console.log("update table: " + JSON.stringify(players));
        if (players.length > 0) {
            const rows = players.map((row, idx) => <tr key={idx}><td><a style={{ fontSize: "20px", fontWeigh: "bold" }}>{row.name}</a></td><td><a style={{ fontSize: "24px", fontWeigh: "bold", color: row.money > 0 ? "green" : "red" }}>{row.money}</a></td><td><Button onClick={() => updateUser(idx, true)} disabled={row.end || day === dayCost.length || row.todayDealed === true} style={{ margin: "8px", backgroundColor: "green" }}>給他</Button><Button onClick={() => updateUser(idx, false)} disabled={row.end || day === dayCost.length || row.todayDealed === true} style={{ margin: "8px", backgroundColor: "red" }}>不給</Button></td></tr>);
            setResultContent(rows);
        }

    }

    return (
        <>
            <div className="vh-100 d-flex flex-column">
                <Row style={{ padding: 16, flexDirection: "row", justifyContent: 'center' }}>
                    <input value={playerName} onChange={(event) => inputChange(event)} style={{ width: "35vw", margin: "8px" }}></input>
                    <Button onClick={createPlayers} variant="secondary" style={{ width: "20vw", margin: "8px" }}>產生玩家</Button>
                    <Button onClick={reset} variant="secondary" style={{ width: "20vw", margin: "8px" }}>重置</Button>
                </Row>
                <Row style={{ padding: 16, flexDirection: "row", justifyContent: 'center' }}>
                    <Button onClick={showModal} variant="secondary" style={{ width: "20vw", margin: "8px" }}>故事</Button>
                    <Button onClick={newDay} disabled={day === dayCost.length} variant="secondary" style={{ width: "20vw", margin: "8px" }}>新的一天</Button>
                </Row>
                {gameStarted && <Row lg={true} style={{ height: "65vh", alignItems: "center" }}>
                    <Col lg={2} style={{ alignItems: "center", justifyContent: "center" }}>
                        <a style={{ fontSize: "20px", fontWeigh: "bold" }}>每天工資 100 元</a>
                        <Image src='https://i.imgur.com/GlfssAK.png' />
                    </Col>
                    <Col lg={7}>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td></td><td><a style={{ fontSize: "20px", fontWeigh: "bold" }}>總財產</a></td><td><a style={{ fontSize: "20px", fontWeigh: "bold" }}>第 {(day + 1)} 天</a></td>
                                </tr>
                                {resultContent}
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={3} style={{ alignItems: "center", justifyContent: "center" }}>
                        <a style={{ fontSize: "20px", fontWeigh: "bold" }}>給我</a>
                        <span style={{ fontSize: "40px", fontWeigh: "bold", color: "red" }}>{dayCost[day]}</span>
                        <span style={{ fontSize: "20px", fontWeigh: "bold" }}>元</span>

                        <Row>
                            <a style={{ fontSize: "20px", fontWeigh: "bold" }}>就幫你保密</a>
                        </Row>

                        <Image src='https://i.imgur.com/Ri4GwYf.png' />
                    </Col>
                </Row>}
            </div>
            <Modal size="lg" show={showIntro} onHide={hideModal}>
                <AwesomeSlider animation="cubeAnimation">
                    <div data-src="https://i.imgur.com/vcWYXod.png" />
                    <div data-src="https://i.imgur.com/ykAXdFn.png" />
                    <div data-src="https://i.imgur.com/UHmiz7z.png" />
                    <div data-src="https://i.imgur.com/ErPEw3s.png" />
                    <div data-src="https://i.imgur.com/EzVCMtA.png" />
                </AwesomeSlider>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}