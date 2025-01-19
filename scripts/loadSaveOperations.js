function loadSaveOperations_addZeroToStart(number){
    if (number < 10){
        number = "0" + number.toString();
    }else{
        number = number.toString()
    }

    return number;

}



function getCurrentDateAndTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = loadSaveOperations_addZeroToStart(now.getMonth() + 1);
    const day = loadSaveOperations_addZeroToStart(now.getDate());
    const hours = loadSaveOperations_addZeroToStart(now.getHours());
    const minutes = loadSaveOperations_addZeroToStart(now.getMinutes());
    const seconds = loadSaveOperations_addZeroToStart(now.getSeconds());
    return `${year}${month}${day}${hours}${minutes}${seconds}`;

}

function convertCurrentFormulaToText(){
    let string = "";

    for (let i = 0; i < formulaUnits.length; i++){
        string += formulaUnits[i].chemistryInput.getValue();
        if (i < operators.length)
            string += operators[i].children[0].value;
    }

    string = string.replaceAll("_", "");
    return string;

}

function saveDataToJSON(data, extension = ".cc.json"){
    const jsonFormattedString = JSON.stringify(data);

    const blob = new Blob([jsonFormattedString], {type: "application/json"});

    const downloadLink = document.createElement("a");

    downloadLink.download = convertCurrentFormulaToText() + extension;

    downloadLink.href = window.URL.createObjectURL(blob);

    document.body.appendChild(downloadLink)

    downloadLink.click()

    document.body.removeChild(downloadLink)


}



function getSaveData(){
    let inputData = []

    for (let i = 0; i < formulaUnits.length; i++){
        let formulaUnit = formulaUnits[i];
        inputData.push(formulaUnit.getSaveData())
    }


    let operatorData = []

    for (let i = 0; i < operators.length; i++){
        let operation = operators[i]
        operatorData.push(operation.children[0].value)
        
    }



    let data = {
        "inputData": inputData,

        "operators": operatorData,

        "settings":{
            "exchange": exchangeInput.value,
            "deltaH": energyInformationDeltaHInputElement.value,
            "limitingReactant": useLimitingReactantInput.checked,
            "calculationMode": calculationMode,
            "pH": pHInputElement.value,
            "pOH": pHInputElement.value,
            "Ka": equilibriumAcidConstantInputElement.value,
            "pKa": equilibriumAcidPConstantInputElement.value,
            "Kb": equilibriumBaseConstantInputElement.value,
            "pKb": equilibriumBasePConstantInputElement.value,
            "Q": equilibriumQuotientInputElement.value,
            "K": equilibriumConstantInputElement.value
        },

        "notes": undefined
    }

    if (notesElement.getValue() != ""){
        data["notes"] = notesElement.getValue();
    }

    return data;

}



function fitCalculatorToWidth(width){
    while (true) {
        if (width < formulaUnits.length){
            removeColumn()

        }else if(width > formulaUnits.length){
            createNewColumn()
        }else{
            return undefined
        }
    }
}


function clearCalculationTable(){
    console.log("Clearing Table")
    while (formulaUnits.length != 0){
        removeColumn()
    }
}

function checkIfDataExistsAndUpdateInput(data, key, inputElement){
    if (data.hasOwnProperty(key)){
        inputElement.value = data[key];
    };  
};


