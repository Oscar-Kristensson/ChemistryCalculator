// Loading in the json 

// The data is from Wikipedia and ptable.

const dataIndex = {
	"symbol":0,
	"mass": 1,
	"sv-name": 2,
	"en-name": 3
}

/*const atomType = {
	"metall": [
		[3, 4], 
		[11, 13],
		[19, 31],
		[37, 50],
		[55, 83],
		[85, 85],
		[87, 114],
		[116, 116]
	],

}*/

// Types:
	// Metals: 0 - 10, non-metals: 11+
	// Alkali metals: 0
	// Alkali earth metals: 1
	// Lanthanoids: 2
	// Actinoids: 3
	// Transition metals: 4
	// Post transision metals: 5
	
	// Metalloids: 6
	
	// Reactive nonmetals: 11
	// Noble gases: 12

	// Unkown: 13

	
//	[Symbol, mass, sv-name, en-name, type]

const chemistryDataConvertAtomType = [
	[0, "alkali metals"],
	[1, "alkali earth metals"],
	[2, "lanthanoids"],
	[3, "actinoids"],
	[4, "transition metals"],
	[5, "post transision metals"],
	[6, "metalloids"],
	[11, "reactive nonmetals"],
	[12, "noble gases"],
	[13, "unkown"]
]

