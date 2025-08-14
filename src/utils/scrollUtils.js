export const smoothScrollToIdWithOffset = (targetId, headerId = 'main-header', delay = 100) => {
    const attemptScroll = () => {
      const targetElement = document.getElementById(targetId);
      const headerElement = document.getElementById(headerId); 
  
      if (targetElement) {
        let headerHeight = 0;
        if (headerElement) {
          headerHeight = headerElement.offsetHeight;
        }
        headerHeight = Number.isFinite(headerHeight) ? headerHeight : 0;
  
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        console.warn(`Scroll target element with id "${targetId}" not found after delay.`);
      }
    };
  
    setTimeout(attemptScroll, delay);
  };