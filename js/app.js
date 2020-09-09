const nav = document.querySelector("nav");
const navlist = document.createElement("ul");
const sections = document.getElementsByTagName("section");

let i = 0;
for (let sec of sections) {
  let li = document.createElement("li");
  li.innerHTML = `<a href="#" class="nav-link" data-num=${i}>${sec.dataset.name}</a>`;
  i += 1;
  navlist.append(li);
}

nav.append(navlist);

const links = document.getElementsByClassName("nav-link");
links[0].classList.add("active");

//adding the click event to the navigation links
nav.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    e.preventDefault();

    let scrollDist = 0;

    //calculating how much to scroll based on height of the sections berfore the one that was selected
    for (let i = 0; i < e.target.dataset.num; i += 1) {
      scrollDist += sections[i].scrollHeight;
    }

    window.scroll(0, scrollDist);
  }
});

window.addEventListener("scroll", (e) => {
  /* calculating how much was scrolled then comparing it to height of every subset of sections starting from the beginning to determine where the user is, then using the index of the current section to get to the corresponding link */

  let scrolled = window.scrollY;
  let focusSec = 0;

  // we start from a negative number to prevent the active link from being changed too early when scrolling up
  let totalHeight = sections[0].scrollHeight / -4;

  for (let i = 0; i < sections.length; i += 1) {
    totalHeight += sections[i].scrollHeight;

    // we stop at the first section that satisfies the condition
    if (scrolled <= totalHeight) {
      focusSec = i;
      break;
    }
  }

  const scrollBtn = document.getElementById("scrollToTop");

  if (scrolled >= sections[0].scrollHeight) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }

  for (let i = 0; i < links.length; i += 1) {
    if (i === focusSec) {
      links[i].classList.add("active");
    } else {
      links[i].classList.remove("active");
    }
  }
});
