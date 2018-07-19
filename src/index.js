'use strict';

const e = React.createElement;


class Fotter extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section style={{background: "black"}}>
        <div className="container">      
          <div className="row" >
            <div className="col-6 col-lg-6" >
            <a href="https://itunes.apple.com/us/app/sure-fi/id1259963492?mt=8" target="_blank" style={{float: "right"}}>
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
            <div className="col col-lg-12" style={{textAlign: "center",padding: 60}}>
            <h4 style={{color: "white"}}>
            Sure-Fi Inc. © 2017
            </h4>                  
            </div>
          </div>
        </div>
      </section>
    );
  }
}

document.addEventListener("DOMContentLoaded", function(event) { 
  const domContainer = document.querySelector('#footer');
  ReactDOM.render(e(Fotter), domContainer);
});
