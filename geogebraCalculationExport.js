


class GeogebraExportSystem {
    geogebraExportSystemLinkCas = "https://www.geogebra.org/cas";
    geogebraExportSystemLinkClassic = "https://www.geogebra.org/classic";
    constructor(){
        this.currentGeogebraExportCommands = [];
    };

    addCalculationToGGExport(string){
        this.currentGeogebraExportCommands.push(string);
    };

    clearCurrentGeogebraExport(){
        this.currentGeogebraExportCommands = [];
    };


    loadInStartValues(formulaUnits){
        const quantityKeys = Object.keys(quantity);
        formulaUnits.forEach((formulaUnit) => {
            quantityKeys.forEach((value, index) => {
                let formulaUnitInputValue = formulaUnit.getValue(index);
                if (formulaUnitInputValue == "") return;
                this.addCalculationToGGExport(`${value}${formulaUnit.chemistryInput.getValue()}=${formulaUnitInputValue}`)
            })
        } )

    }


    getLink(useClassic=false){
        let link = "";
        if (useClassic) link = this.geogebraExportSystemLinkClassic;
        else link = this.geogebraExportSystemLinkCas;

        link += "?command=";


        this.currentGeogebraExportCommands.forEach((command) => {
            link += command + ";";
        })

        return link;

    };
}




const mainGeogebraCalculationsExportSystem = new GeogebraExportSystem();


function convertHTMLToString(text){
    let normalText = text;
    while (normalText.includes("<sub>")) normalText = normalText.replace("<sub>", "_");
    while (normalText.includes("</sub>")) normalText = normalText.replace("</sub>", "");
    while (normalText.includes("<sup>")) normalText = normalText.replace("<sup>", "^");
    while (normalText.includes("</sup>")) normalText = normalText.replace("</sup>", "");
    return normalText;
}