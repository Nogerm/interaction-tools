import React, { useState } from 'react';
import { Col, Row, Button, Image, Form, Card } from '@themesberg/react-bootstrap';
import ReactCardFlip from 'react-card-flip';

export default () => {

  const [isFlipped11, setIsFlipped11] = useState(false);
  const [isFlipped12, setIsFlipped12] = useState(false);
  const [isFlipped21, setIsFlipped21] = useState(false);
  const [isFlipped22, setIsFlipped22] = useState(false);

  const [card11content, setCard11content] = useState("內容");
  const [card12content, setCard12content] = useState("人物");
  const [card21content, setCard21content] = useState("內容");
  const [card22content, setCard22content] = useState("人物");

  const [isDemo, setIsDemo] = useState(false);

  const adjPool = [
    "嘲笑過你的",
    "喜歡嘟嘴的",
    "扶老太太過馬路的",
    "愛碎碎念的",
    "愛你的",
    "可以拯救世界的",
    "願意分你一半財產的",
    "邪惡的",
    "小氣的",
    "能實現你願望的",
    "有愛心的",
    "開車不禮讓行人的",
    "欺負過你的",
    "準備要受洗的",
    "有口臭的",
    "睡著的",
    "白目的",
    "只剩一天可以活的",
    "有三個孩子的",
    "愛打人的",
    "為你慶生的",
    "會打呼的",
    "世界上最後一個",
    "正要跟你收房租的",
    "愛說冷笑話的",
    "剛出生的",
    "咳嗽不摀住嘴巴的"
  ];

  const peoplePool = [
    "同學",
    "死刑犯",
    "家長",
    "網紅",
    "乞丐",
    "億萬富翁",
    "酸民",
    "你自己",
    "你的爸爸媽媽",
    //"你的小孩",
    "醫生",
    "超級英雄",
    "牧師",
    "老奶奶",
    //"幼稚園兒童",
    "老師",
    "大學室友",
    "陌生人",
    "搶匪",
    "新聞記者",
    "一群黑道",
    //"恐怖組織",
    //"五歲小孩",
    "總統",
    "警察",
    "狗狗",
    "孕婦",
    "科學家"
  ];

  const getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const setDemo = function (e) {
    console.log(e.target.checked);
    setIsDemo(e.target.checked);
  }

  const handleClick11 = function (e) {

    if (!isFlipped11) {
      if (isDemo) {
        setCard11content("無罪的");
      } else {
        const idx = getRndInteger(0, adjPool.length);
        setCard11content(adjPool[idx]);
      }
    }

    setIsFlipped11(!isFlipped11);
  }


  const handleClick12 = function (e) {

    if (!isFlipped12) {
      if (isDemo) {
        setCard12content("耶穌");
      } else {
        const idx = getRndInteger(0, peoplePool.length);
        setCard12content(peoplePool[idx]);
      }
    }

    setIsFlipped12(!isFlipped12);
  }


  const handleClick21 = function (e) {

    if (!isFlipped21) {
      if (isDemo) {
        setCard21content("很普通不一定很好的");
      } else {
        const idx = getRndInteger(0, adjPool.length);
        setCard21content(adjPool[idx]);
      }
    }

    setIsFlipped21(!isFlipped21);
  }


  const handleClick22 = function (e) {

    if (!isFlipped22) {
      if (isDemo) {
        setCard22content("我們");
      } else {
        const idx = getRndInteger(0, peoplePool.length);
        setCard22content(peoplePool[idx]);
      }
    }

    setIsFlipped22(!isFlipped22);
  }

  const reset = function () {
    setIsFlipped11(false);
    setIsFlipped12(false);
    setIsFlipped21(false);
    setIsFlipped22(false);
  }

  return (
    <>
      <div className="vh-100 d-flex flex-column">
        <Row lg={true}>
          <Col lg={4}>
            <Image src='https://i.imgur.com/FHEAo0F.png' style={{ height: '80vh' }} >
            </Image>
            <Row>
              <Button variant="primary" onClick={reset} variant="secondary">重置</Button>
              <Form.Check
                label='demo'
                checked={isDemo}
                onChange={setDemo} />
            </Row>
          </Col>
          <Col lg={3}>
            <Row>
              <ReactCardFlip isFlipped={isFlipped11} flipDirection="horizontal">
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/NlID6Zo.png?1' variant="top" />
                  <Card.Title>形容詞卡</Card.Title>
                  <Button variant="primary" onClick={handleClick11} variant="secondary">抽卡</Button>
                </Card>
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3vVWzWb.png?1' variant="top" />
                  <Card.Title>{card11content}</Card.Title>
                </Card>
              </ReactCardFlip>
            </Row>
            <Row>
              <ReactCardFlip isFlipped={isFlipped21} flipDirection="horizontal">
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/NlID6Zo.png?1' variant="top" />
                  <Card.Title>形容詞卡</Card.Title>
                  <Button variant="primary" onClick={handleClick21} variant="secondary">抽卡</Button>
                </Card>
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3vVWzWb.png?1' variant="top" />
                  <Card.Title>{card21content}</Card.Title>
                </Card>
              </ReactCardFlip>
            </Row>
          </Col>
          <Col lg={3}>
            <Row>
              <ReactCardFlip isFlipped={isFlipped12} flipDirection="horizontal">
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3oglm1G.png?1' variant="top" />
                  <Card.Title>人物卡</Card.Title>
                  <Button variant="primary" onClick={handleClick12} variant="secondary">抽卡</Button>
                </Card>
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3vVWzWb.png?1' variant="top" />
                  <Card.Title>{card12content}</Card.Title>
                </Card>
              </ReactCardFlip>
            </Row>
            <Row>
              <ReactCardFlip isFlipped={isFlipped22} flipDirection="horizontal">
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3oglm1G.png?1' variant="top" />
                  <Card.Title>人物卡</Card.Title>
                  <Button variant="primary" onClick={handleClick22} variant="secondary">抽卡</Button>
                </Card>
                <Card style={{ height: "40vh", alignItems: "center" }}>
                  <Card.Img src='https://i.imgur.com/3vVWzWb.png?1' variant="top" />
                  <Card.Title>{card22content}</Card.Title>
                </Card>
              </ReactCardFlip>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
