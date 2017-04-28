import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import SearchKite from "./component/SearchKite";
const root = document.getElementById('root');

ReactDOM.render(
    <div>
        <SearchKite />
    </div>,
    root
);
