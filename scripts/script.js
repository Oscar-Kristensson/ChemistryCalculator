const isOneFileVersion = false;

const table = document.getElementById("table");

const clearTypeSelector = document.getElementById("clearButtonTypeSelector")

const exchangeInput = document.getElementById("exchangeInput");

const checkBalansingInputElement = document.getElementById("checkBalansingInput")
const checkBalansingInputHeader = document.getElementById("checkBalansingParagraph")

checkBalansingInputHeader.addEventListener("click", () => {formulaIsBalanced()})

// Help GUI


const helpContainer = document.querySelector(".helpContainer")
const changeLogContainer = document.querySelector(".changeLogContainer")
const formulaMenuContainer = document.querySelector(".formulaMenuContainer")
const periodicTableMenuContainer = document.querySelector(".periodicTableMenuContainer")

const errorDisplayElement = document.getElementById("errorDisplayElement")

const developerToolsContainer = document.getElementById("developerToolsContainer");

const notesElement = document.getElementById("notesElement");
const notesMessageBox = document.getElementById("notesMessageBox");



const errorPrecisionInputElement = document.getElementById("errorPrecisionInput");
errorPrecisionInputElement.value = 0.001;


const useConstantVolumeInput = document.getElementById("useConstantVolumeInput");




// Menu
class MenuActivator {
    constructor (parent, svgIcon, name) {
        this.container = document.createElement("div");
        this.container.className = "buttonContainer";
        
        this.svg = document.createElement("svg");
        this.svg.innerHTML = svgIcon;
        this.container.appendChild(this.svg);

        this.label = document.createElement("div");
        this.label.className = "label";
        this.label.innerText = name;
        this.container.appendChild(this.label);

        parent.appendChild(this.container);
    }
}

class MenuManagerClass {
    constructor (menuActivatorContainer, menus) {
        this.menus = menus;

        // Add eventlistners
        this.menus.forEach((menu, index) => {
            // Create buttonContainer/MenuActivator
            let menuActivator = new MenuActivator(menuActivatorContainer, menu.icon, menu.name);

            menu["menuActivator"] = menuActivator;


            menuActivator.container.addEventListener("click", () => {
                this.toggle(index);
            });

            if (this.menus[index].hasOwnProperty("closeButtonId"))
                document.getElementById(this.menus[index].closeButtonId).addEventListener("click", () => { this.toggle(index); });

        });
    }

    closeAll() {
        for (let i = 0; i < this.menus.length; i++) {
            const menuElement = document.getElementById(this.menus[i].menuElementId);

            menuElement.classList.add("hidden");

        };
    };

    toggle(index) {
        const menuElement = document.getElementById(this.menus[index].menuElementId)
        if (menuElement.classList.contains("hidden")) {
            this.closeAll();

            if (this.menus[index].hasOwnProperty("openEventListener")) {
                this.menus[index].openEventListener();
            }

        }

        menuElement.classList.toggle("hidden");
    };
} 


const MenuManager = new MenuManagerClass(document.querySelector(".left-nav-bar"),[
    {
        "name": "Files",
        "icon": `
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="currentColor"><path d="M183-196q-27.5 0-47.25-19.75T116-263v-354q0-27.5 19.75-47.25T183-684h200l80-80h314q27.5 0 47.25 19.75T844-697v434q0 27.5-19.75 47.25T777-196H183Zm9-248h212q14 0 23-9t9-23v-212L192-444Zm-41-8 197-197H183q-14 0-23 9t-9 23v165Zm0 43v146q0 14 9 23t23 9h594q14 0 23-9t9-23v-434q0-14-9-23t-23-9H471v253q0 27.5-19.75 47.25T404-409H151Zm312-89Z"/></svg>
        `,
        "menuElementId": "fileMenuContainer",
        "closeButtonId": "fileMenuCloseButton"
    },
    {
        "name": "Formula",
        "icon": `
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path fill="currentColor" d="M334-252h25v-83h83v-25h-83v-82h-25v82h-82v25h82v83Zm205-32h168v-25H539v25Zm0-102h168v-25H539v25Zm26-163 57-58 58 58 18-19-58-56 58-58-18-18-57.5 57-57.5-57-19 18 58 58-58 56 19 19Zm-302-63h167v-25H263v25Zm-37.24 440q-22 0-37.88-15.88Q172-203.76 172-225.76v-508.48q0-22 15.88-37.88Q203.76-788 225.76-788h508.48q22 0 37.88 15.88Q788-756.24 788-734.24v508.48q0 22-15.88 37.88Q756.24-172 734.24-172H225.76Zm.24-22h508q12 0 22-10t10-22v-508q0-12-10-22t-22-10H226q-12 0-22 10t-10 22v508q0 12 10 22t22 10Zm-32-572v572-572Z"/></svg>
        `,
        "menuElementId": "formulaMenuContainer",
        "closeButtonId": "formulaMenuCloseButton"
    },
    {
        "name": "Periodic Table",
        "icon": `<svg width="48" height="48" fill="red" viewBox="0 0 12.7 12.7" version="1.1" id="svg1"> <path id="path1" fill="currentColor" style="display:inline;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke" d="M 1.5353068,1.1057128 A 0.13230423,0.13230423 0 0 0 1.4024984,1.2364542 V 3.1639851 5.0899658 7.0154296 8.9414103 A 0.13230423,0.13230423 0 0 0 1.5353068,9.0742187 H 3.4607707 5.3867513 7.3127319 9.2381958 11.166243 A 0.13230423,0.13230423 0 0 0 11.296985,8.9414103 V 7.0154296 5.0899658 3.1639851 1.2364542 A 0.13230423,0.13230423 0 0 0 11.166243,1.1057128 H 9.2381958 A 0.13230423,0.13230423 0 0 0 9.1074544,1.2364542 V 3.0311767 H 7.3127319 5.3867513 3.5935791 V 1.2364542 A 0.13230423,0.13230423 0 0 0 3.4607707,1.1057128 Z m 0.1307414,0.2635498 h 1.661914 v 1.6619141 h -1.661914 z m 7.704956,0 H 11.033435 V 3.0311767 H 9.3710042 Z m -7.704956,1.9254639 h 1.661914 v 1.6624308 h -1.661914 z m 1.9275309,0 H 5.2539429 V 4.9571573 H 3.5935791 Z m 1.9259806,0 H 7.1814738 V 4.9571573 H 5.5195597 Z m 1.9259807,0 h 1.661914 v 1.6624308 h -1.661914 z m 1.9254638,0 H 11.033435 V 4.9571573 H 9.3710042 Z m -7.704956,1.9280477 h 1.661914 v 1.659847 h -1.661914 z m 1.9275309,0 h 1.6603638 v 1.659847 H 3.5935791 Z m 1.9259806,0 h 1.6619141 v 1.659847 H 5.5195597 Z m 1.9259807,0 h 1.661914 v 1.659847 h -1.661914 z m 1.9254638,0 h 1.6624308 v 1.659847 H 9.3710042 Z m -7.704956,1.9254639 h 1.661914 v 1.6603637 h -1.661914 z m 1.9275309,0 H 5.2539429 V 8.8086018 H 3.5935791 Z m 1.9259806,0 H 7.1814738 V 8.8086018 H 5.5195597 Z m 1.9259807,0 h 1.661914 v 1.6603637 h -1.661914 z m 1.9254638,0 H 11.033435 V 8.8086018 H 9.3710042 Z" /></g></g></svg>`,
        "menuElementId": "periodicTableMenuContainer",
        "openEventListener": () => { if (periodicTableMenuContainer.classList.contains("hidden") && !isRenderd) createPeriodicTable(); },
        "closeButtonId": "periodicTableCloseButton"
    },
    {
        "name": "Calculations",
        "icon": `
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path fill="currentColor" d="M334-252h25v-83h83v-25h-83v-82h-25v82h-82v25h82v83Zm205-32h168v-25H539v25Zm0-102h168v-25H539v25Zm26-163 57-58 58 58 18-19-58-56 58-58-18-18-57.5 57-57.5-57-19 18 58 58-58 56 19 19Zm-302-63h167v-25H263v25Zm-37.24 440q-22 0-37.88-15.88Q172-203.76 172-225.76v-508.48q0-22 15.88-37.88Q203.76-788 225.76-788h508.48q22 0 37.88 15.88Q788-756.24 788-734.24v508.48q0 22-15.88 37.88Q756.24-172 734.24-172H225.76Zm.24-22h508q12 0 22-10t10-22v-508q0-12-10-22t-22-10H226q-12 0-22 10t-10 22v508q0 12 10 22t22 10Zm-32-572v572-572Z"/></svg>
        `,
        "menuElementId": "calculationMenuContainer",
        "closeButtonId": "calculationMenuCloseButton"
    },
    {
        "name": "Help",
        "icon": `
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M483.99-271q11.01 0 19.01-8.49 8-8.48 8-19.5 0-10.01-7.99-18.51-7.98-8.5-19-8.5-11.01 0-19.51 8.49-8.5 8.48-8.5 18.5 0 11.01 8.49 19.51 8.48 8.5 19.5 8.5ZM462-402h36q1-24.32 9-42.16Q515-462 541-486q28-26 40.5-47.92t12.5-49.31q0-47.19-31.25-75.98Q531.51-688 485.47-688 443-688 412-666t-46 53l34 14q10-24 29-39.5t53-15.5q39 0 59 21.5t20 50.5q0 21-11.71 38-11.72 17-31.29 35-31 28-43.5 53.5T462-402Zm17.72 286q-75.36 0-141.26-28.91-65.9-28.91-115.23-78.19-49.34-49.28-78.28-115.22Q116-404.27 116-479.83q0-75.44 28.97-141.88 28.97-66.43 78.53-116.04 49.57-49.61 115.15-77.93Q404.24-844 479.38-844q75.51 0 142.25 28.29 66.74 28.28 116.13 77.84 49.39 49.57 77.81 116.09Q844-555.26 844-479.63q0 75.63-28.29 141.03-28.28 65.39-77.83 114.99-49.55 49.6-116.05 78.61-66.5 29-142.11 29Zm.28-35q136.51 0 232.76-96.24Q809-343.49 809-480t-96.24-232.76Q616.51-809 480-809t-232.76 96.24Q151-616.51 151-480t96.24 232.76Q343.49-151 480-151Zm0-329Z"/></svg>
        `,
        "menuElementId": "calculationMenuContainer",
        "closeButtonId": "helpContainerCloseButton"
    },
    {
        "name": "Change Log",
        "icon": `
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M339-261h283v-32H339v32Zm0-168h283v-32H339v32Zm-75 313q-27.5 0-47.25-19.75T197-183v-594q0-27.5 19.75-47.25T264-844h322l177 176v485q0 27.5-19.75 47.25T696-116H264Zm305-535v-158H264q-12 0-22 10t-10 22v594q0 12 10 22t22 10h432q12 0 22-10t10-22v-468H569ZM232-809v158-158 658-658Z"/></svg>
        `,
        "menuElementId": "changeLogMenuContainer",
        "closeButtonId": "changeLogCloseButton"
    },
]);




let formulaUnits = []
let operators = []

// Chemistry

quantity = {
    "ratio":0,
    "m":1,
    "M":2,
    "n":3,
    "v":4,
    "c":5,
    "dn":6,
    "dv":7,
    "dc":8,
    "neq":9,
    "veq":10,
    "ceq":11
}


let columnCount = 0;

class FormulaUnit {
    constructor(){
        this.createGUI();
        formulaUnits.push(this);
        this.reactantType = undefined; // Undefined: unknown, 0: reactant, 1: resultant
        this.isLimitingReactant = false;
        
        
        
    }
    

    toString(){
        return `<Formula Unit ${this.chemistryInput.getValue()}>`
    }
    
