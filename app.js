const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️Bravo✔️", "✨Tu est bon✨", "👀Encore un effort👀", "😭A revoir😭", "👎Tu es nul👎"];

const questions = document.querySelectorAll('.question');
const btn = document.querySelector('.btn');
const score = document.querySelector('.score');
const commentaire = document.querySelector('.commentaire');



btn.addEventListener('click', (e)=>{
    e.stopPropagation()
    let myScore = 0;
    if(document.querySelectorAll('input:checked').length < 5){
        return;
    }
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        let response = question.querySelector('input:checked');
        let inputs = Array.from(question.querySelectorAll('input'));
        for (let y = 0; y < inputs.length; y++) {
            const input = inputs[y];
            if(response === input){
                response = (y == 0) ? 'a' :( y == 1) ? 'b' : (y == 2) ? 'c' :'error';
                if(response === responses[i]){
                    myScore++;
                    questionStyle(question);
                }else{
                    questionStyle(question, false);
                }
            }
        }

    }
    console.log(score)
    score.innerHTML = `Score: <span>${myScore}/5</span>`;
    myScore -= 5;
    myScore = Math.abs(myScore);
    myScore = (myScore === 5) ? 4 : myScore;
    commentaire.innerText = emojis[myScore];
    window.addEventListener('click',restart);
})

function questionStyle(node, input=true){
    console.log(node);
    if(input){
        node.classList.add('valid');
        node.classList.remove('erreur');
    }else{
        node.classList.remove('valid');
        node.classList.add('erreur');
    }
}

function restart(){
    console.log("ici");
    questions.forEach((question)=>{
        question.classList.remove('erreur');
        question.classList.remove('valid');
    });
    score.innerHTML ="";
    commentaire.innerText = "";
    this.removeEventListener("click", restart, false);
}