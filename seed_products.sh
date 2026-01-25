#!/bin/bash

# Power Drill
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Cordless Power Drill", "description":"18V High-performance varying speed drill with 2 batteries.", "price":129.99, "category":"Power Tools", "stockQuantity":25}'

# Screwdriver Set
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Precision Screwdriver Set", "description":"42-piece precision kit for electronics and small appliances.", "price":24.50, "category":"Hand Tools", "stockQuantity":50}'

# Adjustable Wrench
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Adjustable Wrench (10-inch)", "description":"Chrome vanadium steel wrench with comfortable grip.", "price":18.75, "category":"Hand Tools", "stockQuantity":30}'

# Circular Saw
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"7-1/4 inch Circular Saw", "description":"15 Amp powerful motor for heavy duty cutting.", "price":89.00, "category":"Power Tools", "stockQuantity":15}'

# Tape Measure
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"25ft Tape Measure", "description":"Durable impact resistant case with easy lock.", "price":12.99, "category":"Measuring", "stockQuantity":100}'

# Spirit Level
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"24-inch I-Beam Level", "description":"Heavy duty aluminum frame with 3 vials.", "price":22.95, "category":"Measuring", "stockQuantity":20}'

# Safety Helmet
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Industrial Safety Helmet", "description":"Yellow hard hat with adjustable suspension.", "price":15.50, "category":"Safety", "stockQuantity":60}'

# Work Gloves
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Heavy Duty Work Gloves", "description":"Leather palm gloves for construction work.", "price":19.99, "category":"Safety", "stockQuantity":80}'

# Toolbox
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"19-inch Plastic Toolbox", "description":"Robust toolbox with removable tray and metal latches.", "price":34.99, "category":"Storage", "stockQuantity":35}'

echo "Products seeded successfully!"
