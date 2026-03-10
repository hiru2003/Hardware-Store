package com.hardwarestore.backend.controller;

import com.hardwarestore.backend.model.Order;
import com.hardwarestore.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> placeOrder(Authentication authentication, @RequestBody List<Map<String, Object>> items) {
        String username = authentication.getName();
        return ResponseEntity.ok(orderService.placeOrder(username, items));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(orderService.getUserOrders(username));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        // This should eventually be restricted to ADMIN
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