const chemistryData = [
	["H", 1.008, "Väte", "Hydrogen", 11],
	["He", 4.0026, "Helium", "Helium", 12],
	["Li", 6.94, "Litium", "Lithium", 0],
	["Be", 9.0122, "Beryllium", "Beryllium", 1],
	["B", 10.81, "Bor", "Boron", 6],
	["C", 12.011, "Kol", "Carbon", 11],
	["N", 14.007, "Kväve", "Nitrogen", 11],
	["O", 15.999, "Syre", "Oxygen", 11],
	["F", 18.998, "Fluor", "Fluorine", 11],
	["Ne", 20.18, "Neon", "Neon", 12],
	["Na", 22.98976928, "Natrium", "Sodium", 0], // Not abridged
	["Mg", 24.305, "Magnesium", "Magnesium", 1],
	["Al", 26.982, "Aluminium", "Aluminum", 5],
	["Si", 28.085, "Kisel", "Silicon", 6],
	["P", 30.974, "Fosfor", "Phosphorus", 11],
	["S", 32.06, "Svavel", "Sulfur", 11],
	["Cl", 35.45, "Klor", "Chlorine", 11],
	["Ar", 39.948, "Argon", "Argon", 12],
	["K", 39.098, "Kalium", "Potassium", 0],
	["Ca", 40.078, "Kalcium", "Calcium", 1],
	["Sc", 44.956, "Skandium", "Scandium", 4],
	["Ti", 47.867, "Titan", "Titanium", 4],
	["V", 50.942, "Vanadin", "Vanadium", 4],
	["Cr", 51.996, "Krom", "Chromium", 4],
	["Mn", 54.938, "Mangan", "Manganese", 4],
	["Fe", 55.845, "Järn", "Iron", 4],
	["Co", 58.933, "Kobolt", "Cobalt", 4],
	["Ni", 58.693, "Nickel", "Nickel", 4],
	["Cu", 63.546, "Koppar", "Copper", 4],
	["Zn", 65.38, "Zink", "Zinc", 4],
	["Ga", 69.723, "Gallium", "Gallium", 5],
	["Ge", 72.63, "Germanium", "Germanium", 6],
	["As", 74.922, "Arsenik", "Arsenic", 6],
	["Se", 78.971, "Selen", "Selenium", 11],
	["Br", 79.904, "Brom", "Bromine", 11],
	["Kr", 83.798, "Krypton", "Krypton", 12],
	["Rb", 85.468, "Rubidium", "Rubidium", 0],
	["Sr", 87.62, "Strontium", "Strontium", 1],
	["Y", 88.906, "Yttrium", "Yttrium", 4],
	["Zr", 91.224, "Zirkonium", "Zirconium", 4],
	["Nb", 92.906, "Niob", "Niobium", 4],
	["Mo", 95.95, "Molybden", "Molybdenum", 4],
	["Tc", 98, "Teknetium", "Technetium", 4],
	["Ru", 101.07, "Rutenium", "Ruthenium", 4],
	["Rh", 102.91, "Rodium", "Rhodium", 4],
	["Pd", 106.42, "Palladium", "Palladium", 4],
	["Ag", 107.87, "Silver", "Silver", 4],
	["Cd", 112.41, "Kadmium", "Cadmium", 4],
	["In", 114.82, "Indium", "Indium", 5],
	["Sn", 118.71, "Tenn", "Tin", 5],
	["Sb", 121.76, "Antimon", "Antimony", 6],
	["Te", 127.6, "Tellur", "Tellurium", 6],
	["I", 126.9, "Jod", "Iodine", 11],
	["Xe", 131.29, "Xenon", "Xenon", 12],
	["Cs", 132.91, "Cesium", "Cesium", 0],
	["Ba", 137.33, "Barium", "Barium", 1],
	["La", 138.91, "Lantan", "Lanthanum", 2],
	["Ce", 140.12, "Cerium", "Cerium", 2],
	["Pr", 140.91, "Praseodym", "Praseodymium", 2],
	["Nd", 144.24, "Neodym", "Neodymium", 2],
	["Pm", 145, "Prometium", "Promethium", 2],
	["Sm", 150.36, "Samarium", "Samarium", 2],
	["Eu", 151.96, "Europium", "Europium", 2],
	["Gd", 157.25, "Gadolinium", "Gadolinium", 2],
	["Tb", 158.93, "Terbium", "Terbium", 2],
	["Dy", 162.5, "Dysprosium", "Dysprosium", 2],
	["Ho", 164.93, "Holmium", "Holmium", 2],
	["Er", 167.26, "Erbium", "Erbium", 2],
	["Tm", 168.93, "Tulium", "Thulium", 2],
	["Yb", 173.05, "Ytterbium", "Ytterbium", 2],
	["Lu", 174.97, "Lutetium", "Lutetium", 2],
	["Hf", 178.49, "Hafnium", "Hafnium", 4],
	["Ta", 180.95, "Tantal", "Tantalum", 4],
	["W", 183.84, "Wolfram", "Tungsten", 4],
	["Re", 186.21, "Rhenium", "Rhenium", 4],
	["Os", 190.23, "Osmium", "Osmium", 4],
	["Ir", 192.22, "Iridium", "Iridium", 4],
	["Pt", 195.08, "Platina", "Platinum", 4],
	["Au", 196.97, "Guld", "Gold", 4],
	["Hg", 200.59, "Kvicksilver", "Mercury", 4],
	["Tl", 204.38, "Tallium", "Thallium", 5],
	["Pb", 207.2, "Bly", "Lead", 5],
	["Bi", 208.98, "Vismut", "Bismuth", 5],
	["Po", 209, "Polonium", "Polonium", 5],
	["At", 210, "Astat", "Astatine", 6],
	["Rn", 222, "Radon", "Radon", 12],
	["Fr", 223, "Francium", "Francium", 0],
	["Ra", 226, "Radium", "Radium", 1],
	["Ac", 227, "Aktinium", "Actinium", 3],
	["Th", 232.04, "Torium", "Thorium", 3],
	["Pa", 231.04, "Protaktinium", "Protactinium", 3],
	["U", 238.03, "Uran", "Uranium", 3],
	["Np", 237, "Neptunium", "Neptunium", 3],
	["Pu", 244, "Plutonium", "Plutonium", 3],
	["Am", 243, "Americium", "Americium", 3],
	["Cm", 247, "Curium", "Curium", 3],
	["Bk", 247, "Berkelium", "Berkelium", 3],
	["Cf", 251, "Kalifornium", "Californium", 3],
	["Es", 252, "Einsteinium", "Einsteinium", 3],
	["Fm", 257, "Fermium", "Fermium", 3],
	["Md", 258, "Mendelevium", "Mendelevium", 3],
	["No", 259, "Nobelium", "Nobelium", 3],
	["Lr", 266, "Lawrencium", "Lawrencium", 3],
	["Rf", 267, "Rutherfordium", "Rutherfordium", 4],
	["Db", 268, "Dubnium", "Dubnium", 4],
	["Sg", 269, "Seaborgium", "Seaborgium", 4],
	["Bh", 270, "Bohrium", "Bohrium", 4],
	["Hs", 277, "Hassium", "Hassium", 4],
	["Mt", 278, "Meitnerium", "Meitnerium", 13],
	["Ds", 281, "Darmstadtium", "Darmstadtium", 13],
	["Rg", 282, "Röntgenium", "Roentgenium", 13],
	["Cn", 285, "Kopernicium", "Copernicium", 13],
	["Nh", 286, "Nihonium", "Nihonium", 13],
	["Fl", 289, "Flerovium", "Flerovium", 13],
	["Mc", 290, "Moscovium", "Moscovium", 13],
	["Lv", 293, "Livermorium", "Livermorium", 13],
	["Ts", 294, "Tennessine", "Tennessine", 13],
	["Og", 294, "Oganesson", "Oganesson", 13]

]

