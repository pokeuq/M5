let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

/* -- ↓↓↓ If you want the sparkle effect to only occur on hover, replace lines 16 and on with this code ↓↓↓ -- */

// let timeouts = [],
//     intervals = [];

// const magic = document.querySelector(".magic");

// magic.onmouseenter = () => {
//   let index = 1;
  
//   for(const star of document.getElementsByClassName("magic-star")) {
//     timeouts.push(setTimeout(() => {  
//       animate(star);
      
//       intervals.push(setInterval(() => animate(star), 1000));
//     }, index++ * 300));
//   };
// }

// magic.onmouseleave = onMouseLeave = () => {
//   for(const t of timeouts) clearTimeout(t);  
//   for(const i of intervals) clearInterval(i);
  
//   timeouts = [];
//   intervals = [];
// }



// CURSOR

// const coords = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// const colors = [
// //   '#FFE4E1'
// '#FFC0CB'
// ];

// circles.forEach(function (circle, index) {
//   circle.x = 0;
//   circle.y = 0;
//   circle.style.backgroundColor = colors[index % colors.length];
// });

// window.addEventListener("mousemove", function(e){
//   coords.x = e.clientX;
//   coords.y = e.clientY;
// });

// function animateCircles() {
  
//   let x = coords.x;
//   let y = coords.y;
  
//   circles.forEach(function (circle, index) {
//     circle.style.left = x - 9 + "px";
//     circle.style.top = y - 9 + "px";
    
//     circle.style.scale = (circles.length - index) / circles.length;
    
//     circle.x = x;
//     circle.y = y;

//     const nextCircle = circles[index + 1] || circles[0];
//     x += (nextCircle.x - x) * 0.15;
//     y += (nextCircle.y - y) * 0.15;
//   });
  
//   requestAnimationFrame(animateCircles);
// }

// animateCircles();





//PHOTOS
// const items = document.querySelectorAll('.item')

// const expand = (item, i) => {
//   items.forEach((it, ind) => {
//     if (i === ind) return
//     it.clicked = false
//   })
//   gsap.to(items, {
//     width: item.clicked ? '15vw' : '8vw',
//     duration: 2,
//     ease: 'elastic(1, .6)'
//   })
  
//   item.clicked = !item.clicked
//   gsap.to(item, {
//     width: item.clicked ? '42vw' : '15vw',
//     duration: 2.5,
//     ease: 'elastic(1, .3)'
//   })
// }

// items.forEach((item, i) => {
//   item.clicked = false
//   item.addEventListener('click', () => expand(item, i))
// })








// star-rating

window.addEventListener("DOMContentLoaded",() => {
	const starRating = new StarRating("form");
});

class StarRating {
	constructor(qs) {
		this.ratings = [
			{id: 1, name: "Terrible"},
			{id: 2, name: "Bad"},
			{id: 3, name: "OK"},
			{id: 4, name: "Good"},
			{id: 5, name: "Excellent"}
		];
		this.rating = null;
		this.el = document.querySelector(qs);

		this.init();
	}
	init() {
		this.el?.addEventListener("change",this.updateRating.bind(this));

		// stop Firefox from preserving form data between refreshes
		try {
			this.el?.reset();
		} catch (err) {
			console.error("Element isn’t a form.");
		}
	}
	updateRating(e) {
		// clear animation delays
		Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach(el => {
			el.className = "rating__label";
		});

		const ratingObject = this.ratings.find(r => r.id === +e.target.value);
		const prevRatingID = this.rating?.id || 0;

		let delay = 0;
		this.rating = ratingObject;
		this.ratings.forEach(rating => {
			const { id } = rating;

			// add the delays
			const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

			if (id > prevRatingID + 1 && id <= this.rating.id) {
				++delay;
				ratingLabel.classList.add(`rating__label--delay${delay}`);
			}

			// hide ratings to not read, show the one to read
			const ratingTextEl = this.el.querySelector(`[data-rating="${id}"]`);

			if (this.rating.id !== id)
				ratingTextEl.setAttribute("hidden",true);
			else
				ratingTextEl.removeAttribute("hidden");
		});
	}
}

