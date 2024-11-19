package com.nanuri.rams.tb.tb04;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nanuri.rams.business.assessment.tb04.tb04050.TB04050ServiceImpl;
import com.nanuri.rams.business.common.vo.TB04050SVO;

@SpringBootTest
public class TB04050STest {
    
    @Autowired
    private TB04050ServiceImpl tb04050ServiceImpl; 

    /**
     * LOI/LOC 발급 조회 테스트1
     */
    @Test
    void getLoiTest1 () {

        TB04050SVO param = new TB04050SVO();

        /* 파라미터 세팅 */
        param.setDealNo("AG120240729140120");
        /* 파라미터 세팅 */

        tb04050ServiceImpl.getLoi(param);

    }

}
