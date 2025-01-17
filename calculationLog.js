let calculations = []

let calculationLogDividers = []

const calculationsContainer = document.querySelector(".calculationLogContainer")

const calculationLogExpander = document.querySelector(".calculationLogContainerExpander")

function toggleCalculationLogMenu(){
    calculationLogExpander.classList.toggle("menuOpen");
    calculationsContainer.classList.toggle("hidden");

}

calculationLogExpander.addEventListener("click", toggleCalculationLogMenu);


class Calculation{
    constructor(formula, calculation, optionalChemistryFormula=""){
        this.container = document.createElement("div");
        this.formula = document.createElement("div");


        this.calculationOnFormula = document.createElement("div");
        this.calculationOnFormula.innerHTML = optionalChemistryFormula
        this.calculationOnFormula.className = "text"
        this.calculationOnFormula.classList.add("chemistryFormula")


        this.calculationNumber = document.createElement("div");
        this.calculationNumber.innerHTML = calculations.length + 1
        this.calculationNumber.className = "text"
        this.calculationNumber.classList.add("number")
        
        this.formula.className = "text"
        this.formula.classList.add("mathFormula")
        
        this.calculation = document.createElement("div");
        this.calculation.className = "text"
        this.calculation.classList.add("calculation")
        
        this.container.classList.add("calculationContainer")
        this.formula.innerHTML = formula;
        this.calculation.innerHTML = calculation;

        this.container.appendChild(this.calculationNumber)
        this.container.appendChild(this.calculationOnFormula)
        this.container.appendChild(this.formula)
        this.container.appendChild(this.calculation)
        calculationsContainer.appendChild(this.container);


    };


    getStringExport(type = "string"){
        switch (type){
            case "string":
                return `${this.calculationNumber.innerText}: ${this.formula.innerText} ${this.calculation.innerText}`

            case "html":
                return `<p>${this.calculationNumber.innerHTML}: ${this.formula.innerHTML} ${this.calculation.innerHTML}</p>`
        }
    }


    remove(){
        this.container.remove()
    }
};


function printOutCalcution(formula, calculation, optionalChemistryFormula){
    calculations.push(new Calculation(formula, calculation, optionalChemistryFormula=optionalChemistryFormula));
};

function addHeadingDivider(headingText){
    const container = document.createElement("div");
    container.className = "calculationContainer";
    container.classList.add("divider");

    const heading = document.createElement("div");
    heading.innerText = headingText;
    heading.className = "headingDividerText";
    container.appendChild(heading);

    calculationsContainer.appendChild(container)
    calculationLogDividers.push(container);
}

function clearCalculationsLog(){
    for(let i = 0; i < calculations.length; i++){
        let calculation = calculations[i];
        calculation.remove()

    };

    calculations = [];


    calculationLogDividers.forEach((value) => {
        value.remove();
    })

    calculationLogDividers = [];
};