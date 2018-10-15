import React from "react";
import ReactDOM from "react-dom";
import searchStyle from "./search.css"

const Index = () => {
    return <div className={searchStyle.search}>Hello React!</div>;
}

ReactDOM.render(<Index />, document.getElementById("index"));