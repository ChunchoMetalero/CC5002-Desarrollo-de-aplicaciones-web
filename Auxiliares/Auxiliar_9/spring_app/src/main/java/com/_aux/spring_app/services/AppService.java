package com.aux.spring_app.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aux.spring_app.confession.Confession;
import com.aux.spring_app.confession.ConfessionRepository;


@Service
public class AppService {
    private final String pathStatic = "./src/main/resources/static";
    private final ConfessionRepository confessionRepository;

    @Autowired
    public AppService(ConfessionRepository confessionRepository) {
        this.confessionRepository = confessionRepository;
    }

    public List<Map<String, String>> getConfessionsData(Integer pageSize) {
        List<Confession> confessions = confessionRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        List<Map<String, String>> confessionsData = new ArrayList<>();
        
        for (Confession conf : confessions) {
            Map<String, String> confData = new HashMap<>();

            confData.put("id", conf.getId().toString());
            confData.put("author", conf.getUsername());
            confData.put("conf_title", conf.getTitle());
            confData.put("content", conf.getText());
            confData.put("conf_timestamp", conf.getTimestamp().toString());

            Float _confLat = conf.getLat();
            Float _confLng = conf.getLng();
            confData.put("conf_lat", (_confLat == null) ? null : _confLat.toString());
            confData.put("conf_lng", (_confLng == null) ? null : _confLng.toString());
            confData.put("image_filename", conf.getImg());

            confessionsData.add(confData);
        }
        return confessionsData;
    }

    public void handlePostRequest(
        String confTitle,
        String confText,
        String confUsername,
        MultipartFile confImg,
        String _formLat,
        String _formLng) throws Exception {

            LocalDateTime confTimestamp = LocalDateTime.now();
            Float confLat = _formLat.isEmpty() ? null : Float.parseFloat(_formLat);
            Float confLng = _formLng.isEmpty() ? null : Float.parseFloat(_formLng);
            
            if(Confession.validateConfession(confText, confImg)) {
                // 1. generate random name for img
                String _originalFilename = confImg.getOriginalFilename();
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                md.update(_originalFilename.getBytes("UTF-8"));
                byte[] hash = md.digest();
                try (Formatter formatter = new Formatter()) {
                    for (byte b : hash) {
                        formatter.format("%02x", b);
                    }
                    
                    String _filename = formatter.toString();
                    String _extension = _originalFilename.substring(_originalFilename.lastIndexOf(".")+1);
                    
                    String imgFilename = _filename + "." + _extension;
                    String relativePathImg = "/uploads/" + imgFilename;
                    String finalPath = pathStatic + relativePathImg;

                    // 2. save img as a file
                    Path path = Paths.get(finalPath);
                    Files.copy(confImg.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    
                    // 3. save confession in db
                    Confession confession = new Confession(confTitle, confText, relativePathImg, confUsername, confTimestamp, confLat, confLng);
                    confessionRepository.save(confession);
                }
        }
    }
}
