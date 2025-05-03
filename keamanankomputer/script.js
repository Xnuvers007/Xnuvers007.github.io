
        'use strict';

        document.getElementById('sdahdusa').textContent = atob('SW5kcmEgRHdpIEFyeWFkaQ==');
        document.getElementById('sdahdusa2').textContent = atob('SW5kcmEgRHdpIEFyeWFkaQ==');

        document.getElementById('years').textContent = new Date().getFullYear();

        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Action Blocked',
                text: 'Right-click is disabled on this page.',
                confirmButtonText: 'OK'
            });
        });

        document.addEventListener('keydown', function (e) {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Not Allowed',
                    text: 'Developer tools are disabled on this page.',
                    confirmButtonText: 'Got it'
                });
            }
        });

        const elements = {
            encodeText: document.getElementById('encodeText'),
            decodeText: document.getElementById('decodeText'),
            keyInput: document.getElementById('keyInput'),
            messageList: document.getElementById('messageList'),
            cipherList: document.getElementById('cipherList'),
            currentKey: document.getElementById('currentKey'),
            indexDisplay: document.getElementById('indexDisplay'),
            spaceNumber: document.getElementById('spaceNumber')
        };


        elements.encodeText.addEventListener('input', function (e) {
            const sanitizedValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            if (e.target.value !== sanitizedValue) {
                e.target.value = sanitizedValue;
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Input',
                    text: 'Only letters and spaces are allowed!',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            updateDisplay();
        });


        elements.keyInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.toUpperCase();
            const sanitizedValue = e.target.value.replace(/[^a-zA-Z]/g, '');
            if (e.target.value !== sanitizedValue) {
                e.target.value = sanitizedValue;
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Key',
                    text: 'Key must only contain uppercase letters (A-Z)!',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            updateDisplay();
        });


        const securityUtils = {

            sanitizeInput: function (input) {
                if (typeof input !== 'string') return '';
                return DOMPurify.sanitize(input);
            },


            validateKey: function (key) {
                return /^[A-Z]+$/.test(key);
            },

            cleanContent: function (content) {
                if (typeof content !== 'string') return '';
                return content;
            }
        };

        function vigenereEncode(text, key) {
            if (!text || !key) return '';

            text = securityUtils.cleanContent(text);
            key = securityUtils.cleanContent(key).toLowerCase();

            let encoded = '';
            let keyIndex = 0;

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char.match(/[a-zA-Z]/)) {
                    const keyChar = key[keyIndex % key.length];
                    const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0);
                    let charCode = char.charCodeAt(0);

                    if (char >= 'a' && char <= 'z') {
                        charCode = ((charCode - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0);
                    } else if (char >= 'A' && char <= 'Z') {
                        charCode = ((charCode - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0);
                    }

                    encoded += String.fromCharCode(charCode);
                    keyIndex++;
                } else {
                    encoded += char;
                }
            }

            return encoded;
        }

        function vigenereDecode(text, key) {
            if (!text || !key) return '';


            text = securityUtils.cleanContent(text);
            key = securityUtils.cleanContent(key).toLowerCase();

            let decoded = '';
            let keyIndex = 0;

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char.match(/[a-zA-Z]/)) {
                    const keyChar = key[keyIndex % key.length];
                    const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0);
                    let charCode = char.charCodeAt(0);

                    if (char >= 'a' && char <= 'z') {
                        charCode = ((charCode - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0);
                    } else if (char >= 'A' && char <= 'Z') {
                        charCode = ((charCode - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0);
                    }

                    decoded += String.fromCharCode(charCode);
                    keyIndex++;
                } else {
                    decoded += char;
                }
            }

            return decoded;
        }


        function clearTextarea() {
            elements.encodeText.value = '';
            elements.decodeText.value = '';


            elements.messageList.innerHTML = '<li>No message to display</li>';
            elements.cipherList.innerHTML = '<li>No result to display</li>';
            elements.currentKey.textContent = 'No key set';
            elements.indexDisplay.innerHTML = '';


            Swal.fire({
                title: 'Cleared!',
                text: 'All text fields have been cleared.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 1500,
                timerProgressBar: true
            });
        }

        function updateDisplay() {
            const encodeText = elements.encodeText.value;
            const key = elements.keyInput.value;


            const sanitizedText = securityUtils.sanitizeInput(encodeText);
            const sanitizedKey = securityUtils.sanitizeInput(key);


            if (sanitizedText) {
                elements.messageList.innerHTML = `
                    <li>${DOMPurify.sanitize(sanitizedText.toUpperCase())}</li>
                    <li>${DOMPurify.sanitize(sanitizedText)}</li>
                `;
            } else {
                elements.messageList.innerHTML = '<li>No message to display</li>';
            }


            if (sanitizedKey) {
                elements.currentKey.textContent = sanitizedKey;
            } else {
                elements.currentKey.textContent = 'No key set';
            }


            elements.indexDisplay.innerHTML = '';

            if (sanitizedText && sanitizedKey) {
                let keyIndex = 0;
                const keyLength = sanitizedKey.length;

                for (let i = 0; i < sanitizedText.length; i++) {
                    if (sanitizedText[i].match(/[a-zA-Z]/)) {
                        const div = document.createElement('div');
                        div.classList.add('index-item');
                        const keyChar = sanitizedKey[keyIndex % keyLength];


                        if (keyChar && keyChar.match(/[A-Z]/)) {
                            const charShift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);
                            div.textContent = charShift;
                            elements.indexDisplay.appendChild(div);
                            keyIndex++;
                        }
                    }
                }
            }


            if (sanitizedText && sanitizedKey) {
                const encodedMessage = vigenereEncode(sanitizedText, sanitizedKey);
                elements.cipherList.innerHTML = `<li>${DOMPurify.sanitize(encodedMessage)}</li>`;
            } else {
                elements.cipherList.innerHTML = '<li>No result to display</li>';
            }
        }


        document.getElementById('randomKey').addEventListener('click', function () {
            try {
                let key = '';
                const length = 5 + Math.floor(Math.random() * 4);
                const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


                const array = new Uint8Array(length);
                window.crypto.getRandomValues(array);

                for (let i = 0; i < length; i++) {

                    const index = array[i] % validChars.length;
                    key += validChars[index];
                }

                elements.keyInput.value = key;
                elements.currentKey.textContent = key;


                elements.keyInput.style.backgroundColor = '#e8f4fc';
                setTimeout(() => {
                    elements.keyInput.style.backgroundColor = '';
                }, 300);

                updateDisplay();

                Swal.fire({
                    title: 'Random Key Generated!',
                    text: `Your new key is: ${key}`,
                    icon: 'success',
                    confirmButtonText: 'Use This Key',
                    timer: 2000,
                    timerProgressBar: true
                });
            } catch (error) {
                console.error('Error generating random key:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to generate a random key. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

        document.getElementById('encodeBtn').addEventListener('click', function () {
            const text = elements.encodeText.value;
            const key = elements.keyInput.value;

            if (!/^[a-zA-Z\s]+$/.test(text)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Characters',
                    text: 'Text can only contain letters and spaces!',
                    confirmButtonText: 'OK'
                });
                return;
            }

            if (!key) {
                Swal.fire({
                    title: 'Missing Key',
                    text: 'Please enter a key for encryption',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                elements.keyInput.focus();
                return;
            }

            if (!securityUtils.validateKey(key)) {
                Swal.fire({
                    title: 'Invalid Key',
                    text: 'Key should contain only uppercase letters (A-Z)',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                elements.keyInput.focus();
                return;
            }

            if (!text) {
                Swal.fire({
                    title: 'No Text',
                    text: 'Please enter text to encode',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                elements.encodeText.focus();
                return;
            }

            try {
                const encoded = vigenereEncode(text, key);
                elements.decodeText.value = encoded;
                updateDisplay();


                elements.decodeText.style.backgroundColor = '#e8f4fc';
                setTimeout(() => {
                    elements.decodeText.style.backgroundColor = '';
                }, 300);

                Swal.fire({
                    title: 'Text Encoded!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    timerProgressBar: true
                });
            } catch (error) {
                console.error('Encoding error:', error);
                Swal.fire({
                    title: 'Encoding Error',
                    text: 'An error occurred during encoding. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

        document.getElementById('decodeBtn').addEventListener('click', function () {
            const text = elements.decodeText.value;
            const key = elements.keyInput.value;

            // if (!/^[a-zA-Z\s]+$/.test(text)) {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Invalid Characters',
            //         text: 'Text can only contain letters and spaces!',
            //         confirmButtonText: 'OK'
            //     });
            //     return;
            // }

            if (!text) {
                Swal.fire({ title: 'No Text', text: 'Please enter text to decode',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                elements.decodeText.focus();
                return;
            }
            

            if (!key) {
                Swal.fire({
                    title: 'Missing Key',
                    text: 'Please enter a key for decryption',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                elements.keyInput.focus();
                return;
            }

            if (!securityUtils.validateKey(key)) {
                Swal.fire({
                    title: 'Invalid Key',
                    text: 'Key should contain only uppercase letters (A-Z)',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                elements.keyInput.focus();
                return;
            }

            if (!text) {
                Swal.fire({
                    title: 'No Text',
                    text: 'Please enter text to decode',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                elements.decodeText.focus();
                return;
            }

            try {
                const decoded = vigenereDecode(text, key);
                elements.encodeText.value = decoded;
                updateDisplay();


                elements.encodeText.style.backgroundColor = '#e8f4fc';
                setTimeout(() => {
                    elements.encodeText.style.backgroundColor = '';
                }, 300);

                Swal.fire({
                    title: 'Text Decoded!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    timerProgressBar: true
                });
            } catch (error) {
                console.error('Decoding error:', error);
                Swal.fire({
                    title: 'Decoding Error',
                    text: 'An error occurred during decoding. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

        document.getElementById('clearTextarea').addEventListener('click', clearTextarea);

        document.getElementById('removeSpaces').addEventListener('click', function () {
            const text = elements.encodeText.value;

            if (!text) {
                Swal.fire({
                    title: 'No Text',
                    text: 'There is no text to process',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            try {
                elements.encodeText.value = text.replace(/\s+/g, '');
                updateDisplay();

                Swal.fire({
                    title: 'Spaces Removed',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    timerProgressBar: true
                });
            } catch (error) {
                console.error('Error removing spaces:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to remove spaces. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
        document.getElementById('addSpaces').addEventListener('click', function () {
            const text = elements.encodeText.value;
            const spaceCount = parseInt(elements.spaceNumber.value, 10);

            if (!text) {
                Swal.fire({
                    title: 'No Text',
                    text: 'There is no text to process',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            try {
                const spacedText = text.replace(new RegExp(`(.{${spaceCount}})`, 'g'), `$1 `).trim();
                elements.encodeText.value = spacedText;
                updateDisplay();

                Swal.fire({
                    title: 'Spaces Added',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    timerProgressBar: true
                });
            } catch (error) {
                console.error('Error adding spaces:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add spaces. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

        updateDisplay();
