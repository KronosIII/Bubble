import React from "react";
import Logo from "./logo.png";
import {
  Link
} from "react-router-dom";
import "./styles.css";



class Welcome extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  componentDidMount() {
    this.checkBrowser();
  }

  checkBrowser=()=>
  {  const {detect} = require('detect-browser');
    const browser = detect();

    if(browser.name === "safari" || browser.name === "firefox") {
      alert("Hey! It seems like you're using Safari or Mozilla Firefox. Bubble works best with Google Chrome, Microsoft Edge, or the Opera browser. Please consider switching to these browsers for a better experience.");
    }
  }

  render() {
    return (
      <center id="welcomeCenter">
        <div id="welcomepage">
          <div className="welcomeScreenDiv">
            <img className="welcomeScreenImage" src={Logo} alt="Logo" />
            <br /> <br />
            <center>
              <div className="allWelcomeButtons">
                <button class="welcomeScreenButton">
                  <Link to="/Login"><span>CLICK</span></Link>
                </button>
                <button class="welcomeScreenButton">
                  <Link to="/Styles"><span>Style Guide</span></Link>
                </button>
              </div>
            </center>
          </div>
        </div>
      </center>
    );
  }
}

export default Welcome;


