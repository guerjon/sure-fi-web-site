'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Fotter = function (_React$Component) {
  _inherits(Fotter, _React$Component);

  function Fotter(props) {
    _classCallCheck(this, Fotter);

    return _possibleConstructorReturn(this, (Fotter.__proto__ || Object.getPrototypeOf(Fotter)).call(this, props));
  }

  _createClass(Fotter, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "section",
        { style: { background: "black" } },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-6 col-lg-6" },
              React.createElement(
                "a",
                { href: "https://itunes.apple.com/us/app/sure-fi/id1259963492?mt=8", target: "_blank", style: { float: "right" } },
                React.createElement("img", { src: "images/app_store.png", className: "img-fluid" })
              )
            ),
            React.createElement(
              "div",
              { className: "col-6 col-lg-6" },
              React.createElement(
                "a",
                { href: "https://play.google.com/store/apps/details?id=com.surefi&hl=en", target: "_blank" },
                React.createElement("img", { src: "images/play_store.png", className: "img-fluid" })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col col-lg-12", style: { textAlign: "center", padding: 60 } },
              React.createElement(
                "h4",
                { style: { color: "white" } },
                "Sure-Fi Inc. \xA9 2017"
              )
            )
          )
        )
      );
    }
  }]);

  return Fotter;
}(React.Component);

document.addEventListener("DOMContentLoaded", function (event) {
  var domContainer = document.querySelector('#footer');
  ReactDOM.render(e(Fotter), domContainer);
});