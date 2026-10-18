package com.example.restaurant_management_system;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "*")
@RestController
public class BillController {

    @Autowired
    private OrderRepository orderRepository;

    // ✅ BILL GENERATION (FIXED → POST MAPPING)
    @PostMapping("/generate-bill")
    public Map<String, Object> generateBill(@RequestBody List<Map<String, Object>> cart) {

        double total = 0;
        List<Map<String, Object>> itemList = new ArrayList<>();

        for (Map<String, Object> item : cart) {

            String name = item.get("name").toString();
            int qty = Integer.parseInt(item.get("qty").toString());
            double price = Double.parseDouble(item.get("price").toString());

            double itemTotal = qty * price;
            total += itemTotal;

            Orders order = new Orders();
            order.setItemName(name);
            order.setQuantity(qty);
            order.setPrice(price);
            order.setTotal(itemTotal);

            orderRepository.save(order);

            Map<String, Object> obj = new HashMap<>();
            obj.put("name", name);
            obj.put("qty", qty);
            obj.put("price", price);

            itemList.add(obj);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("items", itemList);
        response.put("total", total);
        response.put("date", new Date());
        response.put("message", "Bill Generated Successfully");

        return response;
    }

    // ✅ ORDER COMPLETED
    @PostMapping("/order-completed")
    public Map<String, String> completeOrder(@RequestBody Map<String, Object> orderData) {

        System.out.println("Order Received: " + orderData);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Order completed successfully!");

        return response;
    }

    // ✅ OPTIONAL TEST API
    @GetMapping("/")
    public String check() {
        return "Backend Running ✅";
    }
}