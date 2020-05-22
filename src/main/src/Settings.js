import React, { Component, cloneElement, Suspense } from "react";
import "./styles.css";
import Avatar from "./avatar.png";
import NavBar from './components/NavBar';
import SideBar from "./components/SideBar";
import {
  Link,
  withRouter
} from "react-router-dom";

const profilePicture = React.lazy(() => import(this.state.profilePic_url));


class Settings extends Component {

  constructor(props) {
    super(props);
    const avatar = require("./avatar.png");
    const avatar2 = require("./avatar2.png");
    const avatar3 = require("./avatar3.png");
    const avatar4 = require("./avatar4.png");
    const avatar5 = require("./avatar5.png");
    const avatar6 = require("./avatar6.png");
    const avatar7 = require("./avatar7.png");
    const avatar8 = require("./avatar8.png");
    const avatar9 = require("./avatar9.png");
    const avatar10 = require("./avatar10.png");
    const avatar11 = require("./avatar11.png");
    const avatar12 = require("./avatar12.png");
    const avatar13 = require("./avatar13.png");
    const avatar14 = require("./avatar14.png");
    const avatar15 = require("./avatar15.png");
    const avatar16 = require("./avatar16.png");
    const avatar17 = require("./avatar17.png");
    const avatar18 = require("./avatar18.png");



    this.state = {
      name: "",
      Username: "",
      Bio: "",

      profilePic_url: "",
      profilePic: null,
      profilePicList: [avatar, avatar2, avatar3, avatar4,
        avatar5, avatar6, avatar7, avatar8, avatar9, avatar10,
        avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18],
      profilePicIndex: null,

      language: ""
    };
  }

  deleteAccHandler = event => {
    this.props.history.push('/DeleteAcc')
  }

  componentDidMount() {
    //console.log("In the fetch");
    fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: sessionStorage.getItem("user")
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log("Got the Info!!!");
        this.setState({
          // Username: result["users"][0].username,
          name: result["users"][0].name,
          language: sessionStorage.getItem("language")
        });


        sessionStorage.setItem("name", result["users"][0].name);
        // sessionStorage.setItem("username", result["users"][0].username);


        // user_id: result["users"][0].user_id,
        //   session_token: result["users"][0].session_token,
        //   username :  result["users"][0].username,
        //   emailaddr : result["users"][0].email_addr,
        //   password : result["users"][0].password,
        //   userid : result["users"][0].userid,
        //   otp : result["users"][0].otp,
        //   status : result["users"][0].status,
        //   name : result["users"][0].name,
        //   firstname : result["users"][0].first_name,
        //   lastname : result["users"][0].last_name,
        //   userrole : result["users"][0].user_role


      },

