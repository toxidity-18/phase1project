function trackOrder(orderId) {
    fetch(`http://localhost:3000/orders/${orderId}`)
        .then(response => response.json())
        .then(order => {
            if (order) {
                orderStatusContainer.textContent = `Order Status: ${order.status}`;
            } else {
                orderStatusContainer.textContent = 'Order not found';
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const orderForm = document.getElementById('order-form');
    const orderIdInput = document.getElementById('order-id');
    const orderStatusContainer = document.getElementById('order-status');
    const feedbackForm = document.getElementById('feedback-form');
    const productIdSelect = document.getElementById('product-id');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackList = document.getElementById('feedback-list');
  
    
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('bg-white', 'p-4', 'shadow-md', 'rounded');
          productElement.innerHTML = `
            <h3 class="text-lg font-bold">${product.name}</h3>
            <p>${product.specifications}</p>
            <p class="font-bold">$${product.price}</p>
            <p class="text-green-500">${product.availability}</p>
          `;
          productsContainer.appendChild(productElement);
  

          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.name;
          productIdSelect.appendChild(option);
        });
      });
  

    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const orderId = orderIdInput.value;
  
      fetch(`http://localhost:3000/orders/${orderId}`)
        .then(response => response.json())
        .then(order => {
          if (order) {
            orderStatusContainer.textContent = `Order Status: ${order.status}`;
          } else {
            orderStatusContainer.textContent = 'Order not found';
          }
        });
    });
  

    feedbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const productId = productIdSelect.value;
      const feedback = feedbackText.value;
  
     
      fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          feedback,
        }),
      })
        .then(response => response.json())
        .then(data => {
   
          const feedbackElement = document.createElement('div');
          feedbackElement.classList.add('p-2', 'border', 'border-gray-300', 'rounded', 'mb-2');
          feedbackElement.textContent = data.feedback;
          feedbackList.appendChild(feedbackElement);
  
   
          productIdSelect.value = '';
          feedbackText.value = '';
        });
    });
  });
  