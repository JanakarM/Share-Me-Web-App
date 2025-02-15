package com.learning.server.services;

import com.learning.server.storage.file.FileHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    @Autowired
    FileHandler fileHandler;
    public Resource download(String fileName){
        try {
            return fileHandler.loadAsResource(fileName);
        } catch (Exception e) {
            return null;
        }
    }

    public void store(MultipartFile file, String fileName) throws Exception {
        fileHandler.store(file, fileName);
    }

    public void store(Resource file, String fileName) throws Exception {
        fileHandler.store(file, fileName);
    }
}
