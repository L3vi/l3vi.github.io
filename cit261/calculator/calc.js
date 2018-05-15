const calculator = {
    number1: 0,
    number2: 0,
    memory: 0,
    mSet: false,
    operaton: '',
    io: document.getElementById('calcInput'),
    clear: function () {
        this.io.value = '';
    },
    remember: function() {
        if(this.mSet == false) {
            this.memory = this.io.value;
            this.mSet = true;
        } else if(this.mSet == true) {
            this.io.value = this.memory;
            this.mSet = false;
        }
    },
    forget: function() {
        if(this.mSet) {
            this.memory = 0;
            this.mSet = false;
        }
    },
    equals: function () {
        this.number2 = this.io.value;
        switch (this.operaton) {
            case '/':
                this.io.value = this.number1 / this.number2;
                break;
            case 'X':
                this.io.value = this.number1 * this.number2;
                break;
            case '-':
                this.io.value = this.number1 - this.number2;
                break;
            case '+':
                this.io.value = parseFloat(this.number1) + parseFloat(this.number2);
                break;
        }
    },
    buttonClicked: function (button) {
        console.log(button.innerHTML);
        let inputBox = this.io;
        switch (button.innerHTML) {
            case 'MR':
                this.remember();
                break;
            case 'MC':
                this.forget();
                break;
            case 'C':
                this.clear();
                break;
            case '/':
            case 'X':
            case '-':
            case '+':
                this.number1 = this.io.value;
                this.operaton = button.innerHTML;
                this.clear();
                break;
            case '=':
                this.equals();
                break;
            default:
                //if it made it to here it's a number
                inputBox.value = inputBox.value + button.innerHTML;
        }
    },
};
