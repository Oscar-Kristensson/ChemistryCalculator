

class ChemistryAtom{
    constructor(str){
        this.number = chemistryDataGetAtomNumberFromString(str);
    }

    getStructure(){
        return chemistryDataGetStringFromAtomNumber(this.number)
    }

    calculateMass(){
        if (chemistryDataCheckIfInVariableAtoms(this.number)) return undefined;
        return chemistryDataGetAtomMassFromAtomNumber(this.number)

    }

    getAtomCount(){
        let rv = {};
        
        rv[this.getStructure()] = 1

        return rv;

    }
}


class ChemistryGroup{
    constructor(atomsOrGroups, count){
        this.atomsOrGroups = atomsOrGroups;
        this.count = count;

    }    
    getStructure(){
        let string = ""
        if (this.atomsOrGroups.length != 1) string += "("

        for(let i = 0; i < this.atomsOrGroups.length; i++){
            
            let rv = this.atomsOrGroups[i].getStructure()
            string += rv


        }
        if (this.atomsOrGroups.length != 1) string += ")"
        if (this.count != 1) string += this.count

        return string;
    }




    getAtomCount() {
        let rvAtomCount = {}

        for(let i = 0; i < this.atomsOrGroups.length; i++){
            
            let atomCount = this.atomsOrGroups[i].getAtomCount();

            rvAtomCount = mergeDictionaries(rvAtomCount, atomCount);


        };

        rvAtomCount = multiplyDictItems(rvAtomCount, this.count);

        return rvAtomCount;
       
        
    }

    calculateMass(){
        let mass = 0;
        for (let i = 0; i < this.atomsOrGroups.length; i++){
            let rv = this.atomsOrGroups[i].calculateMass();
            if (rv === undefined) return undefined;
            mass += rv;
        };

        return mass * this.count;
    }
}


class ChemistryFormula{
    constructor(string){
        console.log("Creating ChemistryFormula", string)

        // Decoding string

    }


}





function decodeStringToGroup(string){
    // Remove the superscript and charge
    string = convertStrToHTML(string)
    .replace("<sup>", "^")
    .replace("</sup>", "");
    //.replace("+", "")
    //.replace("-", "");
            
    let char
    let tempAtom
    let inNumber = false
    let inChargeValue = false;
    let inGroup = false
    let list = []
    let number;

    for (let i = 0; i < string.length; i++){
        char = string[i];

        if (char == "^"){
            inChargeValue = true;
        }



        if (inChargeValue){

        }else if (char == "("){
            inGroup = true
            list.push(tempAtom)
            tempAtom = char            

        } else if(char == ")"){
            inGroup = false
            //list.push(tempAtom)
            tempAtom += char

        } else if (/[A-Z]/.test(char) && !inGroup){
            list.push(tempAtom)
            tempAtom = char

        } else {
            tempAtom += char
        }

        if (inChargeValue && (char == "+" || char == "-")){
            inChargeValue = false;
        }


    }
    list.push(tempAtom)


    list.shift()



    let newList = []

    for(let i = 0; i < list.length; i++){
        element = list[i]
        if (element[0] == "("){
            // Handle a group
            let inGroupString = ""
            let amountString = ""
            let layerDepth = 0;
            let finnishedIngroup = false;
            for (let i = 0; i < element.length; i++){
                char = element[i]
                if (char == "("){
                    layerDepth++;

                }else if(char == ")"){
                    layerDepth--;
                    if(layerDepth == 0){
                        finnishedIngroup = true
                        if (element[i+1] != "_"){
                            amountString = 1
                            break
                        }
                    }

                }else if(!finnishedIngroup){
                    inGroupString += char

                }else if(char == "_"){
                }else{
                    amountString += char
                }

            }


            let group = new ChemistryGroup(decodeStringToGroup(inGroupString), parseInt(amountString))
            newList.push(group)


        }else{      
            onNumber = false
            atomString = ""
            numberString = ""
            for (let i = 0; i < element.length; i++){
                char = element[i]
                if (char=="_"){
                    onNumber = true
                }else if(onNumber){
                    if(/[0-9]/.test(char)){
                        numberString += char
                    }else{
                        console.warn("Wierd character" + char)
                    }

                }else{
                    atomString += char
                }
                
            }
            if (!onNumber){
                numberString = 1
            }
            //console.log(atomString, parseInt(numberString))

            let atom = new ChemistryAtom(atomString)
            let group = new ChemistryGroup([atom], parseInt(numberString))

            newList.push(group)
        }
        
    
    }

    return newList




}





function mergeDictionaries(a, b){

    for (let key in b){
        if (a.hasOwnProperty(key)){
            a[key] = a[key] + b[key];

        }else{
            a[key] = b[key];
        }
    }

    return a;
}

function multiplyDictItems(dict, coefficent){
    let rv = {}
    for (let key in dict){
        rv[key] = dict[key] * coefficent
    }

    return rv;

}


function isTheSameDict(dict1, dict2){
    for (let key in dict1){
        if (!dict2.hasOwnProperty(key)){
            return false;

        } else if(dict2[key] != dict1[key]){
            return false;
        };
    };

    return true;

}










//ChemistryFormula("CO_2")

/*
console.log(group.getStructure(), group.calculateMass())
let group2 = new ChemistryGroup(decodeStringToGroup("CO_2"), 1)

console.log(group2.getStructure())*/