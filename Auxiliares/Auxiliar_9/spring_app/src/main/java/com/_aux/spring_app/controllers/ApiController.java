package com.aux.spring_app.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.aux.spring_app.confession.Confession;
import com.aux.spring_app.services.ApiService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ApiController {
    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;

    }
    
    @GetMapping("/get-conf/{title_substring}")
    public List<Confession> getConfessionEndpoint(@PathVariable String titleSubstring) {
        return apiService.getConfessions(titleSubstring);
    }

    @GetMapping("/get-stats-data")
    public List<Map<String, String>> getStatsDataEndpoint() {
        return apiService.getStatsData();
    }

    @GetMapping("get-map-data")
    public List<Confession> getMapDataEndpoint() {
        return apiService.getMapData();
    }
}
