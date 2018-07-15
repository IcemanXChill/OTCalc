var hours_input_box;
var days_left_box;
var overtime_text;

var friday_text;

var now = new Date();
var next_friday = (7 + 5 - now.getDay()) % 7;

let stateCheck = setInterval(() => {

    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        hours_input_box = document.getElementById("OTInput");
        days_left_box = document.getElementById("DLInput");
        overtime_text = document.getElementById("OTText");
        friday_text = document.getElementById("FDText");
        days_left_box.value = next_friday;
    }

}, 100);



function updatetxt() {
    var hours_worked = hours_input_box.value;
    var days_left = days_left_box.value;
    var overtime_amt = OTFormula(hours_worked, days_left);
    var avg_overtime_amt = parseFloat(overtime_amt/days_left).toFixed(2);

    if (overtime_amt > 0) {
        friday_text.style.display = "block";
        
        if (overtime_amt > 0.99) {
            overtime_text.innerHTML = 'you have ' + overtime_amt + ' hour(s) of overtime, at the rate you are going.';
        } else {
            overtime_text.innerHTML = 'you have ' + Math.round(val_to_min(overtime_amt)) + ' minutes of overtime, at the rate you are going.';
        }
        

        if (avg_overtime_amt > 0.99) {

            if (avg_overtime_amt > 1.8) {
                update_txt_color(false);
                friday_text.innerHTML = 'you have too much overtime, talk to a manager.';
            } else {
                update_txt_color(true);
                friday_text.innerHTML = 'you need to add ' + avg_overtime_amt + ' hour(s) to your lunches.';
            }
            
        } else {
            update_txt_color(true);
            friday_text.innerHTML = 'you need to add ' + Math.round(val_to_min(avg_overtime_amt)) + ' minutes to your lunches each day.';
        }
        

    } else {
        overtime_text.innerHTML = 'You have no overtime! Congrats!';
        friday_text.style.display = "none";
    }
    


    if (next_friday > 0) {
  
    }





}

function val_to_min(val) {

    return 60 * val;

}

function OTFormula(h,d) {

    let hours = parseFloat(h);
    let remaining_days = parseInt(d);

    return  ((remaining_days * 8 + hours) - 40).toFixed(2);
}

function update_txt_color(good) {

    if (good) {
        document.getElementById("FDText").style.color = "green";
    } else {
        document.getElementById("FDText").style.color = "red";
    }
    
}