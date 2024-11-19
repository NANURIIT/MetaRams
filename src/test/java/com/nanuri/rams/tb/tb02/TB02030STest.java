package com.nanuri.rams.tb.tb02;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb02.tb02030.TB02030ServiceImpl;

@SpringBootTest
public class TB02030STest {
    
    @Autowired
    private TB02030ServiceImpl tb02030ServiceImpl;

    /**
     * WF MAP 조회 테스트1
     */
    @Test
    void getWfMapInfoTest1 () {

        /* 파라미터 세팅 */
        String param = "";
        /* 파라미터 세팅 */

        tb02030ServiceImpl.getWfMapInfo(param);

    }

}
