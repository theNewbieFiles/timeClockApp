import {RequestHandler} from "./RequestHandler.js";
import {App} from "./App.js";

document.addEventListener("DOMContentLoaded", function(){

    let rq = new RequestHandler();
/*
    rq.request({
        test: 1,
        test2: 4
    })*/



    let app = new App(rq);
    app.init();



});