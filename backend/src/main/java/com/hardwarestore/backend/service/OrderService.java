package com.hardwarestore.backend.service;

import com.hardwarestore.backend.model.Order;
import com.hardwarestore.backend.model.OrderItem;
import com.hardwarestore.backend.model.Product;
import com.hardwarestore.backend.model.User;
import com.hardwarestore.backend.repository.OrderRepository;
import com.hardwarestore.backend.repository.ProductRepository;
import com.hardwarestore.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order placeOrder(String username, List<Map<String, Object>> itemsData) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Map<String, Object> itemData : itemsData) {
            Long productId = Long.valueOf(itemData.get("productId").toString());
            Integer quantity = (Integer) itemData.get("quantity");

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

            if (product.getStockQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Update stock
            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(product.getPrice().multiply(new BigDecimal(quantity)));
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String username) {
        return orderRepository.findByUserUsernameOrderByOrderDateDesc(username);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
