'use strict';

//1. gallery>ul>li에 각각 배경이미지 넣기(배열, push(), for문이용)
const gallery=document.querySelector('.gallery');
const galleryUl=gallery.querySelector('.gallery>ul');
const galleryUlLi=galleryUl.querySelectorAll('li');

const liSize=galleryUlLi.length;

const arrBg=[];

for(let i=0;i<galleryUlLi.length;i++){
  arrBg.push(`url(img/s${i}.jpg) no-repeat 50%/cover`);
  galleryUlLi[i].style.background=arrBg[i];
}


//2. 자동갤러리 굴리기
let i=-1;

const autoGallery=()=>{
  i++;
  const gap=galleryUlLi[1].offsetLeft-galleryUlLi[0].offsetLeft;
  const goto=(-i*gap)+'px';
  
  gallery.style.left=goto;
  gallery.style.transition='all 0.5s';
  
  
  //if(i>=galleryUlLi.length-1) i=-1;
  if(i>=liSize-1) i=-1;

}

let setIn=setInterval(autoGallery,1000);


//3. span.arrow
const arrow=document.querySelectorAll('span.arrow');
//방법5: 한번에 다 쓰기
arrow.forEach(function(el){
  el.addEventListener('mouseover',function(){
    clearInterval(setIn);
  })
  el.addEventListener('mouseout',function(){
    setIn=setInterval(autoGallery,1000);
  })
})

//3-1. span.arrow를 mouseover 시 setInterval 중지
/* 방법1
arrow[0].addEventListener('mouseover',fnOver);
arrow[1].addEventListener('mouseover',fnOver);

function fnOver(){
  console.log(event.type,event.target)
  clearInterval(setIn);
}
*/

/*방법4
arrow.forEach(el=> el.addEventListener('mouseover',()=>{
  clearInterval(setIn);
}));
*/

//3-2. span.arrow를 마우스 아웃시 setInterval 다시 시작

/*방법1
arrow[0].addEventListener('mouseout',fnOut);
arrow[1].addEventListener('mouseout',fnOut);

function fnOut(){
  console.log(event.type,event.target)
  setIn=setInterval(autoGallery,1000);
}
*/

/*방법4
arrow.forEach(el=> el.addEventListener('mouseout',()=>{
  setIn=setInterval(autoGallery,1000);
}));
*/


//4. items>ul>li
const items=document.querySelectorAll('.items>ul>li');
//방법5: 한번에 다 쓰기
items.forEach(el=>{
  el.addEventListener('mouseover',()=> clearInterval(setIn));
  el.addEventListener('mouseout',()=> setIn=setInterval(autoGallery,1000));
});

//4-1. items>ul>li mouseover setInterval 중지
/* 방법1
items[0].addEventListener('mouseover',fnOver);
items[1].addEventListener('mouseover',fnOver);
items[2].addEventListener('mouseover',fnOver);
items[3].addEventListener('mouseover',fnOver);
items[4].addEventListener('mouseover',fnOver);
function fnOver(){
  clearInterval(setIn);
}
*/

/* 방법2
for(i=0;i<items.length-1;i++){
  items[i].addEventListener('mouseover',fnOver)
}
function fnOver(){
  clearInterval(setIn);
}
*/

/*방법3
items.forEach(el=> el.addEventListener('mouseover',fnOver)); //객체형 배열에는 for반복문보다 forEach
function fnOver(){
  clearInterval(setIn);
}
*/

/*방법4: callback 함수 사용
items.forEach(el=> el.addEventListener('mouseover',()=>{
  clearInterval(setIn);
}));
*/



//4-2. items>ul>li mouseout setInterval 다시 시작
/*방법4
items.forEach(el=> el.addEventListener('mouseout',fnOut));
function fnOut(){
  setIn=setInterval(autoGallery,1000);
}
*/


//5. 즉시실행
(()=>autoGallery())();