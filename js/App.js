import {CheckTimeModal} from "./views/CheckTimeModal.js";

import {DocumentsView} from "./views/DocumentsView.js";
import {DocView} from "./views/DocView.js";


export class App{

    requestHandler;


    /**
     *
     * @param RequestHandler {RequestHandler}
     */
    constructor(RequestHandler) {
        this.requestHandler = RequestHandler;


        //most views use a modal
        this.modal = null;


        this.input = document.getElementById("userID");
        this.go_Btn = document.getElementById("go_Btn");

        //modalBackground
        this.modalBackground = document.getElementById("modal_Bg");

        //user info on top of user screen
        this.userInfo = document.getElementById("userInfo");

        //buttons
        this.clockIn_Btn = document.getElementById("clockIn_Btn");
        this.clockOut_Btn = document.getElementById("clockOut_Btn");
        this.checkTime_Btn = document.getElementById("checkTime_Btn");
        this.safety_Btn = document.getElementById("safety_Btn");
        this.exit_Btn = document.getElementById("exit_Btn");

        //user view
        this.wrapper = document.getElementById("userViewWrapper");
        this.userView = null;


        //for storing user info
        this.user = null;

    }

    init(){
        //put focus on input
        this.input.focus();

        //check for enter press
        this.input.addEventListener("keyup", e => {
            if(e.key === 'Enter'){
                this.goButton();
            }
        });

        //button functions
        this.go_Btn.onmouseup = this.goButton.bind(this);

        this.clockIn_Btn.onmouseup = this.clockInButton.bind(this);

        this.clockOut_Btn.onmouseup = this.clockOutButton.bind(this);

        this.checkTime_Btn.onmouseup = this.checkTimeButton.bind(this);

        this.safety_Btn.onmouseup = this.safetyButton.bind(this);

        this.exit_Btn.onmouseup = this.exitButton.bind(this);

        //modal background
        this.modalBackground.onmouseup = () => {
            dispatchEvent(new Event("closeModal"));
        };

        //event listener
        window.addEventListener("closeModal", this.closeModal.bind(this));

    }


    //button functions
    goButton(){

        if(this.input.value === ""){
           this.showError("Username is blank");
           return
        }

        this.requestHandler.APIRequest({
            module: "GetUserInfo",
            username: this.input.value
        }).then( response => {

            if(response['success']){

                //user exists
                //save user info for the session
                this.user = response['data'];
                this.user.username = this.input.value;

                //change views
                this.userViewActivate();

            }else{

                if(response['errorCode'] === 300){
                    //no user found

                    this.showError("wrong username");
                }else{
                    console.log(response['errorMsg']);
                }

            }


        }).catch(error => {
            console.log(error);
        });
    }

    clockInButton(){
        this.requestHandler.APIRequest({
            module: "ClockIn",
            username: this.user.username
        }).then( response => {

            if(response['success']){
                this.userViewDeactivate();

            }else{
                this.showError(response['errorMsg'])
            }


        }).catch(error => {
            console.error(error);
        });
    }

    clockOutButton(){
        this.requestHandler.APIRequest({
            module: "ClockOut",
            username: this.user.username
        }).then( response => {

            if(response['success']){


                this.userViewDeactivate();

            }else{
                this.showError(response['errorMsg'])
            }


        }).catch(error => {
            console.error(error);
        });
    }

    checkTimeButton(){
        this.modalBackground.classList.remove("hidden");
        this.modal = new CheckTimeModal(this.user, this.requestHandler);
        this.modal.init();


    }

    safetyButton(){
        this.modalBackground.classList.remove("hidden");
        this.modal = new DocumentsView(this.user, this.requestHandler);
        this.modal.init();
    }

    exitButton(){
        this.userViewDeactivate();
    }

    //modal
    closeModal(){
        if(this.modal){
            this.modal.exit();
            this.modalBackground.classList.add("hidden");
            this.modal = null;
        }
    }


    showError($Msg){
        //TODO: show message in custom popup
        alert($Msg)
    }

    //show user view
    userViewActivate(){

        this.userInfo.innerHTML = "Welcome " + this.user['fName'];

        if(parseInt(this.user['user_status'])){
            //user is clocked in
            this.clockIn_Btn.classList.add("hidden");
            this.clockOut_Btn.classList.remove("hidden");
        }else{
            //is clocked out
            this.clockIn_Btn.classList.remove("hidden");
            this.clockOut_Btn.classList.add("hidden");
        }

        this.wrapper.classList.remove("hidden");

    }

    //hide user view
    userViewDeactivate(){
        this.wrapper.classList.add("hidden");
        this.input.value = "";
        this.user = null;

        //put focus on input
        this.input.focus();
    }



}
