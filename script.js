


 document.addEventListener("DOMContentLoaded", (event) => {
 
 
 // lenis scroll animation 

const lenis = new Lenis({
    duration: 3
})

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// toggle navbar 
const navList = document.querySelector('.nav-list');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-list li a'); // all links

menu.addEventListener('click', () => {
  navList.classList.toggle('show');
  menu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = e.target.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(targetId);

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 50 }, // offset so navbar doesn’t cover it
        ease: "none"
      });
    }

    // close menu after click
    navList.classList.remove('show');
    menu.classList.remove('active');
  });
});

// let distance = document.querySelector(".slide-text").offsetWidth;

// gsap.to(".slide-text", {
//   x: `-=${distance}`, // move left by its own width
//   duration: 50,
//   repeat: -1,
//   ease: "linear",
//   modifiers: {
//     x: gsap.utils.unitize(x => parseFloat(x) % distance) // wrap seamlessly
//   }
// });






// wave text 


gsap.to('.line-container',{
  scrollTrigger:{
    trigger:'.line-container',
    scrub:1.5,
    start:"center center",
   
  },

  scale:3,
  height:"400px",
  opacity:0,
  y:-300
})



const hero = document.getElementById("hero");
  const floatImg = hero.querySelector(".mouse-float");

  // Move image with mouse
  hero.addEventListener("mousemove", (e) => {
   
    const x = e.clientX 
    const y = e.clientY 

    floatImg.style.left = `${x}px`;
    floatImg.style.top = `${y}px`;
    floatImg.style.opacity = "1";
    
  });


// Split text into spans

gsap.to(".hero", {
  scrollTrigger: {
    trigger: ".hero",
    start: "center center",
    end: "center 10%", 
    //  markers: true,      // scroll distance
    scrub: 1.5,
    pin:true,
  },
  clipPath: "circle(0% at 50% 50%)",
  background:'#ffffff',
  // scale:.7,
  ease: "none",

 

});






  // about me page script

  const video = document.querySelector(".video-about");
  video.playbackRate = 0.6; // 0.5 = half s


 // Sticky About animation
    gsap.to(".about", {
      scrollTrigger: {
        trigger: ".about",
        start: "center center",
        end: '+=600 100vh',
        scrub: 1,
        pin: true,
        // markers: true
      },
      clipPath: "circle(100% at 50% 50%)",
      scale: 1,
      ease: "power.in",
      duration: 3,
      opacity: 1
    });
// about me heading tag gsap animtion


    gsap.to('.about-text-tag',{
      scrollTrigger :{
            trigger:".about",
            start:"center center",
            end: 'bottom 70%',
          
            scrub:2,
            ease:'bounce',
            invalidateOnRefresh: true
         
        },

         y:0,
      duration:2,
    })


    gsap.fromTo('.about-content',{
      y:1000,
      invalidateOnRefresh: true,
      duration:2,
    },{

 scrollTrigger :{
            trigger:".about",
            start:"center center",
            end: 'bottom 10%',
          
            scrub:2,
            ease:'expoScale',
            invalidateOnRefresh: true,
          
         
        },

         y:0,
      duration:2,
    })
   
    



    // svg 

    //  project styling gsap

    


gsap.fromTo(".project-text", 
  {
    y: -800,                  // smaller offset = less jumpy
    fontSize: "20vw",
    lineHeight: "21vw",
    letterSpacing: "-4px",
    background: "#fff",
      invalidateOnRefresh: true
  }, 
  {
    y: 0,
    fontSize: "15vw",
    lineHeight: "21vw",
    background: "#fff",
   
    ease: "ease",       // smooth easing
    scrollTrigger: {
      trigger: ".project-text",
      start: "top 80%",       // start earlier
      end: "bottom 20%",      // longer duration
      scrub: 1.5,             // smoother follow effect
      // markers: true,       // uncomment for debugging
      invalidateOnRefresh: true
    }
  }
);




  async function loadProjects() {
  const res = await fetch("https://api.github.com/users/rakinu21/repos");
  const repos = await res.json();

  const list = document.getElementById("projects-list");
  list.innerHTML = `
    <div class="projects-row">
      ${repos.map(
        (repo, index) => `
          <div class="project-card">
            <div class="project-index">
              <p class="index">${index + 1}</p>
            </div>
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description available."}</p>
            <a class="projectbtn" href="${repo.html_url}" target="_blank">View Repo</a>
          </div>
        `
      ).join("")}
    </div>
  `;

  initGSAP();
}

loadProjects();

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  const row = document.querySelector("#projects-list .projects-row");

  // Horizontal scroll animation
  gsap.to(row, {
    x: () => -(row.scrollWidth - document.documentElement.clientWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".project",
      start: "top top",
      end: () => "+=" + (row.scrollWidth - document.documentElement.clientWidth),
      pin: ".project",
      scrub: 1.5,
      invalidateOnRefresh: true,
      // onLeave: () => ScrollTrigger.refresh(), // Recalculate positions once done
    }
  });

  // Delay contact trigger setup until after refresh
  ScrollTrigger.addEventListener("refreshInit", setupContactTrigger);
  ScrollTrigger.refresh();
}

function setupContactTrigger() {
  // Remove existing contact triggers to avoid duplicates
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars && st.vars.trigger === ".contact") st.kill();
  });

  // Create contact trigger AFTER horizontal scroll
ScrollTrigger.create({
  trigger: ".contact",
  start: "10% 70%",
  end:"top center",
  // markers: true,


  onEnter: () => {
    const title = document.getElementById("skills-title");
    const desc = document.getElementById("skills-desc");
   const skillsBackground = document.querySelector('.skills-picture')
  
    // fade out
    title.classList.add("fade-out");
    desc.classList.add("fade-out");

    setTimeout(() => {
      // change text after fade out
      title.innerHTML = "Contact";
      desc.innerHTML = "Get in touch with me!";
      skillsBackground.style.background = '#0d0d0d'

      // fade back in
      title.classList.remove("fade-out");
      desc.classList.remove("fade-out");
    }, 500); // wait for fade-out transition
  },
  onLeaveBack: () => {
    const title = document.getElementById("skills-title");
    const desc = document.getElementById("skills-desc");
    const skillsBackground = document.querySelector('.skills-picture')

    skillsBackground.style.backgroundImage = "url('./assets/about-bg-mountain.avif')";
    skillsBackground.style.backgroundAttachment ='fixed';
    skillsBackground.style.backgroundSize ='cover';
    skillsBackground.style.backgroundRepeat ='no-repeat';
    skillsBackground.style.backgroundPosition ='center'

    title.classList.add("fade-out");
    desc.classList.add("fade-out");

    setTimeout(() => {
      title.innerHTML = "My Skills";
      desc.innerHTML = "Frontend • Backend • Animation";
      title.classList.remove("fade-out");
      desc.classList.remove("fade-out");
    }, 500);
  }
});

}



 })

