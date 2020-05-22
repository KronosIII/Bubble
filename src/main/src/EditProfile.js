import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import "./styles.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_name: "",
      new_username: "",

      user_id: "",
      session_token: "",

      username: "",
      emailaddr: "",
      password: "",
      userid: "",
      otp: "",
      status: "",
      name: "",
      userrole: "",

      language: "",
      lan_prefid: "",

      bio: "",
      bio_artifact_id: ""
    };
  }

  componentDidMount() {
    console.log("getting original user info");
    fetch("http://webdev.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUsers",
        userid: sessionStorage.getItem("user")
      })
    })
      .then(res => res.json())
      .then(result => {
        //console.log("Got the Info!!!");
        this.setState({
          user_id: result["users"][0].user_id,
          session_token: result["users"][0].session_token,
          username: result["users"][0].username,
          emailaddr: result["users"][0].email_addr,
          password: result["users"][0].password,
          userid: result["users"][0].userid,
          otp: result["users"][0].otp,
          status: result["users"][0].status,
          name: result["users"][0].name,
          userrole: result["users"][0].user_role
        })
        // console.log(this.state.user_id); //filled
        // console.log(this.state.session_token); //undef->doesnt exist from getUser
        // console.log(this.state.username); //filled
        // console.log(this.state.emailaddr); //filled
        // console.log(this.state.password); //undef
        // console.log(this.state.userid); //undef->doesnt exist from getUser
        // console.log(this.state.otp); //undef->doesnt exist from getUser
        // console.log(this.state.status); //null
        // console.log(this.state.name); //filled
        // console.log(this.state.firstname);//filled
        // console.log(this.state.lastname);//filled
        // console.log(this.state.userrole);//filled


      },


        error => {
          console.log("Bad Bad Bad");
        }

      );

    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/upcontroller.php", {

      method: "post",
      body: JSON.stringify({
        action: "getUserPrefs",
        userid: sessionStorage.getItem("user"),
        prefname: "language",

      })
    })
      .then(res => res.json())

      .then(

        result => {

          if (result.user_prefs) {
            this.setState({
              lan_prefid: result["user_prefs"][0].pref_id
            })
            console.log(this.state.lan_prefid)


          }
        },
        error => {
          alert("error!");
        }
      )

    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: sessionStorage.getItem("user"),
        artifactcategory: "bio"

      })
    })

      .then(res => res.json())
      .then(result => {
        if (result.user_artifacts) {
          this.setState({
            bio_artifact_id: result["user_artifacts"][0].artifact_id,
            bio: result["user_artifacts"][0].artifact_url

          })
          sessionStorage.setItem("bio_artifact_id", result["user_artifacts"][0].artifact_id)

        }
        // console.log(result["user_artifacts"][0].artifact_id)

      },
        error => {
          console.log("Bad Bad Bad");
        }


      )

  };

  nameChangeHandler = event => {
    this.setState({
      new_name: event.target.value
    });
    sessionStorage.setItem("new_name", this.state.new_name);
  };

  // usernameChangeHandler = event => {
  //   this.setState({
  //     new_username: event.target.value
  //   });
  //   sessionStorage.setItem("new_username", this.state.new_username);
  // };

  englishHandler = event => {
    event.preventDefault()
    sessionStorage.setItem("language", "english")
    this.setState({
      language: "english"
    })
  }
  spanishHandler = event => {
    event.preventDefault()
    sessionStorage.setItem("language", "spanish")
    this.setState({
      language: "spanish"
    })

  }

  bioChangeHandler = event => {
    event.preventDefault()
    this.setState({
      bio: event.target.value
    })
    // console.log(this.state.bio)
  }

  saveHandler = event => {

    //keep the form from actually submitting
    event.preventDefault();

    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/upcontroller.php", {

      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserPrefs",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),
        prefid: this.state.lan_prefid,
        prefname: "language",
        prefvalue: this.state.language

      })
    })
      .then(res => res.json())

      .then(

        result => {
          console.log("Changes Made to Language!");
          console.log(result)



        },
        error => {
          alert("error!");
        }
      )

    this.saveBio();
  };

  saveBio() {
    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/uacontroller.php", {

      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("user"),
        artifactid: this.state.bio_artifact_id,
        artifactcategory: "bio",
        artifacturl: this.state.bio
      })
    })

      .then(res => res.json())

      .then(

        result => {
          console.log("Changes Made to Bio!");
          console.log(result)

        },
        error => {
          alert("error!");
        }
      )

    this.saveInfo();
  }

  saveInfo() {

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUsers",
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),

        username: "",
        emailaddr: this.state.emailaddr,
        password: "Password Not handled here!!!",
        userid: sessionStorage.getItem("user"),
        otp: "OTP Not handled here!!!",
        status: this.state.status,
        name: this.state.new_name,
        firstname: "",
        lastname: "",
        userrole: this.state.userrole,
        mode: "ignorenulls"

      })
    })
      .then(res => res.json())

      .then(

        result => {
          console.log("Changes Made to Name and Username!");
          console.log(result)

          this.props.history.push('/Settings')



        },
        error => {
          alert("error!");
        }
      )




  }



  render() {

    return (

      <form className="signupPage" onSubmit={this.saveHandler}>

        <div className="SignUp">
          {(sessionStorage.getItem("language") != "spanish") && <h1 className="signUpHeading">Edit Profile</h1>}
          {(sessionStorage.getItem("language") == "spanish") && <h1 className="signUpHeading">Editar Perfil</h1>}
          <center>

            {(sessionStorage.getItem("language") != "spanish") && <div className="signUpInputLineWidth">



              <input
                className="signUpInput"
                type="text"
                placeholder="Name"
                name="psw-repeat"
                onChange={this.nameChangeHandler}
              />

              <br />
              <br />

              {/* <input
                className="signUpInput"
                type="text"
                placeholder="Username"
                name="psw-repeat"
                onChange={this.usernameChangeHandler}
              />

              <br />
              <br /> */}

              <input
                className="signUpInput"
                type="text"
                placeholder="Bio"
                name="psw-repeat"
                onChange={this.bioChangeHandler}
              />

              <br />
              <br />


              {/* {(sessionStorage.getItem("language") != "spanish") && <h1 className="langHeader">Language: {this.state.language}</h1>}
              {(sessionStorage.getItem("language") == "spanish") && <h1 className="langHeader">Lengua: {this.state.language}</h1>} */}

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
              }

              <br />

              {/* <Link to="/Settings">
                <input type='submit' className="signUp_otpButton" value="Save"/>
              </Link> */}
              <input type='submit' className="signUp_otpButton" value="Save" />


            </div>}

            {(sessionStorage.getItem("language") == "spanish") && <div className="signUpInputLineWidth">


              <input
                className="signUpInput"
                type="text"
                placeholder="Nombre"
                name="psw-repeat"
                onChange={this.nameChangeHandler}
              />


              <br />
              <br />

              <input
                className="signUpInput"
                type="text"
                placeholder="Biografía"
                name="psw-repeat"
                onChange={this.bioChangeHandler}
              />

              <br />
              <br />


              {(sessionStorage.getItem("language") != "spanish") && <h1 className="langHeader">Language: {this.state.language}</h1>}
              {(sessionStorage.getItem("language") != "spanish") && <h1 className="langHeader">Lengua: {this.state.language}</h1>}

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
              }

              <br />

              {/* <Link to="/Settings">
                <input type='submit' className="signUp_otpButton" value="Save"/>
              </Link> */}
              <input type='submit' className="signUp_otpButton" value="Confirmar" />


            </div>}
          </center>
        </div>

      </form>

    );
  }
}

export default withRouter(EditProfile);
