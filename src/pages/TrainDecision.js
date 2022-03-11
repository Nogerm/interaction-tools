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
    "扶老太太過馬路的",
    "愛你的",
    "可以拯救世界的",
    "願意分你一半財產的",
    "能實現你願望的",
    "有愛心的",
    "準備要受洗的",
    "睡著的",
    "有三個孩子的",
    "為你慶生的",
    "世界上最後一個",
    "愛說冷笑話的",
    "從小一起長大的",
    "友善的",
    "曾經幫助過你的",
    "常常請你吃飯的",
  ];

  const adjBadPool = [
    "嘲笑過你的",
    "喜歡嘟嘴的",
    "愛碎碎念的",
    "愛炫耀的",
    "開車不禮讓行人的",
    "欺負過你的",
    "有口臭的",
    "只剩一天可以活的",
    "愛打人的",
    "滿嘴謊言的",
    "世界上最後一個",
    "正要跟你收房租的",
    "咳嗽不摀住嘴巴的",
    "跟你意見不合的",
    "很機車的",
    "囂張的",
    "愛亂爆雷的",
    "常在背後說你壞話的",
  ];

  const peoplePool = [
    "家長",
    "網紅",
    "億萬富翁",
    "你自己",
    "醫生",
    "超級英雄",
    "牧師",
    "老奶奶",
    "老師",
    "大學室友",
    "總統",
    "警察",
    "狗狗",
    "孕婦",
    "科學家",
    "舊情人",
    "你的粉絲",
  ];

  const peopleBadPool = [
    "死刑犯",
    "酸民",
    "陌生人",
    "搶匪",
    "新聞記者",
    "一群黑道",
    "外星人",
    "馬路三寶",
    "奸商",
    "高調放閃情侶",
    "詐騙集團",
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
        const idx = getRndInteger(0, peopleBadPool.length);
        setCard12content(peopleBadPool[idx]);
      }
    }

    setIsFlipped12(!isFlipped12);
  }


  const handleClick21 = function (e) {

    if (!isFlipped21) {
      if (isDemo) {
        setCard21content("很普通不一定很好的");
      } else {
        const idx = getRndInteger(0, adjBadPool.length);
        setCard21content(adjBadPool[idx]);
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
