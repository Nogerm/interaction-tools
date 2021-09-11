import React, { useState } from 'react';
import { Col, Row, Button, Image, Card, Modal, Table } from '@themesberg/react-bootstrap';
import ReactCardFlip from 'react-card-flip';

export default () => {

    const [isFlipped1, setIsFlipped1] = useState(false);
    const [isFlipped2, setIsFlipped2] = useState(false);

    const [card1content, setCard1content] = useState("內容");
    const [card2content, setCard2content] = useState("人物");

    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState([]);
    const [resultContent, setResultContent] = useState("");
    const [successRate, setSuccessRate] = useState(0);

    const todoPool = [
        "剩 2 小時沒交會被當掉的期末報告",
        "剩 5 分鐘要出門，不然上班會遲到",
        "跟朋友約好 5 分鐘後出門",
        "今天放假想在家安靜休息",
        "正在跟老闆開會",
        "要趕上 10 分鐘後出發的火車",
        "正在睡覺",
        "剩 10 分鐘要接小孩下課",
        "和對象約好 10 分鐘後出門約會",
        "正要和家人出門家庭旅遊",
        "今天剛好有空",
        "今天有點無聊"
    ];

    const helpPool = [
        "花 2 小時，幫忙找不見的 10 塊錢",
        "花 1 小時，聽他説以前的故事",
        "花 2 小時，幫忙送修電視機",
        "花 1.5 小時，幫忙寫信跟送信",
        "花 1 小時，幫忙搬傢俱",
        "花 1 天，幫忙打掃家裡",
        "花 2 小時，教他怎麼用手機",
        "花 1 小時，幫忙請人來修水管",
        "花 2 小時，幫忙通馬桶",
        "花 2 小時，陪他吃飯",
    ];

    const getRndInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const handleClick1 = function (e) {

        const todoIdx = getRndInteger(0, todoPool.length);
        setCard1content(todoPool[todoIdx])
        setIsFlipped1(true);

    }

    const handleClick2 = function (e) {

        const helpIdx = getRndInteger(0, helpPool.length);
        setCard2content(helpPool[helpIdx])
        setIsFlipped2(true);
    }

    const reset = function () {
        setIsFlipped1(false);
        setIsFlipped2(false);
    }

    const handleHelp = function () {
        const event = {
            "todo": card1content,
            "help": card2content,
            "decision": true
        };

        history.push(event);
        console.log(history);
        setHistory(history);

        reset();
    }

    const handleNotHelp = function () {
        const event = {
            "todo": card1content,
            "help": card2content,
            "decision": false
        };

        history.push(event);
        console.log(history);
        setHistory(history);

        reset();
    }

    const showModal = function () {
        console.log("showModal");
        const rows = history.map((row, index) => <tr key={index}><td>{row.todo}</td><td>{row.help}</td><td>{row.decision ? "幫忙" : "改天"}</td></tr>);
        setResultContent(rows);

        const successCnt = history.filter(row => row.decision).length;
        setSuccessRate((successCnt / history.length * 100).toFixed(2));

        setShowResult(true);
    }

    const hideModal = function () {
        setShowResult(false);
    }

    return (
        <>
            <div className="vh-100 d-flex flex-column">
                <Row style={{ padding: 16 }}>
                    {/* <Button onClick={reset} variant="secondary">新的一天</Button> */}
                </Row>
                <Row lg={true} style={{ height: "65vh", alignItems: "center" }}>
                    <Col lg={3}>
                        <Image src='https://i.imgur.com/rfXcxUe.png' />
                    </Col>
                    <Col lg={3}>
                        <ReactCardFlip isFlipped={isFlipped1} flipDirection="horizontal">
                            <Card style={{ height: "40vh", alignItems: "center" }}>
                                <Card.Img src='https://i.imgur.com/NlID6Zo.png?1' variant="top" />
                                <Card.Title>今天要做的事</Card.Title>
                                <Button variant="primary" onClick={handleClick1} variant="secondary" > 抽卡</Button>
                            </Card>
                            <Card style={{ height: "40vh", alignItems: "center" }}>
                                <Card.Img src='https://i.imgur.com/mWrsFX7.png' variant="top" />
                                <Card.Title>{card1content}</Card.Title>
                            </Card>
                        </ReactCardFlip>
                    </Col>
                    <Col lg={3}>
                        <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                            <Card style={{ height: "40vh", alignItems: "center" }}>
                                <Card.Img src='https://i.imgur.com/NlID6Zo.png?1' variant="top" />
                                <Card.Title>老奶奶要幫忙的事</Card.Title>
                                <Button variant="primary" onClick={handleClick2} variant="secondary"> 抽卡</Button>
                            </Card>
                            <Card style={{ height: "40vh", alignItems: "center" }}>
                                <Card.Img src='https://i.imgur.com/NoKVGGA.png' variant="top" />
                                <Card.Title >{card2content}</Card.Title>
                            </Card>
                        </ReactCardFlip>
                    </Col>
                    <Col lg={3}>
                        <Image src='https://i.imgur.com/TbCefxu.png' onClick={showModal} />
                    </Col>
                </Row>
                <Row style={{ padding: 16, flexDirection: "row", justifyContent: 'space-between' }}>
                    <Button style={{ width: "30vw", marginLeft: 16, backgroundColor: "red" }} onClick={handleNotHelp}>改天再幫</Button>
                    <Button style={{ width: "30vw", marginRight: 16, backgroundColor: "green" }} onClick={handleHelp}>我要幫忙</Button>
                </Row>
            </div>
            <Modal size="lg" show={showResult} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>統計結果：幫忙率{successRate} %</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <tbody>
                            {resultContent}
                        </tbody>
                    </Table></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
