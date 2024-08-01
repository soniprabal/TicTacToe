let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let restart=document.querySelector(".restart");

let turn0=true;//playerx, player0
let count=0;
const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [3, 4, 5],
    [6, 4, 2],
    [6, 7, 8],
    [2, 5, 8],
];

const resetGame=()=>{
         turn0=true;
         count=0;
         enableBoxes();
         msgContainer.classList.add("hide");
}
reset.addEventListener("click", resetGame);
restart.addEventListener("click", resetGame);


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0===true){
            box.innerText="0";
            turn0="false";
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `!!!!!!!!!!!!!!!!Match Draw!!!!!!!!!!!!!!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`!!!!!!!!!!Winner Winner Chicken Dinner!!!!!!!!!!
                                    Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=" "){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

