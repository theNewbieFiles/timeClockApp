import {Modal} from "./Modal";


export class DocumentsView extends Modal{

    /**
     *
     * @param Username
     * @param RequestHandler {RequestHandler}
     */
    constructor(Username, RequestHandler) {
        super();

        this.username = Username;
        this.requestHandler = RequestHandler;

        this.modalWrapper = document.getElementById("modalWrapper");
        this.modalDiv = document.getElementById("modal");
        this.header = document.getElementById("modalHeader");
        this.mainArea = document.getElementById("modalMainArea");

        this.exit_Btn = document.getElementById("exitModal_Btn");


        this.modalWrapper.classList.remove("hidden");

        this.documentList = null;

    }

    init(){

        //TODO: show spinning gif

        //get the list of documents

        this.requestHandler.APIRequest({
            module: "GetDocumentsForUser",
            username: this.username
        }).then( response => {


            console.log(response);
            if(response['success']){

            }

        }).catch(error => {
            console.error(error);
        });














        //button
        this.exit_Btn.onmouseup = e => {
            dispatchEvent(new Event("closeModal"));
        };
    }

    exit(){
        //clean up everything
        this.modalWrapper.classList.add("hidden");

        this.exit_Btn.onmouseup = null;

        //clear out the divs
        this.mainArea.innerHTML = "";
        this.header.innerHTML = "";
    }


}