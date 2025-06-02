


function calculateMinMaxTransferValues() {
    const scopes = getScopes();

    

    /* Requirements

    * There may only be two scopes (Not implemented)

    */

    if (scopes.length !== 2) {
        console.warn("Can not find minimum and maximum transfer values if there is not exactly 2 scopes.");
        return;
    };


    // Finds the smallest concentration in the first scope -> maximum transfer value
    let maximumTransferValue;

    scopes[0].forEach((formulaUnit) => {
        if (FormulaAPI.isAcidProtolysis && formulaUnit.chemistryInput.getValue() === "H_2O") return;
        let concentration = Number(formulaUnit.getValue(quantity.c));


        if (maximumTransferValue === undefined || maximumTransferValue > concentration) {
            maximumTransferValue = concentration;
        };
    });


    // Find the smallest concentration in the second scope -> mimimum transfer value
    let mimimumTransferValue;

    scopes[1].forEach((formulaUnit) => {
        let concentration = Number(formulaUnit.getValue(quantity.c));



        if (mimimumTransferValue === undefined || mimimumTransferValue > concentration) {
            mimimumTransferValue = concentration;
        };
    });


    return [
        -mimimumTransferValue,
        maximumTransferValue
    ];
};




function calculateEquilibriumQuotient(transfer, equilibriumConstantType_ = equilibriumConstantType.normal) {
    /* 

    Fetched values:

    * Start concentrations for all molecules


    */

    const scopes = getScopes();

    let quotientValue = 1;

    scopes[1].forEach((formulaUnit) => {
        let concentration = Number(formulaUnit.getValue(quantity.c));
        quotientValue *= (concentration + transfer) ** Number(formulaUnit.getValue(quantity.ratio));
    });



    scopes[0].forEach((formulaUnit) => {
        if (equilibriumConstantType_ === equilibriumConstantType.acid && formulaUnit.chemistryInput.getValue() === "H_2O") 
            return;

        let concentration = Number(formulaUnit.getValue(quantity.c));
        quotientValue /= (concentration - transfer) ** Number(formulaUnit.getValue(quantity.ratio));
    });

    return quotientValue;

};


function checkIfTransferCanBeCalculated (eqilibriumConstant = equilibriumConstantType.normal) {
    let IOElement = getEquilibriumConstantElement(eqilibriumConstant);
    if (IOElement.value === "")
        return false;

    const scopes = getScopes();

    if (scopes.length !== 2) {
        console.warn("Can not find minimum and maximum transfer values if there is not exactly 2 scopes.");
        return false;
    };


    let allConcentrationsAndRatiosAreFilled = true;


    scopes.forEach((scope, scope_i) => {
        if (!allConcentrationsAndRatiosAreFilled) return;
        scope.forEach((formulaUnit) => {
            if (!allConcentrationsAndRatiosAreFilled) return;
            if (FormulaAPI.isAcidProtolysis && eqilibriumConstant === equilibriumConstantType.acid && scope_i === 0 && formulaUnit.chemistryInput.getValue() === "H_2O") 
                return;


            if (formulaUnit.getValue(quantity.c) === "" || formulaUnit.getValue(quantity.ratio) === "") 
                allConcentrationsAndRatiosAreFilled = false;
        })
    })

    if (!allConcentrationsAndRatiosAreFilled) return false;

    let transferIsFilled = false;

    scopes.forEach(scope => {
        if (transferIsFilled) return;
        scope.forEach(formulaUnit => {
            if (transferIsFilled) return;
            if (formulaUnit.getValue(quantity.ceq) !== "")
                transferIsFilled = true;          
        });
    });

    return !transferIsFilled;
};



function getEquilibriumConstantElement(equilibriumConstantType_) {
    let IOElement;

    switch (equilibriumConstantType_) {
        case equilibriumConstantType.normal:
            IOElement = equilibriumQuotientInputElement;
            break;

        case equilibriumConstantType.acid:
            IOElement = acidConstantInputElement;
            break;

        case equilibriumConstantType.base:
            IOElement = baseConstantInputElement;
            break;
    };

    return IOElement;
};


/**
 * This function gathers the concentration values (including or excluding water depending on if the equilibriumConstantType value is normal, acid or base)
 * Then the transfer values are calculated with a min-max algorithm 
 * Finally the equilibrium values for the transfer are updated
 * 
 * @param {*} equilibriumConstantType_ 
 */
function doTransferValues(equilibriumConstantType_ = equilibriumConstantType.normal) {
    // calculateEquilibriumConstantBasic(quantity.ceq, type = equilibriumConstantType.normal, false);
    // Eqilibrium constant type might need to be change when expanding to multiple diffrent constants

    console.log("Calculating transfer");


    let IOElement = getEquilibriumConstantElement(equilibriumConstantType_);


    let transfer = findTransferValues(IOElement.value, equilibriumConstantType_);

    const scopes = getScopes();

    [0, 1].forEach((value) => {
        let scopeTransfer = transfer;
        if (value === 0) scopeTransfer = -transfer;

        scopes[value].forEach((formulaUnit) => {
            formulaUnit.setValue(quantity.dc, scopeTransfer, true);
        });
    });

    printOutCalcution("Equilibrium equation → transfer", `t = ${transfer}`, "");
    addErrorMessage("info", "Multiple solutions", "There might be multiple transfer values. To resolve, check with the equilibrium equation.", 102, false);

};




function findTransferValues(equilibriumConstantValue, equilibriumConstantType_ = equilibriumConstantType.normal) {

    /* 

    Fetched values:

    * Equilibrium Quotient

    * Start concentrations for all molecules


    */

    // console.log(equilibriumConstantType_);

    console.log("Calculating transfer with min-max");

    const defaultMinMaxValues = calculateMinMaxTransferValues(equilibriumConstantType_);

    let minimumTransferValue = defaultMinMaxValues[0];
    let maximumTransferValue = defaultMinMaxValues[1];
    let middleTransferValue;
    let equilibriumQuotient;

    const accuracy = 14; // Accuracy in decimals
    const maxIterations = 10**5;

    let i = 0;
    while (true) {
        i++;

        middleTransferValue = (minimumTransferValue + maximumTransferValue)/2;

        let equilibriumQuotient = calculateEquilibriumQuotient(middleTransferValue, equilibriumConstantType_);

        

        if (Math.abs(equilibriumQuotient - equilibriumConstantValue) < (10**(-accuracy))) return middleTransferValue;
        else if (equilibriumConstantValue > equilibriumQuotient){
            minimumTransferValue = middleTransferValue;
        } else {
            maximumTransferValue = middleTransferValue;
        };


//        if (i % 10 === 0) console.log(i, middleTransferValue, Math.abs(equilibriumQuotient - equilibriumConstantType_), Math.abs(equilibriumQuotient - equilibriumConstantType_) < (10**(-1)));


        if (i > maxIterations) return middleTransferValue;
        

    };

    return middleTransferValue;

    


};