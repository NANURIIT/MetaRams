package com.nanuri.rams;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb06.tb06010.TB06010ServiceImpl;

//@Slf4j
@SpringBootTest
public class RamsApplicationTests {

	@Autowired
	private TB06010ServiceImpl tb06010ServiceImpl;

	@Test
	public void contextLoads() {

		

	}

}
