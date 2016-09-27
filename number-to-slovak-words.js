/* 
 * Creator: Michal Kovář(2016)
 * exposes API:
 * Returns an object with the following API property:
 * 
 * replace(number) - expects a number or an errow will be thrown 
 *                 - returns the formated SVK string in lowercase 
 */

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
        replace: function replacer(number) {
            //find out how many figures
            if (isNaN(number)) {
                throw new Error("the supplied parameter for replaceNumberWithWords function call must be a number");
                return;
            }

            var thousands = '';
            var belowThousands = '';

            if (number === 0) {
                return numbersInWords.zero;
            }

            if (number === 1000) {
                return numbersInWords[1] + numbersInWords[1000];
            }


            //get anything above thousand not including 2000 - 2999 range   
            
            if (number > 1000 && (number < 2000 || number > 3000)) {
                var thousandsLen = Math.floor(number / 1000).toString().length;
                thousands = this.convertToWords(Math.floor(number / 1000), thousandsLen) + numbersInWords[1000];
            }
            //this is because Slovaks say 'dvetisíc' and not 'dvatisíc'
            if (2000 <= number && number < 3000) {
                thousands = 'dve' + numbersInWords[1000];
            }

            //get anything below thousands
            var belowThousadsLen = (number % 1000).toString().length;

            if (number % 1000 && belowThousadsLen) {
                var belowThousands = this.convertToWords(number % 1000, belowThousadsLen);
            }

            return thousands + belowThousands;

        },
        convertToWords: function converter(number, len) {
            //declare variables
            var temp,
                    exponent,
                    reminder,
                    numberElement,
                    wordComponent,
                    currentMultipleOfTen;

            //initialzie variables with the values
            arguments.length === 3 ? temp = arguments[2] : temp = [];
            exponent = len - 1;
            currentMultipleOfTen = Math.pow(10, exponent);
            reminder = number % currentMultipleOfTen;// currentMulitpleOfTen;
            numberElement = (+number - +reminder);

            //check if numberElements in numberInWords exists (this is for exceptions from standard)
            if (numbersInWords[numberElement]) {
                //if so add it to the temporary object

                //decrease len for appropriate number
                if (numbersInWords[number]) {
                    temp.push(numbersInWords[number]);

                } else {
                    temp.push(numbersInWords[numberElement]);

                }

            } else {
                //combine number of units and the current multiple of ten
                wordComponent = numberElement / +currentMultipleOfTen;//currentMultipleOfTen;

                temp.push(numbersInWords[wordComponent] + (currentMultipleOfTen !== 1 ? numbersInWords[currentMultipleOfTen] : ''));
            }
            //decrement length by 2 steps if reminder is one digit number
            //decrement length by 1 step if reminder is a two digit number
            +reminder - 10 >= 0 ? len-- : len -= 2;

            if (reminder && len > 0) {
                //make the recurcive call
                this.convertToWords(reminder, len, temp);
            }
            //return the array
            return temp.join('');

        },
        //experimental method for returning concatenated string of number in Slovak langulage. 
        //Used to search for 'undefined' or NaN -siganlling problems
        checkStringOutput: function chceckStringOutput(topNumber) {
            var output = [];
            for (var i = 0, len = topNumber; i < len; i++) {
                output.push(replaceNumberWithWords(i));
            }

            return output.join('');
        }

    };
})();

