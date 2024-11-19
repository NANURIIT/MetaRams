package com.nanuri.rams;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb06.tb06010.TB06010ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;

@SpringBootTest
class RamsApplicationTests {

	@Autowired
	private TB06010ServiceImpl tb06010ServiceImpl;

	@Test
	void contextLoads() {

		

	}

}