//audioplayer
new Vue({
	el: "#app",
	data() {
	  return {
		audio: null,
		circleLeft: null,
		barWidth: null,
		duration: null,
		currentTime: null,
		isTimerPlaying: false,
		tracks: [
		  {
			name: "Mekanın Sahibi",
			artist: "Norm Ender",
			cover: "../media/img/audio1.jpg",
			source: "../media/audio/1.mp3",
			url: "https://vk.com/titomirrr",
			favorited: false
		  },
		  {
			name: "Everybody Knows",
			artist: "Leonard Cohen",
			cover: "../media/img/audio2.jpg",
			source: "../media/audio/2.mp3",
			url: "https://vk.com/titomirrr",
			favorited: true
		  },
		  {
			name: "Extreme Ways",
			artist: "Moby",
			cover: "../media/img/audio3.jpg",
			source: "../media/audio/3.mp3",
			url: "https://vk.com/titomirrr",
			favorited: false
		  }
		  
		],
		currentTrack: null,
		currentTrackIndex: 0,
		transitionName: null
	  };
	},
	methods: {
	  play() {
		if (this.audio.paused) {
		  this.audio.play();
		  this.isTimerPlaying = true;
		} else {
		  this.audio.pause();
		  this.isTimerPlaying = false;
		}
	  },
	  generateTime() {
		let width = (100 / this.audio.duration) * this.audio.currentTime;
		this.barWidth = width + "%";
		this.circleLeft = width + "%";
		let durmin = Math.floor(this.audio.duration / 60);
		let dursec = Math.floor(this.audio.duration - durmin * 60);
		let curmin = Math.floor(this.audio.currentTime / 60);
		let cursec = Math.floor(this.audio.currentTime - curmin * 60);
		if (durmin < 10) {
		  durmin = "0" + durmin;
		}
		if (dursec < 10) {
		  dursec = "0" + dursec;
		}
		if (curmin < 10) {
		  curmin = "0" + curmin;
		}
		if (cursec < 10) {
		  cursec = "0" + cursec;
		}
		this.duration = durmin + ":" + dursec;
		this.currentTime = curmin + ":" + cursec;
	  },
	  updateBar(x) {
		let progress = this.$refs.progress;
		let maxduration = this.audio.duration;
		let position = x - progress.offsetLeft;
		let percentage = (100 * position) / progress.offsetWidth;
		if (percentage > 100) {
		  percentage = 100;
		}
		if (percentage < 0) {
		  percentage = 0;
		}
		this.barWidth = percentage + "%";
		this.circleLeft = percentage + "%";
		this.audio.currentTime = (maxduration * percentage) / 100;
		this.audio.play();
	  },
	  clickProgress(e) {
		this.isTimerPlaying = true;
		this.audio.pause();
		this.updateBar(e.pageX);
	  },
	  prevTrack() {
		this.transitionName = "scale-in";
		this.isShowCover = false;
		if (this.currentTrackIndex > 0) {
		  this.currentTrackIndex--;
		} else {
		  this.currentTrackIndex = this.tracks.length - 1;
		}
		this.currentTrack = this.tracks[this.currentTrackIndex];
		this.resetPlayer();
	  },
	  nextTrack() {
		this.transitionName = "scale-out";
		this.isShowCover = false;
		if (this.currentTrackIndex < this.tracks.length - 1) {
		  this.currentTrackIndex++;
		} else {
		  this.currentTrackIndex = 0;
		}
		this.currentTrack = this.tracks[this.currentTrackIndex];
		this.resetPlayer();
	  },
	  resetPlayer() {
		this.barWidth = 0;
		this.circleLeft = 0;
		this.audio.currentTime = 0;
		this.audio.src = this.currentTrack.source;
		setTimeout(() => {
		  if(this.isTimerPlaying) {
			this.audio.play();
		  } else {
			this.audio.pause();
		  }
		}, 300);
	  },
	  favorite() {
		this.tracks[this.currentTrackIndex].favorited = !this.tracks[
		  this.currentTrackIndex
		].favorited;
	  }
	},
	created() {
	  let vm = this;
	  this.currentTrack = this.tracks[0];
	  this.audio = new Audio();
	  this.audio.src = this.currentTrack.source;
	  this.audio.ontimeupdate = function() {
		vm.generateTime();
	  };
	  this.audio.onloadedmetadata = function() {
		vm.generateTime();
	  };
	  this.audio.onended = function() {
		vm.nextTrack();
		this.isTimerPlaying = true;
	  };
  
	  // this is optional (for preload covers)
	  for (let index = 0; index < this.tracks.length; index++) {
		const element = this.tracks[index];
		let link = document.createElement('link');
		link.rel = "prefetch";
		link.href = element.cover;
		link.as = "image"
		document.head.appendChild(link)
	  }
	}
  });
  
