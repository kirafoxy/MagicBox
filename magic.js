
function getUserInput() {
    
    const userInput = document.getElementById('userInput').value;

    const userQuestion = userInput;
    console.log(userQuestion);

    var newUserQuestion = String(userQuestion);
    console.log(typeof newUserQuestion);

    newUserQuestion = newUserQuestion.trim().replaceAll(" ","").replaceAll(/[\[,\?&!/\(\)-:;\.\*\^<>\]]/g, "")
    console.log(newUserQuestion);

    let numberOfQuestion = newUserQuestion.length;
    console.log(numberOfQuestion);

    let firstOfSum = numberOfQuestion % 10;
    
    console.log(firstOfSum);
    
    let secondOfNum = (numberOfQuestion - firstOfSum)/ 10;
    console.log(secondOfNum);

    let answerNum = Number(firstOfSum) + Number(secondOfNum);

   console.log(answerNum);
   
    switch(answerNum) {
        case 1:
        case 10:
        case 19:
            alert('Ты знаешь сам(а)')
            break;

        case 2:
        case 11:
            alert('Да!')
            break;
            
        case 3:
        case 12:
            alert('Нет!')
            break;

        case 4:
        case 13:
            alert('Обязательно!')
            break;

        case 5:
        case 14:
            alert('Возможно.')
            break; 
            
        case 6:
        case 15:
            alert('Будут препятсвия.')
            break;

        case 7:
        case 16:
            alert('Надейся и жди...')
            break;

        case 8:
        case 17:
            alert('Да, но не сейчас.')
            break;
            
        case 9:
        case 18:
            alert('Позже.')
            break;

        default:
            alert('Тут даже звезды не знают...')
            break;
    }
}
