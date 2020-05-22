import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import "./styles.css";

class DeleteAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteConfirm: "",
      targetValue: "Delete my account",
      spaTargetValue: "Borrar mi cuenta",
      match: false,
      showError: false,
    };
  }

  deleteConfirmHandler = event => {
    this.setState({
      deleteConfirm: event.target.value
    });

    if (this.state.deleteConfirm.length >= 16) {
      if (String(this.state.targetValue.trim()).includes(String(this.state.deleteConfirm))) {
        console.log("delete")
        this.setState({
          match: true
        })
      }
      else {
      }
    }
  };

  spaDeleteConfirmHandler = event => {
    this.setState({
      deleteConfirm: event.target.value
    });
    if (this.state.deleteConfirm.length >= 15) {
      if (String(this.state.spaTargetValue.trim()).includes(String(this.state.deleteConfirm))) {
        console.log("delete")
        this.setState({
          match: true
        })
      }
      else {
      }
    }
  };


  //if yes is clicked delete acc and send user to welcome page
  yesHandler = event => {

    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    if (this.state.match) {
      fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/usercontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "deleteUsers",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),


        })
      })
        .then(res => res.json())

        .then(

          result => {
            console.log("Account Deleted!");
            console.log(result)
            sessionStorage.clear("user")
            this.props.history.push('/')

          },
          error => {
            alert("error!");
          }
        )
    }
    else {
      console.log("grrr")
      this.setState({
        showError: true
      });
    }




  };

  render() {

    return (

      <form className="signupPage" onSubmit={this.yesHandler}>

        <div className="SignUp">
          {(sessionStorage.getItem("language") != "spanish") && <h1 className="signUpHeading">Delete Account</h1>}
          {(sessionStorage.getItem("language") == "spanish") && <h1 className="signUpHeading">Borrar mi Cuenta</h1>}
          <center>
            {this.state.showError && <div id="loginErrorMessage">
              {(sessionStorage.getItem("language") != "spanish") && <p>Input did not match delete account requirements!</p>}
              {(sessionStorage.getItem("language") == "spanish") && <p>¡Lo que escribiste no iguala con los requisitos!</p>}
            </div>}
            {(sessionStorage.getItem("language") != "spanish") &&
              <React.Fragment>
                <p className="deleteWarning">Please be sure that you want to delete your account!!!</p>
                <p className="deleteWarningInstructions">To confirm that you are deleting this account, please type in:</p>
                <p className="deleteWarningString">"Delete my account"</p>
              </React.Fragment>}
            {(sessionStorage.getItem("language") == "spanish") &&
              <React.Fragment>
                <p className="deleteWarning">¡¡¡Por favor, estés seguro que quires borrar tu cuenta!!!</p>
                <p className="deleteWarningInstructions">Para confirmar que quieres borrar esta cuenta, escribe:</p>
                <p className="deleteWarningString">"Borrar mi cuenta"</p>
              </React.Fragment>}

            <div className="signUpInputLineWidth">

              {(sessionStorage.getItem("language") != "spanish") && <input
                className="signUpInput"
                type="text"
                placeholder="Type Here"
                name="psw-repeat"
                onChange={this.deleteConfirmHandler}
              />}
              {(sessionStorage.getItem("language") == "spanish") && <input
                className="signUpInput"
                type="text"
                placeholder="Escribe aqui"
                name="psw-repeat"
                onChange={this.spaDeleteConfirmHandler}
              />}

              <br />
              <br />

              {/* <Link to="/Settings">
                <input type='submit' className="signUp_otpButton" value="Save"/>
              </Link> */}

              {(sessionStorage.getItem("language") != "spanish") && <input type='submit' id="confirmDeleteButton" value="Confirm Delete Account" />}
              {(sessionStorage.getItem("language") == "spanish") && <input type='submit' id="confirmDeleteButton" value="Confirmar Borrar mi Cuenta" />}
              <Link to="/Settings">
                {(sessionStorage.getItem("language") != "spanish") && <h3 className="nevermind">Nevermind, Save my Account!</h3>}
                {(sessionStorage.getItem("language") == "spanish") && <h3 className="nevermind">¡Me importa de mi cuenta! ¡Sálvala!</h3>}
              </Link>

            </div>
          </center>
        </div>

      </form>

    );
  }
}

export default withRouter(DeleteAcc);