    createGUI(){
        let headerRow = table.rows[0];


        // Create the arrow options menu and add a empty row
        if (columnCount != 0) {
            let operatorCell = FormulaUnit.createCell(true, 
                `
                <select name="Test" class="operatorSelector">
                <option value="+">+</option>
                <option value=">">&rarr;</option>
                <option value="=">⇆</option> 
                </select>
                `);
                headerRow.appendChild(operatorCell);
                operatorCell.addEventListener("change", () => {onCalculationModeUpdate()});
                operatorCell.addEventListener("change", onFormulaChange);
            operators.push(operatorCell);
            addEmptyRows();
        }


        // let cell = FormulaUnit.createCell(true, "H<sub>2</sub>O")
        let cell = document.createElement("td")
        this.chemistryInput = new ChemistryInput(cell)
        headerRow.appendChild(cell)
        //headerRow.appendChild(cell)
        
        this.cells = [cell];
        this.inputElements = [];
        
        
        for (let i = 1; i < table.rows.length; i++){
            let row = table.rows[i];
            
            //let cell = document.createElement("td")   // FormulaUnit.createCell(header = false, text = "Test")
            let cell = document.createElement("td")

            let inputElement = document.createElement("input")
            inputElement.className = "tableDataInput"
            inputElement.type = "number"
            inputElement.name = `chemistryInput (${formulaUnits.length}, ${i})`;
            inputElement.inputMode = "numeric";

            
            if (i == quantity.ratio+1){
                inputElement.classList.add("ratioInput")
                inputElement.value = 1;
                inputElement.addEventListener("input", updateFormulaDisplayElement);
                
            }else{
                inputElement.step = "any";
            }

            this.inputElements.push(inputElement)

            cell.appendChild(inputElement)

            this.cells.push(cell)
    
    
    
            row.appendChild(cell)
            // row.insertBefore(this.createCell(false, "Hello World"), row[i])
        }


        columnCount++;

    };

    static createCell(header = false, text = "") {
        let type = header ? "th" : "td";
        let cell = document.createElement(type);
        cell.innerHTML = text;
        return cell;
    };

    getFormula(){
        return decodeStringToGroup(this.chemistryInput.getValue());
    };


    getChemistryGroup(){
        let cg = new ChemistryGroup(this.getFormula(), 1);
        return cg;
    }

    // GUI


    clearData(type = 0){ // 0: Calculated

        if (type == "calculated" || type=="all" ){
            this.unlockInputs();
        }


        for (let i = 0; i < this.inputElements.length; i++){
            if (type == "all"){
                this.inputElements[i].value = "";
                this.inputElements[i].classList.remove("autofilled");
                this.inputElements[i].classList.remove("loadedFromSave");
                this.inputElements[i].classList.remove("unvalidValue");
                this.inputElements[i].classList.remove("limitingReactant");
                this.inputElements[i].classList.remove("reactantNotUsed");
                this.isLimitingReactant = false;



            }else if (type == "calculated" && this.inputElements[i].classList.contains("autofilled")){
                this.inputElements[i].value = "";
                this.inputElements[i].classList.remove("autofilled");
                this.inputElements[i].classList.remove("loadedFromSave");
                this.inputElements[i].classList.remove("unvalidValue");
                this.inputElements[i].classList.remove("limitingReactant");
                this.inputElements[i].classList.remove("reactantNotUsed");

                
                this.isLimitingReactant = false;

            }else if (type == "loaded" && this.inputElements[i].classList.contains("loadedFromSave")){
                this.inputElements[i].value = "";
                this.inputElements[i].classList.remove("autofilled");
                this.inputElements[i].classList.remove("loadedFromSave");
                this.inputElements[i].classList.remove("unvalidValue");
                this.inputElements[i].classList.remove("limitingReactant");
                this.isLimitingReactant = false;
                this.inputElements[i].disabled = false;


            }else if (type == "unvalid" && this.inputElements[i].classList.contains("unvalidValue")){
                this.inputElements[i].value = "";
                this.inputElements[i].classList.remove("autofilled");
                this.inputElements[i].classList.remove("loadedFromSave");
                this.inputElements[i].classList.remove("unvalidValue");
                this.inputElements[i].classList.remove("limitingReactant");
                this.isLimitingReactant = false;
                this.inputElements[i].children[0].disabled = false;


            };


        };


    };


    getSaveData(){
        let data = [
            this.chemistryInput.getValue(),
            this.getValue(quantity.ratio),
            this.getValue(quantity.m),
            this.getValue(quantity.M),
            this.getValue(quantity.n),
            this.getValue(quantity.v),
            this.getValue(quantity.c),
            this.getValue(quantity.dn),
            this.getValue(quantity.neq),
            this.getValue(quantity.veq),
            this.getValue(quantity.ceq)
        ]

        return data
    }


    loadFromSaveData(data){
        this.chemistryInput.setValue(data[0])
        this.setValue(quantity.ratio, data[1], false, true)
        this.setValue(quantity.m, data[2], false, true)
        this.setValue(quantity.M, data[3], false, true)
        this.setValue(quantity.n, data[4], false, true)
        this.setValue(quantity.v, data[5], false, true)
        this.setValue(quantity.c, data[6], false, true)

        if (data.length > 7){
            this.setValue(quantity.dn, data[7], false, true)
            this.setValue(quantity.neq, data[8], false, true)
            this.setValue(quantity.veq, data[9], false, true)
            this.setValue(quantity.ceq, data[10], false, true)
        }
    }


    // Chemistry Calculations

    getValue(quantityType){
        return this.inputElements[quantityType].value;
    };


    getInputElement(quantityType){
        return this.inputElements[quantityType];
    }


    clearErrorClassesFromInputElements(){
        for (const key in quantity){
            this.getInputElement(quantity[key]).classList.remove("unvalidValue");
        }

  
    }

    checkIfValuesAreValid(){
        this.clearErrorClassesFromInputElements();

        let valuesAreValid = true;

        for (const key in quantity){
            let value = this.getValue(quantity[key]);

            if (!(isNumber(value) || value == "")){
                errorDisplayElement.innerHTML = errorDisplayElement.innerHTML + `Error: Value for "${key}" in ${this.chemistryInput.getHTMLValue()} of "${value}" is not a number<br>`;
                valuesAreValid = false;

                this.getInputElement(quantity[key]).classList.add("unvalidValue");
            }
            
        }

        if (!valuesAreValid) return valuesAreValid;

        const errorPrecision = errorPrecisionInputElement.value;

        if (errorPrecision == 0) return valuesAreValid;

        
        // Handle errors for m, M, n
        if (this.getValue(quantity.m) != "" && this.getValue(quantity.M) != "" && this.getValue(quantity.n) != "" && (Math.abs(this.getValue(quantity.M) * this.getValue(quantity.n) - this.getValue(quantity.m)) > errorPrecision)){
                
            [quantity.m, quantity.M, quantity.n].forEach((currentQuantity) => {
                this.getInputElement(currentQuantity).classList.add("unvalidValue")
                
            });
            addErrorMessage("error", "Bad Values", "The values for " + this.chemistryInput.getHTMLValue() + " with mass, molarmass and substance amount are incorrect.", 101)
        }


        // Handle errors for m, M, n
        if (this.getValue(quantity.n) != "" && this.getValue(quantity.c) != "" && this.getValue(quantity.v) != "" && (Math.abs(this.getValue(quantity.c) * this.getValue(quantity.v) - this.getValue(quantity.n)) > errorPrecision)){
                
            [quantity.c, quantity.v, quantity.n].forEach((currentQuantity) => {
                this.getInputElement(currentQuantity).classList.add("unvalidValue")
                
            });
            addErrorMessage("error", "Bad Values", "The values for " + this.chemistryInput.getHTMLValue() + " with concentration, volume and substance amount are incorrect.", 101)
        }        


        return valuesAreValid;
    }

    setValue(quantityType, value, computerCalculation=false, loadedFromSaveData=false){

        this.inputElements[quantityType].value = value;

        if (computerCalculation){
            this.inputElements[quantityType].classList.add("autofilled");
            this.inputElements[quantityType].classList.remove("loadedFromSave");
            return;

        };
        // If the cell is empty, it should not have diffrent formatting

        if (loadedFromSaveData && value != ""){
            this.inputElements[quantityType].classList.add("loadedFromSave");
        }


    };

    getRatioValue(){
        return this.inputElements[quantity.ratio].value;
    };

    lockInputs(){
        for (let i = 0; i < this.inputElements.length; i++){
            this.inputElements[i].readOnly = true;
        }
    }
    unlockInputs(){
        for (let i = 0; i < this.inputElements.length; i++){
            this.inputElements[i].readOnly = false;
        }
    }

    fillInWCalculations(){
        let hasChanged = true;
        let rv;
        
        while (hasChanged){
            hasChanged = false;
            rv = chemistryCalculateWMass(this.inputElements[quantity.m].value, this.inputElements[quantity.M].value, this.inputElements[quantity.n].value, this.chemistryInput.getHTMLValue());
            if (rv != false){
                for (let i = 0; i < rv.length; i++){
                    if (useAutoLockingCheckbox.checked){
                        this.inputElements[i + 1].readOnly = true;
                    }

                    if (rv[i] != undefined){
                        this.inputElements[i+1].value = rv[i];

                        this.inputElements[i+1].classList.add("autofilled");
                        this.inputElements[i+1].classList.remove("loadedFromSave");
                        hasChanged = true;
                    };
                };
            };

            let reactionTypeIndex = "";
            if (calculationMode !== 0) reactionTypeIndex = "start";

            rv = chemistryCalculateWSolution(this.inputElements[quantity.n].value, this.inputElements[quantity.v].value, this.inputElements[quantity.c].value, this.chemistryInput.getHTMLValue(), reactionTypeIndex);

            if (rv != false){
                for (let i = 0; i < rv.length; i++){
                    if (useAutoLockingCheckbox.checked){
                        this.inputElements[i + 3].readOnly = true;
                    }

                    if (rv[i] != undefined){
                        this.inputElements[i+3].value = rv[i];
                        this.inputElements[i+3].classList.add("autofilled");
                        this.inputElements[i+3].classList.remove("loadedFromSave");
                        hasChanged = true;
                    };
                };
            };


            // Skip the other calculations if in normal calculation mode
            if (calculationMode == 0) continue;

            // Equilibrium calculation
            rv = chemistryCalculateWSolution(this.inputElements[quantity.neq].value, this.inputElements[quantity.veq].value, this.inputElements[quantity.ceq].value, this.chemistryInput.getHTMLValue(), "eq");
            if (rv != false){
                for (let i = 0; i < rv.length; i++){
                    if (useAutoLockingCheckbox.checked){
                        this.inputElements[i + 9].readOnly = true;
                    }

                    if (rv[i] != undefined){
                        this.inputElements[i+9].value = rv[i];
                        this.inputElements[i+9].classList.add("autofilled");
                        this.inputElements[i+9].classList.remove("loadedFromSave");
                        hasChanged = true;
                    };
                };
            };


            rv = chemistryCalculateWSubstanceAmountEq(this.inputElements[quantity.n].value, this.inputElements[quantity.dn].value, this.inputElements[quantity.neq].value, this.chemistryInput.getHTMLValue());

            if (rv != false){
                const temp = [quantity.n, quantity.dn, quantity.neq];
                temp.forEach((value, index) => {
                    if (useAutoLockingCheckbox.checked){
                        this.inputElements[value].readOnly = true;
                    }

                    if (rv[index] != undefined){
                        this.inputElements[value].value = rv[index];
                        this.inputElements[value].classList.add("autofilled");
                        this.inputElements[value].classList.remove("loadedFromSave");
                        hasChanged = true;
                    };                
                })
            };

            if(useConstantVolumeInput.checked){
                rv = chemistryCalculateWSubstanceAmountEq(this.inputElements[quantity.c].value, this.inputElements[quantity.dc].value, this.inputElements[quantity.ceq].value, this.chemistryInput.getHTMLValue());

                if (rv != false){
                    const temp = [quantity.c, quantity.dc, quantity.ceq];
                    temp.forEach((value, index) => {
                        if (useAutoLockingCheckbox.checked){
                            this.inputElements[value].readOnly = true;
                        }
    
                        if (rv[index] != undefined){
                            this.inputElements[value].value = rv[index];
                            this.inputElements[value].classList.add("autofilled");
                            this.inputElements[value].classList.remove("loadedFromSave");
                            hasChanged = true;
                        };                
                    })
                };
            };


            if(!useConstantVolumeInput.checked){

                rv = chemistryCalculateWSubstanceAmountEq(this.inputElements[quantity.v].value, this.inputElements[quantity.dv].value, this.inputElements[quantity.veq].value, this.chemistryInput.getHTMLValue());

                if (rv != false){
                    const temp = [quantity.v, quantity.dv, quantity.veq];
                    temp.forEach((value, index) => {
                        if (useAutoLockingCheckbox.checked){
                            this.inputElements[value].readOnly = true;
                        }

                        if (rv[index] != undefined){
                            this.inputElements[value].value = rv[index];
                            this.inputElements[value].classList.add("autofilled");
                            this.inputElements[value].classList.remove("loadedFromSave");
                            hasChanged = true;
                        };                
                    })
                };

            };

            
        };



    };

