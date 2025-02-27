package com.nanuri.rams.business.assessment.tb90;

import com.nanuri.rams.business.assessment.tb90.tb9070.TB9070Service;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
public class TB9070ServiceImplTest {

    @Autowired
    private TB9070Service tb9070Service;

    /**
     * ✅ TB9070Service의 execute() 실행 테스트
     */
    @Test
    public void testServiceExecution() {        
        System.out.println("📌 [테스트 시작] TB9070Service 실행 테스트");
        
        // 서비스 실행
        tb9070Service.insertOvduList();       

        System.out.println("✅ [테스트 완료] TB9070Service 실행 성공!");
    }
}
