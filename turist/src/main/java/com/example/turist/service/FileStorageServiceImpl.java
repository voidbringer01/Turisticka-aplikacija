package com.example.turist.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class FileStorageServiceImpl implements FileStorageService{

//    @Value("${upload.path}")
//    private String uploadPath;
    private final Path root = Paths.get("/uploads");

    @Override
    public void init() {
        try{
            if(!Files.exists(root)) {
                Files.createDirectory(root);
            }
        } catch(IOException io){
            System.out.println(io);
//            throw new RuntimeException(io.getMessage());
//            throw new RuntimeException("Couldn't initialize folder for upload!");
        }
    }

    public void createZnamFolder(int id){
        String path = "/uploads/"+String.valueOf(id);
        Path dir = Paths.get(path);
        try{
            if(!Files.exists(dir)){
                Files.createDirectory(dir);
            }
        }catch(IOException io){
            System.out.println(io);
        }
    }

    @Override
    public void save(MultipartFile file,int id) {
        String path = "/uploads/"+String.valueOf(id);
        Path dir = Paths.get(path);
        try {
            Files.copy(file.getInputStream(), dir.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
