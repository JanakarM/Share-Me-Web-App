package com.server.storage.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageProperties {
    public String getRootLocation() {
        return rootLocation;
    }

    @Value("${file-storage.root-location}")
    String rootLocation;
}
