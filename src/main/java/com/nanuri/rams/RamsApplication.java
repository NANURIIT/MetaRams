package com.nanuri.rams;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@EnableScheduling
@EnableBatchProcessing
@SpringBootApplication
public class RamsApplication {
	
	@PostConstruct
    public void config() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

	public static void main(String[] args) {
		SpringApplication.run(RamsApplication.class, args);
	}

}
