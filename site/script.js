// ================================
// Configurações gerais (dados fictícios)
// ================================

// Número de WhatsApp para onde o pedido será enviado
const WHATSAPP_NUMBER = "5511999999999";

// Chave Pix fictícia exibida na finalização do pedido
const PIX_KEY = "VestWell@gmail.com";

// ================================
// Lista de produtos (mock / dados simulados)
// ================================

const products = [
  { id: 1, name: "Camiseta Básica", price: 59.90 },
  { id: 2, name: "Calça Jeans", price: 99.90 },
  { id: 3, name: "Vestido Floral", price: 79.90 },
];

// ================================
// Estado do carrinho
// ================================

// Array que armazena os produtos adicionados ao carrinho
let cart = [];

// ================================
// Referências aos elementos do DOM
// ================================

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

// ================================
// Renderização dos produtos na tela
// ================================

function renderProducts() {
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">
        Adicionar ao Carrinho
      </button>
    `;

    productList.appendChild(productDiv);
  });
}

// ================================
// Adiciona produto ao carrinho
// ================================

function addToCart(productId) {
  // Busca o produto selecionado
  const product = products.find(p => p.id === productId);

  // Verifica se o produto já existe no carrinho
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    // Se existir, aumenta a quantidade
    existingItem.quantity++;
  } else {
    // Se não existir, adiciona ao carrinho
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// ================================
// Renderização do carrinho
// ================================

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} — 
      R$ ${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">
        Remover
      </button>
    `;

    cartItems.appendChild(li);
  });

  // Atualiza o valor total do carrinho
  totalPrice.textContent = total.toFixed(2);
}

// ================================
// Remove um item do carrinho
// ================================

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

// ================================
// Finalização do pedido via WhatsApp
// ================================

function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // Monta a mensagem do pedido
  let message = "Olá, gostaria de fazer um pedido:\n";

  cart.forEach(item => {
    message += `- ${item.name} x${item.quantity}\n`;
  });

  message += `\nTotal: R$ ${totalPrice.textContent}\n\n`;
  message += `Pagamento via PIX\nChave: ${PIX_KEY}`;

  // Gera o link do WhatsApp com a mensagem codificada
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

// ================================
// Eventos
// ================================

// Evento do botão de finalizar compra
document.getElementById("checkout-button").onclick = checkout;

// ================================
// Inicialização da aplicação
// ================================

// Renderiza os produtos ao carregar a página
renderProducts();
