let imgCount = 0
const sources =[
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7246147/",
    "https://www.mayoclinic.org/diseases-conditions/alzheimers-disease/diagnosis-treatment/drc-20350453",
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3234454/",
    "https://www.news-medical.net/health/Parkinsons-Disease-History.aspx",
    "https://www.nia.nih.gov/health/parkinsons-disease",
    "https://www.aans.org/en/Patients/Neurosurgical-Conditions-and-Treatments/Parkinsons-Disease#:~:text=Parkinson's%20disease%20is%20a%20progressive,an%20important%20chemical%20called%20dopamine.",
    "https://www.parkinson.org/understanding-parkinsons/getting-diagnosed#:~:text=There%20is%20not%20a%20specific,conditions%20that%20can%20mimic%20PD.",
    "https://www.mayoclinic.org/diseases-conditions/huntingtons-disease/symptoms-causes/syc-20356117",
    "https://www.hopkinsmedicine.org/psychiatry/specialty-areas/huntingtons-disease/patient-family-resources/education-whatis#:~:text=Huntington's%20disease%20(HD)%20is%20named,the%20gene%20that%20causes%20HD.",
    "https://www.mayoclinic.org/diseases-conditions/huntingtons-disease/symptoms-causes/syc-20356117",
    "https://www.ninds.nih.gov/health-information/disorders/huntingtons-disease#:~:text=Treating%20HD,hallucinations%2C%20delusions%2C%20and%20violent%20outbursts",

]
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let lastScrollTop = 0;
window.addEventListener(
    "wheel",
    function (event) {
        let st = event.deltaY;
        const elements = document.querySelectorAll(".random-shape");
        elements.forEach(function (element) {
            if (element.classList.contains("square")) {
                let currentAngle = parseFloat(element.getAttribute("data-angle")) || 0;
                element.style.transform = `rotate(${currentAngle + st}deg)`;
                element.setAttribute("data-angle", currentAngle + st);
            }
            if (element.classList.contains("circle")) {
                let currentLeft = parseFloat(element.style.left) || 0;

                if (currentLeft < 0) {
                    element.style.display = "none";
                    element.style.left =
                        document.getElementById("boxx").offsetWidth + 50 + "px";
                    element.style.display = "block";
                } else {
                    element.style.left = `${currentLeft - st}px`;
                }
            }
        });
        lastScrollTop = st;
    }, {
        passive: false
    },
);

const style = document.createElement("style");
style.innerHTML = `
.random-shape {
  transition: transform 0.1s linear, left 0.1s linear;
}
`;
document.head.appendChild(style);

document.addEventListener(
    "wheel",
    function (event) {
        window.scrollBy({
            left: event.deltaY * 1.5,
        });
    }, {
        passive: false
    },
);

const buttons = document.querySelectorAll(".toggle-button");
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.style.display = "none";
});

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        button.classList.add("clicked");

        const cardId = button.getAttribute("data-card");
        const cardToShow = document.getElementById(cardId);
        const allElements = document.querySelectorAll("body, body *");
        allElements.forEach((element) => {
            if (!element.classList.contains("we")) {
                element.classList.add("turn-black");
            }
        });
        button.style.animation = "buttonmove 1s linear 1";
        button.style.color = "black";
        cardToShow.style.animation = "grow 0.5s linear 1";

        button.addEventListener("animationend", function () {
            cardToShow.style.display = "flex";
            button.style.display = "none";
            const cardWidth = cardToShow.offsetWidth;
            const offset = (cardWidth - button.offsetWidth) / 2;
            window.scrollBy({
                left: offset
            });

            // Adjust positions of other elements

            allElements.forEach((element) => {
                // Don't turn the button or the card black
                if (element !== button && element !== cardToShow) {
                    element.classList.remove("turn-black");
                }
            });
        });
    });
});
// function onAnimationEnd() {
//   // Show the card and hide the button first to get its final dimensions
//   cardToShow.style.display = 'flex';
//   button.style.display = "none";

//   // Now that the card is displayed, calculate its width
//   const cardWidth = cardToShow.offsetWidth;

//   // Calculate the offset needed to keep the card centered
//   const offset = (cardWidth - button.offsetWidth) / 2;