    cleanUp(){
        // Clean up every html element
        for (let i = this.inputElements.length; -1 < i; i--){
            this.cells[i].remove();
            delete this.inputElements[i];
            delete this.cells[i];
        };
        columnCount--;
    };
};


class ChemistryInput {
    constructor(parent){
        this.container = document.createElement("div");
        this.container.className = "chemistryInputContainer";

        this.displayElement = document.createElement("div");
        this.displayElement.textContent = "<formula>";
        this.displayElement.title = "Click to input the formula, use _ for subscript.";
        this.displayElement.className = "chemistryDisplayElement";
        this.container.onclick = () => this.clickedon();
        

        this.inputElement = document.createElement("input");
        this.inputElement.type = "text";
        this.inputElement.className = "chemistryInputElement";
        this.inputElement.placeholder = "CO_2 ..."

        this.inputElement.name = `chemistryInput-${formulaUnits.length}`;
        //this.inputElement.oninput = this.update
        this.inputElement.onblur = () => this.exited();

        this.container.appendChild(this.inputElement);
        this.container.appendChild(this.displayElement);

        parent.appendChild(this.container);

        this.callbackFunction = undefined;
        

    }


    addEventListener(callbackFunction){
        this.callbackFunction = callbackFunction;
    }

    getValue(){
        return this.inputElement.value;
    };


    setValue(value){
        this.inputElement.value = value
        this.exited();

    };


    moveCursorInTo(){
        this.clickedon();
        this.inputElement.focus();
    }


    getHTMLValue(){
        return this.displayElement.innerHTML;

    };

    clickedon(){
        this.container.classList.add("editing");
        this.inputElement.focus();
    };

    exited(){
        this.container.classList.remove("editing");
        let formattedText = this.inputElement.value
        //.replace(/\^(\d+)/g, '<sup>$1</sup>') // Replace ^number with superscript
        .replace(/_(\d+)/g, '<sub>$1</sub>'); // Replace _number with subscript

        formattedText = convertStrToHTML(formattedText);
        
        this.displayElement.innerHTML = formattedText;


        // For the Formula Display Element in the Formula Menu
        updateFormulaDisplayElement();

        if (this.callbackFunction != undefined){
            this.callbackFunction();
            console.log("Callback from CI")
        };

        onFormulaChange();
    };

};


function onColumnAmountUpdate(){
    if (columnCount == 1){
        table.classList.add("singleFormulaUnit");
    }else{
        table.classList.remove("singleFormulaUnit");
    };
};


function createNewColumn(focusOnCreation = true){
    let formulaUnit = new FormulaUnit();
    onColumnAmountUpdate();

    if (focusOnCreation){
        formulaUnit.chemistryInput.moveCursorInTo();
    };

    onFormulaChange();
};

function removeColumn(){
    if (columnCount == 0) return undefined;


    if (table.rows[0].cells.length == 1) return undefined;
    
    let columnsToDelete = table.rows[0].cells.length > 2? 2:1;

    
    
    for (let i = 0; i < columnsToDelete; i++){
        // i = 0 is formula unit, i = 1 is operator
        if(i == 1){
            // If deleting operator
            operators.pop(-1)

        }

        for(let i = 0; i < table.rows.length; i++){
            let row = table.rows[i]
            row.cells[row.cells.length-1].remove()
        }

    }
    
    formulaUnits[formulaUnits.length-1].cleanUp()
    formulaUnits.pop(1)
    onColumnAmountUpdate()
    onFormulaChange();

}

function addEmptyRows(){
    for (let i = 1; i < table.rows.length; i++){
        let row = table.rows[i];

        let cell = FormulaUnit.createCell(false, "")
        if (i==1){
            cell.innerHTML = ":"
            
            cell.className = "tableDataRatioColons"
        }


        row.appendChild(cell)

    }
}


function convertStrToHTML(str){
    string = ""
    let superscriptActive = false 
    
    for (let i = 0; i < str.length; i++){
        if ((str[i] == "^" || str[i] == "'") && !(superscriptActive)){
            string += "<sup>"
            superscriptActive = true

        } else if ((!/[0-9]/.test(str[i])) && !(str[i] == "+") && !(str[i] == "-") && superscriptActive){
            string += "</sup>"
            superscriptActive = false
            string += str[i]

        }else{
            string += str[i]
        }
        



    }

    return string;

}




function validateTransferValues(){
    let valuesAreValid = undefined;
    if (useLimitingReactantInput.checked) {
        addErrorMessage("info", "Vaildation", "Could not validate values because limiting reactant is used.");
        return undefined;
    }


    let arrowIndex = findReactionPosition();
    if (arrowIndex == "to-many-arrows" && exchangeInput.value != 100){
        addErrorMessage("info", "Validation", "Could not validate values because exchange is not 100% and the reaction contained more than one arrow.");
        return undefined;
    }


    formulaUnits.forEach((formulaUnit, index) => {
        let exchangeCoefficient = 1;
        if (arrowIndex < index && exchangeInput.value != 100) {
            exchangeCoefficient = exchangeInput.value / 100;
        }

        let expectedValue = molarRatioSubstanceAmount * formulaUnit.getValue(quantity.ratio) * exchangeCoefficient;
        
        let delta = expectedValue - formulaUnit.getValue(quantity.n)
        if (delta < 0) delta = -delta;

        
        if (delta > errorPrecisionInputElement.value){
            addErrorMessage(
                "error", 
                "Calculation", 
                "The molar amount values, ratio and base molar amount does not match up for " + formulaUnit.chemistryInput.getHTMLValue(),
                301,
                false
            );
        }
    })

    
}


function validateValues(){
    let valuesAreValid = true;
    for (let i = 0; i < formulaUnits.length; i++){
        if (!formulaUnits[i].checkIfValuesAreValid()){
            console.warn("Unvalid value")
            valuesAreValid = false;
        }

    }
    

    


    return valuesAreValid;


}

function lockOperatorsWhileCalculating(){


    calculationsInProgress = true;

    for (let i = 0; i < operators.length; i++){
        operators[i].children[0].disabled = true;
        operators[i].children[0].classList.add("lockedDuringCalculation");
    }

}

function unlockOperatorsWhileCalculating(){
    calculationsInProgress = false;

    for (let i = 0; i < operators.length; i++){
        operators[i].children[0].disabled = false;
        operators[i].children[0].classList.remove("lockedDuringCalculation");
    };

    acidAndBaseConstantInputElements.forEach((element) => {element.readOnly = false;})

}

function addReactantNotUsedIfUsingLimitingReactant(){
    if (!useLimitingReactantInput.checked)
        return undefined;

    let i = 0;

    while (true){
        if (i > formulaUnits.length - 2){
            break;

        }


        if (formulaUnits[i].reactantType == 2)
            break;


        formulaUnits[i].getInputElement(quantity.n).classList.add("reactantNotUsed");
        i++;
    }
}

const settingsMessageBox = document.getElementById("settingsMessageBox");
const settingsIcon = document.getElementById("settingsIcon");
const useAutoLockingCheckbox = document.getElementById("useAutoLocking");

function toggleSettings(){
    notesMessageBox.classList.add("hide");
    settingsMessageBox.classList.toggle("hide");

    if (settingsMessageBox.classList.contains("hide")) removeBackgroundBlur();
    else addBackgroundBlur();

}

settingsIcon.addEventListener("click", toggleSettings);

const lockIconLocked = document.getElementById("lockIconLocked");
const lockIconUnocked = document.getElementById("lockIconUnocked");
const lockIconContainer = document.querySelector(".lockIconContainer");

function toggleUseLock(event){
    event.preventDefault();
    //lockIconContainer.classList.toggle("unlocked");

    if (lockIconContainer.classList.contains("unlocked")){
        lockWhileCalculating();
        formulaUnits.forEach((formulaUnit, i) => {
            formulaUnit.lockInputs();
        });

        equilibriumQuotientInputElement.readOnly = true;
        equilibriumQuotientInputElement.value = ""; // Why is the value cleared here?

    }else{
        unlockAfterCalculations();
        formulaUnits.forEach((formulaUnit, i) => {
            formulaUnit.unlockInputs();
        })

        equilibriumQuotientInputElement.readOnly = false;

    }
}    

lockIconContainer.addEventListener("click", toggleUseLock);




function lockWhileCalculating(){
    if (!useAutoLockingCheckbox.checked)
        return undefined;

    if (calculationsInProgress){
        return undefined;
    }

    lockIconContainer.classList.remove("unlocked");

    lockOperatorsWhileCalculating();

    appendReactantResultantClasses();


    addReactantNotUsedIfUsingLimitingReactant();
}

function unlockAfterCalculations(){
    if (!calculationsInProgress){
        return undefined;
    }
    lockIconContainer.classList.add("unlocked");
    unlockOperatorsWhileCalculating();
}


let calculationCount = 0;

function executeCalculations(){
    calculationCount++;
    addHeadingDivider("Started Calculation " + calculationCount);
    lockWhileCalculating()
    let calculating = true;
    errorDisplayElement.innerText = "";
    
    molarRatioSubstanceAmount = undefined;


    if (!validateValues()){
        console.warn("Stopped calculations because of unvalid values!")
        return undefined;
    }

    if(checkBalansingInputElement.checked){
        formulaIsBalanced(true);
    }


    if (messageboxFullAutomationInput.checked){
        autofillMolarmasses();
        if (useConstantVolumeInput.checked) fillInSameVolumeInAll();

    }

    mainGeogebraCalculationsExportSystem.loadInStartValues(formulaUnits);

    if (FormulaAPI.isProtolysis) updateProtolysisData();
    
    while (calculating){
        calculating = false;
        fillInWCalculationsInAllFormulaUnits();

        if(calculationMode === 0 && transferSubstanceAmount()) calculating = true;

        if (calculationMode === 0 && useConstantVolumeInput.checked && transferSubstanceAmount(quantity.c)) calculating = true; 


        if (calculationMode === 1 && transferSubstanceAmount(quantity.dn, 1)) calculating = true;


        if (calculationMode === 1 && useConstantVolumeInput.checked && transferSubstanceAmount(quantity.dc, 1)) calculating = true; 



        if (useConstantVolumeInput.checked) fillInSameVolumeInAll();

        // if (calculationMode === 1 && checkIfTransferCanBeCalculated()) { doTransferValues(); calculating = true; };


        if (calculationMode === 1 && checkIfTransferCanBeCalculated(equilibriumConstantType.acid)) { doTransferValues(equilibriumConstantType.acid); calculating = true; };




    };

    if (FormulaAPI.isProtolysis) updateProtolysisData();

    if (calculationMode === 1 && equilibriumQuotientInputElement.value === "") updateEquilibriumConstant();

    createEquilibriumConstantEquationInGG();



    validateTransferValues();
}

function fillInWCalculationsInAllFormulaUnits(){
    for (let i = 0; i < formulaUnits.length; i++){

        formulaUnits[i].fillInWCalculations()
    }
}


function fillInSameVolumeInAll(){
    if (!useConstantVolumeInput.checked) return;

    let volume = undefined;
    const searchVolumes = [quantity.v, quantity.veq]

    searchVolumes.forEach((quantity) => {
        formulaUnits.forEach((formulaUnit) => {
            let value = formulaUnit.getValue(quantity);

            if (value != "") volume = value;
        })
    })

    if (!volume) return;

    searchVolumes.forEach((quantity) => {
        formulaUnits.forEach((formulaUnit) => {
            let value = formulaUnit.getValue(quantity);
            if (value == "") formulaUnit.setValue(quantity, volume, true, false);
        })
    })
};


let calculationsInProgress = false;

let molarRatioSubstanceAmount = undefined;

let lastUsedExchangeCoefficient = undefined;

let currentReactionType = undefined;

const useLimitingReactantInput = document.getElementById("useLimitingReactantInput");


let scopeSubstanceAmounts = [];


function getScopes(){
    let scopes = [];
    let currentScope = [];

    for (let i = 0; i < formulaUnits.length; i++){
        currentScope.push(formulaUnits[i]);

        if (i == operators.length || operators[i].children[0].value != "+") {
            scopes.push(currentScope);
            currentScope = [];
        };

    }

    return scopes;
}



