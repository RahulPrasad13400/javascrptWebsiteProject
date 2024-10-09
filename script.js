const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const h1 = document.querySelector('h1')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function(btn){
    return btn.addEventListener('click',openModal)
})

btnCloseModal.addEventListener('click',closeModal)
overlay.addEventListener('click',closeModal)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'we use cookies for improving the customer experience <button class="btn--close-cookie btn">Got it!</button>'
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove()
});

message.style.backgroundColor = '#37383d'
message.style.width = '120%'
message.style.padding = '20px'


btnScrollTo.addEventListener('click',function(){
  
const sec1Coord = section1.getBoundingClientRect()

//   window.scrollTo({
//     top : sec1Coord.top + scrollY , 
//     left : sec1Coord.left + scrollX , 
//     behavior : "smooth" 
//   })

  section1.scrollIntoView({behavior:'smooth'})
})



const h1alert = function(e){
  alert("Have a Nice Day")
  h1.removeEventListener('mouseenter',h1alert)
}

h1.addEventListener('mouseenter',h1alert)


document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault()
    const id = this.getAttribute('href')
    // console.log(id)
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  })
})



tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab')
  if(!clicked) return

  tabs.forEach(function(t){
    t.classList.remove('operations__tab--active')
    
  })
  tabsContent.forEach(function(t){
    t.classList.remove('operations__content--active')

  })
  clicked.classList.add('operations__tab--active')

  // console.log(clicked)

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// navbar fade effect 

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('nav').querySelectorAll('.nav__link')
    const logo = link.closest('nav').querySelector('img')
    siblings.forEach((el)=>{
      if(el !== link){
        el.style.opacity = 0.5
      }
      
    })
    logo.style.opacity = 0.5
  }
})

nav.addEventListener('mouseout',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('nav').querySelectorAll('.nav__link')
    const logo = link.closest('nav').querySelector('img')
    siblings.forEach((el)=>{
      if(el !== link){
        el.style.opacity = 1
      }
      
    })
    logo.style.opacity = 1
  }
})

options = {
  root : null ,
  threshold : 0
}

const obsCallback = function (entries){
  const [entry] = entries
  if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
  }
}

const headerObserver = new IntersectionObserver(obsCallback,options)
headerObserver.observe(header)


const allSection = document.querySelectorAll('.section')
const revealSection = function(entries,observer){
  const [entry] = entries
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target) 
  }
}
const sectionObserver = new IntersectionObserver(revealSection,{
  root : null,
  threshold : 0.1
})

allSection.forEach(function(sec){
  sectionObserver.observe(sec)
  sec.classList.add('section--hidden')
})

const imgTargets = document.querySelectorAll('img[data-src]')

const loadimg = function(entries,observer){
  const [entry] = entries
  if(entry.isIntersecting){
    entry.target.src =entry.target.dataset.src
    entry.target.addEventListener('load',function(){
      entry.target.classList.remove('lazy-img')
      observer.unobserve(entry.target)
    })
  }
 
}
const imageObserver = new IntersectionObserver(loadimg,{
  root : null ,
  threshold : 0.25
})

imgTargets.forEach(function(img){
  imageObserver.observe(img)
})


const slides = document.querySelectorAll('.slide')

slides.forEach((s,i)=>{

  s.style.transform = `translateX(${100*i}%)`

})

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.5)'
// slider.style.overflow = 'visible'
let current = 0
let maxSlide = slides.length
btnRight.addEventListener('click',function(){
  
  if(current === maxSlide-1){
    current = 0
  }else{
    current++
  }
  
  slides.forEach((s,i)=>{
    s.style.transform = `translateX(${100*(i-current)}%)`

    
  })
 activeDot(current)
})
btnLeft.addEventListener('click',function(){
  
  if(current === 0){
    current = maxSlide -1
  }else{
    current--
  }
  
  slides.forEach((s,i)=>{
    s.style.transform = `translateX(${100*(i-current)}%)`
  })
  activeDot(current)
})

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight'){
    if(current === maxSlide-1){
      current = 0
    }else{
      current++
    }
    
    slides.forEach((s,i)=>{
      s.style.transform = `translateX(${100*(i-current)}%)`
    })
    activeDot(current)
  }
})

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft'){
    if(current === 0){
      current = maxSlide -1
    }else{
      current--
    }
    
    slides.forEach((s,i)=>{
      s.style.transform = `translateX(${100*(i-current)}%)`
    })
    activeDot(current)
  }
})

const dotContainer = document.querySelector('.dots')
const createDots = function(){
  slides.forEach(function(s,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

createDots()

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    current = e.target.dataset.slide
    slides.forEach((s,i)=>{
      s.style.transform = `translateX(${100*(i-current)}%)`})
      activeDot(current) 
  }
})

const activeDot = function(slide){
  // console.log(slide)
  console.log(document.querySelectorAll('.dots__dot'))
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
 
}
activeDot(0)