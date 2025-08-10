# PYTACRYPT.JS
<h3>An encryption library of the Pytamath series. </h3>

# Encryption functions and codes
<table>
    <tr><b>
        <th>Cipher/Code</th>
        <th>Encrypt Function</th>
        <th>Decrypt Function</th>
        <th>Encryption Code (4 chars)</th>
        </b>
    </tr>
    <tr>
        <th>ROT13</th>
        <th>```Pytacrypt.ROT13encrypt(text)```</th>
        <th>```Pytacrypt.ROT13decrypt(text)```</th>
        <th>```ro13```</th>
    </tr>
    <tr>
        <th>Caesar Cipher</th>
        <th>```Pytacrypt.CaesarEncrypt(text, shift = 3)```</th>
        <th>```Pytacrypt.CaesarDecrypt(text)```</th>
        <th>```ca{shift}```</th>
    </tr>
    <tr>
        <th>Keyboard Shift</th>
        <th>```Pytacrypt.KeyboardShiftEncrypt(text, direction = "right", shift = 1)```</th>
        <th>```Pytacrypt.KeyboardShiftDecrypt( = function()text, direction = "right", shift = 1)```</th>
        <th>```k{direction("l"/"r")}{shift}```</th>
    </tr>
        <th>Morse Code</th>
        <th>```Pytacrypt.MorseCodeEncrypt(text, capitalLetters = true)```</th>
        <th>```Pytacrypt.MorseCodeDecrypt(text)```</th>
        <th>```mcde```</th>
    </tr>
</table>

# Additional notes:
For ```Pytacrypt.MorseCodeEncrypt()```, if the ```capitalLetters``` parameter is true (it is by default), capital letters will be noted with a "c".