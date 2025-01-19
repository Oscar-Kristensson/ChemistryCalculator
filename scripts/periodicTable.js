
const periodicTableContainer = document.querySelector(".periodicTableContainer");
const periodicTableDisplayWideView = document.getElementById("periodicTableDisplayWideView");
const periodicTableDisplayShowAtomTypes = document.getElementById("periodicTableDisplayShowAtomTypes");



const renderdBellowRanges = [
    [57, 71],
    [89, 103]
];

const periodicTableAtomsBeforeSpace = [
    1,
    2,
    2,
    2,
    2
]

const periodLenghts = [
    2,
    8,
    8,
    18,
    18,
    32,
    32
]

let maxInnerLenght = 18; // 32 if whole row.

const renderingBellowStartPeriod = 6;
let renderingBellow = true;

let isRenderd = false;

const periodicTableOffsetX = 1;
const periodicTableOffsetY = 1;

periodicTableContainer.classList.add("renderingBellow");


function isOnTheRight(atomNumber)
{
    let position = getPositionInPeriodcTableFromAtomNumber(atomNumber);

    let atomsBeforeSpace = periodicTableAtomsBeforeSpace[position.period - 1];

    let rv = atomsBeforeSpace < position.number;
    return rv;

    
};


function getOffsetFromRenderdBellowAtom(atomNumber)
{
    // Returns 0 if not renderd on the rows bellow.
    if (!renderingBellow) return 0;

    for (let rangeCount = 0; rangeCount < renderdBellowRanges.length; rangeCount++)
    {
        if (renderdBellowRanges[rangeCount][0] <= atomNumber && atomNumber <= renderdBellowRanges[rangeCount][1]) return atomNumber - renderdBellowRanges[rangeCount][0] + 1;
    };

    return 0;
}


class PeirodicTablePosition
{
    constructor(period, number)
    {
        this.period = period;
        this.number = number;
    };
}






class PeriodicTableAtom
{
    constructor(parent, number)
    {
        this.number = number;
        this.symbol = chemistryDataGetStringFromAtomNumber(this.number);
        this.name = chemistryDataGetNameFromAtomNumber(this.number, "en");
        this.mass = chemistryDataGetAtomMassFromAtomNumber(this.number);

        let atomType =chemistryDataGetAtomTypeFromAtomNumber(this.number);

        while (atomType.includes(" ")) atomType = atomType.replace(" ", "-");

        
        this.container = document.createElement("div");
        this.container.className = "periodicTableAtom";

        this.container.classList.add("atomType_" + atomType);
        
        //const position = getPositionInPeriodcTableFromAtomNumber(this.number)
        this.updatePosition();



        this.atomNumberDisplay = document.createElement("div");
        this.atomNumberDisplay.className = "atomNumberDisplay";
        this.atomNumberDisplay.innerText = this.number.toString();

        this.atomSymbolDisplay = document.createElement("div");
        this.atomSymbolDisplay.className = "atomSymbolDisplay";
        this.atomSymbolDisplay.innerText = this.symbol.toString();


        this.atomNameDisplay = document.createElement("div");
        this.atomNameDisplay.className = "atomNameDisplay";
        this.atomNameDisplay.innerText = this.name.toString();


        this.atomMassDisplay = document.createElement("div");
        this.atomMassDisplay.className = "atomMassDisplay";
        this.atomMassDisplay.innerText = this.mass.toString();



        this.container.appendChild(this.atomNumberDisplay);
        this.container.appendChild(this.atomSymbolDisplay);
        this.container.appendChild(this.atomNameDisplay);
        this.container.appendChild(this.atomMassDisplay);

        this.container.addEventListener("click", () => { this.onClick(); })
        
        this.isMarked = false;
        
        parent.appendChild(this.container);
    }
    
    onClick()
    {
        if (this.isMarked) this.setIsMarked(false);
        else tools_updateValuesFromNumber(this.number); 
        
    };


    setIsMarked(bool)
    {
        this.isMarked = bool;
        if (bool) this.container.classList.add("marked");
        else this.container.classList.remove("marked");

    };


    updatePosition()
    {
        const positionXY = periodicTableGetXYFromAtomNumber(this.number);

        this.container.style.gridColumn = positionXY[0];
        this.container.style.gridRow = positionXY[1];

    };
}


function getPositionInPeriodcTableFromAtomNumber(atomNumber)
{
    let i = 0;
    let atoms = 0;
    let position = 0;
    while (atoms < atomNumber)
    {
        position = atomNumber - atoms;
        atoms += periodLenghts[i]
        i++;
    }

    return new PeirodicTablePosition(i, position);

};