let variableAtoms = [];


// String
function chemistryDataGetAtomNumberFromString(string){

    if (chemistryData.length == 0){
        console.error("Did not load chemistryData")
		return;
    };

	// Search in atoms
    for (let i = 0; i < chemistryData.length; i++){
        atom = chemistryData[i]
        if (atom[0].toLowerCase() == string.toLowerCase()){
            return i + 1
        }
    }

	for (let i = 0; i < variableAtoms.length; i++){
		if (variableAtoms[i].toLowerCase() == string.toLowerCase()){
            return chemistryData.length + 1;
        };
	};

    //console.error("Could not find an atom with the name: " + string)

	
	variableAtoms.push(string);


    return variableAtoms.length + chemistryData.length;
}


function chemistryDataGetAtomNumberFromName(string, lang="sv"){
	let searchIndex = lang == "sv"? dataIndex["sv-name"]: dataIndex["en-name"];
	console.log("Search index", searchIndex);

    string = string.toLowerCase();

    if (chemistryData.length == 0){
        console.error("Did not load chemistryData")
    }

    for (let i = 0; i < chemistryData.length; i++){
        atom = chemistryData[i];
        if (atom[searchIndex].toLowerCase() == string){
            return i + 1;
        }
    }
    console.error("Could not find an atom with the name: " + string)
    return 0;
}

function chemistryDataGetStringFromAtomNumber(number){
	if (number == 0) {
		console.warn("Number out of range!");
		return;
	};

	if (number > chemistryData.length) {
		return variableAtoms[chemistryDataConvertNumberToVariableAtomID(number)];
	}

    return chemistryData[number - 1][0];
}

function chemistryDataGetNameFromAtomNumber(number, lang="sv"){
	let searchIndex = lang == "sv"? dataIndex["sv-name"]: dataIndex["en-name"];
    return chemistryData[number - 1][searchIndex]
}

// Mass
function chemistryDataGetAtomMassFromAtomNumber(number){
	if (chemistryDataCheckIfInVariableAtoms(number)) {console.log("No Mass", number); return undefined};
    return chemistryData[number - 1][1]
}


function chemistryDataGetAtomTypeFromAtomNumber(number){
	let numberType = chemistryData[number - 1][4];

	for (let i = 0; i < chemistryDataConvertAtomType.length; i++)
	{
		if (chemistryDataConvertAtomType[i][0] == numberType) return chemistryDataConvertAtomType[i][1];
	};
	return undefined;
}

function chemistryDataCheckIfInVariableAtoms(number){
	return number > chemistryData.length;
}

function chemistryDataConvertNumberToVariableAtomID(number){
	return number - chemistryData.length - 1;
};