package com.learning.rest_service.storage.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
@Component
public class FileHandler {
    Path rootLocation;

    @Autowired
    public FileHandler(FileStorageProperties fileStorageProperties) {
        rootLocation= Paths.get(fileStorageProperties.getRootLocation());
    }


    public void store(MultipartFile file, String fileName) throws Exception{
        Path destinationFile= rootLocation.
                resolve(Paths.get(fileName))
                .normalize().toAbsolutePath();
        try(InputStream inputStream= file.getInputStream()){
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public void store(Resource file, String fileName) throws Exception{
        Path destinationFile= rootLocation.
                resolve(Paths.get(fileName))
                .normalize().toAbsolutePath();
        try(InputStream inputStream= file.getInputStream()){
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    Path load(String fileName){
        return rootLocation.resolve(fileName);
    }

    public Resource loadAsResource(String fileName) throws Exception{
        Path file= load(fileName);
        return new UrlResource(file.toUri());
    }
}
