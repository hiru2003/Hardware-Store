package com.hardwarestore.backend.security;

import com.hardwarestore.backend.model.Product;
import com.hardwarestore.backend.model.User;
import com.hardwarestore.backend.repository.ProductRepository;
import com.hardwarestore.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create default admin if it doesn't exist
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@hardwarestore.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin account created: admin / admin123");
        }

        // Seed initial products if database is empty
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "Cordless Power Drill", "18V High-performance varying speed drill with 2 batteries.", new BigDecimal("129.99"), "Power Tools", 25));
            productRepository.save(new Product(null, "Precision Screwdriver Set", "42-piece precision kit for electronics and small appliances.", new BigDecimal("24.50"), "Hand Tools", 50));
            productRepository.save(new Product(null, "Adjustable Wrench (10-inch)", "Chrome vanadium steel wrench with comfortable grip.", new BigDecimal("18.75"), "Hand Tools", 30));
            productRepository.save(new Product(null, "7-1/4 inch Circular Saw", "15 Amp powerful motor for heavy duty cutting.", new BigDecimal("89.00"), "Power Tools", 15));
            productRepository.save(new Product(null, "25ft Tape Measure", "Durable impact resistant case with easy lock.", new BigDecimal("12.99"), "Measuring", 100));
            productRepository.save(new Product(null, "24-inch I-Beam Level", "Heavy duty aluminum frame with 3 vials.", new BigDecimal("22.95"), "Measuring", 20));
            productRepository.save(new Product(null, "Industrial Safety Helmet", "Yellow hard hat with adjustable suspension.", new BigDecimal("15.50"), "Safety", 60));
            productRepository.save(new Product(null, "Heavy Duty Work Gloves", "Leather palm gloves for construction work.", new BigDecimal("19.99"), "Safety", 80));
            productRepository.save(new Product(null, "19-inch Plastic Toolbox", "Robust toolbox with removable tray and metal latches.", new BigDecimal("34.99"), "Storage", 35));
            System.out.println("Database seeded with initial products.");
        }
    }
}