function calculateSubstanceAmountsForScopes(useLimitingReactant = false, substanceAmountPointer = quantity.n, geogebraExport = true){
    let scopeSubstanceAmounts = [];


    const quantityKeys = Object.keys(quantity);
    const quantityPrefix = quantityKeys[substanceAmountPointer];


    const scopes = getScopes();

    scopes.forEach((scope, i_scope) => {
        let currentScopeBaseSubstanceAmount = undefined;
        for(let i = 0; i < scope.length; i++){

        
            // Calculate the base substance amount for the current formula unit
            // if substance amount is empty, move on

            let tempBaseSubstanceAmount = undefined;
            if (scope[i].getValue(substanceAmountPointer) != "") tempBaseSubstanceAmount = scope[i].getValue(substanceAmountPointer)/scope[i].getValue(quantity.ratio);
            else continue;

            if (useLimitingReactant){
                if (tempBaseSubstanceAmount < currentScopeBaseSubstanceAmount || currentScopeBaseSubstanceAmount === undefined){
                    currentScopeBaseSubstanceAmount = tempBaseSubstanceAmount;

                };
                
            }else if(scope[i].getValue(substanceAmountPointer) != ""){
                currentScopeBaseSubstanceAmount = scope[i].getValue(substanceAmountPointer)/scope[i].getValue(quantity.ratio);

                if (geogebraExport){
                    mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`${quantityPrefix}BaseForScope${i_scope}=${quantityPrefix}${scope[i].chemistryInput.getValue(substanceAmountPointer)}/ratio${scope[i].chemistryInput.getValue(quantity.ratio)};`)
                };


                break;
            }
        }
        
        scopeSubstanceAmounts.push(currentScopeBaseSubstanceAmount);
    });


    return scopeSubstanceAmounts;
    
    
}

function transferSubstanceAmountsBetweenScopes(scopes, transferInverted = false, geogebraExport = true){

    if (scopes.length > 2 && exchangeInput.value  != 100){
        addErrorMessage("info", "Formula", "The calculator can not transfer substance amounts with exchange and a formula with more than 2 arrows.", 204, false);
        return scopes;
    }


    const quantityKeys = Object.keys(quantity);
    const quantityPrefix = quantityKeys[substanceAmountPointer];


    let hasChanged = false;

    let newScopes = [];

    // Loop through scopes until one has substance amount 
    for (let i_search = 0; i_search < scopes.length; i_search++){
        if (scopes[i_search] != undefined){

            let baseSubstanceAmount = scopes[i_search];

            if (geogebraExport){
                mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`${quantityPrefix}Base=${quantityPrefix}BaseForScope${i_search}`)
            };


            if (i_search != 0 && exchangeInput.value != 100) baseSubstanceAmount /= exchangeInput.value / 100;

            if (i_search != 0 && transferInverted) baseSubstanceAmount = -baseSubstanceAmount;
            
            // Transfer the substance amounts to every one
            for (let i_transfer = 0; i_transfer < scopes.length; i_transfer++){
                if (scopes[i_transfer] == undefined){
                    hasChanged = true;
                    let changeToSubstanceAmount = baseSubstanceAmount;


                    let ggInvertedString = "";
                    
                    // Account for exchange
                    if (i_transfer != 0 && exchangeInput.value != 100) changeToSubstanceAmount *= exchangeInput.value / 100;
                    
                    // Invert when transfering to the other side
                    if (i_transfer != 0 && transferInverted){
                        changeToSubstanceAmount = -changeToSubstanceAmount;
                        if (geogebraExport){
                            ggInvertedString = "-";
                        }
                    }

                    scopes[i_transfer] = changeToSubstanceAmount;

                    if (geogebraExport){
                        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`${quantityPrefix}BaseForScope${i_transfer}=${ggInvertedString}(${quantityPrefix}Base*${exchangeInput.value/100})`)
                    };
    

                    newScopes.push(scopes[i_search]);


                }else{
                    newScopes.push(scopes[i_transfer])
                }

            }
        }
    }


    return [scopes, hasChanged];

}


function updateSubstanceAmountsFromScopes(substanceAmounts, substanceAmountPointer = quantity.n, geogebraExport = true){
    const quantityKeys = Object.keys(quantity);
    const quantityPrefix = quantityKeys[substanceAmountPointer];


    let hasChanged = false;



    const scopes = getScopes();

    scopes.forEach((formulaUnits, index) => {
        let currentScopeBaseSubstanceAmount = substanceAmounts[index];

        if (currentScopeBaseSubstanceAmount != undefined){
            hasChanged = true;
            formulaUnits.forEach((formulaUnit) => {
                if (formulaUnit.getValue(substanceAmountPointer) == "") {
                    let ratio = formulaUnit.getValue(quantity.ratio);
                    let formulaUnitTransferValue = currentScopeBaseSubstanceAmount * ratio;
    
                    formulaUnit.setValue(substanceAmountPointer, formulaUnitTransferValue, true);
                    
                    let formulaString = "";
                    let unit = "mol";

                    
                    if (substanceAmountPointer === quantity.dn){
                        formulaString = `Transfering &Delta;n from base amount of ${currentScopeBaseSubstanceAmount} mol`;
                    }else if(substanceAmountPointer === quantity.n){
                        formulaString = `Transfering n from base amount of ${currentScopeBaseSubstanceAmount} mol`;
                    }else if(substanceAmountPointer === quantity.dc){
                        formulaString = `Transfering &Delta;c from base amount of ${currentScopeBaseSubstanceAmount} mol/dm<sub>3</sub>`;
                    }else if(substanceAmountPointer === quantity.c){
                        formulaString = `Transfering c from base amount of ${currentScopeBaseSubstanceAmount} mol/dm<sub>3</sub>`;
                    }else{
                        formulaString = ">>>";
                    };

                    printOutCalcution(formulaString, `${formulaUnitTransferValue}${unit} = ${currentScopeBaseSubstanceAmount} &sdot; ${ratio}`, formulaUnit.chemistryInput.getHTMLValue());
    
                    if (geogebraExport){
                        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`${quantityPrefix}${formulaUnit.chemistryInput.getValue()}=${quantityPrefix}BaseForScope${index}*ratio${formulaUnit.chemistryInput.getValue()}`)
                    }
                } 
            })


        }




    });

    return hasChanged;
    
}


function transferSubstanceAmount(transferQuantity = quantity.n, transferType = 0, setBaseSubstanceAmount = true){
    // Transfer type 0: Normal Transfer
    // Transfer type 1: Transfer inverted
    calculationsInProgress = true;
    
    let substanceAmounts = calculateSubstanceAmountsForScopes(useLimitingReactantInput.checked, substanceAmountPointer = transferQuantity);


    let rv = transferSubstanceAmountsBetweenScopes(substanceAmounts, transferType === 1);

    substanceAmounts = rv[0];
    hasChanged = rv[1];

    if (calculationMode === 1 && transferQuantity == quantity.n){
        // console.warn("Transfering of substance amounts is not currently implemented!");
        return undefined;
    }


    if (setBaseSubstanceAmount && transferQuantity === quantity.n){
        molarRatioSubstanceAmount = substanceAmounts[0];
        updateEnergyInformation();
        formulaMenu_updateBaseMolarmass(); 

    };
    
    updateSubstanceAmountsFromScopes(substanceAmounts, substanceAmountPointer = transferQuantity);




    return hasChanged;


}


function old_transferMolarMassesUsingRatio(useLimitingReactant = undefined){
    calculationsInProgress = true;
    if (useLimitingReactant == undefined){
        useLimitingReactant = useLimitingReactantInput.checked;
    }
    let hasChanged = false

    
    currentReactionType = getReactionType();
    console.log("Reaction Type:", currentReactionType);
    appendReactantResultantClasses()

    if (calculationMode === 1){
        console.warn("Transfering of substance amounts is not currently implemented!");
        return undefined;
    }


    // Go through and find a molarmass with ratio

    if (molarRatioSubstanceAmount != undefined){
        

    } else if (!useLimitingReactant){
        for (let i = 0; i < formulaUnits.length; i++){
            let formulaUnit = formulaUnits[i]
            
            if (!formulaUnit.getValue(quantity.n) == "" && !formulaUnit.getValue(quantity.ratio) == ""){
                molarRatioSubstanceAmount = formulaUnit.getValue(quantity.n)/formulaUnit.getValue(quantity.ratio)

                if (useAutoLockingCheckbox.checked){
                    formulaUnit.inputElements[quantity.ratio].readOnly = true;
                    formulaUnit.inputElements[quantity.n].readOnly = true;
                }

                

                
                /*if (currentReactionType == "=" && exchangeInput != "100"){
                    console.warn("Could not use exchange because of unvalid reaction type", currentReactionType);
                    return undefined;
                    }>*/
                    
                    
                    
                    
                
                if (formulaUnit.reactantType == 2){
                    // If the formula unit is a resultant, the molarRatioSubstanceAmount has to be adjusted with the exchange
                    exchangeCoefficient = (exchangeInput.value/100);
                    molarRatioSubstanceAmount = molarRatioSubstanceAmount / exchangeCoefficient;
                    printOutCalcution("Calculated base molaramount from the resultant side", `${molarRatioSubstanceAmount}mol = ${formulaUnit.getValue(quantity.n)}mol &divide; ${formulaUnit.getValue(quantity.ratio)} &divide; ${exchangeInput.value}%`, formulaUnit.chemistryInput.getHTMLValue())
                    
                }else{
                    printOutCalcution("Calculated base molaramount", `${molarRatioSubstanceAmount}mol = ${formulaUnit.getValue(quantity.n)}mol &divide; ${formulaUnit.getValue(quantity.ratio)}`, formulaUnit.chemistryInput.getHTMLValue())
                }
                formulaMenu_updateBaseMolarmass();
                break
            }
        }
            
    }else{
        let i = 0;
        let lastSmallestSubstance = undefined;
        let molarRatioSubstanceAmountTmp;
        while (true){
            if (i > formulaUnits.length - 1){
                console.warn("Could not transfer molarmasses because there where just one substance!");
                break;
            }

            formulaUnit = formulaUnits[i];

            if (formulaUnit.reactantType == 2){
                break;
            }
          
            
            
            
            if (!formulaUnit.getValue(quantity.n) == "" && !formulaUnit.getValue(quantity.ratio) == ""){
                molarRatioSubstanceAmountTmp = formulaUnit.getValue(quantity.n)/formulaUnit.getValue(quantity.ratio);

            }
            

            if (molarRatioSubstanceAmountTmp != undefined && (molarRatioSubstanceAmountTmp < molarRatioSubstanceAmount || molarRatioSubstanceAmount == undefined)){
                molarRatioSubstanceAmount = molarRatioSubstanceAmountTmp;
                lastSmallestSubstance = i;

            }
            
            
            if (useAutoLockingCheckbox.checked){
                formulaUnit.inputElements[quantity.ratio].readOnly = true;
                formulaUnit.inputElements[quantity.n].readOnly = true;
            }

            i++;
        }

        if (lastSmallestSubstance == undefined){
            console.warn("Could not transfer molarmasses because of lack of data!")
            return undefined;
        }

        formulaUnits[lastSmallestSubstance].getInputElement(quantity.n).classList.add("limitingReactant");
        formulaUnits[lastSmallestSubstance].getInputElement(quantity.n).classList.remove("reactantNotUsed");
        formulaUnits[lastSmallestSubstance].isLimitingReactant = true;
        printOutCalcution("Calculated base molaramount with limiting reactant", `${molarRatioSubstanceAmount}mol = ${formulaUnits[lastSmallestSubstance].getValue(quantity.n)}mol &divide; ${formulaUnits[lastSmallestSubstance].getValue(quantity.ratio)}`, formulaUnits[lastSmallestSubstance].chemistryInput.getHTMLValue())
        formulaMenu_updateBaseMolarmass();

    }

    if (molarRatioSubstanceAmount == undefined){
        console.log("Could not transfer molarmasses")
        return undefined;
    }

    // Fill in molarmasses using ratio
    for (let i = 0; i < formulaUnits.length; i++){
        let formulaUnit = formulaUnits[i]
        
        if (formulaUnit.getValue(quantity.n) == "" && !formulaUnit.getValue(quantity.ratio) == ""){
            let substanceAmountValue = molarRatioSubstanceAmount * formulaUnit.getValue(quantity.ratio)

            formulaUnit.getInputElement(quantity.n).classList.remove("reactantNotUsed");
            formulaUnit.getInputElement(quantity.n).classList.add("autofilled");
            
            if (useAutoLockingCheckbox.checked){
                formulaUnit.getInputElement(quantity.ratio).readOnly = true;
            }
            
            if (formulaUnit.reactantType == 2){
                lastUsedExchangeCoefficient = exchangeInput.value/100
                substanceAmountValue *= lastUsedExchangeCoefficient
                
                printOutCalcution("Substance amount from base substance amount" + " and transfering with exchange", `${substanceAmountValue}mol = ${molarRatioSubstanceAmount}mol &sdot; ${formulaUnit.getValue(quantity.ratio)} &sdot; ${exchangeInput.value} &divide; 100`, formulaUnit.chemistryInput.getHTMLValue())
            
            }else{
                printOutCalcution("Substance amount from base substance amount", `${substanceAmountValue}mol = ${molarRatioSubstanceAmount}mol &sdot; ${formulaUnit.getValue(quantity.ratio)}`, formulaUnit.chemistryInput.getHTMLValue())
            }
                

            formulaUnit.setValue(quantity.n, substanceAmountValue, true)
            hasChanged = true
        }

    }

    updateEnergyInformation();

    return hasChanged

    

}


