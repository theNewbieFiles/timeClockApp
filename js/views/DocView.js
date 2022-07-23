

export class DocView{

    /**
     * @param User
     * @param DocumentID
     * @param Signed
     * @param App {App}
     * @param DocumentsView {DocumentsView}
     */
    constructor(User, DocumentID, Signed, App, DocumentsView) {

        this.user = User;
        this.id = DocumentID;
        this.app = App;
        this.signed = Signed;

        this.documentsView = DocumentsView;


        //get the areas
        this.docViewWrapper = document.getElementById("docViewWrapper");
        this.title = document.getElementById("dvTitle");
        this.data = document.getElementById("dvData");
        this.sigArea = document.getElementById("sigArea");
        this.signature = document.getElementById("signature");

        //buttons
        this.sigSubmit_Btn = document.getElementById("sigSubmit_Btn");
        this.exit_Btn = document.getElementById("dvExit_Btn");
    }

    init(){
        this.docViewWrapper.classList.remove("hidden");

        if(!this.signed){
            //if its not signed show the signing area
            this.sigArea.classList.remove("hidden");
        }

        this.app.requestHandler.APIRequest({
            module: "GetDoc",
            docID: this.id
        }).then( response => {
            if(response['success']){
                this.showDoc(response['data'])
            }else{
                this.app.showError("There was a issues getting the document");
                this.exit();
            }
        });


        //buttons

        this.sigSubmit_Btn.onmouseup = this.submit.bind(this);
        this.exit_Btn.onmouseup = this.exit.bind(this);

    }

    showDoc(Doc){
        this.title.innerHTML = Doc['title'];

        this.data.innerHTML = Doc['data'];
    }

    submit(){
        if(this.signature.value){
            this.app.requestHandler.APIRequest({
                'module': "SignDoc",
                'docID': this.id,
                'username': this.user.username,
                'signature': this.signature.value
            }).then(response => {
                if (response['success']) {
                    //close the modal and update the document list
                    this.documentsView.update();
                    this.exit();
                }

            }
            );
        }
    }

    exit(){
        //hide the areas
        this.docViewWrapper.classList.add("hidden");
        this.sigArea.classList.add("hidden");

        //clean up the areas
        this.title.innerHTML = "";
        this.data.innerHTML = "";
        this.signature.value = "";

    }


}