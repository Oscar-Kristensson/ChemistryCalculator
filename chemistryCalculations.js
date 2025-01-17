






function chemistryCalculateWMass(mass, molarmass, substanceAmount, logSubstanceHTMLContent = ""){
    if (mass == "" && !molarmass== "" && !substanceAmount==""){
        // Calculate the mass from molarmass and substanceAmount
        mass = molarmass * substanceAmount;
        printOutCalcution("m = M &sdot; n", mass.toString() + "g = " + molarmass.toString() + "mol/g &sdot; " + substanceAmount.toString()+ "mol", logSubstanceHTMLContent)
        
        
        
        let normalText = convertHTMLToString(logSubstanceHTMLContent);
        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`m${normalText}=M${normalText}*n${normalText}`)


        molarmass = undefined;
        substanceAmount = undefined;

    } else if (!mass == "" && !molarmass== "" && substanceAmount==""){
        substanceAmount = mass/molarmass

        printOutCalcution("n =  m &divide; M", `${substanceAmount}mol = ${mass}g &divide; ${substanceAmount}mol/g`, logSubstanceHTMLContent)

        
        
        let normalText = convertHTMLToString(logSubstanceHTMLContent);       
        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`n${normalText}=m${normalText}/M${normalText}`)


        mass = undefined;
        molarmass = undefined;

    } else{
        return false
    }



    const rv = [mass, molarmass, substanceAmount]

    return rv

}



function chemistryCalculateWSolution(substanceAmount, volume, concentration, logSubstanceHTMLContent = "", reactionType=undefined){
    let reactionTypeIndex;
    if (reactionType === undefined)
        reactionTypeIndex = "";
    else
        reactionTypeIndex = "<sub>"+reactionType+"</sub>";
    

    if (substanceAmount == "" && !volume== "" && !concentration==""){
        // If substance amount is unknown and the rest is known
        substanceAmount = volume * concentration

        printOutCalcution(`n${reactionTypeIndex} = c${reactionTypeIndex} &sdot; v${reactionTypeIndex}`, `${substanceAmount}mol = ${concentration}mol/dm<sup>3</sup> &sdot; ${volume}dm<sup>3</sup>`, logSubstanceHTMLContent)

        let normalText = convertHTMLToString(logSubstanceHTMLContent);       
        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`n${normalText}${reactionType}=c${normalText}${reactionType}*v${normalText}${reactionType}`)


        volume = undefined
        concentration = undefined

    } else if(!substanceAmount == "" && volume== "" && !concentration==""){
        // If volume amount is unknown and the rest is known
        if (concentration == 0) {
            console.error("Concentration cannot be none, zero division", logSubstanceHTMLContent);
            return false;
        }

            
            
        volume = substanceAmount/concentration
        printOutCalcution(`v${reactionTypeIndex} = n${reactionTypeIndex} &divide; c${reactionTypeIndex}`, `${volume}dm<sup>3</sup> = ${substanceAmount}mol &divide; ${concentration}mol/dm<sup>3</sup>`, logSubstanceHTMLContent)

        let normalText = convertHTMLToString(logSubstanceHTMLContent);       
        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`v${normalText}${reactionType}=n${normalText}${reactionType}/c${normalText}${reactionType}`)


        substanceAmount = undefined
        concentration = undefined

    } else if(!substanceAmount == "" && !volume== "" && concentration==""){
        // If concentration amount is unknown and the rest is known
        if (volume == 0){
            console.error("Volume cannot be none, zero division", logSubstanceHTMLContent);
            return false;
        };


        concentration = substanceAmount/volume
        printOutCalcution(`c${reactionTypeIndex} = n${reactionTypeIndex} &divide; v${reactionTypeIndex}`, `${concentration}mol/dm<sup>3</sup> = ${substanceAmount}mol &divide; ${volume}dm<sup>3</sup>`, logSubstanceHTMLContent)

        let normalText = convertHTMLToString(logSubstanceHTMLContent);       
        mainGeogebraCalculationsExportSystem.addCalculationToGGExport(`c${normalText}${reactionType}=n${normalText}${reactionType}/v${normalText}${reactionType}`)
        
        substanceAmount = undefined
        volume = undefined

    }else{
        return false
    }


    const rv = [substanceAmount, volume, concentration]

    return rv

}



function chemistryCalculateWSubstanceAmountEq(substanceAmountStart, deltaSubstanceAmount, substanceAmountEquilibrium, logSubstanceHTMLContent = ""){
    if (substanceAmountStart == "" && substanceAmountEquilibrium != "" && deltaSubstanceAmount != ""){
        substanceAmountStart = substanceAmountEquilibrium - deltaSubstanceAmount;
        printOutCalcution("n<sub>start</sub> = n<sub>eq</sub> - &Delta;n",  `${substanceAmountStart}mol = ${substanceAmountEquilibrium}mol + ${deltaSubstanceAmount}mol`, logSubstanceHTMLContent)
        deltaSubstanceAmount = undefined;
        substanceAmountEquilibrium = undefined;
    
    } else if (substanceAmountEquilibrium == "" && substanceAmountStart != "" && deltaSubstanceAmount != ""){
        substanceAmountEquilibrium = Number(deltaSubstanceAmount) + Number(substanceAmountStart);
        printOutCalcution("n<sub>eq</sub> = &Delta;n + n<sub>start</sub>", `${substanceAmountEquilibrium}mol = ${deltaSubstanceAmount}mol + ${substanceAmountEquilibrium}mol`, logSubstanceHTMLContent)
        deltaSubstanceAmount = undefined;
        substanceAmountStart = undefined;

    }else if (deltaSubstanceAmount  == "" && substanceAmountStart != "" && substanceAmountEquilibrium != ""){
        deltaSubstanceAmount = substanceAmountEquilibrium - substanceAmountStart;
        printOutCalcution("&Delta;n = n<sub>start</sub> - n<sub>eq</sub>",  `${substanceAmountEquilibrium}mol = ${substanceAmountStart}mol - ${substanceAmountEquilibrium}mol`, logSubstanceHTMLContent)
        substanceAmountStart = undefined;
        substanceAmountEquilibrium = undefined;

    }else{
        return false;
    }


    const rv = [substanceAmountStart, deltaSubstanceAmount, substanceAmountEquilibrium];

    return rv;

};



function chemistryCalculateWpHpOHpKw(pH, pOH, pKw){
    if (pH == "" && pOH != "" && pKw != ""){
        pH = Number(pKw) - Number(pOH);
        printOutCalcution("pH = pK<sub>w</sub> - pOH",  `${pH} = ${pKw} - ${pOH}`);
        pKw = undefined;
        pOH = undefined;
    
    }else if (pH != "" && pOH == "" && pKw != ""){
        pOH = Number(pKw) - Number(pH);
        printOutCalcution("pOH = pK<sub>w</sub> - pH",  `${pOH} = ${pKw} - ${pH}`);
        pKw = undefined;
        pH = undefined;

    }else if (pH != "" && pOH != "" && pKw == ""){
        pKw = Number(pOH) + Number(pH);
        printOutCalcution("pK<sub>w</sub> = pOH + pH",  `${pKw}  = ${pOH} + ${pH}`);
        pOH = undefined;
        pH = undefined;

    }else{
        return false;
    }

    const rv = [pH, pOH, pKw];
    return rv;

};