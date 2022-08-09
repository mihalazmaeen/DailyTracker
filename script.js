'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputPeople = document.querySelector('.form__input--distance');
const inputDuration   = document.querySelector('.form__input--duration');
const inputCost = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Entry{
    date=new Date();
    id=(Date.now()+'').slice(-10);
    
    constructor(coords,duration,people){
        this.coords=coords;
        this.duration=duration;
        this.people=people;
        

    }
    _setDescription(){
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description= `${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

}

class Sunday extends Entry{


    day='sunday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Monday extends Entry{


    day='monday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Tuesday extends Entry{


    day='tuesday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Wednesday extends Entry{


    day='wednesday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Thursday extends Entry{


    day='thursday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Friday extends Entry{


    day='friday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}
class Saturday extends Entry{


    day='saturday';
    constructor(coords,duration,people,cost){
        super(coords,duration,people);
        this.cost=cost;
        this._setDescription();
       
    }

}




class App{
    #map;
    #mapEvent;
    #entries=[];
    #mapZoomLevel=17;
    constructor(){
        this._getPosition();

        this._getLocalStorage();


        
        form.addEventListener('submit',this._newEntry.bind(this));
        containerWorkouts.addEventListener('click',this._movetoPopup.bind(this));

    }

    _getPosition(){
        if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
       
    function(){
    alert('could not get your position');
}); 
    }

    _loadMap(position){

       
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.com.bd/maps/@${latitude},${longitude}`);
            const coords=[latitude,longitude];

            this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);


    this.#map.on('click',this._showForm.bind(this));
    this.#entries.forEach(ent=>{
        this._renderWorkoutMarker(ent);
        


    });
    
}

    _showForm(mapE){
        this.#mapEvent=mapE;
        form.classList.remove('hidden');
        inputPeople.focus();
}

    _hideForm(){
        inputPeople.value=inputDuration.value=inputCost.value=inputElevation.value='';
        form.style.display='none';
        form.classList.add('hidden');
        setTimeout(()=>(form.style.display='grid'),1000);
    }

    _newEntry(e){
        const validInputs=(...inputs)=>inputs.every(inp=>Number.isFinite(inp));
        e.preventDefault();
        //get data from form
        const day=inputType.value;
        const people=inputPeople.value;
        const duration = +inputDuration.value;
        const cost = +inputCost.value;
        const{lat,lng}=this.#mapEvent.latlng;
        let entry;

        //check if data is valid
        if(day==='sunday'){
            if(!validInputs(duration,cost)) 
             return alert('Please inser Positive Numbers !');

            entry= new Sunday ([lat, lng],people,duration, cost);
        }
        else if( day==='monday'){
           {
                if(!validInputs(duration,cost)) 
                 return alert('Please inser Positive Numbers !');
    
                entry= new Monday ([lat, lng],people,duration, cost);
            }
        }
        else if( day==='tuesday'){
            {
                 if(!validInputs(duration,cost)) 
                  return alert('Please inser Positive Numbers !');
     
                 entry= new Tuesday ([lat, lng],people,duration, cost);
             }
         }  
         else if( day==='wednesday'){
            {
                 if(!validInputs(duration,cost)) 
                  return alert('Please inser Positive Numbers !');
     
                 entry= new Wednesday ([lat, lng],people,duration, cost);
             }
         }
         else if( day==='thursday'){
            {
                 if(!validInputs(duration,cost)) 
                  return alert('Please inser Positive Numbers !');
     
                 entry= new Thursday ([lat, lng],people,duration, cost);
             }
         }
         else if( day==='friday'){
            {
                 if(!validInputs(duration,cost)) 
                  return alert('Please inser Positive Numbers !');
     
                 entry= new Friday ([lat, lng],people,duration, cost);
             }
         }
         else if( day==='saturday'){
            {
                 if(!validInputs(duration,cost)) 
                  return alert('Please inser Positive Numbers !');
     
                 entry= new Saturday ([lat, lng],people,duration, cost);
             }
         }
        //add new object to Entry array
        
        this.#entries.push(entry);
        console.log(entry);
        //render marker
        this._renderWorkoutMarker(entry);


        //render entry on list

         this._renderEntry(entry);







        //clear input fields
        
        this._hideForm();

         //set local storage

        this._setLocalStorage();

       
    }

        _renderWorkoutMarker(entry){
            L.marker(entry.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxwidth:250,
                minwidth:100,
                autoClose:false,
                closeOnClick:false,
                className:`${entry.day}-popup`,
            })).setPopupContent(`${entry.duration} ${entry.description}`)
            .openPopup();
        }
        _renderEntry(entry){
            const html=`
            <li class="workout workout--${entry.day}" data-id="${entry.id}">
          <h2 class="workout__title">${entry.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${entry.people}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${entry.duration}</span>
            <span class="workout__unit"></span>
          </div>
          <div class="workout__details">
            <span class="workout__icon"></span>
            <span class="workout__value">${entry.cost}</span>
            <span class="workout__unit">BDT</span>
          </div>
        </li>
         
            `;

        form.insertAdjacentHTML('afterend', html);

        }

        _movetoPopup(e){
            const entryEl=e.target.closest('entry');
            console.log(entryEl);
            if(!entryEl) return;
            const entry= this.#entries.find(
                ent=>ent.id===entryEl.dataset.id
            );
            this.#map.setView(entry.coords, this.#mapZoomLevel,{
                animate:true,
                pan:{
                    duration:1,
                },
            });
        }
        _setLocalStorage(){
            localStorage.setItem('entries',JSON.stringify(this.#entries));
        }

        _getLocalStorage(){
            const data=JSON.parse(localStorage.getItem('entries'));
            console.log(data);
            if(!data)return;
            this.#entries=data;

            this.#entries.forEach(ent=>{
                this._renderEntry(ent);
                


            });


        }
        reset(){
            localStorage.removeItem('entries');
            location.reload();
        }



}

const app= new App();





 