function getRandomColor() {
    const hue = getRandomInt(0, 360); // Full range of hues
    const saturation = getRandomInt(40, 80); // Mid to high saturation
    const lightness = getRandomInt(30, 70); // Mid-range brightness

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomShape(index) {
    const shapes = ["square", "circle"];

    const selectedShape = shapes[getRandomInt(0, shapes.length - 1)];

    const shapeDiv = document.createElement("div");
    shapeDiv.className = "random-shape " + selectedShape;

    const randomTop = getRandomInt(
        0,
        document.getElementById("boxx").offsetHeight - 50,
    );
    const randomLeft = getRandomInt(
        0,
        document.getElementById("boxx").offsetWidth - 50,
    );

    const borderColor = getRandomColor();

    shapeDiv.style.top = randomTop + "px";
    shapeDiv.style.left = randomLeft + "px";
    shapeDiv.style.borderColor = borderColor;
    if (sources[index]) {
        shapeDiv.addEventListener("click", function() {
            window.open(sources[index], "_blank");
        });
    }
    return shapeDiv;
}

function appendRandomShapes(parentDivId) {
    const parentDiv = document.getElementById(parentDivId);

    for (let i = 0; i < sources.length; i++) {
        const randomShape = createRandomShape(i);
        parentDiv.appendChild(randomShape);
    }
}

appendRandomShapes("boxx");
async function witchhead() {
    document.getElementById("head").style.animation = "fall linear 2s 1";
    document.getElementById("head").style.animationFillMode = "forwards"
    await wait(1500)

    document.getElementById("brain").style.zIndex = "40";
    document
        .getElementById("brain")
        .addEventListener("click", function (event) {
            if (document.getElementById.stage === 1) zoomAnimate("brain");
        });

}

function progress(id, ownId = "45") {
    let shouldProgress = false;

    if (ownId === "45") {
        shouldProgress = true;
    } else {
        let ownElement = document.getElementById(ownId);
        if (ownElement && ownElement.getAttribute("hasProgressed") === "false") {
            shouldProgress = true;
        }
    }

    if (shouldProgress) {
        const target = document.getElementById(id);
        if (target) {
            let attribute = parseInt(target.getAttribute("stage")) || 0;

            attribute++;

            target.setAttribute("stage", attribute);
            if (ownId !== "45" && document.getElementById(ownId)) {
                document.getElementById(ownId).setAttribute("hasProgressed", "true");
            }
        }
    } 
}


function clearSlate(id) {
    document.getElementById(id).innerHTML = "";
}
const observer = new MutationObserver(handleStages);
const config = {
    attributes: true,
    attributeFilter: ["stage"]
};
observer.observe(txt1, config);

function handleStages(mutations) {
    mutations.forEach(mutation => {
        const stage = parseInt(txt1.getAttribute("stage"));
        switch (stage) {
            case 1:
                handleStage1();
                break;
            case 2:
                handleStage2();
                break;
            case 3:
                handleStage3();
                break;
            case 4:
                handleStage4();
                break;
            case 5:
                handleStage5();
                break;
            case 6:
                handleStage6();
                break;
            case 7:
                handleStage7();
                break;
            case 8:
                handleStage8();
                break;
            default:
                break;
        }
    });
}

function handleStage1() {
    addText("title1", "History")
    addText("txt1", "Alzheimer’s Disease(AD) was discovered by Dr. Alois Alzheimer on November 3, 1901, in an Asylum in Frankfurt. He performed an autopsy on Auguste Deter who'd had severe memory loss and behavioral change. She was the first diagnosed case of AD. This autopsy and research are the basis for all of our current knowledge on AD.", function () {
        magnify("brain", "1-1mag");
        document.getElementById("1-1mag").setAttribute("hasProgressed", "false")
        document.getElementById("1-1mag").setAttribute('onclick', "let intervalId = setInterval(function () {progress('txt1','1-1mag')}, 2000);document.getElementById('1-1mag').style.animation = 'linear 2s zoom';")


    }, );
}

function handleStage2() {
    clearSlate("txt1");
    document.getElementById("1-1mag").remove();
    document.getElementById("brain").remove();
    const newIMG = document.getElementById("old")
    newIMG.src = "./src/img/badbrain.jpeg"
    clearSlate('title1')
    newIMG.style.width = "400px"
    newIMG.style.height = "100%"
    addText('title1', "Physiology")
    newIMG.setAttribute('hasProgressed', 'false')
    newIMG.setAttribute('onclick', 'progress("txt1","old")');
}

function handleStage3() {
    
    const newIMG = document.getElementById("old")

    newIMG.src = "./src/img/badbrain.jpeg"
    
    
    
    addText("txt1", "Even now we can only diagnose definite AD with a postmortem autopsy, doctors examine the neurofibrillary tangles(abnormal collections of tau proteins) and amyloid plaques(deposits of amyloid beta proteins) within the brain. These are currently believed to cause the main symptoms such as dementia and behavioral change.", function () {
        let newIMG = document.getElementById("old"); // make sure to set "yourImageID" to the actual ID of your image
        newIMG.setAttribute('hasProgressed', 'false')
        magnify(newIMG.id, "2-1mag");
        document.getElementById("2-1mag").setAttribute("hasProgressed", "false");
        document.getElementById("2-1mag").setAttribute('onclick', "setTimeout(function () {progress('txt1','2-1mag')}, 2000);document.getElementById('2-1mag').style.animation = 'linear 2s zoom';");
        document.getElementById("2-1mag").style.width = "500px";
        document.getElementById("2-1mag").style.height = "500px";
    });
    
}

function handleStage4() {
    clearSlate("txt1");
    document.getElementById("2-1mag").remove();
    clearSlate('title1')
    
    const newIMG = document.getElementById("old")
    newIMG.style.width = "700px";
    newIMG.src = "https://www.alzheimersblog.org/wp-content/uploads/2016/10/figure1.jpg"
    addText('title1', "Stages")
    

    addText("txt1", "We recognize AD in 3 main stages: Preclinical AD, Mild Cognitive Impairment(MCI), and Alzheimer’s Dementia. We currently use imaging tests such as amyloid PET and MRI to help determine a patient’s stage. Additionally, the application of cerebrospinal fluid(CSF) is becoming more helpful for diagnosis", function () {
        
        newIMG.setAttribute('onclick', "let intervalId = setTimeout(function () {progress('txt1','old')});")
        newIMG.setAttribute("hasProgressed", "false")
    }, )
}


function handleStage5() {
    clearSlate("txt1");
    clearSlate('title1')
    
    const newIMG = document.getElementById("old")
    newIMG.remove();
    let Div = document.createElement('div');
    let img1 = document.createElement('img');
    Div.id = "123"
    img1.src = 'https://www.fairobserver.com/wp-content/uploads/2018/06/alt-right-incels-manosphere-extremism.png';
    img1.style.display = 'inline-block';
    let img2 = document.createElement('img');
    img2.src = 'https://media.wired.com/photos/5d3f7b1d6fd67f0009014cfa/1:1/w_1314,h_1314,c_limit/Science_PREP_645107548.jpg';
    Div.appendChild(img1);
    Div.appendChild(img2);
    let card1 = document.getElementById("card1");
    card1.insertBefore(Div, card1.firstChild);
    
    img2.style.display = 'inline-block';
    Div.style.display = "flex"
    Div.style.flexDirection = "row"
    Div.style.gap = "25px"
    img1.id = "img1"
    img2.id = "img2"
    img1.style.width = "300px"
    img2.style.width = "300px"
    img1.style.zIndex = "100"
   document.getElementById("img#2").style.backgroundColor ='white'
    addText('title1', "Treatment")
    addText("txt1", "There are 2 main treatment options for AD. Cholinesterase and Memantine", function () {
        card1.setAttribute("onclick", "progress('txt1','card1')")
        card1.setAttribute("hasProgressed", "false")

    }, )
    // addText("txt1", "Although we can’t diagnose living people with definite AD we can use biomarkers to diagnose probable AD. We currently use imaging tests such as amyloid PET and MRI to help determine a patient’s condition. Additionally, the application of cerebrospinal fluid(CSF) is becoming more helpful for diagnosis", function() {


    // }, )
}

function handleStage6() {
    clearSlate("txt1");
    clearSlate('title1')
    document.getElementById("123").remove();
    let img = document.createElement('img');
    img.id = "drug"
    img.style.width = "400px"
    img.style.height = "100%"
    img.src = "https://www.healthyplace.com/sites/default/files/inline-images/Cholinesterase_Inhibitors.jpg"
    card1.insertBefore(img, card1.firstChild)
    addText('title1', "Cholinesterase")
    
    addText("txt1", "Cholinesterase works by aiding cell communication speed, these are usually prescribed first and most commonly lead to a small improvement in agitation and mood. It can however have severe side effects.", function () {
        img.setAttribute("onclick", "progress('txt1','drug')")
        img.setAttribute("hasProgressed", "false")
    }, )

}

function handleStage7() {
    let img = document.getElementById('drug');
    img.src = "https://media.sciencephoto.com/image/c0511175/400wm"
    clearSlate("txt1");
    clearSlate('title1')

    
    addText('title1', "Memantine")
    
    addText("txt1", "Memantine can be used in the later stages of AD and help improve cognitive function, often in conjunction with cholinesterase but it’s nowhere close to a cure.", function () {
        img.setAttribute("onclick", "progress('txt1','drug')")
        img.setAttribute("hasProgressed", "false")
    }, )
}

function handleStage8() {
    let img = document.getElementById('drug');
    img.src = "https://www.researchgate.net/publication/272080435/figure/fig1/AS:601754810982421@1520480935622/Fig-1-World-map-illustrating-the-global-distribution-of-deaths-caused-due-to.png"
    drug.style.width = "1000px"
    clearSlate("txt1");
    clearSlate('title1')

   
    addText('title1', "Stats on AD")
    addText("txt1", "There are an estimated 6.7 million people with Alzheimer’s in the US alone. It accounts for around 2 million worldwide deaths every year. Revolutionary scientific advances are working to change this, we’ll get to that in a bit. (This means you can move to the next module, scroll)", function () {

    }, )
}


function zoomAnimate(id) {
    const elem = document.getElementById(id);
    elem.style.animation = "zoom linear 2s ";
}

function magnify(id, newID) {
    const elem = document.getElementById(id);

    const newImage = document.createElement("img");
    newImage.id = newID
    newImage.src = "./src/img/magnify.png";
    newImage.style.width = elem.offsetWidth / 2 + "px";
    newImage.style.height = newImage.style.width
    newImage.style.zIndex = "10000";
    const rect = elem.getBoundingClientRect();
    newImage.style.position = "absolute";
    newImage.style.top = rect.top + window.scrollY + "px";
    newImage.style.left = rect.left + window.scrollX + "px";
    newImage.setAttribute("hasProgressed", "false");

    document.getElementById("boxx").appendChild(newImage);
}

function addText(id, txt, callback) {
    if (document.getElementById(id).innerHTML === "") {
        const element = document.getElementById(id);
        let i = 0;
        let intervalId = setInterval(function () {
            if (i < txt.length) {
                element.innerHTML += '<span class="character">' + txt[i] + '</span>';
                i++;
            } else {
                clearInterval(intervalId);
                
                // Wrap characters in spans after the text has been added
                wrapCharsInSpans(id);
                

                if (callback) callback(); // Execute the callback if it exists
            }
        }, 20);
    }
}



// Object mapping stage numbers to their respective handler functions
const stageHandlers = {
    1: handleStage2_1,
    2: handleStage2_2,
    3: handleStage2_3,
    4: handleStage2_4,
    5: handleStage2_5,
    6: handleStage2_6,
    7: handleStage2_7

};

const observer2 = new MutationObserver(handleStages2);
const config2 = {
    attributes: true,
    attributeFilter: ["stage"]
};
const txt2 = document.getElementById("txt2");
if (txt2) {
    observer2.observe(txt2, config2);
} else {
    console.error('txt2 does not exist!');
}
function handleStages2(mutations) {
    mutations.forEach(mutation => {
        const stage = parseInt(txt2.getAttribute("stage"));
        const handler = stageHandlers[stage];
        if (handler) {
            handler();
        }
    });
}
const IMG2 = document.getElementById("img#2")
function handleStage2_1() {
    addText("title2", "Parkinson's")
    addText('txt2', 'The next major disease we’re going to cover is Parkinson’s Disease (PD), it is characterized by slow movement, muscle stiffness, tremors, and impaired balance.', function(){      
        document.getElementById("palsy").style.animation = "3s linear pals forwards"
        document.getElementById("palsy").setAttribute("onclick", "progress('txt2', 'palsy')")
    })
    
}

function handleStage2_2() {
    clearSlate("txt2")
    clearSlate("title2")
    addText("title2", "History")
    document.getElementById("palsy").remove();
    IMG2.src="./src/img/palsy.jpeg";
    IMG2.style.height="60vh"
    IMG2.style.width="600px"
    IMG2.setAttribute("hasProgressed","false")
    IMG2.setAttribute('onclick', "addText('txt2', 'PD can be traced to an entire century before AD was discovered. It was first medically described by James Parkinson in 1817 but cases of it have been found in texts up to 3,000 years ago in India. Dr. Parkinson wrote “An Essay on the Shaking Palsy” in which he described 6 cases of PD from his own practice.', function(){ IMG2.setAttribute('onclick', 'progress(\\'txt2\\',\\'img#2\\')'); })");

    
    
    

}
function handleStage2_3() {
    clearSlate("txt2")

    IMG2.src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Jean-Martin_Charcot.jpg";
    IMG2.style.height="100%"
    IMG2.style.width="400px"

    IMG2.setAttribute("hasProgressed","false")
    IMG2.setAttribute('onclick', "addText('txt2', '60 years later, french neurologist Jean Martin Charcot was the first to realize the significance of Parkinson’s discovery and named it after him. He also discovered the 2 stages of PD: tremor and rigidity.', function(){ IMG2.setAttribute('onclick', 'progress(\\'txt2\\',\\'img#2\\')'); })");
    
 
}

function handleStage2_4() {
    clearSlate("txt2")
    clearSlate("title2")
    IMG2.src="https://lermagazine.com/wp-content/uploads/2022/01/shutterstock_1049278997.jpg";
    IMG2.style.height="100%"
    IMG2.style.width="400px"
    addText("title2", "Physiology")
    IMG2.setAttribute("hasProgressed", "false");
    IMG2.setAttribute('onclick', "addText('txt2', 'PD occurs when nerve cells in the substantia nigra begin to degenerate, this lessens the production of dopamine. Without dopamine, the balance of neurotransmitters in the body is thrown off which leads to physical impairment.', function() { IMG2.setAttribute('onclick', 'progress(\\'txt2\\',\\'img#2\\')'); });");

 
}
function handleStage2_5() {
    clearSlate("txt2")
    clearSlate("title2")
    IMG2.src="./src/img/doc.png";
    IMG2.style.height="100%"
    IMG2.style.width="300px"
    IMG2.setAttribute("hasProgressed", "false");
    addText("title2", "Diagnosis")
    IMG2.setAttribute('onclick', 'addText("txt2", "Currently, Parkinson’s is diagnosed with a physical and neurological review. It\'s quite difficult to diagnose, often doctors will try to rule out diseases similar to it before confirming a diagnosis.", function() { IMG2.setAttribute("onclick", "progress(\'txt2\',\'img#2\')"); });');

 
}

function handleStage2_6() {
    clearSlate("txt2")
    clearSlate("title2")
    IMG2.src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/3%2C4-Dihydroxy-L-phenylalanin_%28Levodopa%29.svg/640px-3%2C4-Dihydroxy-L-phenylalanin_%28Levodopa%29.svg.png";
    IMG2.style.height="100%"
    IMG2.style.width="400px"
    IMG2.setAttribute("hasProgressed", "false");
    IMG2.style.backgroundColor="white"
    addText("title2", "Treatment")
    document.getElementById("img#2").style.backgroundColor ='white'
    IMG2.setAttribute('onclick', "addText('txt2', 'There is no cure for Parkinson’s but medicines can help with symptoms and in some cases, surgery is advised. While dopamine cannot be directly given, levodopa is often prescribed as the brain can convert it into dopamine.', function(){ IMG2.setAttribute('onclick', 'progress(\\'txt2\\',\\'img#2\\')'); })");
}
function handleStage2_7() {
    clearSlate("txt2")
    clearSlate("title2")
    IMG2.style.backgroundColor="none"
    IMG2.src="https://www.thelancet.com/cms/asset/e5de4e9b-4cd3-41a9-9793-c67d08163987/gr1.jpg";
    IMG2.style.height="100%"
    IMG2.style.width="850px"
    IMG2.setAttribute("hasProgressed", "false");
    addText("title2", "Statisics")
    IMG2.setAttribute('onclick', "addText('txt2', 'PD affects over 10 million people across the globe. Men are 1.5x more likely to get it.', function(){ IMG2.setAttribute('onclick', 'progress(\\'txt2\\',\\'img#2\\')'); })");
}



const stageHandlers3 = {
    1: handleStage3_1,
    2: handleStage3_2,
    3: handleStage3_3,
    4: handleStage3_4,
    5: handleStage3_5,
    

};

const observer3 = new MutationObserver(handleStages3);
const config3 = {
    attributes: true,
    attributeFilter: ["stage"]
};
const txt3= document.getElementById("txt3");
if (txt3) {
    observer3.observe(txt3, config3);
} else {
    console.error('txt3 does not exist!');
}
function run(newTitle, newText, newIMG, number){
    clearSlate("txt" + number);
    clearSlate("title" + number);

    let IMG = document.getElementById("img" + number);
    IMG.src=newIMG
    
    addText('title'+number, newTitle)
    
    
    IMG.setAttribute('onclick', `addText('txt${number}', '${newText}', function(){ 
        document.getElementById('img${number}').setAttribute("hasProgressed", "false");
        let currentIMG = document.getElementById('img${number}');
        currentIMG.setAttribute('onclick', 'progress("txt${number}","img${number}")');
    });`);
    
}

function handleStages3(mutations) {
    mutations.forEach(mutation => {
        const stage = parseInt(txt3.getAttribute("stage"));
        const handler = stageHandlers3[stage];
        if (handler) {
            handler();
        }
    });
}
const IMG3 = document.getElementById("img3")
function handleStage3_1() {
    addText("title3", "History")
    addText('txt3', 'Huntington’s Disease (HD) was discovered by George Huntington on Long Island in 1872, this differs from PD and AD because it’s hereditary and can be tied to a specific gene. Dr. Huntington discovered that it ran in several families where he was studying and many other families across the world have been discovered to carry this disease in their lineage.', function(){      
        IMG3.setAttribute("onclick", "progress('txt3','img3')")
        IMG3.setAttribute("hasProgressed", "false")
    })
    
}

function handleStage3_2() {
    run("Discovery",'He wrote it as being “by no means a dangerous or serious affection” and that its characteristic feature was involuntary spasms. Symptoms first occur in people ages 30-40 and can affect movement as well as cognitive function. It can also lead to severe depression, fatigue, and insomnia.', "https://www.researchgate.net/publication/305364205/figure/fig5/AS:384494776406018@1468682106324/George-Huntingtons-1872-paper-On-chorea-in-the-Medical-and-Surgical-Reporter-His.png", 3)
    IMG3.style.width = "500px"
    IMG3.style.height = "100%"

    
    
    

}
function handleStage3_3() {
    IMG3.style.width = "600px"
    IMG3.style.height="100%"
    run("Cause",'HD is caused by a mutation in a huntingtin protein gene which leads to significantly more pairings of hydrogen base pairs in a person’s DNA.', "https://www.thebridgeclinic.com/www-assets/blog-post/2018/04/Huntingtons%20Disease-01.jpg", 3)
    
}

function handleStage3_4() {
    IMG3.style.width = "300px"
IMG3.style.backgroundColor ='white'

    run("Treatment",'Currently, there are no treatments to stop or reverse HD but some choreic symptoms can be eased with tetrabenazine and deuterabenazine. Additionally, antipsychotic drugs can help with hallucinations and violent outbursts. ', "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Tetrabenazine.svg/1200px-Tetrabenazine.svg.png", 3)
 
}
function wrapCharsInSpans(elementId) {
    let element = document.getElementById(elementId);
    if (!element) return;  // Exit if the element doesn't exist

    let text = element.innerText;
    let newText = '';

    for (let char of text) {
        if (char !== ' ') {
            newText += `<span class="character">${char}</span>`;
        } else {
            newText += char;
        }
    }

    element.innerHTML = newText;

    // Function to calculate distance between two elements
    function distanceBetween(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        
        const dx = rect1.left - rect2.left;
        const dy = rect1.top - rect2.top;

        return Math.sqrt(dx * dx + dy * dy);
    }

    const RADIUS = 70; // Change this value to your desired radius in pixels

    // Add hover event to each character
    document.querySelectorAll('.character').forEach(span => {
        span.addEventListener('mouseover', function() {
            document.querySelectorAll('.character').forEach(otherSpan => {
                if (distanceBetween(span, otherSpan) <= RADIUS) {
                    otherSpan.classList.add('nearby');
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    wrapCharsInSpans('txt3'); // Ensure the DOM is fully loaded before running the function
});


function handleStage3_5() {
    IMG3.style.width = "700px";
    const number = 3;
    const newText = "Although Huntington's is less common than PD or AD, it's still seen across the world and affects hundreds of thousands of people.";
    const newIMG = "https://huntingtonstudygroup.org/wp-content/uploads/2015/08/hd-prevalence-map.png";
    
    clearSlate("txt" + number);
    clearSlate("title" + number);

    let IMG = document.getElementById("img" + number);
    IMG.src = newIMG;

    addText('title' + number, "Stats on HD");

    IMG.setAttribute('onclick', `addText('txt${number}', "${newText}", function(){ /* Further actions here, if needed */ });`);
}


const stageHandlers4 = {
    1: handleStage4_1,
    2: handleStage4_2,
    3: handleStage4_3,
    4: handleStage4_4,

    

};

const observer4 = new MutationObserver(handleStages4);
const config4 = {
    attributes: true,
    attributeFilter: ["stage"]
};
const txt4= document.getElementById("txt4");
if (txt4) {
    observer4.observe(txt4, config4);
} else {
    console.error('txt4 does not exist!');
}
function handleStages4(mutations) {
    mutations.forEach(mutation => {
        const stage = parseInt(txt4.getAttribute("stage"));
        const handler = stageHandlers4[stage];
        if (handler) {
            handler();
        }
    });
}
const IMG4 = document.getElementById("img4")
function handleStage4_1() {
    addText("title4", "Challenges")
    addText('txt4', 'Currently, treatment options for neurodegenerative disease are pretty sparse due to a few difficulties.', function(){      
        IMG4.setAttribute("onclick", "progress('txt4','img4')")
        IMG4.setAttribute("hasProgressed", "false")
    })
    
}
function handleStage4_2() {
    IMG4.style= "height: 100%"
    IMG4.style.width="1000px"
    run("Diversity of Conditions", "One main reason it’s hard to treat neurodegenerative disease is because each condition has its own cause and affects a different area of the brain. We have a lack of knowledge of each individual section’s neurological pathology and treatment for one usually will have no effect on others.","https://www.mdpi.com/brainsci/brainsci-08-00177/article_deploy/html/images/brainsci-08-00177-g001.png",4)
}
function handleStage4_3() {
    IMG4.style.width="400px"
    run("Too late", "Additionally, at a certain point, too much damage has been done, and cell revival isn’t possible so we must be able to diagnose earlier to prevent rather than attempt to reverse the damage.","https://scx2.b-cdn.net/gfx/news/hires/2013/testingbrain.jpg",4)
}
function handleStage4_4() {
    run("Blood Brain Barrier", "The Blood Brain Barrier(BBB) regulates substances going from blood into the brain. It prevents 99% of foreign substances from entering the brain but it can raise a significant challenge in engineering therapies that can go past it to treat disease.", "https://upload.medbullets.com/topic/113003/images/bbb%20-%20moises%20dominguez.jpg", 4)
    
}

