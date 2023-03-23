let map,mapEvent,aa,work;
let m=document.querySelector("#map");
let textinser=document.querySelector('.textinsert');
let head=document.querySelector('#head');
let text=document.querySelector('#text');
let modal=document.querySelector('.modal');
let close=document.querySelector('#close');
let submit=document.querySelector('#submit');
let containtt=document.querySelector('#containtt');

// clos the input modal
close.addEventListener('click',function(){
    modal.classList.add('hidden');
});

// creating the class which hold blueprint of input
class Inforamtion{
   constructor(coords,head,text){
    this.coords=coords;
    this.head=head;
    this.text=text;
   }
}
let initial=document.querySelector('.initial_div');
console.log(initial);
work=JSON.parse(localStorage.getItem('work'));
if(work==null){
  initial.classList.remove('hidden');

  setTimeout(() => {
    initial.classList.add('hidden');

  }, 3000);

  work=[];
  
}
_getposition();


// function to get cuurent location
function _getposition(){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this._loadMap,function(){
          alert('cannot access this')
      })
  }
}

// function to popUp
function  _showPosition(aa,containt,text){
  //create an element add it into popup
   let p=  document.createElement('p');
   p.className="pravi";
   p.append(containt);
   p.style.cursor="pointer";
   p.style.overflowWrap="break-word"
 //   when mouse enter to text
   p.addEventListener('mouseover',function(e){
     containtt.innerHTML=`${text}`// add info into showing box
     textinser.classList.remove('hidden');
   })
 //  when mouse leave from the text
   p.addEventListener('mouseleave',function(){
     
        containtt.innerHTML=``;
     textinser.classList.add('hidden');

     
   })
     L.marker(aa).addTo(map)
     .bindPopup(L.popup({
         maxWidth:250,
         minWidth:100,
         autoClose:false,
         closeOnClick:false,
         className:"praveen"
         
     })).setPopupContent(p)
       .openPopup();
 }


  


function  _loadMap(position){
console.log(position);
      // pethcing current position in map
      
      const {latitude,longitude}=position.coords;
      
         map = L.map('map').setView([latitude, longitude], 13);
      
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
         
          _showPosition([latitude,longitude],"your place ","You make your place more powerfull");
          map.on('click',function(mapE){
          mapEvent=mapE;
          aa=[Object.entries(mapEvent.latlng)[0][1],Object.entries(mapEvent.latlng)[1][1]]
          modal.classList.remove('hidden'); 
          
           
           
      })
//  displaying all element  stored in local storage
      work.forEach(element => {
        _showPosition(element.coords,element.head,element.text);
      });


      
}



function _takeInformation(){
  let obj=new Inforamtion(aa,head.value,text.value);
 text.value='';
 head.value='';
 work.push(obj);
 
 
 localStorage.setItem('work',JSON.stringify(work));
 return obj;
 
}



submit.addEventListener('click',function(e){
  e.preventDefault();
let obj=_takeInformation();
setTimeout(() => {
  modal.classList.add('hidden');
}, 200);
_showPosition(obj.coords,obj.head,obj.text);

 if(obj.head==''){
  _showPosition(aa,"😣😌🫡🤗🤗","you did not add!");
 }
})
