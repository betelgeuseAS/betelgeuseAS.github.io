$(function() {


  //Hamburger menu:
  const sidebar = document.querySelector('.sidebar');
  var hamburgers = document.querySelector(".hamburger");
  hamburgers.addEventListener("click", function() {
    this.classList.toggle("is-active");
    sidebar.classList.toggle('is-hidden')
  }, false);



  //Accardeon:
  var panelItem = document.querySelectorAll('.panel-title'),
      bodyItem = document.querySelectorAll('.panel-body');
  panelItem.__proto__.forEach = [].__proto__.forEach;
  var activePanel;
  panelItem.forEach(function(item, i, panelItem) {
    item.addEventListener('click', function(e) {
      //show new thingy;
      this.classList.add('panel-active');
      this.nextElementSibling.classList.add('active');
      //hide old thingy
      if (activePanel) {
        activePanel.classList.remove('panel-active');
        activePanel.nextElementSibling.classList.remove('active');
      }
      //update thingy
      activePanel = (activePanel === this) ? 0 : this;
    });
  });



  // MixItUp
  var mixer = mixitup('.containPort', {
    load: {
      filter: '.category-a'
    }

    // selectors: {
    //   target: '.mix',
    // },
    // animation: {
    //     duration: 300
    // }
  });



  //Все це для того, щоб картинки в Portfolio піднімалися на правильну висоту, так як опис може займати різну висоту.
  var descr = document.querySelectorAll('.containPort .descr');
  var item = document.querySelectorAll('.containPort ul li');
  for(let i = 0; i < item.length; i++) {
    item[i].addEventListener('mouseover', function() {
      let descrHeight = this.lastElementChild.offsetHeight;
      // console.log(descrHeight);
      let photo = this.firstElementChild.style.transform = `translateY(-${descrHeight-60}px)`;
    });
    item[i].addEventListener('mouseout', function() {
      let photo = this.firstElementChild.style.transform = 'translateY(0px)';
    });
  }



  //Page scroll to id
  $("a[rel='m_PageScroll2id']").mPageScroll2id({
    // layout:"horizontal",
    // scrollSpeed: 900,
    // autoScrollSpeed: true,
    // scrollEasing: "easeInOutQuint",
    // pageEndSmoothScroll: true,
    // offset: 0
  });



});
