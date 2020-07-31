'use strict';

const e = React.createElement;
// run npx babel --watch src --out-dir . --presets react-app/prod in the sure-fi-web-site directory to reflect changes on this file
class Fotter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tel = "tel:1-844-787-3340";
    const mailto = "mailto:support@sure-fi.com"
    return (
      <div>
        <section id="contact" style={{ marginTop: 10 }}>
          <div className="container">
            <div className="row" style={{ textAlign: "center" }}>
              <div className="col-lg-12">
                <h1>Contact</h1>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mx-auto text-center">
                <img src="images/hall-labs-70.png" id="hall-labs-image" alt="hall-labls-image" style={{ borderTopTightRadius: 5, borderTopLeftRadius: 5 }} />

                <div id="hall-bottom-foot">
                  <div style={{ width: "20%", float: "right", marginTop: 20, marginRight: 20 }}>
                    <img src="images/HallLabs-Logo.png" className="img-responsive" style={{ marginTop: "5%", marginBottom: "5%", width: "100%" }} />
                  </div>
                </div>
                <div id="contact_text_container" style={{ textAlign: "left" }}>
                  <div style={{ width: "50%", float: "left", fontSize: "1rem" }}>
                    <p className="contact-font">
                      Contact : Sure-Fi Inc.
                      </p>
                    <p className="contact-font">
                      3000 SIERRA VISTA WAY
                      </p>
                    <p className="contact-font">
                      PROVO, UT 84606
                      </p>
                  </div>
                  <div style={{ width: "50%", float: "left", fontSize: "1rem", textAlign: "right" }}>
                    <a href={mailto} target="_top" style={{ textDecoration: "none", color: "black" }}>
                      <p className="contact-font">
                        support@sure-fi.com <i style={{ fontSize: "1rem" }} className="fa fa-envelope-o fa-3x mb-1 sr-contact"></i>
                      </p>
                    </a>
                    <a href={tel}>
                      <p className="contact-font">
                        1-844-787-3340
                          <i style={{ fontSize: "1rem", color: "green" }} className="fa fa-phone fa-3x mb-3 sr-contact"></i>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ background: "black" }}>
          <div className="container">
            <div className="row" >
              <div className="col-6 col-lg-6" >
                <a href="https://itunes.apple.com/us/app/sure-fi/id1259963492?mt=8" target="_blank" style={{ float: "right" }}>
                  <img src="images/app_store.png" className="img-fluid" />
                </a>
              </div>
              <div className="col-6 col-lg-6">
                <a href="https://play.google.com/store/apps/details?id=com.surefi&hl=en" target="_blank" >
                  <img src="images/play_store.png" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col col-lg-12" style={{ textAlign: "center", padding: 60 }}>
                <h4 style={{ color: "white" }}>
                  Sure-Fi Inc. © 2017
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function (event) {

  const domContainer = document.querySelector('#footer');
  ReactDOM.render(e(Fotter), domContainer);

});


