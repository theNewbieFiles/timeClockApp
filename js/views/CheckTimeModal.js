import {Modal} from "./Modal.js";

export class CheckTimeModal extends Modal{

    user;   //user info
    app;    //reference to app

    /**
     *
     * @param User {Object}
     * @param App {App}
     */
    constructor(User, App) {
        super();

        this.user = User;
        this.app = App;

        //even tho the system knows what day of the week it is
        //example: Wed Jul 20 2022 or Tue Jul 19 2022
        //it doesn't know what day of the week it is...
        this.weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        //Create modal parts
        this.name = document.createElement("h1");
        this.name.id = "users_name";
        this.header.appendChild(this.name);

        //show the modal
        this.modalWrapper.classList.remove("hidden");
    }


    init(){
        //TODO: show spinning gif
        this.mainArea.innerHTML = "Loading...";

        this.name.innerText = this.user['lName'] + ", " + this.user['fName'];

        //request info
        this.app.requestHandler.APIRequest({
            module: "GetTimesForUser",
            username: this.user.username
        }).then( response => {
            if(response['success']){
                this.createTable(response['data']);
            }else{
                this.app.showError(response['errorMsg'])
            }


        }).catch(error => {

            console.error(error);
        });


        //button
        this.exit_Btn.onmouseup = e => {
            this.exit();
            this.app.closeModal();
        };
    }

    createTable(UserData){

        //create basic table parts
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        //create the header area
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Date";

        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Day";

        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Time";

        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Event";

        //attach the header
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);

        //attach header to table
        thead.appendChild(row_1);

        //clean up the area
        this.mainArea.innerHTML = "";

        //adding table
        this.mainArea.appendChild(table);

        if(Array.isArray(UserData)){

            for (let i = 0; i < UserData.length; i++) {
                let row = tbody.insertRow(tbody.rows.length);
                let date = new Date(UserData[i]['time_stamp'] + "Z"); //I'm not sure if I need the Z

                //generate date
                row.insertCell(0).innerHTML = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                //show the day of the week
                row.insertCell(1).innerHTML = this.weekday[date.getDay()];

                //show time
                row.insertCell(2).innerHTML = this.getHours(date.getUTCHours()) + ":" + String(date.getMinutes()).padStart(2, '0') + this.getMeridiem(date.getUTCHours());

                // 1 = clocked in 0 = clocked out
                //had to parseInt because different versions of php's json_encode encode differently
                if(parseInt(UserData[i]["event"]) === 1){
                    row.insertCell(3).innerHTML = "Clocked In";
                }else{
                    row.insertCell(3).innerHTML = "Clocked Out";
                }
            }

        }else{
            //error...
            console.error("Response didn't contain an Array");
        }
    }

    getHours(Value){
        if(Value < 13){ return Value}

        return Value % 12;
    }

    getMeridiem(Value){
        /*
        AM = Ante meridiem: Before noon
        PM = Post meridiem: After noon
        */

        if(Value < 12){ return " AM"}

        return " PM";

    }



    exit(){
        //clean up everything
        this.modalWrapper.classList.add("hidden");

        //I don't think this is a binding issue but just in case
        this.exit_Btn.onmouseup = null;

        //clear out the divs
        this.mainArea.innerHTML = "";
        this.header.innerHTML = "";

    }



}