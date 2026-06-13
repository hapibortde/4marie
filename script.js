const texts = {
text1:"hai shonget",
text2:"i made something for u :oo",
text3:"..oh right, u hate me...(｡⁠ŏ⁠﹏⁠ŏ⁠)",
text4:"proceed anyway? ^_^"
};

function typeText(id,text,speed=55,cb){
let el=document.getElementById(id);
el.innerHTML="";
let i=0;

(function loop(){
if(i<text.length){
el.innerHTML+=text[i++];
setTimeout(loop,speed);
}else if(cb){
cb();
}
})();
}

function nextPage(n){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

document.getElementById("page"+n).classList.add("active");

if(n===2){
typeText("text2",texts.text2);
}

if(n===3){
typeText("text3",texts.text3);
}

if(n===4){
typeText("text4",texts.text4);
}

if(n===5){
typeText(
"passwordText",
"to proceed, what silly nickname did u give me back then?"
);
}

if(n===6){

typeText("wishText","make a wish ok..");

const overlay=document.getElementById("micOverlay");
overlay.classList.remove("show");

setTimeout(()=>{
overlay.classList.add("show");
},1000);

}
}

function goToPassword(){
nextPage(5);
}

let noCount = 0;

const noTexts = [
"PLEASE?",
"pretty please?",
"PLEASEEEE",
"come on :(",
"just press ok",
"PLEASEEEEEEE",
"bro...",
"😭"
];

function choiceNo(){

const okBtn = document.getElementById("okBtn");
const noBtn = document.getElementById("noBtn");

noCount++;

const okWidth = 120 + (noCount * 60);

okBtn.style.width = okWidth + "px";
okBtn.style.height = (50 + noCount * 15) + "px";
okBtn.style.fontSize = (16 + noCount * 2) + "px";

if(noCount <= noTexts.length){
noBtn.innerText = noTexts[noCount - 1];
}

if(noCount >= 10){

okBtn.style.position = "fixed";
okBtn.style.top = "0";
okBtn.style.left = "0";
okBtn.style.width = "100vw";
okBtn.style.height = "100vh";
okBtn.style.borderRadius = "0";
okBtn.style.fontSize = "4rem";
okBtn.style.zIndex = "9999";

noBtn.style.display = "none";
}

}

/* PASSWORD */
function checkPassword(){

let v=document.getElementById("passwordInput").value;

if(v==="kakaibabe"){

nextPage(6);

}else{

document.getElementById("passwordGif").src="angry.gif";

}
}

document.getElementById("passwordInput").addEventListener("input",()=>{

document.getElementById("passwordGif").src="heh.gif";

});

/* MIC SYSTEM */

let audioCtx;
let analyser;
let dataArray;
let micStream;

let triggered=false;
let stable=0;

function enableMic(){

document.getElementById("micOverlay").classList.remove("show");

navigator.mediaDevices.getUserMedia({audio:true})

.then(stream=>{

micStream = stream;

audioCtx = new (window.AudioContext || window.webkitAudioContext)();
audioCtx.resume();

const source = audioCtx.createMediaStreamSource(stream);

analyser = audioCtx.createAnalyser();

analyser.fftSize = 512;

source.connect(analyser);

dataArray = new Uint8Array(analyser.frequencyBinCount);

detectBlow();

})

.catch(()=>{

alert("microphone access denied 😔");

});

}

/* HAPPY BIRTHDAY */

function typeReplace(){

let wish=document.getElementById("wishText");
let birthday=document.getElementById("birthdayText");

wish.innerHTML="";
wish.style.display="none";

birthday.innerHTML="";
birthday.style.display="block";

setTimeout(()=>{

typeText(
"birthdayText",
"HAPPY BIRTHDAY!1!11!!!🎉"
);

},3400);

}

/* LETTER BUTTON */

function showLetterButton(){

let btn=document.getElementById("letterBtn");

btn.style.display="block";

setTimeout(()=>{
btn.style.opacity="1";
},50);

}

/* BLOW DETECTION */

function detectBlow(){

let gif=document.getElementById("candleGif");
let video=document.getElementById("candleVideo");

function loop(){

if(triggered) return;

analyser.getByteFrequencyData(dataArray);

let sum=0;

for(let i=0;i<dataArray.length;i++){
sum+=dataArray[i];
}

let volume=sum/dataArray.length;

if(volume>25){
stable++;
}else{
stable=0;
}

if(stable>8 && !triggered){

triggered=true;

gif.style.display="none";

video.style.display="block";

video.onplay=()=>{

typeReplace();

setTimeout(()=>{

showLetterButton();

},7000);

};

video.play().catch(()=>{});

return;
}

requestAnimationFrame(loop);

}

loop();
}

/* FINAL PAGE */

function goToFinal(){

const video=document.getElementById("candleVideo");

video.pause();
video.currentTime=0;

/* release microphone */

if(micStream){
micStream.getTracks().forEach(track=>track.stop());
}

/* close audio context */

if(audioCtx){
audioCtx.close();
}

nextPage(7);

document.getElementById("bgMusic").play();

}

/* START */

setTimeout(()=>{

typeText(
"passwordText",
"ok wats da password"
);

},200);

document.addEventListener("contextmenu",(e)=>{
e.preventDefault();
});

document.addEventListener("selectstart",(e)=>{
e.preventDefault();
});