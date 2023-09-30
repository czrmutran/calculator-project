const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText  // Printed value on screen
        this.currentOperationText = currentOperationText   // Printed value on screen
        this.currentOperation = ""  // User' value insert at the moment
    }


    // Add digit to calculator screen
    addDigit(digit) {
        // Check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Process all calculator operations 
    processOperation (operation){
        // Check if current value is empty
        if(this.currentOperationText.innerText === "" && operation != "C") {
            // Change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }

        // Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "**":
                function exponenciacaoAoQuadrado(current) {
                    return Math.pow(current, 2);
                    }
                operationValue = exponenciacaoAoQuadrado()
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "**n":
                function elevadoAEnesimaPotencia(previous, current) {
                    return Math.pow(previous, current);
                    }
                operationValue = elevadoAEnesimaPotencia()
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "x!":
                function fatorial(current) {
                    let fatorial = 1;
                    for (let i = 2; i <= current; i++) {
                      fatorial *= i;
                    }
                    return fatorial;
                    }
                operationValue = fatorial(current)
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "log2":
                function logBase2(current) {
                    return Math.log2(current);
                    }
                operationValue = logBase2()
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "log10":
                function logBase10(current) {
                    return Math.log10(current);
                    }
                operationValue = logBase10()
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "logn":
                function logBaseN(previous,current) {
                    return Math.log(previous) / Math.log(current);
                    }
                operationValue = logBaseN()
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperation()
                break
            case "C":
                this.processClearAllOperation()
                break
            case "=":
                this.processEqualOperator()
                break
            default:
                return
        }
    
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            // Check if value is 0, if it's just add current value
            if(previous === 0){
                operationValue = current
            }
            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }
    // Change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-", "**", "**n", "x!", "log2", "log10", "logn"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // Delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Clear current operation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }

    // Clear current and previous operation
    processClearAllOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    // Process an operation 
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText

        if(+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})