//executeCalculations()

function clearData(){
    mainGeogebraCalculationsExportSystem.clearCurrentGeogebraExport();
    geogebraEquationLink.classList.add("hidden");



    clearCalculationsLog();
    errorDisplayElement.innerText = "";
    molarRatioSubstanceAmount = undefined;
    let clearType = clearTypeSelector.value
    for(let i = 0; i < formulaUnits.length; i++){
        formulaUnits[i].clearData(clearType)
    }

    if (clearType == "calculated" || clearType == "all"){
        unlockAfterCalculations();
        clearErrorMessages();
        calculationCount = 0;
    }


    equilibriumQuotientInputElement.value = "";
    equilibriumQuotientInputElement.classList.remove("autofilled");
    equilibriumQuotientInputElement.readOnly = false;

    equilibriumConstantInputElement.value = "";
    equilibriumConstantInputElement.classList.remove("autofilled");
    equilibriumConstantInputElement.readOnly = false;

    protolysisInputElements.forEach((element) => {if (element.classList.contains("autofilled")) element.value = "";});

    acidAndBaseConstantInputElements.forEach(element => { if (element.classList.contains("autofilled")) element.value = ""; element.readOnly = false;})
}


function autofillMolarmasses(){
    
    for (let i = 0; i < formulaUnits.length; i++){
        formulaUnit = formulaUnits[i]
        if (formulaUnit.getValue(quantity.M) == ""){
            if (formulaUnit.getFormula() != ""){
                // If the formula is not empty, autofill
                let chemistryGroup = formulaUnit.getChemistryGroup();

                let chemistryGroupMass = chemistryGroup.calculateMass();
                if (chemistryGroupMass === undefined) continue;
    
                formulaUnit.setValue(quantity.M, chemistryGroupMass, true)
                printOutCalcution("Molarmass Calculation", `M<sub>${formulaUnit.chemistryInput.getHTMLValue()}</sub> = ${formulaUnit.getValue(quantity.M)} mol/g`, formulaUnit.chemistryInput.getHTMLValue())

                
            }
            
        }

    }
}



function featureNotCurrentlySupported(){
    alert("This feature is currently not supported");
};





/* Finding the arrow position in the reaction */

function findReactionPosition(){
    let arrowIndex = undefined;

    /* Loop through the list and find a arrow. If a arrow does not exist, 
       return "no-arrow". Else, return the index of the arrow. */
    
    for (let i = 0; i < operators.length; i++){
        let operator = operators[i];

        if (operator.children.length == 0){
            console.error("Operator children must contain a selection element");
        }

        if (operator.children[0].value == ">" || operator.children[0].value == "="){
            // If the operator is an arrow
            if (arrowIndex != undefined){
                // If there already is an arrow, return error
                return "to-many-arrows";
            };

            arrowIndex = i;

        };
         
    };

    if (arrowIndex == undefined){
        // If no arrowIndex was found, return error
        return "no-arrow";
    };

    return arrowIndex;


    
}
function getReactionType(errorHandling = true){
    let reactionPosition = findReactionPosition();

    switch (reactionPosition){
        case "no-arrow":
            if (errorHandling)
                console.warn("Could not get the reaction type, because there wasn't an arrow");
            return "no-reaction";

        case "to-many-arrows":
            if (errorHandling)
                console.warn("Could not get the reaction type, because there where more than one arrow");
                addErrorMessage("info", "Formula", "The current reaction contains more than one arrow. This may lead to unexcpected behavior.", 203, false);
            return "no-reaction";

    }


    return operators[reactionPosition].children[0].value;

}


function appendReactantResultantClasses(reset = false){
    // Get the arrow position
    let reactionPosition = findReactionPosition();

    if (reactionPosition == "no-arrow" || reactionPosition == "to-many-arrows"){
        reset = true
        //return undefined;
    }

    // Fill in the classes
    for (let i = 0; i < formulaUnits.length; i++){
        let formulaUnit = formulaUnits[i]

        let displayElement = formulaUnit.chemistryInput.displayElement;

        if (reset){
            formulaUnit.reactantType = undefined
            displayElement.classList.remove("resultant");
            displayElement.classList.remove("reactant");
            lastUsedExchangeCoefficient = undefined;
            return false;

        }else if (i > reactionPosition){
            formulaUnit.reactantType = 2
            displayElement.classList.add("resultant");

        }else{
            formulaUnit.reactantType = 1
            displayElement.classList.add("reactant");

        };



    };

    return true;

};



// Check if formula is balanced

function sumAtomsInFormula(){
    let reactants = {};
    let resultants = {};
    let temp = appendReactantResultantClasses()

    
    if (!temp){
        return "not-valid-formula";
    };

    for (let i = 0; i < formulaUnits.length; i++){
        let formulaUnit = formulaUnits[i];
        //console.log(formulaUnit.chemistryInput.getHTMLValue())


        let chemistryGroup = formulaUnit.getChemistryGroup();
        let chemistryGroupAtoms = chemistryGroup.getAtomCount();

        let ratio = formulaUnit.getValue(quantity.ratio);
        
        if (ratio == ""){

            ratio = 1;
        }

        let atoms = multiplyDictItems(chemistryGroupAtoms, ratio)
        
        switch (formulaUnit.reactantType){
            case 1:
                reactants = mergeDictionaries(reactants, atoms)
                break

            case 2:
                resultants = mergeDictionaries(resultants, atoms)
                break
        }
    }

    return [reactants, resultants]

}


function formulaIsBalanced(automaticCheck = false){
    if (formulaUnits.length < 2) return undefined;

    let atomSum = sumAtomsInFormula();

    if (atomSum == "not-valid-formula"){
        checkBalansingInputHeader.classList.remove("notbalanced");
        checkBalansingInputHeader.classList.remove("balanced");
        table.classList.remove("notbalanced");

        const tempErrorLevel = automaticCheck? "info" : "warning";
        addErrorMessage(tempErrorLevel, "Balancing", "Could not check if the formula is balanced, likely because it does not have an arrow", 201);
        return undefined;
    }


    balancingTable.clearRows();
    balancingTable.addNewRowForAtoms(atomSum[0], atomSum[1]);

    let rv = isTheSameDict(atomSum[0], atomSum[1]);
    
    if(rv){
        //printOutCalcution("Balance check", "Formula is balanced");
        table.classList.remove("notbalanced");
        checkBalansingInputHeader.classList.remove("notbalanced");
        checkBalansingInputHeader.classList.add("balanced");

    }else{
        //printOutCalcution("Balance check", "Formula is not balanced");
        table.classList.add("notbalanced");
        checkBalansingInputHeader.classList.add("notbalanced");
        checkBalansingInputHeader.classList.remove("balanced");
        addErrorMessage("error", "Balancing", "The formula is not balanced", 202);

    };


    return rv;


}

// balancingTable

class BalancingTable{
    constructor(table){
        this.rows = [];
        this.table = table;

        
    };

    clearRows(){
        for (let i = 0; i < this.rows.length; i++){
            this.rows[i].remove();

        };
        this.rows = [];
    };


    addIconForAtom(atomType, parent){
        let element = document.createElement("div");
        element.className = "atomCircle";
        
        switch (atomType){
            case "C":
                element.classList.add("carbon");
                break;

            case "O":
                element.classList.add("oxygen");
                break;
    
            case "H":
                element.classList.add("hydrogen");
                break;
        
            case "N":
                element.classList.add("nitrogen");
                break;

            case "Cl":
                element.classList.add("chlorine");
                break;

            case "F":
                element.classList.add("fluorine");
                break;

            case "Br":
                element.classList.add("bromine");
                break;
    
            case "I":
                element.classList.add("iodine");
                break;

            case "P":
                element.classList.add("phosphorus");
                break;

            case "S":
                element.classList.add("sulfur");
                break;
                         
            default:
                element.classList.add("unkown");
                break;
            
        }

        parent.appendChild(element);

    }


    addRowForAtom(atomString, count1, count2){
        let row = document.createElement("tr");
        for (let i = 0; i < 5; i++){
            row.appendChild(document.createElement("td"));            
        };

        this.addIconForAtom(atomString, row.children[0])

        row.children[1].innerHTML = atomString;
        row.children[2].innerHTML = count1.toString();
        row.children[4].innerHTML = count2.toString();

        if (count1 != count2){
            row.classList.add("notbalanced")
        }
        
        this.table.appendChild(row);
        this.rows.push(row);
    };

    addNewRowForAtoms(atoms1, atoms2){
        for (let key in atoms1){
            let atomString = key;
            let atomCount1 = atoms1[key];
            let atomCount2;
            if (atoms2.hasOwnProperty(key)){
                atomCount2 = atoms2[key];
            }else{
                atomCount2 = 0;
            }
            this.addRowForAtom(atomString, atomCount1, atomCount2);
        }

        for (let key in atoms2){
            let atomString = key;
            let atomCount2 = atoms2[key];

            if (!atoms1.hasOwnProperty(key)){
                let atomCount1 = 0;
                this.addRowForAtom(atomString, atomCount1, atomCount2)

            }
        }

    }
}

let balancingTable = new BalancingTable(document.getElementById("balancingTable"));



// Error message system

const errorMessagesContainer = document.querySelector(".errorMessagesContainer")
const reserveElementsInErrorMessagesContainer = 2;
const errorMessagesStatusIcon = document.getElementById("errorMessageIcon");

errorMessagesStatusIcon.addEventListener("click", toggleErrorMessage);

function clearErrorMessages(){
    errorMessagesContainer.classList.add("hide");
    errorMessagesStatusIcon.classList.remove("error");
    errorMessagesStatusIcon.classList.remove("warning");
    errorMessagesStatusIcon.classList.remove("info");

    while (errorMessageNumbers.length != 0) errorMessageNumbers.pop();

    // Clear children
    while (errorMessagesContainer.children.length != reserveElementsInErrorMessagesContainer) errorMessagesContainer.children[reserveElementsInErrorMessagesContainer].remove();

}

function toggleErrorMessage(){
    errorMessagesContainer.classList.toggle("hide");
}

const errorMessageTypes = ["error", "warning", "info"];
let errorMessageTypesCount = [0, 0, 0]

const errorMessageNumbers = []

const resolveButtonIconSvg = document.getElementById("originalResolveIcon");

function addErrorNumber(number){
    if (!errorMessageNumbers.includes(number)) errorMessageNumbers.push(number);
}

function addErrorMessage(type = "error", heading="<heading>", description="<description>", number=0, addEvenIfSimilarExists = false){
    if (!errorMessageTypes.includes(type)){
        console.warn("Unvalid type for error message!");
        type = "error";
    }

    if (type != "info") errorMessagesContainer.classList.remove("hide");

    if(number != 0 && !addEvenIfSimilarExists && errorMessageNumbers.includes(number)) return undefined;
    
    addErrorNumber(number);
    const container = document.createElement("div");
    container.className = "message";

    
    
    container.classList.add(type);


    const resolveButton = document.createElement("div");
    const resolveButtonIcon = resolveButtonIconSvg.cloneNode(true);
    resolveButton.className = "resolveButton";
    resolveButton.title = "Resolve Error";
    resolveButton.appendChild(resolveButtonIcon);
    


    const headingElement = document.createElement("div");
    headingElement.className = "heading";
    headingElement.innerHTML = heading;
    
    const descriptionElement = document.createElement("div");
    descriptionElement.className = "description";
    descriptionElement.innerHTML = description;

    const errorNumberDisplay = document.createElement("div");
    errorNumberDisplay.className = "number";
    errorNumberDisplay.innerText = number;
    
    container.appendChild(headingElement);
    container.appendChild(descriptionElement);
    container.appendChild(errorNumberDisplay);
    container.appendChild(resolveButton)
    errorMessagesContainer.appendChild(container);


    // Add a button to resolve
    resolveButtonIcon.addEventListener("click", () => {
        container.remove()
        errorMessageTypesCount[errorMessageTypes.indexOf(type)]--;
        if (errorMessageTypesCount[errorMessageTypes.indexOf(type)] == 0){
            errorMessagesStatusIcon.classList.remove(type);

            // Hide the error message menu when there is no errors or warnings
            if (errorMessageTypesCount[0] == 0 && errorMessageTypesCount[1] == 0)
                errorMessagesContainer.classList.add("hide");

            if (number != 0 && errorMessageNumbers.includes(number))
                errorMessageNumbers.pop(number);
        }
    })
    

    errorMessagesStatusIcon.classList.add(type);
    errorMessageTypesCount[errorMessageTypes.indexOf(type)]++;

    
    
}




