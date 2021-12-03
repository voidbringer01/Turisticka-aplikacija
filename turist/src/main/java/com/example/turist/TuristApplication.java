package com.example.turist;

import com.example.turist.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@SpringBootApplication
public class TuristApplication implements CommandLineRunner {
	@Resource
	FileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(TuristApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
//		storageService.deleteAll();
		storageService.init();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/api/drzave").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/authenticate/login").allowedOrigins("http://localhost:4200").allowedMethods("POST");
//				registry.addMapping("/authenticate/register").allowedOrigins("http://localhost:4200").allowedMethods("POST");
//				registry.addMapping("/api/znamenitosti/{idDrzave}/{idOpstine}").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/api/znamenitosti/{name}").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/api/znamenitost/{id}").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/api/prosecnaocena/{id}").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/api/ocena/{idZnamenitosti}/{idKorisnika}").allowedOrigins("http://localhost:4200");
//				registry.addMapping("/api/ocena/{id}").allowedOrigins("http://localhost:4200").allowedMethods("POST", "PUT");
				registry.addMapping("/**")
						.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
			}
			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry){
				registry.addResourceHandler("/uploads/**")
						.addResourceLocations("file:/uploads/");
			}
		};
	}

}
