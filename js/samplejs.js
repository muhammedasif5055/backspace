    // Function to open the modal with topics and details
    function openModal(moduleCard) {
        const modal = document.getElementById('topics-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDuration = document.getElementById('modal-duration');
        const modalTopicsList = document.getElementById('modal-topics-list');
  
        // Get data attributes from the module card
        const title = moduleCard.getAttribute('data-title');
        const duration = moduleCard.getAttribute('data-duration');
        const topics = moduleCard.getAttribute('data-topics').split(',');
  
        // Update modal content
        modalTitle.textContent = title;
        modalDuration.textContent = duration;
        modalTopicsList.innerHTML = topics.map(topic => `<li>${topic.trim()}</li>`).join('');
  
        // Display modal
        modal.classList.add('active');
      }
  
      // Function to close the modal
      function closeModal() {
        const modal = document.getElementById('topics-modal');
        modal.classList.remove('active');
      }
  
      // Add click events for module cards
      const moduleCards = document.querySelectorAll('.curriculum-module-card');
      moduleCards.forEach(card => {
        card.addEventListener('click', () => {
          moduleCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          openModal(card);
        });
      });
  
      // Close modal on clicking the close button
      document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  
      // Close modal when clicking outside the modal content
      window.addEventListener('click', (event) => {
        const modal = document.getElementById('topics-modal');
        if (event.target === modal) {
          closeModal();
        }
      });
  
      // Tab Switching Functionality
      const tabs = document.querySelectorAll('.curriculum-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const level = tab.getAttribute('data-level');
  
          // Hide all modules
          moduleCards.forEach(card => card.style.display = 'none');
  
          // Display modules for the selected level
          const levelModules = document.querySelectorAll(`.curriculum-module-card[data-level="${level}"]`);
          levelModules.forEach(card => card.style.display = 'block');
        });
      });
  
      // Initialize display with beginner modules
      document.querySelector('.curriculum-tab[data-level="beginner"]').click();