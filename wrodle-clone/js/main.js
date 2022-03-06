document.addEventListener("DOMContentLoaded", ()=>{
    creatSquares();
    // getNewWord();

    let guessedWords = [[]];
    let availableSpace = 1;

    let word = "dairy";
    let guessWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button")

    function getCurrentWord(){
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords -1]
    }
    function updateGuessedWords(letter){
        const currentWord = getCurrentWord();

        if(currentWord && currentWord.length <5){
            currentWord.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, i){
        const isCorrect = word.includes(letter);

        if(!isCorrect){
            return "rgb(58,58,60)"
        }

        const letterInPosition = word.charAt(i);
        const isCorrectPosition = letter === letterInPosition;

        if(isCorrectPosition){
            return "rgb(83,141,78)"
        }

        return "rgb(181,159,59)";
    
    }

    function SubmitWord(){
        const currentWord = getCurrentWord();
        if(currentWord.length !==5){
            window.alert("words must be 5 letters");
        }

        const currentWord1 = currentWord.join("");

        

        const firstLetterId = guessWordCount * 5 + 1;
        const interval = 200;
        currentWord.forEach((letter, i) =>{
            setTimeout(()=>{
            const titleColor = getTileColor(letter, i);

            const letterId = firstLetterId + i;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style =`background-color:${titleColor};border-color:${titleColor}`;
            }, interval * i)
        });

        guessWordCount +=1;

        if (currentWord1 == word){
            window.alert("Congratulations!")
        }

        if(guessedWords.length ===6){
            window.alert(`Sorry no more guesses! The word is ${word}`);
        }
        guessedWords.push([]);
   
}
    

    function creatSquares(){
        const gameBoard = document.getElementById("board");

        for(let i = 0; i<30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("anime__animated");
            square.setAttribute("id", i +1);
            gameBoard.appendChild(square);
        }
    }

    function DeleteLetter(){
        const currentWord = getCurrentWord();
        const removeLetter = currentWord.pop();

        guessedWords[guessedWords.length -1] = currentWord;

        const lastLetterEl = document.getElementById(String(availableSpace -1));
        
        lastLetterEl.textContent = "";
        availableSpace = availableSpace -1;
    }

    for( let i = 0; i<keys.length; i++){
        keys[i].onclick = ({target}) =>{
            const letter = target.getAttribute("data-key")


            if(letter === "enter"){
                SubmitWord();
                    return;
                
            }
            if(letter === "del"){
                DeleteLetter();
                return;
            }
            updateGuessedWords(letter);
        };
    }



      });