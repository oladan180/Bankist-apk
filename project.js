const account1={
    owner:'Ola Daniel',
    movements:[200,300,400,-320,-500,-100,300,-100,-229,533,400,700,2000],
    interestRate:0.7,
    pin:333
}

const account2={
    owner:'Dan John',
    movements:[200,100,400,-320,-500,-1000,123,100,400,-320,-500,-100],
    interestRate:1,
    pin:4545
}

const account3={
    owner:'Mo Ramson',
    movements:[200,221,400,-320,-50,-100,123,100,400,-320,-500,-100],
    interestRate:0.4,
    pin:1280
}

const account4={
    owner:'Frank John',
    movements:[123,100,400,-320,-500,-100,123,100,400,-320,-500,-100],
    interestRate:0.5,
    pin:111
}

const accounts = [account1,account2,account3,account4];
console.log(accounts);


// Getting started

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const containerMovements = document.querySelector('.one');
const totalBalance = document.querySelector('.amount');
const interestIn= document.querySelector('.digit_in');
const interestOut= document.querySelector('.digit_out');
const digit_interest = document.querySelector('.digit_interest');
const labelWelcome = document.querySelector('.label_text--welcome');
const containerApp = document.querySelector('.app');
const inputTransferTo= document.querySelector('.input__To');
const inputTransferAmount= document.querySelector('.input__Amount');
const btnTransfer= document.querySelector('.btn__transfer--btn');
const loanTransfer = document.querySelector('.request__loan--transfer');
const loanTransferButton = document.querySelector('.loan__transfer--btn');
const closeAccount = document.querySelector('.close__account');
const closeAccountButton = document.querySelector('.close__account--button');
const closeAccountPin = document.querySelector('.close__account--input');
const buttonSort = document.querySelector('.button-sort');




const inputButton = document.querySelector('.arrow');

const price = document.querySelector('.price');
console.log(price);





// ets 
displayMovements =(acc,sort=false)=>{
    containerMovements.innerHTML='';

    const movs = sort? acc.slice().sort((a,b)=> a-b):acc;
    movs.forEach((mov,i)=>{
        
        
        const type = mov>0?'deposit':'withdrawal';
        const html = `  
        <div class="movement_row">
            <div class="movement__type movement__type--${type}">${i+1} ${type}</div>
            <div class="movement__value">${mov}$</div>
        </div>`;


    containerMovements.insertAdjacentHTML('afterbegin',html);
    });

};


// const createUsername=function(accts){
//     accts.forEach(function(acc){
//         acc.username=acc.owner.toLowerCase().split(' ').map(m=>m[0]).join('');

//     });
// }


const createUsername=(accts)=>{
    accts.forEach(acc=>acc.username=acc.owner.toLowerCase().split(' ').map(m=>m[0]).join(''));

};
createUsername(accounts);
console.log(accounts);

// const deposits = movements.filter(function(mov){
//     return mov>0;
// });
// console.log(deposits);
// deposits=(movements)=>{
//     let del = movements.filter(m=>m>0);
//     return del;
// }
// console.log(deposits(movements));
// withdrawal =(move)=>{
//     let withd = move.filter(mov=>mov<0);
//     return withd;
// };
// console.log(withdrawal(movements));


reduce =(acc)=>{
    acc.balance = acc.movements.reduce((d,i)=>d+i,0);
    totalBalance.textContent=`${acc.balance}$`;

    
};


////////InterestIn

const getTotalSummary=(acc)=>{
    const income =acc.movements.filter(mov=>mov>0).reduce((acc,corr)=>acc+corr,0);
    interestIn.textContent=`$${income}`;

    const outcome = acc.movements.filter(mov=>mov<0).reduce((acc,corr)=>acc+corr,0);

    interestOut.textContent=`$${Math.abs(outcome)}`;
    

    const interest =
     acc.movements.filter(mov=>mov>0)
    .map(m=>(m*acc.interestRate)/100)
    .filter((int,i,arr)=>{
        console.log(arr);
        return int>1;
    })
    .reduce((acc,corr)=>acc+corr,0);
    digit_interest.textContent=`$${interest}`
    

    

    

};


let sorted = false;
buttonSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted=!sorted;

})
updateUi=(acc)=>{
    reduce(acc);
    displayMovements(acc.movements);
    getTotalSummary(acc);

}





inputButton.addEventListener('click',function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc=>acc.username===inputLoginUsername.value);
    if(currentAccount?.pin===Number(inputLoginPin.value)){
        labelWelcome.textContent=`You are welcome, ${currentAccount.owner.split(' ')[0]}`

        containerApp.style.opacity = 100;
        inputLoginUsername.value=inputLoginPin.value='';

       updateUi(currentAccount);
        
    }



  
});

//////////Implementing Transfer...PUSH METHOD

btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const recieverAcc = accounts.find(acc => acc.username===inputTransferTo.value);
    if (amount>0 && recieverAcc && currentAccount.username !== recieverAcc.username && currentAccount.balance>=amount){
        console.log('Transfer valid');
        inputTransferAmount.value=inputTransferTo.value='';
   

        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);
        
        updateUi(currentAccount);
 

       

       
      

    };
});






///////Implementing loan transfer button...USING PUSH METHOD

loanTransferButton.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(loanTransfer.value);
    if(amount>0 && currentAccount.movements.some(mov=>mov>=(amount*0.1))){
        currentAccount.movements.push(amount);

        loanTransfer.value='';

        updateUi(currentAccount);
    }
});

///////CLOSING ACCOUNT USING FIND INDEX METHOD FOR THE SPLICE
closeAccountButton.addEventListener('click', function(e){
    e.preventDefault();

    if(closeAccount.value===currentAccount.username && Number(closeAccountPin.value)===currentAccount.pin){
        closeAccount.value = closeAccountPin.value ='';
        const index = accounts.findIndex(acc=>acc.username===currentAccount.username);
        console.log(index);
        ////Delete currentAccount
        accounts.splice(index);

        ////Hide UI
        containerApp.style.opacity = 0;
    }


})




// const overallBalance = accounts.map(mov => mov.movements);
// console.log(overallBalance);
// const balanceT =overallBalance.flat();
// const balanceUp = balanceT.reduce((acc,curr)=>acc+curr,0);

//////CALCULATING OVERALL BALANCE USING CHAINING OF MAP,FLAT AND REDUCE
const overallBalance=accounts.map(mov=>mov.movements).flat().reduce((acc,curr)=>acc+curr,0);
console.log(overallBalance);



/////////SORTING AN ARRAY USING CHAINING OF MAP,FLAT AND SORTING METHOD
// const accountB =accounts.map(mov=>mov.movements).flat().sort((a,b)=>{
//     if(a>b) return 1;
//     if(a<b) return -1;
// });
const accountB =accounts.map(mov=>mov.movements).flat().sort((a,b)=>a-b);


//////GETTING A MAXIMUM NUMBER USING CHAINING METHOD OF FLAT MAP AND REDUCE
const accountC = accounts.flatMap(mov=>mov.movements).reduce((a,b)=>{
    if(a>b) return a;
    if(b>a) return b;
});

console.log(accountB,accountC);


// accounype =(account)=>{
//     account.forEach(function(acct){
//         if(acct.username[0]==='o'){
//             acct.accountT = 'fixed'
//         }
//     })

// }
// accountType(accounts);
// console.log(accounts);

// const max = movements.reduce(function(acc,mov){
//     if (acc>mov){
//         return acc;
//     }else{
//         return mov;
//     }

// },movements[0]);

// console.log(max);



/////////////project

// calAverageHumanAge=(dogAge)=>{
//     const humanAge = dogAge.map(dog=>dog<2?dog*2:16+dog*2);
//     console.log(humanAge);
//     const Adult = humanAge.filter(age=>age>=18);
//     console.log(Adult);
//     const Average = Adult.reduce((acc,corr)=> (acc+corr)/Adult.length);
//     console.log(Average);
calAverageHumanAge=(dogAge)=>{
    const average = dogAge.map(dog=>dog<2?dog*2:16+dog*2).filter(age=> age>=18).reduce((acc,curr,i,arr)=>(acc+curr)/arr.length,0);
    console.log(average);

}

  



// }
const z =Math.random( Array.from({length:100},(_,i)=>i+1));
console.log(z);


totalBalance.addEventListener('click',function(){
    const movementUi = Array.from(document.querySelectorAll('.movement__value'),el=>Number(el.textContent.replace('$','')));
    console.log(movementUi);
})

calAverageHumanAge([5,2,4,1,15,8,3])



// const euroToUsd = 1.1;
// const dollarDeposit= movements.filter(mov=>mov>0).map(m=>m*euroToUsd).reduce((acc,curr)=>acc+curr,0);
// console.log(dollarDeposit); 

// project...
// /////challenge to start with...
// checkDogs=(julieData,kateData)=> {
//     const kateDataChange = [...kateData];
//     kateDataChange.splice(0,1);
//     kateDataChange.splice(-2);

//     console.log(kateDataChange);
//     const dogs = [...kateDataChange,...julieData];

//     dogs.forEach(function(dog,i){
//         if(dog>=3){
//             console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
//         }else{
//             console.log(`Dog number ${i+1} is still a puupy`);
//         }
//     })


// // }
// // checkDogs([3,5,2,12,7],[4,1,15,8,3]);

// const euroToUsd = 1.1;
// const money = account1.movements.map(mov=>mov*euroToUsd);