function updateCalculationsToNewData(data){
    const inputData = data["inputData"]
    const settingsData = data["settings"]
    const operatorData = data["operators"]

    const notesData = data["notes"];

    try{
        
        if(notesData != undefined){
            notesElement.setValue(notesData);
        }
        
    }
    catch (e)
    {
        console.warn("An error occured while updating notes container:", e)
    }

    // Make sure the calculator has the correct amount of columns
    // clearCalculationTable();
    fitCalculatorToWidth(inputData.length)


    // Handle input data
    for (let i = 0; i < inputData.length; i++){
        let formulaUnit = formulaUnits[i];
        const formulaData = inputData[i];

        formulaUnit.loadFromSaveData(formulaData)
    }


    // Handle operators

    //console.log("OperatorData: ", operatorData);

    for (let i = 0; i < operatorData.length; i++){
        const operator = operators[i];
        
        operator.children[0].value = operatorData[i]
    }


    if (settingsData.hasOwnProperty("exchange")){
        exchangeInput.value = settingsData["exchange"];
    }

    if (settingsData.hasOwnProperty("deltaH")){
        energyInformationDeltaHInputElement.value = settingsData["deltaH"];
    }  

    if (settingsData.hasOwnProperty("limitingReactant")){
        useLimitingReactantInput.checked = settingsData["limitingReactant"];
    }

    if (settingsData.hasOwnProperty("calculationMode")){
        onCalculationModeUpdate(toValue=settingsData["calculationMode"]);
    };      
    
    checkIfDataExistsAndUpdateInput(settingsData, "pH", pHInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "pOH", pOHInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "Ka", equilibriumAcidConstantInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "pKa", equilibriumAcidPConstantInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "Kb", equilibriumBaseConstantInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "pKb", equilibriumBasePConstantInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "Q", equilibriumQuotientInputElement);
    checkIfDataExistsAndUpdateInput(settingsData, "K", equilibriumConstantInputElement);
    



    try{
        updateFormulaDisplayElement();
    }
    catch (e){
        console.error(`An error occurred with updatingFormulaDisplayElement: ${e.message}`)
    }

    FormulaAPI.update();
}

function loadDataFromFile(file){

    /*if (file == "autograb"){
        console.log("Autograbbing file")
        file = testFileInputElement.files[0]
    }*/


    if (!file){
        console.error("Not A File")
        return undefined;
    }
   

    const reader = new FileReader();

    reader.onload = function(e){
        try{
            const data = JSON.parse(e.target.result);
            updateCalculationsToNewData(data)

        } catch {
            console.error("Error parsing JSON data");

            invalidFile.classList.add("active")


        };

    };

    reader.readAsText(file)

}



function saveCalculationState(storageType="json"){
    const data = getSaveData();
    saveDataToJSON(data);

}

function loadCalculationState(){
    
    resetFileMenuErrors()

    const file = fileMenuInput.files[0];

    if (!file){
        console.warn("Inputted filed is not valid")

        currentOpenFileDisplayElement.innerHTML = "";
        currentOpenFileDisplayElement.classList.add("empty")

        noFileInputted.classList.add("active")
        return undefined;
    }

    currentOpenFileDisplayElement.classList.remove("empty")
    currentOpenFileDisplayElement.innerHTML = "Loading " + file.name + "..."

    const loadedData = loadDataFromFile(file);
    currentOpenFileDisplayElement.innerHTML = "File: " + file.name

    fileMenuInput.value = "";


}















/* GUI */

function clickOpenFile(){
    fileMenuInput.click()
}

// Add the file section


const fileMenuInput = document.querySelector(".fileMenuInput")
const fileMenuContainerExpander = document.querySelector(".fileMenuContainerExpander")
const fileMenuContainer = document.querySelector(".fileMenuContainer")
const currentOpenFileDisplayElement = document.querySelector(".currentOpenFileDisplayElement")

fileMenuInput.addEventListener("change", loadCalculationState);




// Error handler elements

const noFileInputted = document.getElementById("No file inputted")
const invalidFile = document.getElementById("Invalid file")


function resetFileMenuErrors(){
    const errorMessages = document.querySelectorAll(".errorMessage")
    errorMessages.forEach((e) => {
        e.classList.remove("active")

    })
}

resetFileMenuErrors();

// Show the open file



// CSV


