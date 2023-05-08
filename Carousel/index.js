const startApp = () => {
  const maxVisibleItems = 6;
  var firstIndex = 0;
  var lastIndex = maxVisibleItems - 1;
  var enableInfiniteScroll = true;
  var itemsCount = 0;

  const setSizes = () => {
    // get elements
    const wrapper = document.getElementById("wrapper");
    const carousel = document.querySelector(".carousel");
    const elements = Array.from(carousel.children);

    itemsCount = elements.length;

    // define sizes
    const height = wrapper.offsetHeight;
    let elementsHeight = (1 / maxVisibleItems * 100);
    const carouselHeight = elementsHeight * itemsCount;

    carousel.style.height = `${carouselHeight}%`;

    if(itemsCount > maxVisibleItems) {
      elementsHeight = Math.round(elementsHeight * (height / carousel.offsetHeight));
    }

    elements.forEach((element, index) => {
      element.style.height = `${elementsHeight}%`;
      element.setAttribute("data-index", index);
      element.id = `item-${index}`;
    });
  };


  setSizes();


};


startApp();