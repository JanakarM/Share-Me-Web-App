package com.learning.rest_service.controllers;

import com.learning.rest_service.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins= "*")
public class FileController {
    @Autowired
    FileStorageService fileStorageService;

    @GetMapping("/download")
    ResponseEntity<Resource> download(@RequestParam(value = "fileName") String fileName){
        Resource file= fileStorageService.download(fileName);
        return ResponseEntity.ok().
                header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=%s", file.getFilename())).
                body(file);
    }
}
