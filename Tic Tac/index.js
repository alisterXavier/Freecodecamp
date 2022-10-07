const box = document.getElementsByClassName("start");
const overlay = document.getElementsByClassName("overlay");
box[0].classList.add("active");
overlay[0].classList.add("active");
document.getElementById("player1").onclick = function() {
    overlay[0].classList.remove("active");
    box[0].classList.remove("active"); 
    turn = "playerOne";
};
document.getElementById("player2").onclick = function() {
    overlay[0].classList.remove("active");
    box[0].classList.remove("active");   
    playerTwo();
};

let numbers = {
    1:"one",
    2:"two",
    3:"three",
    4:"four",
    5:"five",
    6:"six",
    7:"seven",
    8:"eight",
    9:"nine",
}

let selected = (no) => {
    return document.getElementById(numbers[no]).textContent ? false : true;
}

function playerTwo(){
    let para = document.createElement("p")
    let node = document.createTextNode("O");
    let num = Math.floor(Math.random() * 9) + 1;
    if(selected(num)){
        para.appendChild(node);
        document.getElementById(numbers[num]).appendChild(para);
    }
    else playerTwo();
}

function draw(number){
    let node = document.createTextNode("X");
    let para = document.createElement("p");
    para.appendChild(node)
    let ele;
    if(number == 1 && selected(number)){
            ele = document.getElementById("one");
    }
    else if(number == 2 && selected(number)){
            ele = document.getElementById("two");
    }
    else if(number == 3 && selected(number)){
            ele = document.getElementById("three");
    }
    else if(number == 4 && selected(number)){
            ele = document.getElementById("four");
    }
    else if(number == 5 && selected(number)){
            ele = document.getElementById("five");
    }
    else if(number == 6 && selected(number)){
            ele = document.getElementById("six");
    }
    else if(number == 7 && selected(number)){
            ele = document.getElementById("seven");
    }
    else if(number == 8 && selected(number)){
            ele = document.getElementById("eight");
    }
    else if(number == 9 && selected(number)){
            ele = document.getElementById("nine");
    }
    ele.appendChild(para);
    playerTwo();
}