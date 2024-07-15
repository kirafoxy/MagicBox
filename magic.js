
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
    //14%10=4
    console.log(firstOfSum);
    
    let secondOfNum = numberOfQuestion - firstOfSum;
    console.log(secondOfNum);


    let answerNum = firstOfSum + secondOfNum;

   console.log(answerNum);
    // let answerForQuestion = firstOfSum + secondOfNum;
    // console.log(answerForQuestion);


}

// let numberOfQuestion = userQuestion.length;
// console.log(numberOfQuestion);

//заменить на вывод текста в html
// switch(answer) {
//     case 1:
//         alert('')
//         break;

//     case 2:
//         alert('')
//         break;
        
//     case 3:
//         alert('')
//         break;

//     case 4:
//         alert('')
//         break;

//     case 5:
//         alert('')
//         break; 
        
//     case 6:
//         alert('')
//         break;

//     case 7:
//         alert('')
//         break;

//     case 8:
//         alert('')
//         break;
        
//     case 9:
//         alert('')
//         break;

//     default:
//         alert('Тут даже звезды не знают...')
//         break;
// }
