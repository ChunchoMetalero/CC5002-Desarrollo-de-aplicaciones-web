package com.aux.spring_app.confession;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table
public class Confession {

    @Id
    @SequenceGenerator(
        name = "confession_sequence",
        sequenceName = "confession_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "confession_sequence"
    )
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String text;
    
    @NotNull
    private String img;
    
    @NotNull
    private String username;

    private LocalDateTime timestamp;
    private Float lat;
    private Float lng;
 
    public Confession() {
    }

    public Confession(String title, 
                    String text,
                    String img,
                    String username,
                    LocalDateTime timestamp,
                    Float lat,
                    Float lng) {

        this.title = title;
        this.text = text;
        this.img = img;
        this.username = username;
        this.timestamp = timestamp;
        this.lat = lat;
        this.lng = lng;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public String getImg() {
        return img;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Float getLat() {
        return lat;
    }

    public Float getLng() {
        return lng;
    }

    public static Boolean validateConfession(String confText, MultipartFile confImg) {
        // Ejercicio: implementar validacion de confesiones :)
        return true;
    }
}
 