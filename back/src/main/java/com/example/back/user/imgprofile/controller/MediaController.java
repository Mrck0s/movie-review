package com.example.back.user.imgprofile.controller;

import com.example.back.ExceptionHandler.CustomException;
import com.example.back.user.UserRepository;
import com.example.back.user.imgprofile.service.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@RestController
@RequestMapping("/media")
@AllArgsConstructor
public class MediaController {
    private final StorageService storageService;
    private final HttpServletRequest request;
    private final UserRepository userRepository;

    @PostMapping(value = "/upload")
    public Map<String, String> uploadFile(@RequestParam("File") MultipartFile multipartFile,
                                          @RequestParam("usuario") String usuario) {
        if(multipartFile.isEmpty()){
            throw new CustomException(400, "You have to choose a image first");
        }
        try{

            System.out.println("Tamaño del archivo: " + multipartFile.getSize());
            String path = storageService.store(multipartFile, usuario);
            //System.out.println(path);
            String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");
            String url = ServletUriComponentsBuilder
                    .fromHttpUrl(host)
                    .path("/media/")
                    .path(path)
                    .toUriString();
            return Map.of("url", url);
        }catch (Exception e){
            return Map.of("error", e.getMessage());
        }

    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadResource(filename);
        if(file == null){
            throw new CustomException(404, "File not found");
        }
        String contentType = Files.probeContentType(file.getFile().toPath());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }
}