function exportToCSV(includeQuantities = true, includeOperators = false){
    const data = getSaveData();

    let saveData = data["inputData"];
    console.log(saveData);

    let textData = "";

    for (let x = 0; x < saveData[0].length; x++){
        if (includeQuantities){
            console.log(getKeyByValue(quantity, x));
            if (x == 0)
                textData += "Substance,";
            else
                textData += getKeyByValue(quantity, x - 1) + ",";
        }


        for (let y = 0; y < saveData.length; y++){
            
            textData += saveData[y][x];
            
            if (y != saveData.length - 1){ // Not last element in column
                textData += ",";
            }
            if (includeOperators && operators.length > y){
                if (x == 0)
                    textData += operators[y].children[0].value + ",";
                else
                    textData += " ,";
            }
        
        }
        if (true || !column + 1 == saveData.length){ // Not last row
            textData += "\n";
        }
    }

    const blob = new Blob([textData], {type:"text/csv"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', convertCurrentFormulaToText());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}





// Text export
const exportToTextOutputContainer = document.getElementById("exportToTextOutputContainer");
const exportToTextOutput = document.getElementById("exportToTextOutput");


function exportCalculationToText(){
    exportToTextOutputContainer.classList.add("clicked");
    exportToTextOutput.value = JSON.stringify(getSaveData());
    exportToTextOutput.focus();
}

function hideExportCalculationsOutput(){
    exportToTextOutputContainer.classList.remove("clicked");
    exportToTextOutput.value = "";
}

exportToTextOutput.onblur = hideExportCalculationsOutput;


const importFromTextInputContainer = document.getElementById("importFromTextInputContainer");
const importFromTextInput = document.getElementById("importFromTextInput");


function importCalculationFromText(fromURL = false){
    importFromTextInputContainer.classList.remove("clicked");
    try{
        const data = JSON.parse(importFromTextInput.value);

        updateCalculationsToNewData(data);
        importFromTextInput.value = "";
        if (fromURL){
            currentOpenFileDisplayElement.innerHTML = "Imported from URL";
        }else{
            currentOpenFileDisplayElement.innerHTML = "Imported from text";
        }
        currentOpenFileDisplayElement.classList.remove("empty")

    } catch {
        console.error("Error parsing JSON data");
        importFromTextInput.value = "ERROR: The data was not correctly formatted!";
    };


}

function showImportCalculationsInput(){
    importFromTextInputContainer.classList.add("clicked");
    importFromTextInput.focus();

}

importFromTextInput.onblur = importCalculationFromText;


const toggleCSVVisibilityButton = document.getElementById("toggleCSVVisibilityButton");
const exportCSVDialogContainerScreenBox = document.getElementById("exportCSVDialogContainerScreenBox");
const exportCSVUseHeadersInput = document.getElementById("useHeadingsInCSVExportCheckbox");
const addOperatorsInCSVExportCheckbox = document.getElementById("addOperatorsInCSVExportCheckbox");

function tools_CSV_toggleVisibility(){
    exportCSVDialogContainerScreenBox.classList.toggle("hidden");
}


function tools_CSV_buttonClicked(){
    let useHeaders = exportCSVUseHeadersInput.checked;
    let includeOperators = addOperatorsInCSVExportCheckbox.checked;
    exportToCSV(useHeaders, includeOperators);
}


// From params


function loadFromParams(){
    if(!params.has("loaddata"))
        return undefined;

    let data = params.get("loaddata");

    data = data.replaceAll("PLUS", "+");

    updateCalculationsToNewData(JSON.parse(data));
    currentOpenFileDisplayElement.innerHTML = "Imported from URL";
    currentOpenFileDisplayElement.classList.remove("empty");

    
    doAutomaticCalutaionsFromURLParams()
    
    if (params.has("autosave") && params.get("autosave") == "true")
        saveCalculationState();

}


if (!isOneFileVersion)
    window.addEventListener("load", loadFromParams);

function openSimilarFromURLParams(){
    let currentURL = window.location.origin + window.location.pathname;

    let paramsURL = "?";
    let paramKeys = params.entries();
    console.log(paramKeys);
    for (let [key, value] of paramKeys){
        console.log(key, value);
        if (key != "loaddata"){
            paramsURL += key + "=" + value +"&";
        }
    }

    JSONString = JSON.stringify(getSaveData())

    JSONString = JSONString.replaceAll("+", "PLUS");

    let newURL = currentURL+paramsURL+"loaddata="+JSONString;

    window.open(newURL)

}

