


export class UserView{

    constructor(User) {
        this.user = User;



        this.clock_Btn = document.getElementById("clock_Btn");
        this.checkTime_Btn = document.getElementById("checkTime_Btn");
        this.safety_Btn = document.getElementById("safety_Btn");
        this.exit_Btn = document.getElementById("exit_Btn");


        if(this.user['user_status']){
            //user is clocked in
            this.clock_Btn.innerText = "Clock Out";
        }else{
            //is clocked out
            this.clock_Btn.innerText = "Clock in";
        }





    }

    init(){

    }

    clockIn(){

    }

    clockOut(){

    }

}