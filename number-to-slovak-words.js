var ReplaceNumberWithWords = (function () {
    var numbersInWords = {
        zero: 'nula',
        1: 'jeden',
        2: 'dva',
        3: 'tri',
        4: 'štyri',
        5: 'päť',
        6: 'šesť',
        7: 'sedem',
        8: 'osem',
        9: 'deväť',
        10: 'desať',
        11: 'jedenásť',
        12: 'dvanásť',
        13: 'trinásť',
        14: 'štrnásť',
        15: 'pätnásť',
        16: 'šestnásť',
        17: 'sedemnásť',
        18: 'osemnásť',
        19: 'devätnásť',
        20: 'dvadsať',
        30: 'tridsať',
        40: 'štyridsať',
        50: 'päťdesiat',
        60: 'šesťdesiat',
        70: 'sedemdesiat',
        80: 'osemdesiat',
        90: 'deväťdesiat',
        100: 'sto',
        200: 'dvesto',
        600: 'šesto',
        1000: 'tisíc',
        2000: 'dvetisíc'
    };
    return {
        numberHolder : [],

        number : null,

        replace(number) {
                //reset numberHolder
                this.numberHolder = [];

                this.number = number;
            
            //find out how many figures
            if (isNaN(number)) {
                throw new Error("the supplied parameter for replaceNumberWithWords function call must be a number");
                return;
            }
            //if the number exists in the numbersInWords object return that
          if( numbersInWords[number]) return numbersInWords[number];
            
            //check length
            var numberInString = number.toString() 
            var numberLength = numberInString.length;
            var numberHolder = [];

            for (let len = numberLength; len > 0; len-- ) {
             this.numberHolder[numberLength - len] = numberInString[len-1];  
              
            }

            //return console.log(numberHolder);
            return this.convertTowords();

        },
        convertTowords(){
            this.numberHolder.forEach((val, index) => {
                    let numberComponent = +val * Math.pow(10, index);
                    if (numbersInWords[numberComponent] && index > 1){
                            this.numberHolder[index] = numbersInWords[numberComponent];
                            return;
                    }
                    let number = +this.numberHolder[index];
                    if(number === 0) return;
                    
                   // let suffix = index === 3 ? 'tisic' : '';
                    let position = index % 3;

                    switch(position){
                            case 0 : this.numberHolder[index] = numbersInWords[number] || "" ; break;
                            case 1 : this.numberHolder[index] = this.processTens(index) ; break;
                            case 2 : this.numberHolder[index] =  numbersInWords[number] + numbersInWords[100]; break;
                    }

            });
       let processedString = this.processForOutput();
       return processedString;
        

        },
        processTens(index){
                let tensAndOnes;
                switch(index){
                    case 1: tensAndOnes = this.number % 100; break;
                    case 4: tensAndOnes = Math.floor(this.number/1000); break;
                }

                if(numbersInWords[tensAndOnes]){
                        let tenResults = numbersInWords[tensAndOnes];
                        this.numberHolder[index - 1] = '0';
                        return tenResults;
                } else {
                       return numbersInWords[+this.numberHolder[index] * 10];
                }

        },
        processForOutput(){
            if(this.numberHolder.length > 3){
                this.numberHolder.splice(3, 0, 'tisíc');
            }

            return this.numberHolder.reverse().join('').replace(/0/g, '').replace('tisíctisíc', 'tisíc');  

        },

        testSomefigures(){
            '15 30 45 312 516 888 901 700 1001 1203 1543 1999 2000 2001 2508 2999 3000 3001 3300 5400 9809 10000 10001 12345 25303 234234'
            .split(' ').forEach(val => {
               console.log(val);
               console.log(this.replace(+val)); 
            });

        }
    };
})();