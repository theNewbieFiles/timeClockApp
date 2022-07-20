

export class App{

    constructor() {

        this.input = document.getElementById("userID");
        this.login_Btn = document.getElementById("login_Btn");
        this.checkTime_Btn = document.getElementById("checkTime_Btn");
        this.safety_btn = document.getElementById("safety_Btn");
    }

    init(){
        this.login_Btn.onmouseup = () => {
            console.log(this.input.value);
        };

        this.checkTime_Btn.onmouseup = () => {
            console.log("TODO: Code this");
        };

        this.safety_btn.onmouseup = () => {
            console.log("TODO: Code this");
        };
    }

}
