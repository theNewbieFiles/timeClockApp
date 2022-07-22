

export class DocView{

    /**
     * @param User
     * @param DocumentID
     * @param Signed
     * @param RequestHandler {RequestHandler}
     * @param DocumentsView {DocumentsView}
     */
    constructor(User, DocumentID, Signed, RequestHandler, DocumentsView) {

        this.user = User;
        this.id = DocumentID;
        this.requestHandler = RequestHandler;
        this.signed = Signed;

        this.documentsView = DocumentsView;

        console.log(this.signed);


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
            this.sigArea.classList.remove("hidden");
        }

        this.requestHandler.APIRequest({
            module: "GetDoc",
            docID: this.id
        }).then( response => {
            if(response['success']){
                this.showDoc(response['data'])
            }
        });


        //buttons

        this.sigSubmit_Btn.onmouseup = this.submit.bind(this);
        this.exit_Btn.onmouseup = this.exit.bind(this);

    }

    showDoc(Doc){
        console.log(Doc);

        this.title.innerHTML = Doc['title'];

        this.data.innerHTML = Doc['data'];
    }

    submit(){
        if(this.signature.value){
            this.requestHandler.APIRequest({
                'module': "SignDoc",
                'docID': this.id,
                'username': this.user.username,
                'signature': this.signature.value
            }).then(response => {

                console.log(response);
                if (response['success']) {
                    this.documentsView.update();
                    this.exit();
                }

            }
            );
        }
    }

    exit(){
        this.docViewWrapper.classList.add("hidden");
        this.sigArea.classList.add("hidden");

        this.title.innerHTML = "";
        this.data.innerHTML = "";
        this.signature.value = "";

    }


}