// Energy Information

const energyInformationDeltaHInputElement = document.getElementById("deltaEnthalpy");
const energyInformationDeltaHOutputElement = document.getElementById("formulaMenu_deltaHDisplayElement");
const energyInformationReactionTypeDisplayElement = document.getElementById("formulaMenu_reactionEnergyType");
const baseMolarAmountDisplayElement = document.getElementById("formulaMenu_baseMolarAmount");
const formulaMenuContainer_currentFormulaContainer = document.querySelector(".formulaMenuContainer_currentFormula");
const formulaMenuContainer_showCoefficents = document.getElementById("useCoefficentsInFormulaDisplay");

function changeCoefficents(){
    if (formulaMenuContainer_showCoefficents.checked){
        formulaMenuContainer_currentFormulaContainer.classList.remove("hideCoeffcient");
    }else{
        formulaMenuContainer_currentFormulaContainer.classList.add("hideCoeffcient");
    }
}


formulaMenuContainer_showCoefficents.addEventListener("input", updateFormulaDisplayElement);


function updateFormulaDisplayElement() {

    while (formulaMenuContainer_currentFormulaContainer.children.length > 0) {
        formulaMenuContainer_currentFormulaContainer.children[0].remove();
    }



    let innerHTML = "";


    for (let i = 0; i < formulaUnits.length; i++){

        if (formulaMenuContainer_showCoefficents.checked){
            innerHTML += " " + formulaUnits[i].getValue(quantity.ratio);
        }


        let chemistryInputHTML = " " +formulaUnits[i].chemistryInput.getHTMLValue() + " ";

        innerHTML += chemistryInputHTML;
        if (i < operators.length){
            let operatorString = operators[i].children[0].value;
            

            if (operatorString == ">") operatorString = "&rarr;";
            if (operatorString == "=") operatorString = "⇆";

            innerHTML += operatorString;
        
        
        }



        /*
        if (i < operators.length){
            let element = document.createElement("div");
            console.log(operators[i].children[0].value);


            let operatorString = operators[i].children[0].value;
            

            if (operatorString == ">") operatorString = "&rarr;";
            if (operatorString == "=") operatorString = "⇆";

            element.innerHTML = operatorString;



        let moleculeContainer = document.createElement("div");
        let moleculeElement = document.createElement("div");
        let coefficentElement = document.createElement("div");
        moleculeElement.innerHTML = formulaUnits[i].chemistryInput.getHTMLValue();

        moleculeContainer.className = "moleculeContainer";
        moleculeElement.className = "molecule";
        coefficentElement.className = "coefficent";

        moleculeContainer.appendChild(coefficentElement);
        moleculeContainer.appendChild(moleculeElement);

        formulaMenuContainer_currentFormulaContainer.appendChild(moleculeContainer);
        coefficentElement.innerText = formulaUnits[i].getValue(quantity.ratio);




            formulaMenuContainer_currentFormulaContainer.appendChild(element);
            }*/



    }

    formulaMenuContainer_currentFormulaContainer.innerHTML = innerHTML;

}

const tableSubstanceRow = document.getElementById("tableSubstanceRow");
tableSubstanceRow.addEventListener("input", updateFormulaDisplayElement);

function updateEnergyInformation(){
    // Check if values are valid

    if (energyInformationDeltaHInputElement.value == ""){
        console.debug("DeltaH not valid")
        energyInformationReactionTypeDisplayElement.innerHTML = "unknown";
        energyInformationReactionTypeDisplayElement.classList.add("unknown");

        energyInformationDeltaHOutputElement.innerHTML = "unknown";
        energyInformationDeltaHOutputElement.classList.add("unknown");
        return undefined;
    }

    if (molarRatioSubstanceAmount !== undefined){
        energyInformationDeltaHOutputElement.innerHTML = molarRatioSubstanceAmount * energyInformationDeltaHInputElement.value + " kJ";
        energyInformationDeltaHOutputElement.classList.remove("unknown");
    
    }else{
        energyInformationDeltaHOutputElement.innerHTML = "unknown";

    }

    
    energyInformationReactionTypeDisplayElement.classList.remove("unknown");
    if (energyInformationDeltaHInputElement.value > 0)
        energyInformationReactionTypeDisplayElement.innerHTML = "Endothermic";
    else
        energyInformationReactionTypeDisplayElement.innerHTML = "Exothermic";

}


function formulaMenu_updateBaseMolarmass(){
    if (molarRatioSubstanceAmount == undefined){
        baseMolarAmountDisplayElement.classList.add("unknown")
        baseMolarAmountDisplayElement.innerHTML = "unknown";
        return undefined;
    }


    baseMolarAmountDisplayElement.innerHTML = molarRatioSubstanceAmount + " mol";
    baseMolarAmountDisplayElement.classList.remove("unknown")
    // YOU STOPPED WITH THIS, THIS DOES NOT WORK!!!!!
    

}

// Tools
const tools_periodicTableLookUpNameSv = document.getElementById("tools_periodicTableLookUpNameSv");
const tools_periodicTableLookUpNameEn = document.getElementById("tools_periodicTableLookUpNameEn");
const tools_periodicTableSymbol = document.getElementById("tools_periodicTableSymbol");
const tools_periodicTableNumber = document.getElementById("tools_periodicTableNumber");
const tools_periodicTableWeight = document.getElementById("tools_periodicTableWeight");
const tools_periodicTableType = document.getElementById("tools_periodicTableType");


let tools_atomNumber = 0;
let tools_periodicTableAtom = undefined;

function tools_periodicTableLookUpUpdateData(){
    if (tools_periodicTableAtom) tools_periodicTableAtom.setIsMarked(false);
    console.log("Cleard Previous!");

    if (tools_atomNumber == 0 || tools_atomNumber > chemistryData.length){
        console.warn("Could not fill in data because atomnumber is unvalid");
        console.log(tools_periodicTableAtom);
        return undefined;
    }


    tools_periodicTableAtom = periodicTableAtoms[tools_atomNumber - 1];

    tools_periodicTableNumber.value = tools_atomNumber;

    if (!tools_periodicTableSymbol.value)
        tools_periodicTableSymbol.value = chemistryDataGetStringFromAtomNumber(tools_atomNumber);

    if (!tools_periodicTableLookUpNameSv.value)
        tools_periodicTableLookUpNameSv.value = chemistryDataGetNameFromAtomNumber(tools_atomNumber, lang="sv");

    if (!tools_periodicTableLookUpNameEn.value)
        tools_periodicTableLookUpNameEn.value = chemistryDataGetNameFromAtomNumber(tools_atomNumber, lang="en");

    if (!tools_periodicTableSymbol.value)
        tools_periodicTableSymbol.value = chemistryDataGetStringFromAtomNumber(tools_atomNumber);

    tools_periodicTableWeight.value = chemistryDataGetAtomMassFromAtomNumber(tools_atomNumber);


    tools_periodicTableType.value = capitalizeFirstLetter(chemistryDataGetAtomTypeFromAtomNumber(tools_atomNumber));
    
    tools_periodicTableAtom.setIsMarked(true);

}

function tools_addAutoFilledToAll(){
    tools_periodicTableLookUpNameSv.classList.add("autofilled");
    tools_periodicTableLookUpNameEn.classList.add("autofilled");
    tools_periodicTableSymbol.classList.add("autofilled");
    tools_periodicTableNumber.classList.add("autofilled");
    tools_periodicTableWeight.classList.add("autofilled");
    tools_periodicTableType.classList.add("autofilled");

    tools_periodicTableLookUpNameSv.classList.remove("unvalid");
    tools_periodicTableLookUpNameEn.classList.remove("unvalid");
    tools_periodicTableSymbol.classList.remove("unvalid");
    tools_periodicTableNumber.classList.remove("unvalid");
    tools_periodicTableWeight.classList.remove("unvalid");
    tools_periodicTableType.classList.remove("unvalid");
    
    //tools_periodicTableLookUpUpdateData();

}

function tools_unvalidInput()
{
    if (tools_periodicTableAtom) tools_periodicTableAtom.setIsMarked(false);

};

function tools_updateValuesFromName(lang="sv"){
    let currentInputElement;
    lang == "sv"? currentInputElement = tools_periodicTableLookUpNameSv : currentInputElement = tools_periodicTableLookUpNameEn;
    lang == "sv"? tools_periodicTableLookUpNameEn.value = "" : tools_periodicTableLookUpNameSv.value = "";
    tools_periodicTableSymbol.value = "";
    tools_periodicTableNumber.value = "";
    tools_periodicTableWeight.value = "";

    tools_addAutoFilledToAll();

    currentInputElement.classList.remove("autofilled"); // When this line isn't commented out, an input element disapears
    tools_atomNumber = chemistryDataGetAtomNumberFromName(currentInputElement.value, lang);

    if (tools_atomNumber == 0)
    {
        currentInputElement.classList.add("unvalid");
        tools_unvalidInput();
        return undefined;
    }

    tools_periodicTableLookUpUpdateData();

}

function tools_updateValuesFromNumber(number = undefined){
    tools_periodicTableLookUpNameSv.value = "";
    tools_periodicTableLookUpNameEn.value = "";
    tools_periodicTableSymbol.value = "";
    tools_periodicTableWeight.value = "";

    tools_addAutoFilledToAll();

    
    if (number === undefined) tools_atomNumber = tools_periodicTableNumber.value;
    else tools_atomNumber = number;
    tools_periodicTableNumber.classList.remove("autofilled");

    if (tools_atomNumber < 1 || tools_atomNumber > chemistryData.length){
        tools_periodicTableNumber.classList.add("unvalid");
        tools_unvalidInput()
        return undefined;
    }


    
    tools_periodicTableLookUpUpdateData();

}


function tools_updateValuesFromSymbol(){
    tools_periodicTableLookUpNameSv.value = "";
    tools_periodicTableLookUpNameEn.value = "";
    tools_periodicTableNumber.value = "";
    tools_periodicTableWeight.value = "";

    tools_atomNumber = chemistryDataGetAtomNumberFromString(tools_periodicTableSymbol.value);
    if (tools_atomNumber == 0){
        tools_periodicTableSymbol.classList.add("unvalid");
        tools_unvalidInput()
    }


    tools_addAutoFilledToAll();
    tools_periodicTableSymbol.classList.remove("autofilled");

    tools_periodicTableLookUpUpdateData();
   
}

// Notes


class advancedtextarea extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        
        this.textareaInput = document.createElement("textarea");
        this.textareaInput.setAttribute('part', 'input');


        this.textareaDisplay = document.createElement("div");
        this.textareaDisplay.setAttribute('part', 'display');

        
        this.shadow.appendChild(this.textareaInput);
        this.shadow.appendChild(this.textareaDisplay);


        this.shadow.addEventListener("click", () => this.startInput());

        this.textareaInput.addEventListener("blur", () => this.onFinishedInputting());
        this.placeHolderString = this.getAttribute("placeholder");

        if (this.placeHolderString == null){
            this.placeHolderString = "..."
        }



        this.textareaInput.style.width = "100%";
        this.textareaInput.style.borderRadius = "0";
        this.textareaInput.style.outline = "none";
        this.textareaDisplay.style.padding = "0.25rem";

        this.textareaDisplay.style.width = "100%";
        this.textareaDisplay.style.height = "100%";
        this.textareaDisplay.style.padding = "0.25rem";


        this.onFinishedInputting();
    }

    getValue(){
        return this.textareaInput.value;
    }

    setValue(value){
        if (value == undefined) return undefined;
        this.textareaDisplay.innerHTML = value;
        this.textareaInput.value = value;
    }


    startInput(){
        this.textareaInput.style.display = "block";
        this.textareaDisplay.style.display = "none";
        this.textareaInput.focus();

    }

    onFinishedInputting(){
        this.textareaInput.style.display = "none";
        this.textareaDisplay.style.display = "block";

        let htmlContent = this.textareaInput.value;
        while (htmlContent.includes("\n")) htmlContent = htmlContent.replace("\n", "<br>");

        if (htmlContent == ""){
            htmlContent = this.placeHolderString;
        }
        this.textareaDisplay.innerHTML = htmlContent;
    };

    static get observedAttributes() {
        return ['placeholder']; // List attributes you want to observe
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder') {
            if (newValue.length == 0){
                console.warn("Unvalid placeholder name!");
                return undefined;
            }
            this.placeHolderString = newValue;
        }
    }
}

