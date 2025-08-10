/* PYTACRYPT.JS LIBRARY
 Download at: https://github.com/stoneclock/pytacrypt.js
 Author: stoneclock
 THIS CONTENT IS FREE TO USE AND REPRODUCE WITHOUT
 CREDITING THE AUTHOR. FEEL FREE TO USE ANY PART OF
 THIS FILE FOR PERSONAL AND COMMERCIAL PURPOSES.
 For more information, visit https://unlicense.org

 If you'd still like to credit the author, you may
 place a link to his Github account:
 https://github.com/stoneclock

 You can link this library to your html file using
 the following link:
 https://raw.githubusercontent.com/stoneclock/pytacrypt.js/refs/heads/master/pytacrypt.js

 Version: 0.1.0-alpha
 Production-ready: No
*/

const Pytacrypt = {}

Pytacrypt.version = "0.1.0-alpha";
Pytacrypt.author = "stoneclock";
Pytacrypt.license = "UNLICENSE";
Pytacrypt.productionReady = false;

Pytacrypt.alphabetArray = [
    "a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x",
    "y", "z" ]

Pytacrypt.ROT13Array = [
    ["a", "n"], ["b", "o"], ["c", "p"], ["d", "q"], ["e", "r"],
    ["f", "s"], ["g", "t"], ["h", "u"], ["i", "v"], ["j", "w"],
    ["k", "x"], ["l", "y"], ["m", "z"], ["n", "a"], ["o", "b"],
    ["p", "c"], ["q", "d"], ["r", "e"], ["s", "f"], ["t", "g"],
    ["u", "h"], ["v", "i"], ["w", "j"], ["x", "k"], ["y", "l"],
    ["z", "m"]
]

Pytacrypt.keyboardArray = [
        "`123456789-=",
        "qwertyuiop[]\\",
        "asdfghjkl;'",
        "zxcvbnm,./",
        "~!@#$%^&*()_+",
        "QWERTYUIOP{}|",
        "ASDFGHJKL:\"",
        "ZXCVBNM<>?"
];

Pytacrypt.morseCodeObject = {
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".",
        "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---",
        "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---",
        "p": ".--.", "q": "--.-",
        "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-",
        "w": ".--", "x": "-...", "y": "-.--", "z": "--..",
        "0": "-----",
        "1": ".----", "2": "..---", "3": "...--",
        "4": "....-", "5": ".....", "6": "-....",
        "7": "--...", "8": "---..", "9": "----.",
        " ": "/"
};
// Create a reverse mapping from morse code to letter
Pytacrypt.morseCodeReverseObject = {};
for (const [letter, code] of Object.entries(Pytacrypt.morseCodeObject)) {
    Pytacrypt.morseCodeReverseObject[code] = letter;
}

Pytacrypt.isLetter = function(char){
    return /^[a-zA-Z]$/.test(char);
}

Pytacrypt.ROT13encrypt = function(text) {
    let result = '';
    for(let i = 0; i < text.length; i++) {
        let char = text[i];
        for(let j = 0; j < Pytacrypt.ROT13Array.length; j++) {
            if(char == Pytacrypt.ROT13Array[j][0] || char == Pytacrypt.ROT13Array[j][0].toUpperCase()) {
                char = char.replace(Pytacrypt.ROT13Array[j][0], Pytacrypt.ROT13Array[j][1]);
                char = char.replace(Pytacrypt.ROT13Array[j][0].toUpperCase(), Pytacrypt.ROT13Array[j][1].toUpperCase());
                break;
            }
        }
        result += char;
    }
    result += "ro13";
    return result;
}

Pytacrypt.CaesarEncrypt = function(text, shift = 3) {
    if(shift < 0) shift += Pytacrypt.alphabetArray.length; // Convert negative shifts to positive
    shift = shift % Pytacrypt.alphabetArray.length; // Ensure shift is within the bounds of the alphabet
    
    let result = '';
    for(let i = 0; i < text.length; i++) {
        let char = text[i];
        for(let j = 0; j < Pytacrypt.alphabetArray.length; j++) {
            if(char == Pytacrypt.alphabetArray[j] || char == Pytacrypt.alphabetArray[j].toUpperCase()) {
                let newIndex = j + shift;
                if(newIndex >= Pytacrypt.alphabetArray.length) {
                    newIndex -= Pytacrypt.alphabetArray.length;
                }
                char = char.replace(Pytacrypt.alphabetArray[j], Pytacrypt.alphabetArray[newIndex]);
                char = char.replace(Pytacrypt.alphabetArray[j].toUpperCase(), Pytacrypt.alphabetArray[newIndex].toUpperCase());
                break;
            }
        }
        result += char;
    }
    result += "ca"
    if(shift < 10) result += "0" + shift;
    else result += shift;
    return result;
}

