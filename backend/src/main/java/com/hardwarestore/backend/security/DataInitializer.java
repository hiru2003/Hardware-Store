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
            productRepository.save(new Product(null, "Heavy-Duty Hammer", "Forged steel head for maximum strength and durability.", new BigDecimal("15.99"), "Hand Tools", 50, "/images/hammer.jpg"));
            productRepository.save(new Product(null, "Precision Screwdriver Set", "42-piece set for electronics and fine mechanical work.", new BigDecimal("24.50"), "Hand Tools", 40, "/images/screwdriver_set.jpg"));
            productRepository.save(new Product(null, "Professional Electric Drill", "18V Cordless drill with variable speed and high torque.", new BigDecimal("129.99"), "Power Tools", 25, "/images/electric_drill.jpg"));
            productRepository.save(new Product(null, "Adjustable Wrench", "10-inch chrome vanadium steel wrench with comfortable grip.", new BigDecimal("19.50"), "Hand Tools", 35, "/images/wrench.jpg"));
            productRepository.save(new Product(null, "Measuring Tape", "25ft impact-resistant tape measure with easy-lock button.", new BigDecimal("12.99"), "Measuring", 100, "/images/measuring_tape.jpg"));
            productRepository.save(new Product(null, "Nylon Paint Brush", "3-inch professional grade brush for smooth finishes.", new BigDecimal("8.50"), "Painting", 120, "/images/paint_brush.jpg"));
            productRepository.save(new Product(null, "Long Nose Pliers", "Hardened steel pliers with ergonomic non-slip handles.", new BigDecimal("14.75"), "Hand Tools", 45, "/images/pliers.jpg"));
            productRepository.save(new Product(null, "Industrial Angle Grinder", "Powerful 11-Amp motor for grinding and cutting metal.", new BigDecimal("79.00"), "Power Tools", 15, "/images/angle_grinder.jpg"));
            productRepository.save(new Product(null, "Latex Safety Gloves", "Cut-resistant palm coating for industrial protection.", new BigDecimal("12.50"), "Safety", 200, "/images/safety_gloves.jpg"));
            productRepository.save(new Product(null, "Aluminum Step Ladder", "6ft lightweight foldable ladder with slip-resistant steps.", new BigDecimal("65.00"), "Equipment", 10, "/images/ladder.jpg"));
            System.out.println("Database seeded with exactly 10 hardware products.");
        }
    }
}
