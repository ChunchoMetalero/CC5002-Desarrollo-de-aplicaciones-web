package com.aux.spring_app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.aux.spring_app.services.AppService;

@Controller
public class AppController {
    private final AppService appService;

    @Autowired
    public AppController(AppService appService) {
        this.appService = appService;
    }
    
    @GetMapping("/")
    public String indexRoute(Model model) {
        List<Map<String, String>> modelData = appService.getConfessionsData(3);
        model.addAttribute("data", modelData);
        return "confessions";
    }

    
    @PostMapping("/post-conf")
    public String postConfRoute(
        @RequestParam("conf-title") String confTitle,
        @RequestParam("conf-text") String confText,
        @RequestParam("conf-username") String confUsername,
        @RequestParam("conf-img") MultipartFile confImg,
        @RequestParam("conf-lat") String _formLat,
        @RequestParam("conf-long") String _formLng) throws Exception {
        
        appService.handlePostRequest(
            confTitle,
            confText,
            confUsername,
            confImg,
            _formLat,
            _formLng
        );

        return "redirect:/"; //redirects to indexRoute
    }

    @GetMapping("/stats")
    public String statsRoute() {
        return "stats";
    }

    @GetMapping("/map")
    public String mapRoute() {
        return "map";
    }

}