Pytacrypt.KeyboardShiftEncrypt = function(text, direction = "right", shift = 1) {
    let result = '';
    
    for(let j = 0; j < text.length; j++) {
        let char = text[j];
        for(let i = 0; i < Pytacrypt.keyboardArray.length; i++) {
            if(Pytacrypt.keyboardArray[i].includes(char)) {
                let index = Pytacrypt.keyboardArray[i].indexOf(char);
                if(direction === "right") {
                    index += shift;
                    if(index >= Pytacrypt.keyboardArray[i].length) index -= Pytacrypt.keyboardArray[i].length;
                } else if(direction === "left") {
                    index -= shift;
                    if(index < 0) index += Pytacrypt.keyboardArray[i].length;
                }
                char = Pytacrypt.keyboardArray[i][index];
            }
        }
        result += char;
    }
    result += "k" + (direction === "right" ? "r" : "l");
    if(shift < 10) result += "0" + shift;
    else result += shift;
    return result;
}

Pytacrypt.MorseCodeEncrypt = function(text, capitalLetters = true) {
    let result = '';
    for(let i = 0; i < text.length; i++) {
        let char = text[i];
        if(Pytacrypt.morseCodeObject[char] !== undefined || Pytacrypt.morseCodeObject[char.toLowerCase()] !== undefined) {
            char = Pytacrypt.morseCodeObject[char.toLowerCase()];
            if(Pytacrypt.isLetter(text[i]) && text[i] != text[i].toLowerCase() && capitalLetters) {
                char += 'c';
            }
            char += " ";
        }
        result += char;
    }
    return result + "mcde";
}

Pytacrypt.ROT13decrypt = function(text) {
    text = text.replace("ro13", "");
    text = Pytacrypt.ROT13encrypt(text);
    text = text.replace("ro13", "");
    return text;
}

Pytacrypt.CaesarDecrypt = function(text) {
    let shift = parseInt(text.slice(-2));
    if(shift < 10) shift = parseInt(text.slice(-1));
    return Pytacrypt.CaesarEncrypt(text.slice(0, -2), -shift);
}

Pytacrypt.KeyboardShiftDecrypt = function(text, direction = "right", shift = 1) {
    //let shift = parseInt(text.slice(-2));
    //if(shift < 10) shift = parseInt(text.slice(-1));
    return Pytacrypt.KeyboardShiftEncrypt(text.slice(0, -4), text[text.length-3] === "r" ? "left" : "right", shift).slice(0, -4);
}

Pytacrypt.MorseCodeDecrypt = function(text) {
    text = text.replace("mcde", "");
    const firstLetter = text.split(" ")[0];

    for(const i in Pytacrypt.morseCodeReverseObject) {
        text = text.replaceAll(" " + i + " ", " " + Pytacrypt.morseCodeReverseObject[i] + " ");
        text = text.replaceAll(" " + i + " ", " " + Pytacrypt.morseCodeReverseObject[i] + " ");
        if(Pytacrypt.isLetter(Pytacrypt.morseCodeReverseObject[i]))
            text = text.replaceAll(" " + i + "c ", " " + Pytacrypt.morseCodeReverseObject[i].toUpperCase() + " ");
    }

    if(firstLetter.endsWith("c")) 
        text = text.replace(" " + firstLetter + "c ", " " + Pytacrypt.morseCodeReverseObject[firstLetter.replace("c", "")].toUpperCase() + " ");
    else
        text = text.replace(firstLetter, Pytacrypt.morseCodeReverseObject[firstLetter]);

    return text;
}

console.log(Pytacrypt.MorseCodeDecrypt("....c . .-.. .-.. --- / .--c --- .-. .-.. -.. !mcde")); // Example usage