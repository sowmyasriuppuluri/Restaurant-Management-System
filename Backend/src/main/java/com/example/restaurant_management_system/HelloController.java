package com.example.restaurant_management_system;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController

public class HelloController {

    @GetMapping("/hello")
    public String hello() {
       System.out.println("Hello API");
        return "Hello from Backend!";
    }
}

