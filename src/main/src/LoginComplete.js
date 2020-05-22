import React, { Component } from "react";
import {
    Link,
    withRouter,
    Redirect
} from "react-router-dom";
import "./styles.css";

class LoginComplete extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({redirect: true}), 5000)

    fetch("http://stark.cse.buffalo.edu/cse410/treekings/api/upcontroller.php", {

        method: "post",
        body: JSON.stringify({
          action: "getUserPrefs",
          userid: sessionStorage.getItem("user"),
          prefname:"language",

        })
      })
      .then(res => res.json())

      .then(

        result => {

          if(result.user_prefs){

            
              this.setState({
                language: result["user_prefs"][0].pref_value
              })
              console.log(this.state.language)
              console.log("Languageee")

             

            sessionStorage.setItem("language", this.state.language)

            if(sessionStorage.getItem("first_login")){
              sessionStorage.removeItem("first_login")
              this.props.history.push('/SignUp3') //move to update rest of profile
            }
            else{
              this.props.history.push('/FeedPage') //move to the main page

            }
          }

          else{
            this.setState({
              language: "english"
            })
            sessionStorage.setItem("language", this.state.language)
            
            if(sessionStorage.getItem("first_login")){
              sessionStorage.removeItem("first_login")
              this.props.history.push('/SignUp3') //move to update rest of profile
            }
            else{
              this.props.history.push('/FeedPage') //move to the main page

            }
          }

        },
        error => {
          alert("error!");
        }
      )
    



  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }


  render() {
    return this.state.redirect ? <Redirect to="/Login" /> :
                                  <div id="signUpComplete">
                                    <h2>Login Complete</h2>
                                    <p> Redirecting you in 5 seconds...</p>
                                    {/* <p> If it doesn't redirect you, click on <Link to="/Login">me.</Link> </p> */}
                                  </div>
  }
}

export default LoginComplete;