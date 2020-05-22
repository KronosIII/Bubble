import React from "react";
import "./styles.css";
import logo from "./logo.png";
import icon from "./icon.png";
import transitionSidebar from "./TransitionSidebar.mp4";
import nav from "./Nav.mp4";
import makePostSlide from "./MakeAPostSlide.mp4";
import sidebarMovement from "./SidebarMovement.mp4";
import positioning from "./Positioning.mp4";
import feedback from "./Feedback.mp4";
import friendsListNav from "./FriendsListNav.mp4";
import editProfile from "./editProfile.mp4";
import inlineErrorMessageImage2 from "./inlineErrorMessage2.png";
import otppopupwhat from "./otp-popup-what.png";
import otppopupwhere from "./otp-popup-where.png";

export default function App() {
  return (
    <div className="styles-guide">
      <div className="style-container">
        <h1 className="style-guide-h1">Style Guide</h1>

        {/* Logo Container */}
        <div id="logo">
          <h2 className="style-guide-h2"> Our Logo </h2>
          <h3 className="style-guide-h3">
            We love our logo, and we require that our logo is always presented
            using the guidelines discussed below. Our logo defines simplicity,
            and is a combination of a modern wordmark and icon.
          </h3>
          <img className="spacing" src={logo} alt="Logo" />
        </div>

        <div id="icon">
          <h2 className="style-guide-h2"> Our Icon </h2>
          <h3 className="style-guide-h3">
            In cases where our brand has already been recognized, the usage of
            the icon is permitted. It is required that the layout of the icon
            stays like the one shown above, and neither the artwork, nor the
            text is hidden.
          </h3>
          <img className="spacing" src={icon} alt="Icon" />
        </div>

        {/* Fonts container */}
        <div id="fonts">
          <h2 className="style-guide-h2">Fonts</h2>
          <center>
            <ul className="style-guide-ul">
              <li className="fredoka spacing style-guide-li">
                Type: Fredoka one, Position: Heading 1, Size: 50px
                <br />
                <p class="fredoka style-guide-br">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                  Vv Ww Xx Yy Zz
                </p>
              </li>
              <li className="zilla spacing style-guide-li">
                {" "}
                Type: Zilla Slab, Position: Heading 2, Size: 40px
                <br />
                <p class="zilla">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                  Vv Ww Xx Yy Zz
                </p>
              </li>
              <li className="raleway spacing style-guide-li">
                Type: Raleway, Position: Heading 3, Size: 20px
                <br />
                <p class="raleway style-guide-p">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                  Vv Ww Xx Yy Zz
                </p>
              </li>
            </ul>
          </center>
        </div>

        {/* Color palletes */}
        <div id="color-palletes">
          <h2 className="style-guide-h2">Color Palletes</h2>
          <div className="module fontContainer">
            <div className="fontColorCornflowerBlue">
              <p className="style-guide-p">
                Color: Cornflower Blue, RGB: (100, 149, 237) , Hex: #6495ED,
                Location: Foreground
              </p>
              {/* Color squares */}
              <div className="color-block" id="cornflowerBlue" />
            </div>
            <div className="fontColorLightGray">
              <p className="style-guide-p">
                Color: Light Gray, RGB: (221, 221, 221), Hex: #dddddd, Location:
                Background
              </p>
              {/* Color squares */}
              <div className="color-block" id="lightGray" />
            </div>
            <div className="fontColorDarkGray">
              <p className="style-guide-p">
                Color: Dark Gray, RGB: (78, 72, 72), Hex: #4e4848, Location:
                Foreground
              </p>
              {/* Color squares */}
              <div className="color-block" id="darkGray" />
            </div>
            <div className="fontColorWhite">
              <p className="style-guide-p">
                Color: White, RGB: (255, 255, 255), Hex: #FFFFFF, Location:
                Background
              </p>
              {/* Color squares */}
              <div className="color-block" id="white" />
            </div>
            <div className="fontColorBlack">
              <p className="style-guide-p">
                Color: Black, RGB: (0, 0, 0), Hex: #000000, Location: Text{" "}
              </p>
              {/* Color squares */}
              <div className="color-block" id="black" />
            </div>
          </div>
          <h3 className="style-guide-h3">
            No values other than those listed on this page should be used. Tints
            and shades of these colors are not permitted.
          </h3>
        </div>

        {/* General Layout container */}
        <div id="general-layout">
          <h2 className="style-guide-h2"> General Layout </h2>
          <h3 align="left" className="subheading style-guide-h3">
            Transition between Pages:{" "}
          </h3>
          <p align="left" className="style-guide-p">
            Based on the sidebar: Chat, Feed, Settings, Logout.
            <br />
            NavBar opens the sidebar, and is the starting point for navigation.
            <br />
            Clicking the profile picture gets the user to the profile page.
            <br />
            Most of the functionality is located within the hamburger menu, and
            is used to transition between pages quickly.
            <br />
            Friends List on the side allows access to friend’s profiles and
            access to friend’s chats.
          </p>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={transitionSidebar} type="video/mp4" />
          </video>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={nav} type="video/mp4" />
          </video>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={friendsListNav} type="video/mp4" />
          </video>

          <h3
            align="left"
            className="subheading subheading-spacing style-guide-h3"
          >
            Positioning Guidelines:{" "}
          </h3>
          <p align="left" className="style-guide-p">
            Sections as a whole are left-aligned.
            <br />
            Contents within a section are center-aligned.
            <br />
            Profile pictures are right-aligned.
            <br />
            Headers are center-aligned.
            <br />
            Text is left-aligned.
            <br />
            Scroll bars are always on the right hand side of the screen.
          </p>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={positioning} type="video/mp4" />
          </video>

          <h3
            align="left"
            className="subheading subheading-spacing style-guide-h3"
          >
            Styles for Popups:{" "}
          </h3>
          <p align="left" className="style-guide-p">
            Entry Animation: Slide in pop ups for making a post and sidebar from
            left to right.
            <br />
            Exit Animation: Slide out pop ups from right to left.
          </p>

          <img src={otppopupwhat} alt="What is OTP" />
          <img src={otppopupwhere} alt="Where is OTP" />

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={sidebarMovement} type="video/mp4" />
          </video>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={makePostSlide} type="video/mp4" />
          </video>

          <h3
            align="left"
            className="subheading subheading-spacing style-guide-h3"
          >
            Inline Error Messages:{" "}
          </h3>
          <p align="left" className="style-guide-p">
            Login and Sign Up have inline error messages for when the user does
            not enter a valid email or password fields do not match.
          </p>

          <img src={inlineErrorMessageImage2} alt="InlineErrorMessage2" />

          <h3
            align="left"
            className="subheading subheading-spacing style-guide-h3"
          >
            Feedback:{" "}
          </h3>
          <p align="left" className="style-guide-p">
            {" "}
            On all buttons, we switch from mouse to a cursor.
            <br />
            On text fields, we switch from mouse to I-beam pointer.
            <br />
            All the major buttons like Login, Sign Up and Post/Send have a
            double arrow that presents a slide-in animation when the user hovers
            over it.
            <br />
            Drop down menus have an arrow to signify that it is a drop down menu
            and that there are more elements within categories within the
            dropdown.
            <br />
            On hover, menu will open and header of menu will change from white
            to cornflower blue.
            <br />
            Arrow and text change from black to white.
            <br />
            Other buttons that just bring to a new page go from cornflower blue
            with white text to white with black text on hover to signal
            clickability.
            <br />
            The scroll bar provides measured feedback to user and provides the
            length of the content that has been scrolled within a webpage.
          </p>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={editProfile} type="video/mp4" />
          </video>

          <video className="styleGuideVideo" width="750" height="500" controls>
            <source src={feedback} type="video/mp4" />
          </video>
        </div>
      </div>

      <footer className="style-guide-footer">
        Copyright 2020 Bubble, Inc. All rights reserved.
      </footer>
    </div>
  );
}
