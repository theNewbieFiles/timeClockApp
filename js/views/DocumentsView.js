import {Modal} from "./Modal";
import {DocView} from "./DocView";


export class DocumentsView extends Modal{

    /**
     *
     * @param User
     * @param RequestHandler {RequestHandler}
     */
    constructor(User, RequestHandler) {
        super();

        this.user = User;
        this.requestHandler = RequestHandler;




        this.modalWrapper.classList.remove("hidden");

        this.documentList = null;

        //add the tool bar
        this.toolbar = document.createElement("div");
        this.toolbar.id = "dlToolbar";
        this.toolbar.innerHTML = "Toolbar";
        this.mainArea.appendChild(this.toolbar);


        this.list = document.createElement("ul");
        this.list.id = "documentList";
        this.mainArea.appendChild(this.list);



        //toolbar buttons

        //docview
        this.docView = null;


    }

    init(){

        //TODO: show spinning gif


        //get the list of documents


        this.fetchList();


        //button
        this.exit_Btn.onmouseup = e => {
            dispatchEvent(new Event("closeModal"));
        };
    }

    fetchList(){
        this.requestHandler.APIRequest({
            module: "GetDocumentsForUser",
            username: this.user.username
        }).then( response => {


            console.log(response.data);
            if(response['success']){
                this.generateList(response['data']);
            }

        }).catch(error => {
            console.error(error);
        });
    }

    update(){
        //clear up list
        this.list.innerHTML = "";

        this.fetchList();


    }

    generateList(List){
        List.forEach( value => {

            let li = document.createElement("li");

            /*let liDiv = document.createElement("div");

            li.appendChild(liDiv);*/

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


            li.onmouseup = () => {
                /*dispatchEvent(new CustomEvent("docClicked", {
                    'detail': {
                        'docId':
                    }
                }))*/

                this.showDocView(value['id'], signed);

            };


            this.list.appendChild(li);
        });
    }

    showDocView(ID, Signed){
        this.docView = new DocView(this.user, ID, Signed,  this.requestHandler, this);

        this.docView.init();
    }



    exit(){
        //clean up everything
        this.modalWrapper.classList.add("hidden");

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