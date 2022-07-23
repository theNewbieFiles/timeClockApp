import {Modal} from "./Modal.js";
import {DocView} from "./DocView.js";


export class DocumentsView extends Modal{

    /**
     *
     * @param User
     * @param App {App}
     */
    constructor(User, App) {
        super();

        this.user = User;
        this.app = App;

        //show modal
        this.modalWrapper.classList.remove("hidden");

        //keep a refernce of the list for sorting
        this.documentList = null;

        //TODO: build toolbar
        //add the tool bar
        this.toolbar = document.createElement("div");
        this.toolbar.id = "dlToolbar";
        this.toolbar.innerHTML = "Toolbar";
        this.mainArea.appendChild(this.toolbar);

        //area for doc
        this.docArea = document.createElement("div");
        this.mainArea.appendChild(this.docArea);


        //document list
        this.list = document.createElement("ul");
        this.list.id = "documentList";



        //docview modal
        this.docView = null;


    }

    init(){

        //TODO: show spinning gif
        this.docArea.innerHTML = "Loading...";

        //get the list of documents
        this.fetchList();


        //button
        this.exit_Btn.onmouseup = e => {
           this.exit();
           this.app.closeModal();
        };
    }

    fetchList(){
        this.app.requestHandler.APIRequest({
            module: "GetDocumentsForUser",
            username: this.user.username
        }).then( response => {

            if(response['success']){
                this.generateList(response['data']);
            }else{
                this.app.showError(response['errorMsg'])
            }

        }).catch(error => {
            console.error(error);
        });
    }

    //after signing a safety doc list needs to update to reflect this
    update(){
        //clear up list
        this.list.innerHTML = "";
        this.docArea.innerHTML = "Updating...";

        this.fetchList();


    }

    generateList(List){

        //clear the list
        this.docArea.innerHTML = "";

        this.mainArea.appendChild(this.list);

        //loop thru each document and create a li for it
        List.forEach( value => {

            let li = document.createElement("li");

            let imgDiv = document.createElement("div");
            imgDiv.classList.add("dlImg");

            let mainDiv = document.createElement("div");
            mainDiv.classList.add("dlMain");

            let docTitle = document.createElement("div");
            docTitle.classList.add("dlTitle");
            docTitle.innerHTML = value['title'];

            let info = document.createElement("div");
            info.classList.add("dlInfo");
            info.innerHTML = value['summary'];

            mainDiv.appendChild(docTitle);
            mainDiv.appendChild(info);

            let userInfo = document.createElement("div");
            userInfo.classList.add("dlUserInfo");

            //has the user signed this document?
            let signed = false;

            if(value['signature']){
                userInfo.innerHTML = "Signed on <br />";
                let date = new Date(value['dateSigned']);
                userInfo.innerHTML += (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                signed = true;
            }else{
                userInfo.innerHTML = "Needs Review";
            }


            li.appendChild(imgDiv);
            li.appendChild(mainDiv);
            li.appendChild(userInfo);


            //set mouse up event to show that document
            li.onmouseup = () => {
                this.showDocView(value['id'], signed);
            };


            this.list.appendChild(li);
        });
    }

    showDocView(ID, Signed){
        this.docView = new DocView(this.user, ID, Signed,  this.app, this);

        this.docView.init();
    }



    //close and exit the modal
    exit(){
        //TODO: add event and only close the doc view when modal background is clicked insead of entire modal

        //clean up everything
        this.modalWrapper.classList.add("hidden");

        //don't think this will cause binding issues but just in case
        this.exit_Btn.onmouseup = null;

        //clear out the divs
        this.mainArea.innerHTML = "";
        this.header.innerHTML = "";

        //docView
        if(this.docView){
            this.docView.exit();
        }


        this.docView = null;
    }


}