import {CheckTimeModal} from "./views/CheckTimeModal.js";
import {UserView} from "./views/UserView.js";
import {DocumentsView} from "./views/DocumentsView";


export class App{

    requestHandler;


    /**
     *
     * @param RequestHandler {RequestHandler}
     */
    constructor(RequestHandler) {
        this.requestHandler = RequestHandler;



        this.modal = null;


        this.input = document.getElementById("userID");
        //testing
        this.input.value = "cwilson";
        this.go_Btn = document.getElementById("go_Btn");

        //modalBackground
        this.modalBackground = document.getElementById("modal_Bg");
        this.modalBackground.onmouseup = () => {dispatchEvent(new Event("closeModal"));};

        //userView
        this.userView = null;

        this.clockIn_Btn = document.getElementById("clockIn_Btn");
        this.clockOut_Btn = document.getElementById("clockOut_Btn");
        this.checkTime_Btn = document.getElementById("checkTime_Btn");
        this.safety_Btn = document.getElementById("safety_Btn");
        this.exit_Btn = document.getElementById("exit_Btn");

        this.wrapper = document.getElementById("userViewWrapper");

        //for storing user info
        this.user = null;

    }

    init(){
        //mouse functions
        this.go_Btn.onmouseup = this.goButton.bind(this);

        this.clockIn_Btn.onmouseup = this.clockInButton.bind(this);

        this.clockOut_Btn.onmouseup = this.clockOutButton.bind(this);

        this.checkTime_Btn.onmouseup = this.checkTimeButton.bind(this);

        this.safety_Btn.onmouseup = this.safetyButton.bind(this);


        window.addEventListener("closeModal", e => {
            if(this.modal){
                this.modal.exit();
                this.modalBackground.classList.add("hidden");
                this.modal = null;
            }
        })
    }


    //button functions
    goButton(){
        this.requestHandler.APIRequest({
            module: "Login",
            username: this.input.value
        }).then( response => {

            if(response['success']){
                //console.log(response['data']);

                this.user = response['data'];
                this.user.username = this.input.value;

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

            }


        }).catch(error => {
            console.log(error);
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

            }


        }).catch(error => {
            console.log(error);
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


    showError($Msg){
        //TODO: show message in custom popup
        alert($Msg)
    }

    //user view
    userViewActivate(){
this.username
        if(this.user['user_status']){
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

    userViewDeactivate(){
        this.wrapper.classList.add("hidden");

        this.user = null;
    }


}
