import Pagination from './index';

// Automatically initialize all pagination components on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  Pagination.initializeAll('[data-component="pagination"]');
  // You can also initialize with specific options if needed:
  // Pagination.initializeAll('[data-another-pagination]', { siblingCount: 2 });
});

// Export the Pagination class if it needs to be imported and used directly elsewhere in the JS bundle
export default Pagination;
