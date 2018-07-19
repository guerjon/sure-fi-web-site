'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <div style={{height:200;width:200;}}>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", function(event) { 
  const domContainer = document.querySelector('#header');
  ReactDOM.render(e(LikeButton), domContainer);
});
