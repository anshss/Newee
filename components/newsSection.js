import { useState, useEffect } from "react";
import { contractAddress } from "../address.js";
import contractAbi from "../artifacts/contracts/NewsDapp.sol/NewsDapp.json";
import web3modal from "web3modal";
import { ethers } from "ethers";

export default function Home() {

  const [news, setNews] = useState([])

    useEffect(() => {
      fetchNews();
    }, []);

  // fetches articles from contract
  const fetchNews = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/1dbc3ef8703a4669a5cda4f7de7343bc');
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider)
    const data = await contract.fetchNews();
    const cards = await Promise.all(
      data.map(async (i) => {
      let card = {
        address: i.author,
        title: i.title,
        content: i.content,
        time: i.time,
        upvote: i.upvote.toNumber(),
        tokenId: i.tokenId.toNumber(),
      };
      return card;
    })
    )
    console.log(cards)
    setNews(cards)
  }

  //increases upvote on a news article
  const increaseUpvote = async (tokenId) => {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
    const data = await contract.increaseUpvote(tokenId);
    await data.wait();
  }

  //transfers 1 Matic from user wallet to author wallet
  const transferSupport = async (tokenId) => {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
    const supportPrice = 1;
    const msgValue =ethers.utils.formatUnits(supportPrice, 18)
    const data = await contract.transferSupport(tokenId, {
      value: msgValue,
    });
    await data.wait();
  }

  return (
    <div className="newsSlider">
      <section className="section slider html">

        <style jsx global>
          {`
          .newsSlider{
            min-height: 100vh;
          }
pre, textarea {
  overflow: auto;
}

[hidden], audio:not([controls]), template {
  display: none;
}

details, main, summary {
  display: block;
}

input[type=number] {
  width: auto;
}

input[type=search], input[type=text], input[type=email] {
  -webkit-appearance: none;
}

input[type="*"] {
  -webkit-appearance: none;
}

input[type=search]::-webkit-search-cancel-button, input[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

progress {
  display: inline-block;
}

small {
  font-size: 100%;
}

textarea {
  resize: vertical;
}

[unselectable] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

*, ::after, ::before {
  box-sizing: inherit;
  border-style: solid;
  border-width: 0;
}

* {
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
}

::after, ::before {
  text-decoration: inherit;
  vertical-align: inherit;
}

:root {
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-y: scroll;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
  box-sizing: border-box;
  cursor: default;
  font: 16px/1.5 sans-serif;
  text-rendering: optimizeLegibility;
}

a {
  text-decoration: none;
}

audio, canvas, iframe, img, svg, video {
  vertical-align: middle;
}

button, input, select, textarea {
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  min-height: 1.5em;
}

code, kbd, pre, samp {
  font-family: monospace,monospace;
}

nav ol, nav ul {
  list-style: none;
}

ul li {
  list-style: none;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
}

select::-ms-expand {
  display: none;
}

select::-ms-value {
  color: currentColor;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

::-moz-selection {
  background-color: #B3D4FC;
  text-shadow: none;
}

::selection {
  background-color: #B3D4FC;
  text-shadow: none;
}

@media screen {
  [hidden~=screen] {
    display: inherit;
  }

  [hidden~=screen]:not(:active):not(:focus):not(:target) {
    clip: rect(0 0 0 0) !important;
    position: absolute !important;
  }
}
.html {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  -webkit-tap-highwhite-color: transparent;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
li {
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

.heading-2 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  color: #000;
  letter-spacing: 0.3px;
}

.heading-2--white {
  color: #FFF;
}

.serif {
  font-family: "Arnhem";
  font-size: 24px;
  font-weight: 100;
  line-height: 38px;
  color: #3E4954;
}

@media (max-width: 400px) {
  .serif {
    font-size: 20px;
    line-height: 32px;
  }
}
.heading-3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #3E4954;
  letter-spacing: 0.3px;
}

.heading-3 + .heading-3 {
  margin-top: 5px;
}

.heading-3--white {
  color: #FFF;
}

.heading-3--light {
  color: #848995;
}

.text {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  color: #848995;
  letter-spacing: 0px;
}

@media (max-width: 600px) {
  .text {
    font-size: 16px;
    line-height: 30px;
  }
}
.text--light-white {
  color: rgba(255, 255, 255, 0.7);
}

.link {
  position: relative;
  display: inline-block;
  font-weight: 600;
  color: #5050FF;
}

.link:after {
  position: absolute;
  top: 50%;
  right: -32px;
  display: block;
  width: 24px;
  height: 14px;
  background-image: url("../images/slider/arrow__right--blue.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  content: '';
  transform: translateY(-50%);
  transition: all 0.2s ease;
  cubic-bezier(0.4, 0.0, 0.2, 1);
}

.link:hover:after {
  right: -48px;
}

body {
    background-color: #000000;
}

.slider__item {
  transition: all 0.3s ease;
  -webkit-transition-timing-function: 
    cubic-bezier(0.4, 0.0, 0.2, 1);
		transition-timing-function: 
     cubic-bezier(0.4, 0.0, 0.2, 1);
}

#slide-1:checked ~ .slider__holder .slider__item--1 {
  position: relative;
  z-index: 2;
  transform: translate(0) scale(1);
}

#slide-2:checked ~ .slider__holder .slider__item--1 {
  z-index: 1;
  transform: translateX(-100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-2:checked ~ .slider__holder .slider__item--1 {
    opacity: 0.6;
  }
}
#slide-3:checked ~ .slider__holder .slider__item--1 {
  z-index: 0;
  transform: translateX(-210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-3:checked ~ .slider__holder .slider__item--1 {
    transform: translateX(-170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-3:checked ~ .slider__holder .slider__item--1 {
    opacity: 0;
  }
}
#slide-4:checked ~ .slider__holder .slider__item--1 {
  z-index: -1;
  opacity: 0;
  transform: translateX(-210px) scale(0.65);
}

#slide-5:checked ~ .slider__holder .slider__item--1 {
  z-index: -1;
  opacity: 0;
  transform: translateX(-210px) scale(0.65);
}

#slide-1:checked ~ .slider__holder .slider__item--2 {
  z-index: 1;
  transform: translateX(100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-1:checked ~ .slider__holder .slider__item--2 {
    opacity: 0.6;
  }
}
#slide-2:checked ~ .slider__holder .slider__item--2 {
  position: relative;
  z-index: 2;
  transform: translate(0) scale(1);
}

#slide-3:checked ~ .slider__holder .slider__item--2 {
  z-index: 1;
  transform: translateX(-100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-3:checked ~ .slider__holder .slider__item--2 {
    opacity: 0.6;
  }
}
#slide-4:checked ~ .slider__holder .slider__item--2 {
  z-index: 0;
  transform: translateX(-210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-4:checked ~ .slider__holder .slider__item--2 {
    transform: translateX(-170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-4:checked ~ .slider__holder .slider__item--2 {
    opacity: 0;
  }
}
#slide-5:checked ~ .slider__holder .slider__item--2 {
  z-index: -1;
  opacity: 0;
  transform: translateX(-210px) scale(0.65);
}

#slide-1:checked ~ .slider__holder .slider__item--3 {
  z-index: 0;
  transform: translateX(210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-1:checked ~ .slider__holder .slider__item--3 {
    transform: translateX(170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-1:checked ~ .slider__holder .slider__item--3 {
    opacity: 0;
  }
}
#slide-2:checked ~ .slider__holder .slider__item--3 {
  z-index: 1;
  transform: translateX(100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-2:checked ~ .slider__holder .slider__item--3 {
    opacity: 0.6;
  }
}
#slide-3:checked ~ .slider__holder .slider__item--3 {
  position: relative;
  z-index: 2;
  transform: translate(0) scale(1);
}

#slide-4:checked ~ .slider__holder .slider__item--3 {
  z-index: 1;
  transform: translateX(-100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-4:checked ~ .slider__holder .slider__item--3 {
    opacity: 0.6;
  }
}
#slide-5:checked ~ .slider__holder .slider__item--3 {
  z-index: 0;
  transform: translateX(-210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-5:checked ~ .slider__holder .slider__item--3 {
    transform: translateX(-170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-5:checked ~ .slider__holder .slider__item--3 {
    opacity: 0;
  }
}
#slide-1:checked ~ .slider__holder .slider__item--4 {
  z-index: -1;
  opacity: 0;
  transform: translateX(210px) scale(0.65);
}

#slide-2:checked ~ .slider__holder .slider__item--4 {
  z-index: 0;
  transform: translateX(210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-2:checked ~ .slider__holder .slider__item--4 {
    transform: translateX(170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-2:checked ~ .slider__holder .slider__item--4 {
    opacity: 0;
  }
}
#slide-3:checked ~ .slider__holder .slider__item--4 {
  z-index: 1;
  transform: translateX(100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-3:checked ~ .slider__holder .slider__item--4 {
    opacity: 0.6;
  }
}
#slide-4:checked ~ .slider__holder .slider__item--4 {
  position: relative;
  z-index: 2;
  transform: translate(0) scale(1);
}

#slide-5:checked ~ .slider__holder .slider__item--4 {
  z-index: 1;
  transform: translateX(-100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-5:checked ~ .slider__holder .slider__item--4 {
    opacity: 0.6;
  }
}
#slide-1:checked ~ .slider__holder .slider__item--5 {
  z-index: -1;
  opacity: 0;
  transform: translateX(210px) scale(0.65);
}

#slide-2:checked ~ .slider__holder .slider__item--5 {
  z-index: -1;
  opacity: 0;
  transform: translateX(210px) scale(0.65);
}

#slide-3:checked ~ .slider__holder .slider__item--5 {
  z-index: 0;
  transform: translateX(210px) scale(0.65);
}

@media (max-width: 900px) {
  #slide-3:checked ~ .slider__holder .slider__item--5 {
    transform: translateX(170px) scale(0.65);
  }
}
@media (max-width: 768px) {
  #slide-3:checked ~ .slider__holder .slider__item--5 {
    opacity: 0;
  }
}
#slide-4:checked ~ .slider__holder .slider__item--5 {
  z-index: 1;
  transform: translateX(100px) scale(0.85);
}

@media (max-width: 768px) {
  #slide-4:checked ~ .slider__holder .slider__item--5 {
    opacity: 0.6;
  }
}
#slide-5:checked ~ .slider__holder .slider__item--5 {
  position: relative;
  z-index: 2;
  transform: translate(0) scale(1);
}

/*--------------------------------------------------------------
3.0 Bullets
--------------------------------------------------------------*/
.bullets__item {
  transition: all 0.2s ease;
}

#slide-1:checked ~ .bullets .bullets__item--1 {
  background: #FFF;
}

#slide-2:checked ~ .bullets .bullets__item--2 {
  background: #FFF;
}

#slide-3:checked ~ .bullets .bullets__item--3 {
  background: #FFF;
}

#slide-4:checked ~ .bullets .bullets__item--4 {
  background: #FFF;
}

#slide-5:checked ~ .bullets .bullets__item--5 {
  background: #FFF;
}

/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Card
2.0 Slider
3.0 Bullets
4.0 Section
5.0 Button
--------------------------------------------------------------*/
/*--------------------------------------------------------------
1.0 Card
--------------------------------------------------------------*/
.card {
  position: relative;
  display: block;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

/*--------------------------------------------------------------
2.0 Slider
--------------------------------------------------------------*/
.slider {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.slider__radio {
  display: none;
}

.slider__holder {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 80px;
  text-align: left;
}

@media (max-width: 900px) {
  .slider__holder {
    max-width: 540px;
  }
}
@media (max-width: 600px) {
  .slider__holder {
    margin-top: 60px;
  }
}
.slider__item {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  width: 100%;
  opacity: 1;
  cursor: pointer;
}

.slider__item-content {
  padding: 40px;
}

@media (max-width: 600px) {
  .slider__item-content {
    padding: 32px 32px;
  }
}
@media (max-width: 375px) {
  .slider__item-content {
    padding: 40px 24px;
  }
}
.slider__item-text {
  padding: 60px 0;
}


4.0 Section
--------------------------------------------------------------*/
.section {
  position: relative;
  width: 100%;
  padding: 120px 24px;
  text-align: center;
}

.section__entry {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.section__entry--center {
  text-align: center;
}

.section__title {
  display: block;
  padding-bottom: 12px;
}

.section__text {
  display: block;
}

/*--------------------------------------------------------------
5.0 Button
--------------------------------------------------------------*/
.button {
  display: inline-block;
  height: 44px;
  padding: 12px 16px;
  font-weight: 500;
  line-height: 20px;
  color: #FFF;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.2);
}

.button:hover {
  background: rgba(0, 0, 0, 0.1);
}

/*--------------------------------------------------------------
4.0 All Tutorials
--------------------------------------------------------------*/
/*--------------------------------------------------------------


          `}
        </style>

        <div className="section__entry section__entry--center"></div>

        <input
          type="radio"
          name="slider"
          id="slide-1"
          className="slider__radio"
          defaultChecked
        />
        <input
          type="radio"
          name="slider"
          id="slide-2"
          className="slider__radio"
        />
        <input
          type="radio"
          name="slider"
          id="slide-3"
          className="slider__radio"
        />
        <input
          type="radio"
          name="slider"
          id="slide-4"
          className="slider__radio"
        />
        <input
          type="radio"
          name="slider"
          id="slide-5"
          className="slider__radio"
        />
        <input
          type="radio"
          name="slider"
          id="slide-6"
          className="slider__radio"
        />
        <div className="slider__holder">
          <label
            htmlFor="slide-1"
            className="slider__item slider__item--1 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider. Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>

          <label
            htmlFor="slide-2"
            className="slider__item slider__item--2 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider. Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>

          <label
            htmlFor="slide-3"
            className="slider__item slider__item--3 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider. Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>

          <label
            htmlFor="slide-4"
            className="slider__item slider__item--4 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider.Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>

          <label
            htmlFor="slide-5"
            className="slider__item slider__item--5 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider. Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>
          <label
            htmlFor="slide-6"
            className="slider__item slider__item--6 card"
          >
            <div className="slider__item-content">
              <p className="heading-3 heading-3--light">Development</p>
              <p className="heading-3">SCSS Only slider</p>
              <p className="slider__item-text serif">
                This tutorial will teach you how to create a SCSS only
                responsive slider. Feel free to read the whole tutorial or just
                download and try it by yourself.
              </p>
              <a
                className="heading-3 link"
                href="https://blog.significa.pt/css-only-slider-71727effff0b#.e5t9l7b55"
              >
                Read on Medium
              </a>
            </div>
          </label>
        </div>
      </section>
    </div>
  );
}
