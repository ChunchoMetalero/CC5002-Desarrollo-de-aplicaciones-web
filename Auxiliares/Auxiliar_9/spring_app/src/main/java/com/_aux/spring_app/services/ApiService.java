package com.aux.spring_app.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aux.spring_app.confession.Confession;
import com.aux.spring_app.confession.ConfessionRepository;

@Service
public class ApiService {
    private final ConfessionRepository confessionRepository;

    @Autowired
    public ApiService(ConfessionRepository confessionRepository) {
        this.confessionRepository = confessionRepository;
    }

    public List<Confession> getConfessions(String titleSubString) {
        List<Confession> confessions = confessionRepository.findAll();
        List<Confession> matchConfessions = new ArrayList<Confession>();
        for (Confession conf : confessions) {
            if (conf.getTitle().toLowerCase().contains(titleSubString)) {
                matchConfessions.add(conf);
            }
        }
        return matchConfessions;
    }

    public List<Map<String, String>> getStatsData() {
        // Define the start and end date
        LocalDate startDate = LocalDate.of(2020, 1, 1);
        LocalDate endDate = LocalDate.of(2022, 12, 31);

        // Define the random number generator
        Random rand = new Random();

        // Generate the random data
        List<Map<String, String>> randomData = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            Map<String, String> data = new HashMap<>();
            data.put("date", getRandomDate(startDate, endDate, rand).toString());
            data.put("count", String.valueOf(getRandomInt(1, 10, rand)));
            randomData.add(data);
        }

        // Sort the data by date
        Collections.sort(randomData, (map1, map2) -> map1.get("date").compareTo(map2.get("date")));

        return randomData;
    }


    public List<Confession> getMapData() {
        List<Confession> confessions = confessionRepository.findAll();
        List<Confession> mapData = new ArrayList<>();

        for (Confession conf : confessions) {
            if (conf.getLat() != null && conf.getLng() != null) {
                mapData.add(conf);
            }
        }
        return mapData;
    }


    private static LocalDate getRandomDate(LocalDate startDate, LocalDate endDate, Random rand) {
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate);
        long randomDays = rand.nextInt((int) totalDays + 1);
        return startDate.plusDays(randomDays);
    }

    private static int getRandomInt(int startInt, int endInt, Random rand) {
        return rand.nextInt(endInt - startInt + 1) + startInt;
    }


    
}
