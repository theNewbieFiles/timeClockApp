import {Modal} from "./Modal.js";

export class CheckTimeModal extends Modal{


    /**
     *
     * @param User {Object}
     * @param RequestHandler {RequestHandler}
     */
    constructor(User, RequestHandler) {
        super();
        console.log(this.header);


        this.user = User;
        this.requestHandler = RequestHandler;

        //even tho the system knows what day of the week it is
        //example: Wed Jul 20 2022 or Tue Jul 19 2022
        //it doesn't know what day of the week it is...
        this.weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];



        this.name = document.createElement("h1");
        this.name.id = "users_name";
        this.header.appendChild(this.name);


        this.modalWrapper.classList.remove("hidden");



    }

    /*setExitButton(callback){
        this.exit_Btn.onmouseup = callback;
    }*/

    buildModal(){
        this.modalWrapper = document.createElement("div");
        this.modalWrapper.classList.add("modalWrapper");




        this.modalDiv = document.createElement("div");
        this.modalDiv.classList.add("modal");

        this.modalWrapper.appendChild(this.modalDiv);

        this.header = document.createElement("div");
        this.name = document.createElement("h1");
        this.name.innerText = this.username;

        this.header.appendChild(this.name);


        this.modalDiv.appendChild(this.header);

        this.mainArea = document.createElement("div");

        this.modalDiv.appendChild(this.mainArea);
    }

    init(){
        //TODO: show spinning gif


        this.name.innerText = this.user['lName'] + ", " + this.user['fName'];

        this.requestHandler.APIRequest({
            module: "GetTimesForUser",
            username: this.user.username
        }).then( response => {

            //console.log(response);
            this.createTable(response['data']);

        }).catch(error => {

            console.error(error);
        });


        //button
        this.exit_Btn.onmouseup = e => {
            dispatchEvent(new Event("closeModal"));
        };
    }

    createTable(UserData){
        //TODO: Put a wrapper around the table so it will scroll
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Date";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Day";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Time";

        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Event";
/*
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Hours";*/

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        /*row_1.appendChild(heading_5);*/
        thead.appendChild(row_1);

        this.mainArea.appendChild(table);

        if(Array.isArray(UserData)){

            /*let rowCount = table.rows.length;
            console.log(rowCount);
            let row = table.insertRow(rowCount);*/



            for (let i = 0; i < UserData.length; i++) {
                let row = tbody.insertRow(tbody.rows.length);
                let date = new Date(UserData[i]['time_stamp'] + "Z"); //I'm not sure if I need the Z
                //console.log(date);
                row.insertCell(0).innerHTML = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                row.insertCell(1).innerHTML = this.weekday[date.getDay()];
                row.insertCell(2).innerHTML = (date.getUTCHours() % 12) + ":" + String(date.getMinutes()).padStart(2, '0');
                if(UserData[i]["event"]){
                    row.insertCell(3).innerHTML = "Clocked In";
                }else{
                    row.insertCell(3).innerHTML = "Clocked Out";
                }




                //console.log(first);
            }


            /*response.forEach( value => {


                let day = new Date(value['time_stamp']+ "Z");

                console.log(day);
                console.log(day.getDay());

                console.log(day.getTime());

                this.mainArea.innerHTML += value["time_stamp"];
                this.mainArea.innerHTML += "<br />";
            })*/

            console.log(new Date())
        }else{
            console.log(response);
        }
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