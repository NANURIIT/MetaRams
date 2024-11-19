package com.nanuri.rams;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import lombok.extern.slf4j.Slf4j;

<<<<<<< HEAD
import com.nanuri.rams.business.assessment.tb06.tb06010.TB06010ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;

=======
@Slf4j
>>>>>>> e29dd491f6751e1f7ab9f0348331cfc0cc936c97
@SpringBootTest
public class RamsApplicationTests {

	@Autowired
	private TB06010ServiceImpl tb06010ServiceImpl;

	@Test
<<<<<<< HEAD
	void contextLoads() {
=======
	public void contextLoads() {
		log.debug("############## contextLoads run ##############");
>>>>>>> e29dd491f6751e1f7ab9f0348331cfc0cc936c97

		

	}

}