customElements.define("advanced-textarea", advancedtextarea);

// Handle keyboard shortcuts

function isNumber(str) {
    return typeof str === 'string' && !isNaN(str) && !isNaN(parseFloat(str));
}

document.addEventListener('keydown', (event) => {

    if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        createNewColumn();
        event.preventDefault();

    } else if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        removeColumn();
        event.preventDefault();

    } else if (event.ctrlKey && event.shiftKey && event.key === '!') {
        clickOpenFile();
        event.preventDefault();

    }else if (event.ctrlKey && event.shiftKey && event.key === '"') {
        saveCalculationState();
        event.preventDefault();

    }else if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        autofillMolarmasses();
        event.preventDefault();

    }else if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
        executeCalculations();
        event.preventDefault();

    }


  });
  






// Theme Selector

const themeSelectorElement = document.getElementById("themeSelector");

const themeSelectorButtonContainer = document.getElementById("themeSelectorButtonContainer");

function turnOffThemeChangingAnimation(){
    document.body.classList.remove("changingThemeAnimation");
}

function themeIconClicked(){


}

themeSelectorButtonContainer.addEventListener("click", themeIconClicked);


function changeTheme(animation=true){
    
    if (animation){
        document.body.classList.add("changingThemeAnimation");
        setTimeout(turnOffThemeChangingAnimation, 2000);
    }else{
        document.body.classList.remove("changingThemeAnimation");
    }
    
    document.body.classList.remove("dark-theme");
    document.body.classList.remove("light-theme");
    document.body.classList.remove("blue-theme");
    
    document.body.classList.add(themeSelectorElement.value); 
    
}

const params = new URLSearchParams(window.location.search);

if (params.has("developerTools") && params.get("developerTools") == "true"){
    developerToolsContainer.classList.remove("hidden");
}

// Do automatic molarmass and calculations
function doAutomaticCalutaionsFromURLParams(){
    if (params.has("autofill") && params.get("autofill") == "true"){
        console.log("Autofill Molarmasses")
        autofillMolarmasses();
    }
    
    if (params.has("calculate") && params.get("calculate") == "true"){
        executeCalculations();
    }
}

themeSelectorElement.addEventListener("change", changeTheme);


// Select theme
const startTheme = undefined; // <-- Customize your start theme here 
const allowedThemes = ["dark-theme", "light-theme"]

if (params.has("theme") && allowedThemes.includes(params.get("theme"))){
    themeSelectorElement.value = params.get("theme");
    changeTheme(false);

}else if (startTheme != undefined){
    themeSelectorElement.value = startTheme;
    changeTheme(false);

}else if (window.matchMedia('(prefers-color-scheme: dark)').matches){
    themeSelectorElement.value = "dark-theme";
    changeTheme(false);
    
}else if (window.matchMedia('(prefers-color-scheme: light)').matches){
    themeSelectorElement.value = "light-theme";
    changeTheme(false);
    
}else{
    themeSelectorElement.value = "dark-theme";
    changeTheme(false);
}



function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


const openNewButton = document.getElementById("openNewWithURLParams");

if (isOneFileVersion)
    openNewButton.style.display = "none";



const messageBoxContainer = document.querySelector('.messageBoxContainer');
const pageContainer = document.querySelector('.pageContainer');

const messageboxBlurBackgroundInput = document.getElementById("messageboxBlurBackgroundInput");
const messageboxFullAutomationInput = document.getElementById("messageboxFullAutomationInput");
const messageboxWidenInputFieldOnFocus = document.getElementById("messageboxWidenInputFieldOnFocus");


messageboxBlurBackgroundInput.addEventListener("change", () =>{
    if (messageboxBlurBackgroundInput.checked) addBackgroundBlur();
    else removeBackgroundBlur();
})

function addBackgroundBlur(){
    if (!messageboxBlurBackgroundInput.checked) return undefined;
    pageContainer.style.filter = 'blur(10px)';
}

function removeBackgroundBlur(){
    pageContainer.style.filter = 'none';
}

