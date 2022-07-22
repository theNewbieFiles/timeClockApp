

export class Modal{

    modalWrapper;
    modalDiv;
    header;
    mainArea;
    exit_Btn;

    constructor() {

        this.modalWrapper = document.getElementById("modalWrapper");
        this.modalDiv = document.getElementById("modal");
        this.header = document.getElementById("modalHeader");

        this.mainArea = document.getElementById("modalMainArea");

        this.exit_Btn = document.getElementById("exitModal_Btn");
    }

    init(){}

    exit(){}

}