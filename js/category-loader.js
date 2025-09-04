document.addEventListener('DOMContentLoaded', function() {
    loadOrder();
    initTheme();
    initSortable();
    initImageModals();
});

function saveOrder() {
    const container = document.querySelector('.cases-container');
    const order = Array.from(container.querySelectorAll('.case-card')).map(card => card.dataset.id);
    localStorage.setItem('casesOrder', JSON.stringify(order));
}

function loadOrder() {
    const container = document.querySelector('.cases-container');
    const savedOrder = JSON.parse(localStorage.getItem('casesOrder'));
    if (!savedOrder) return;

    savedOrder.forEach(id => {
        const card = container.querySelector(`.case-card[data-id='${id}']`);
        if (card) container.appendChild(card);
    });
}

function initSortable() {
  const container = document.querySelector('.cases-container');
  if (!container) return;

  new Sortable(container, {
    animation: 150,
    ghostClass: 'dragging',
    handle: '.case-card',        
    touchStartThreshold: 5,
    delay: 150,                  
    delayOnTouchOnly: true,
    filter: '.case-image',       
    preventOnFilter: false,      
    onEnd: function() {
      saveOrder(); 
    }
  });
}


function initImageModals() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    document.querySelectorAll('.case-image').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.padding = '10px';
            modal.style.backgroundColor = 'rgba(0,0,0,0.95)';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '9999';
            modal.style.overflow = 'auto';

            modalImg.src = this.src;
            modalImg.style.maxWidth = '100%';
            modalImg.style.maxHeight = '80vh';
            modalImg.style.borderRadius = '8px';
            modalImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

            captionText.innerHTML = this.alt || '';
            captionText.style.color = '#fff';
            captionText.style.textAlign = 'center';
            captionText.style.marginTop = '10px';
            captionText.style.fontSize = '1rem';
        });
    });

    if (!modal.dataset.listenerAttached) {
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });

        modal.dataset.listenerAttached = 'true';
    }
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }
}
