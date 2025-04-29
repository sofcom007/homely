export const scrollAnim = (selector = '.animated', threshold = 0.1) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('animated')) {
          if (entry.isIntersecting)
            entry.target.classList.add('show');
        }
      });
    }, { threshold });
  
    const animatedElements = document.querySelectorAll(selector);
    animatedElements.forEach((el) => observer.observe(el));
};