function periodicTableGetXYFromAtomNumber(number)
{
    let position = getPositionInPeriodcTableFromAtomNumber(number);
    let y = position.period;    
    let x = 0;

    let offsetFromRenderdBellow = getOffsetFromRenderdBellowAtom(number);

    if (renderingBellow && offsetFromRenderdBellow != 0)
    {

        x = position.number = offsetFromRenderdBellow + 3;
        y += 3;
        return [x + periodicTableOffsetX, y + periodicTableOffsetY];

    }
    else if (isOnTheRight(number)) {
        let offset = maxInnerLenght - periodLenghts[position.period - 1] //+ periodicTableAtomsBeforeSpace[position.period - 1];

        x = offset + position.number;

    }
    else
    {
        x = position.number;
    }
    
    if (renderingBellow && renderingBellowStartPeriod - 1 < position.period) 
        // Is renderd on the periods underneath.
    {
        let currentPeriodRange = renderdBellowRanges[position.period - renderingBellowStartPeriod]

        if (number > currentPeriodRange[1]){
            // If is on the right
            x -= currentPeriodRange[1] - currentPeriodRange[0];
        }

        //x -= number - currentPeriodRange[1];
        
    };

        return [x + periodicTableOffsetX, y + periodicTableOffsetY];
};


let periodicTableAtoms = [];


function createPeriodicTable()
{
    isRenderd = true;
    for (let atomNumber = 1; atomNumber < chemistryData.length + 1; atomNumber++)
    {
        periodicTableAtoms.push(new PeriodicTableAtom(periodicTableContainer, atomNumber));
    }

    fillSpacerRow();
    generatePeriodicTableRangeDisplayers();
    generateGroupNumbers();
    generatePeriodNumbers();


};

let periodicTableSpacers = [];


class PeriodicTableSpacer
{
    constructor(parent, x, y)
    {
        this.element = document.createElement("div");
        this.element.className = "periodicTableSpacer";
        this.element.style.gridColumn = x;
        this.element.style.gridRow = y;
        parent.appendChild(this.element);
    };
}


let periodicTableRangeDisplayers = [];


class PeriodicTableRangeDisplayer
{
    constructor(parent, x, y, rangeString = "")
    {
        this.element = document.createElement("div");
        this.element.className = "periodicTableRangeDisplayer";
        this.element.innerText = rangeString;
        this.element.style.gridColumn = x;
        this.element.style.gridRow = y;
        parent.appendChild(this.element);
    };
}

function fillSpacerRow()
{
    let spacerRow = renderingBellowStartPeriod + renderdBellowRanges.length + periodicTableOffsetY;

    for (let i = 0; i < maxInnerLenght; i++)
    {
        periodicTableSpacers.push(new PeriodicTableSpacer(periodicTableContainer, i + periodicTableOffsetX, spacerRow))   
    };

};

function generatePeriodicTableRangeDisplayers()
{
    if (!renderingBellow) return;
    for (let i = 0; i < periodLenghts.length - renderingBellowStartPeriod + 1; i++)
    {
        let x = 3 + periodicTableOffsetX;
        let y = renderingBellowStartPeriod + i + periodicTableOffsetY;
        let range = renderdBellowRanges[i];

        periodicTableRangeDisplayers.push(new PeriodicTableRangeDisplayer(periodicTableContainer, x, y, `${range[0]} - ${range[1]}`));
        periodicTableRangeDisplayers.push(new PeriodicTableRangeDisplayer(periodicTableContainer, x, y+3, `${range[0]} - ${range[1]}`));
    };
};

function generateGroupNumbers()
{
    for (let i = 0; i < maxInnerLenght; i++)
    {
        const numberElement = document.createElement("div");
        numberElement.className = "groupNumber";
        numberElement.style.gridRow = 1;
        numberElement.style.gridColumn = (i + periodicTableOffsetX + 1).toString();
        numberElement.innerText = (i + 1).toString();

        if (i > 18) numberElement.classList.add("wide");
   

        periodicTableContainer.appendChild(numberElement);
    };
};

function generatePeriodNumbers()
{
    for (let i = 0; i < periodLenghts.length; i++)
    {
        const numberElement = document.createElement("div");
        numberElement.className = "groupNumber";
        numberElement.style.gridColumn = 1;
        numberElement.style.gridRow = (i + periodicTableOffsetX + 1).toString();
        numberElement.innerText = (i + 1).toString();
   

        periodicTableContainer.appendChild(numberElement);
    };
};

function updatePeriodicTable()
{
    periodicTableAtoms.forEach((value) => {
        value.updatePosition();

    });

};


function activateRenderingBellow()
{
    if (renderingBellow) return;
    renderingBellow = true;
    periodicTableContainer.classList.add("renderingBellow");
    maxInnerLenght = 18;
    updatePeriodicTable();

};

function deactivateRenderingBellow()
{
    if (!renderingBellow) return;
    renderingBellow = false;
    periodicTableContainer.classList.remove("renderingBellow");
    maxInnerLenght = 32;
    updatePeriodicTable();
};

function toggleRenderingBellow()
{
    if (renderingBellow)
    {
        deactivateRenderingBellow();
    }
    else
    {
        activateRenderingBellow();
    };
};


// window.addEventListener("DOMContentLoaded", createPeriodicTable);


periodicTableDisplayWideView.addEventListener("change", () => {
    if (periodicTableDisplayWideView.checked) deactivateRenderingBellow();
    else activateRenderingBellow();
})



periodicTableDisplayShowAtomTypes.addEventListener("change", () => {
    if (periodicTableDisplayShowAtomTypes.checked) periodicTableContainer.classList.remove("gray");
    else periodicTableContainer.classList.add("gray");
})