
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
            document.getElementById('output').innerHTML = 'Ты знаешь сам(а)';

            break;

        case 2:
        case 11:
         
            document.getElementById('output').innerHTML = 'Да!';
            break;
            
        case 3:
        case 12:
         
            document.getElementById('output').innerHTML = 'Нет!';
            break;

        case 4:
        case 13:
           
            document.getElementById('output').innerHTML = 'Обязательно!';
            break;

        case 5:
        case 14:
            
            document.getElementById('output').innerHTML = 'Возможно.';
            break; 
            
        case 6:
        case 15:
            
            document.getElementById('output').innerHTML = 'Будут препятсвия.';
            break;

        case 7:
        case 16:
            
            document.getElementById('output').innerHTML = 'Надейся и жди...';
            break;

        case 8:
        case 17:
         
            document.getElementById('output').innerHTML = 'Да, но не сейчас.';
            break;
            
        case 9:
        case 18:
            
            document.getElementById('output').innerHTML = 'Позже.';
            break;

        default:
           
            document.getElementById('output').innerHTML = 'Тут даже звезды не знают...';
            break;
    }
}

const cleanInput = () => {
    const getInput = document.getElementById("userInput");
    getInput.value = '';                      
  }
