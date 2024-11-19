package com.nanuri.rams.tb.tb03;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb03.tb03030.TB03030ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS102BDTO;

@SpringBootTest
public class TB03030STest {
    
    @Autowired
    private TB03030ServiceImpl tb03030ServiceImpl;

    /**
     * RM활동조회 테스트1
     */
    @Test
    void getHistoryInfoTest1 () {

        IBIMS102BDTO param = new IBIMS102BDTO();

        /* 파라미터 세팅 */
        // ㅇㅇㅋ
        /* 파라미터 세팅 */

        tb03030ServiceImpl.getHistoryInfo(param);

    }

}