function closeAllMessageBoxes(){
    settingsMessageBox.classList.add("hide");
    notesMessageBox.classList.add("hide");
    removeBackgroundBlur();
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

messageboxWidenInputFieldOnFocus.addEventListener("change", () => {
    console.log("Test");
    if (messageboxWidenInputFieldOnFocus.checked) table.classList.add("widenInputsOnFocus");
    else table.classList.remove("widenInputsOnFocus");

});


// Toggle Show More Information

const shortQuantityLablesInput = document.getElementById("shortQuantityLablesInput");

function updateShourtQuantityLables(){
    if (shortQuantityLablesInput.checked) table.classList.remove("showMoreInformation");
    else table.classList.add("showMoreInformation");
}

shortQuantityLablesInput.addEventListener("change", updateShourtQuantityLables);


// Change calculation mode


const calculationTypeSelector = document.getElementById("calculationTypeSelector");
const calculationModes = ["normal", "equilibrium"];
const calculationModeSuffix = "CalculationMode";
let calculationMode = undefined;


function onFormulaChange(){
    // Fires when the formula is changed
    FormulaAPI.update();
    document.body.classList.remove("protolysisReaction"); 
    document.body.classList.remove("acidProtolysisReaction"); 
    document.body.classList.remove("baceProtolysisReaction"); 

    if (FormulaAPI.isProtolysis) { 
        document.body.classList.add("protolysisReaction"); 
        if (FormulaAPI.isAcidProtolysis) document.body.classList.add("acidProtolysisReaction"); 
        if (FormulaAPI.isBaseProtolysis) document.body.classList.add("baceProtolysisReaction"); 
    }

};


function onCalculationModeUpdate(toValue = undefined){
    let newCalculationMode;
    if (toValue === undefined) newCalculationMode = updateCalculationMode();
    else newCalculationMode = toValue;


    if (newCalculationMode === calculationMode) return;

    if (newCalculationMode === 1) exchangeInput.value = 100;

    let oldCalculationMode = calculationMode;

    calculationMode = newCalculationMode;

    let previousClassName = calculationModes[oldCalculationMode] + calculationModeSuffix;
    document.body.classList.remove(previousClassName);

    let newClassName = calculationModes[calculationMode] + calculationModeSuffix;
    document.body.classList.add(newClassName);


};



function updateCalculationMode(){
    for (let i = 0; i < operators.length; i++){
        let operatorContainer = operators[i];

        switch (operatorContainer.children[0].value){
            case "+":
                break;

            case "=":
                return 1;

        }
            
    };

    return 0;
};


onCalculationModeUpdate(0);





// Fill rule functions

function setValueToPos(formulaUnit_id, quantity, value, replaceValues = true, computerCalculation = false, loadedFromSaveData = false){
    console.log("Set value!")
    if (!replaceValues && formulaUnits[formulaUnit_id].getValue(quantity) != "") {
        console.log("Skipped!", replaceValues, )
        return;
    }

    formulaUnits[formulaUnit_id].setValue(quantity, value, computerCalculation, loadedFromSaveData);

}


function fillRowWithAValue(rows = [], value, replaceValues = true, computerCalculation = false, loadedFromSaveData = false){
    console.log("Fill row")

    rows.forEach((fillQuantity) => {
        for (let i = 0; i < formulaUnits.length; i++){
            setValueToPos(i, fillQuantity, value, replaceValues, computerCalculation, loadedFromSaveData);
        }
    })
    

}








// equilibrium Equation
const equilibriumConstantsContainer = document.querySelector(".equilibriumConstants");
const equilibriumQuotientInputElement = document.getElementById("equilibriumQuotientInputElement");
const equilibriumConstantInputElement = document.getElementById("equilibriumConstantInputElement");

const equilibriumAcidConstantInputElement = document.getElementById("acidConstantInputElement");
const equilibriumAcidPConstantInputElement = document.getElementById("acidPConstantInputElement");
const equilibriumBaseConstantInputElement = document.getElementById("baseConstantInputElement");
const equilibriumBasePConstantInputElement = document.getElementById("basePConstantInputElement");

const acidAndBaseConstantInputElements = [equilibriumAcidConstantInputElement, equilibriumAcidPConstantInputElement, equilibriumBaseConstantInputElement, equilibriumBasePConstantInputElement];

const equilibriumConstantResultantProduct = document.getElementById("equilibriumConstantResultantProduct");
const equilibriumConstantReactantProduct = document.getElementById("equilibriumConstantReactantProduct");
const formulaMenuReactionDirectionDisplayElement = document.getElementById("formulaMenuReactionDirectionDisplayElement");

const formulaMenuEquilibriumConstantUnitExponent = document.getElementById("formulaMenuEquilibriumConstantUnitExponent");

const equilibriumConstantType = {
    "normal": 0,
    "acid": 1,
    "base": 2
};


function updateEquilibriumValues (){
    console.log(equilibriumConstantInputElement.value  == "", equilibriumQuotientInputElement.value == "");
    if (equilibriumConstantInputElement.value == "" || equilibriumQuotientInputElement.value == "") {
        formulaMenuReactionDirectionDisplayElement.parentElement.classList.add("hide");
        return;
    }

    formulaMenuReactionDirectionDisplayElement.parentElement.classList.remove("hide");

    if (equilibriumQuotientInputElement.value === equilibriumConstantInputElement.value)
        formulaMenuReactionDirectionDisplayElement.innerHTML = "Equilibrium";
    else if (equilibriumQuotientInputElement.value > equilibriumConstantInputElement.value)
        formulaMenuReactionDirectionDisplayElement.innerHTML = "&rarr;";
    else
        formulaMenuReactionDirectionDisplayElement.innerHTML = "&larr;";
}

equilibriumQuotientInputElement.addEventListener("input", updateEquilibriumValues);
equilibriumConstantInputElement.addEventListener("input", updateEquilibriumValues);


function clearequilibriumEquation(){
    while (equilibriumConstantResultantProduct.children.length != 0) equilibriumConstantResultantProduct.children[0].remove();
    while (equilibriumConstantReactantProduct.children.length != 0) equilibriumConstantReactantProduct.children[0].remove();
};



function addElementToequilibriumEquation(HTMLName, exponent, isReactant = false){
    let parent;
    if (isReactant) parent = equilibriumConstantResultantProduct;
    else parent = equilibriumConstantReactantProduct;

    const tempChild2 = document.createElement("span");
    tempChild2.className = "mathSymbol";

    if (parent.children.length != 0){
        const multiplicationOperator = document.createElement("span");
        multiplicationOperator.className = "mathOperator";
        multiplicationOperator.innerHTML = "&sdot;";
        parent.appendChild(multiplicationOperator);

    }

    let exponentString = "";
    if (exponent != 1) exponentString = `<sup>${exponent}</sup>`

    tempChild2.innerHTML = `[${HTMLName}]${exponentString}`;
    parent.appendChild(tempChild2);


};


const calculateEquilibriumFunctions = [calculateEquilibriumConstantBasic, calculateEquilibriumConstantFromSubstanceAmounts];
function updateEquilibriumConstant(){

    for (let i = 0; i < calculateEquilibriumFunctions.length; i++){
        let rv = calculateEquilibriumFunctions[i]()
        if (rv[0]) break;
    };

    if (calculateEquilibriumConstantBasic(quantity.ceq, equilibriumConstantType.acid)[0]) updateProtolysisData();



    calculateEquilibriumConstantUnit();

};


function createEquilibriumConstantEquationInGG() {
    console.warn("GG EQ Equation generator not yet implemented");
    return;
    const tempGeogebraExportSystem = new GeogebraExportSystem();

    const scopes = getScopes();
    
    let reactionSpeedStrings = [];
    for (let i = 0; i < 2; i++){
        let string = "";

        scopes[i].forEach((formulaUnit) => {
            let formulaUnitConcentration;

            let operator;

            switch (i){
                case 0:
                    operator = "-";
                    break;
                case 1:
                    operator = "%2B";
                    break;
            }
            
            if (formulaUnit.getValue(quantity.ceq) != "") formulaUnitConcentration = formulaUnit.getValue(quantity.ceq);
            else if (formulaUnit.getValue(quantity.c) != "") formulaUnitConcentration = `(${formulaUnit.getValue(quantity.c)}${operator}${formulaUnit.getValue(quantity.ratio)}x)`;
            else formulaUnitConcentration = `(ceq_${Number(formulaUnit.chemistryInput.getValue()).toFixed(20)})`;

            if (string.length != 0) string += "*"
            string += `${formulaUnitConcentration}^${Number(formulaUnit.getValue(quantity.ratio)).toFixed(20)}`

        })

        reactionSpeedStrings.push(string);

    };


    let eqQuotient;
    if (equilibriumQuotientInputElement.value != "") eqQuotient = equilibriumQuotientInputElement.value;
    else eqQuotient = "Q";
    
    const equationString = `Solve(${eqQuotient}=(${reactionSpeedStrings[1]})/(${reactionSpeedStrings[0]}));`;
    const geogebraEquationLink = document.getElementById("geogebraEquationLink");
    geogebraEquationLink.href = "https://www.geogebra.org/cas?command="+equationString;
    geogebraEquationLink.classList.remove("hidden");
    tempGeogebraExportSystem.addCalculationToGGExport(equationString);
    return tempGeogebraExportSystem.getLink();
};

function calculateEquilibriumConstantUnit(type = equilibriumConstantType.normal){
    const scopes = getScopes();
    if (scopes.length != 2) {
        formulaMenuEquilibriumConstantUnitExponent.parentElement.parentElement.classList.add("hide");
        return;
    };

    let key = (formulaUnit) => {return formulaUnit.getValue(quantity.ratio)}; 

    if (type === equilibriumConstantType.acid){
        key = (formulaUnit) => { let htmlValue =  formulaUnit.chemistryInput.getHTMLValue(); if (htmlValue === "H<sub>3</sub>O<sup>+</sup>" || htmlValue === "H<sup>+</sup>") return 0; else return formulaUnit.getValue(quantity.ratio); }; 
    };

    let unitExponentValue = sum(scopes[1], key) - sum(scopes[0], key);

    
    formulaMenuEquilibriumConstantUnitExponent.innerText = unitExponentValue.toString();
    formulaMenuEquilibriumConstantUnitExponent.parentElement.parentElement.classList.remove("hide");
    
    
}

function calculateEquilibriumConstantFromSubstanceAmounts(type = equilibriumConstantType.normal){
    const scopes = getScopes();

    if (type !== equilibriumConstantType.normal) return [false, undefined];

    let key = (value) => { return value.getValue(quantity.ratio) };




    if ((sum(scopes[0], key = key) - sum(scopes[1], key = key)) === 0){
        return calculateEquilibriumConstantBasic(quantityPointer = quantity.neq);

    };

    return [false, undefined];
};


function calculateValuesFromAcidBaseConstant(){
    const scopes = getScopes();

    if (equilibriumAcidConstantInputElement.value == "") return; 

    if (!ScopeAPI.scopeContains(scopes[0], "H<sub>2</sub>O")) { console.warn("First scope does not contain water"); return false; }; 
    if (!ScopeAPI.scopeContains(scopes[1], "H<sub>3</sub>O<sup>+</sup>") && !ScopeAPI.scopeContains(scopes[1], "H<sup>+</sup>")) { console.warn("First scope does not contain hydrogen"); return false; }; 

    // Unvalid reaction based on lenghts
    if (scopes[0].length == 1 && scopes[1].length == 2) {return;};

    // Checks wether start concentration on the right side is the same
    if (scopes[1][0].getValue(quantity.c) != scopes[1][1].getValue(quantity.c)) { return; };


    if (scopes[0][0].getValue(quantity.c) == "") { return; };


    const K = equilibriumAcidConstantInputElement.value;
    const C = scopes[0][0].getValue(quantity.c);

    let x = (-K/2) + ((K/2)**2 + K*C) ** 0.5;

    console.log(K, C)
    console.log(x);
    return true;

};

function calculateEquilibriumConstantBasic(quantityPointer = quantity.ceq, type = equilibriumConstantType.normal, doCalculations = true){
    
    // Check if there is enough information
    let everyFormulaUnitHasEqConcentration = true;

    formulaUnits.forEach((formulaUnit) => {
        if (!everyFormulaUnitHasEqConcentration) return false;


        if (formulaUnit.getValue(quantityPointer) == "" && ( type === equilibriumConstantType.normal || formulaUnit.chemistryInput.getHTMLValue() !== "H<sub>2</sub>O")) 
            everyFormulaUnitHasEqConcentration = false;

    });

    if (!everyFormulaUnitHasEqConcentration) return false;

    // CalculateEquilibriumConstant

    clearequilibriumEquation();


    const scopes = getScopes();

    if (scopes.length != 2) console.warn("Can not calculate Q, because the scope lenght is not 2");

    let QValue = 1;

    scopes.forEach((scope, scope_i) => {
        scope.forEach((formulaUnit) => {
            let formulaUnitCeq = formulaUnit.getValue(quantityPointer);
            let formulaUnitCoefficient = formulaUnit.getValue(quantity.ratio);
            let formulaUnitEqCoefficient = formulaUnitCeq ** formulaUnitCoefficient;

            if (type === equilibriumConstantType.acid && formulaUnit.chemistryInput.getHTMLValue() === "H<sub>2</sub>O") return;

            switch (scope_i){
                case 1:
                    QValue *= formulaUnitEqCoefficient;

                    if (type === equilibriumConstantType.normal) addElementToequilibriumEquation(formulaUnit.chemistryInput.getHTMLValue(), formulaUnitCoefficient, true);

                    break;

                case 0:
                    QValue /= formulaUnitEqCoefficient;

                    if (type === equilibriumConstantType.normal) addElementToequilibriumEquation(formulaUnit.chemistryInput.getHTMLValue(), formulaUnitCoefficient, false);

                    break;
            }
        });
    });

    
    if (!doCalculations) return [
        false, 
        undefined
    ];

    
    let outputInputElement;
    

    switch (type){
        case equilibriumConstantType.normal:
            outputInputElement = equilibriumQuotientInputElement;
            break;

        case equilibriumConstantType.acid:
            outputInputElement = equilibriumAcidConstantInputElement;
            break;
    
        case equilibriumConstantType.base:
            outputInputElement = equilibriumBaseConstantInputElement;
            break;
        
            
    };



    if (outputInputElement.value !== "") return [
        false, 
        undefined
    ];



    outputInputElement.value = QValue;
    outputInputElement.classList.add("autofilled")
    outputInputElement.readOnly = true;

    return [
        true, 
        QValue
    ];
};



function sum(array, key = (value) => {return value;}){
    let sum = 0;
    array.forEach((value) => {sum += Number(key(value))});
    return sum;

};



// Determination of reaction type
class ScopeAPIClass{
    scopeContains(scope, HTMLMolecule, getIndex = false){
        for (let i = 0; i < scope.length; i++){
            if (scope[i].chemistryInput.getHTMLValue() == HTMLMolecule) {
                if (getIndex) return i;
                else return true;
            }
        };

        if (getIndex) return -1;
        else return false;
    };

};

const ScopeAPI = new ScopeAPIClass();

class FormulaAPIClass
{
    constructor(){
        this.isAcidProtolysis = false;
        this.isBaseProtolysis = false;
        this.isProtolysis = false;
    }

    updateIsAcidProtolysis(){
        const scopes = getScopes();
        if (scopes.length != 2) { this.isAcidProtolysis = false; return; }

        this.isAcidProtolysis = ScopeAPI.scopeContains(scopes[0], "H<sub>2</sub>O") && (ScopeAPI.scopeContains(scopes[1], "H<sub>3</sub>O<sup>+</sup>") || ScopeAPI.scopeContains(scopes[1], "H<sup>+</sup>"));
    };

    updateIsBaseProtolysis(){
        const scopes = getScopes();

        if (scopes.length != 2) { this.isBaseProtolysis = false; return; }

        this.isBaseProtolysis = ScopeAPI.scopeContains(scopes[0], "H<sub>2</sub>O") && ScopeAPI.scopeContains(scopes[1], "OH<sup>-</sup>");
    };

    updateIsProtolysis(){
        this.isProtolysis = this.isAcidProtolysis || this.isBaseProtolysis;
    };

    update(){
        this.updateIsAcidProtolysis();
        this.updateIsBaseProtolysis();
        this.updateIsProtolysis();
    };
};



const FormulaAPI = new FormulaAPIClass();

createNewColumn(false);


const pHInputElement = document.getElementById("pHInputElement");
const pOHInputElement = document.getElementById("pOHInputElement");
const pKwInputElement = document.getElementById("pKwInputElement");

pKwInputElement.value = 14;

const protolysisInputElements = [pHInputElement, pOHInputElement, pKwInputElement];

// protolysisInputElements.forEach((element) => {element.addEventListener("change", updateProtolysisData)})

function updateProtolysisData(){
    calculateWithProtolysisValues();

    transferConcentrationAndpHValues();

    calculateWithAcidAndBaseConstants(equilibriumAcidPConstantInputElement, equilibriumAcidConstantInputElement);
    calculateWithAcidAndBaseConstants(equilibriumBasePConstantInputElement, equilibriumBaseConstantInputElement);

    
};

function calculateWithAcidAndBaseConstants(pKInputElement = undefined, KInputElement = undefined){

    if (KInputElement === undefined) { console.error("Unvalid KInputElement!"); return; }
    if (pKInputElement === undefined) { console.error("Unvalid KInputElement!"); return; }

    if (pKInputElement.value == "" && KInputElement.value != ""){
        // K --> pK
        pKInputElement.value = -Math.log10(KInputElement.value);
        KInputElement.readOnly = true;
        pKInputElement.classList.add("autofilled");
        return true;


    } else if (pKInputElement.value != "" && KInputElement.value == ""){
        // pK --> K
        KInputElement.value = 10**(-pKInputElement.value);
        pKInputElement.readOnly = true;
        KInputElement.classList.add("autofilled");

        return true;
    }

    return false;
    
};


function calculateWithProtolysisValues(){
    let pH = pHInputElement.value;
    let pOH = pOHInputElement.value;
    let pKw = pKwInputElement.value;

    const newData = chemistryCalculateWpHpOHpKw(pH, pOH, pKw);

    if (!newData) return;

    protolysisInputElements.forEach((element, i) => {
        if (newData[i] != undefined){
            element.value = newData[i];
            element.classList.add("autofilled");

        } else {
            element.classList.remove("autofilled");

        }

    });
};


function transferConcentrationAndpHValues(){
    const scopes = getScopes();

    if (scopes.length != 2) return;

    if (pHInputElement.value != "") findCalculateAndUpdateMoleculeWithValue(scopes[1], "H<sub>3</sub>O<sup>+</sup>", 10**(-pHInputElement.value));
    if (pHInputElement.value != "") findCalculateAndUpdateMoleculeWithValue(scopes[1], "H<sup>+</sup>", 10**(-pHInputElement.value));
    if (pOHInputElement.value != "") findCalculateAndUpdateMoleculeWithValue(scopes[1], "OH<sup>-</sup>", 10**(-pHInputElement.value));

    if (pHInputElement.value === "")
        scopes[1].forEach(formulaUnit => {
            if ((formulaUnit.chemistryInput.getValue() === "H_3O'+" || formulaUnit.chemistryInput.getValue() === "H'+"))
                if (calculationMode === 1 && formulaUnit.getValue(quantity.ceq) !== "") {
                    pHInputElement.value = -Math.log10(formulaUnit.getValue(quantity.ceq));
                    pHInputElement.classList.add("autofilled");

                }

                

        });
};


function findCalculateAndUpdateMoleculeWithValue(scope, molecule, value){
    let index = ScopeAPI.scopeContains(scope, molecule, true);

    if (index == -1) index = ScopeAPI.scopeContains(scope, "H<sup>+</sup>", true);

    if (index != -1){
        let formulaUnit = scope[index];

        if (formulaUnit.getValue(quantity.ceq) == "") {
            formulaUnit.setValue(quantity.ceq, value, computerCalculation = true);
        };
    };

};