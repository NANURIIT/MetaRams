package com.nanuri.rams.tb.tb03;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb03.tb03040.TB03040ServiceImpl;
import com.nanuri.rams.business.common.dto.IBIMS101BDTO;

@SpringBootTest
public class TB03040STest {
    
    @Autowired
    private TB03040ServiceImpl tb03040ServiceImpl;

    /**
     * DEAL(사업)정보조회 테스트1
     */
    @Test
    void ibSpecSearchTest1 () {

        IBIMS101BDTO param = new IBIMS101BDTO();

        /* 파라미터 세팅 */
        // ㅇㅇㅋ
        /* 파라미터 세팅 */

        tb03040ServiceImpl.ibSpecSearch(param);

    }

}