        error => {
          console.log("Bad Bad Bad");
        }
      );

    fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifactcategory: "bio"
      })
    }).then(res => res.json())
      .then(result => {
        if (result.user_artifacts) {
          this.setState({
            Bio: result["user_artifacts"][0].artifact_url
          })
        } else {
          this.setState({
            Bio: ""
          })
        }

      }, error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );


    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifact_category: "profile"
      })
    })

      .then(res => res.json())
      .then(result => {
        if (result.user_artifacts) {
          this.setState({
            // profilePic_url: result["user_artifacts"][0].artifact_url,
            profilePicIndex: result["user_artifacts"][0].artifact_url
          })


          //   console.log(result["user_artifacts"][0].artifact_url)
          console.log("Got the Pic!!!");
        }
        else {
          this.setState({
            // profilePic_url: result["user_artifacts"][0].artifact_url,
            profilePicIndex: 0
          })
        }
      },
        error => {
          console.log("Bad Bad Bad");
        }
      )

    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/upcontroller.php", {

      method: "post",
      body: JSON.stringify({
        action: "getUserPrefs",
        userid: sessionStorage.getItem("user"),
        prefname: "language"

      })
    })
      .then(res => res.json())

      .then(

        result => {
          if (result.user_prefs) {


            this.setState({
              language: result["user_prefs"][0].pref_value
            })

          }

        },
        error => {
          alert("error!");
        }
      )


  };

  render() {
    return (
      <div id="settingsContainer">
        <NavBar />
        <SideBar />
        {(sessionStorage.getItem("language") != "spanish") && <h1 className="settingsTitle"> Settings </h1>}
        {(sessionStorage.getItem("language") == "spanish") && <h1 className="settingsTitle"> Ajustes </h1>}


        <div className="settingsMinusTitle">
          <div className="editAvatar">
            <center>
              {this.state.profilePicList[this.state.profilePicIndex] && <img className="profileImage" src={this.state.profilePicList[this.state.profilePicIndex]} alt="Profile" />}
              {!this.state.profilePicList[this.state.profilePicIndex] && <img className="profileImage" src={Avatar} alt="Profile" />}
              <Link to="/ProfilePic">
                {(sessionStorage.getItem("language") != "spanish") && <button className="editAvatarButton">Edit Profile Avatar</button>}
                {(sessionStorage.getItem("language") == "spanish") && <button className="editAvatarButton">Editar su Avatar</button>}
              </Link>

            </center>
          </div>

          <div className="settingsInfo">

            <div className="settingsFieldsDiv">

              {(sessionStorage.getItem("language") != "spanish") && <h3 className="settingsText">Name: {this.state.name}</h3>}
              {(sessionStorage.getItem("language") == "spanish") && <h3 className="settingsText">Nombre: {this.state.name}</h3>}

              {/* {(sessionStorage.getItem("language") != "spanish") && <h3 className="settingsText">Username: {this.state.Username}</h3>}
              {(sessionStorage.getItem("language") == "spanish") && <h3 className="settingsText">Nombre de usuario: {this.state.Username}</h3>} */}

              {(sessionStorage.getItem("language") != "spanish") && <h3 className="settingsText">Bio: {this.state.Bio}</h3>}
              {(sessionStorage.getItem("language") == "spanish") && <h3 className="settingsText">Biografía: {this.state.Bio}</h3>}


              {(sessionStorage.getItem("language") != "spanish") && <h1 className="langHeader">Language: English</h1>}
              {(sessionStorage.getItem("language") == "spanish") && <h1 className="langHeader">Idioma: Español</h1>}


              {/* {(sessionStorage.getItem("language") != "spanish") && <h3 className="privacyPolicy"> Privacy Policy </h3>}
              {(sessionStorage.getItem("language") == "spanish") && <h3 className="privacyPolicy">La política de privicidad</h3>} */}

              <Link to="/DeleteAcc">
                {(sessionStorage.getItem("language") != "spanish") && <h3 className="deleteAccount">Delete Account</h3>}
                {(sessionStorage.getItem("language") == "spanish") && <h3 className="deleteAccount">Borrar mi Cuenta</h3>}
              </Link>

              <Link to="/EditProfile">
                <center>
                  {(sessionStorage.getItem("language") != "spanish") && <button id="settingsEditProfile">Edit Profile Info</button>}
                </center>
                <center>
                  {(sessionStorage.getItem("language") == "spanish") && <button id="settingsEditProfile">Editar la info del perfil</button>}
                </center>
              </Link>
            </div>
            <div>

              {/* {(sessionStorage.getItem("language") != "spanish") &&
              {(sessionStorage.getItem("language") != "spanish") && <h1 className="langHeader">Languages:</h1>}
              {(sessionStorage.getItem("language") == "spanish") && <h1 className="langHeader">Idiomas:</h1>}
              {(sessionStorage.getItem("language") != "spanish") &&
                <div>
                  <button onClick={this.englishHandler} className="chosenlang">English</button>
                  <button onClick={this.spanishHandler} className="unchosenlang">Español</button>
                </div>
              }
              {(sessionStorage.getItem("language") == "spanish") &&
                <div>
                  <button onClick={this.englishHandler} className="unchosenlang">English</button>
                  <button onClick={this.spanishHandler} className="chosenlang">Español</button>
                </div>
              } */}
            </div>



          </div>
        </div>
      </div>
    )
  }
};
export default withRouter(Settings);
